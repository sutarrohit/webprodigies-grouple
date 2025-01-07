"use client"

import {
    onCreateNewGroup,
    onGetGroupChannels,
    onJoinGroup,
} from "@/actions/groups"
import {
    onGetActiveSubscription,
    onGetGroupSubscriptionPaymentIntent,
    onGetStripeClientSecret,
    onTransferCommission,
} from "@/actions/payments"
import { CreateGroupSchema } from "@/components/form/create-group/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// Import Stripe components and hooks for handling payments
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripeCardElement, loadStripe } from "@stripe/stripe-js"

// Custom hook to initialize Stripe with a public key
export const useStripeElements = () => {
    // Asynchronously load the Stripe object using the key from environment variables
    const StripePromise = async () =>
        await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string)

    return { StripePromise }
}

// Custom hook for payment handling and group creation logic
export const usePayments = (
    userId: string, // User ID
    affiliate: boolean, // Boolean to check if the user is an affiliate
    stripeId?: string, // Optional Stripe ID for affiliates
) => {
    // State to track the selected category in the form
    const [isCategory, setIsCategory] = useState<string | undefined>(undefined)

    // Initialize Stripe and Elements hooks
    const stripe = useStripe()
    const elements = useElements()
    const router = useRouter()

    // Initialize form with Zod schema validation and default values
    const {
        reset,
        handleSubmit,
        formState: { errors },
        register,
        watch,
    } = useForm<z.infer<typeof CreateGroupSchema>>({
        resolver: zodResolver(CreateGroupSchema),
        defaultValues: {
            category: "",
        },
    })

    // Effect to watch for category selection changes in the form
    useEffect(() => {
        const category = watch(({ category }) => {
            if (category) {
                setIsCategory(category) // Update state if a category is selected
            }
        })
        return () => category.unsubscribe() // Cleanup on component unmount
    }, [watch])

    // Query to fetch the Stripe client secret for creating a payment intent
    const { data: Intent, isPending: creatingIntent } = useQuery({
        queryKey: ["payment-intent"],
        queryFn: () => onGetStripeClientSecret(),
    })

    // Mutation to create a new group, processing payment first if necessary
    const { mutateAsync: createGroup, isPending } = useMutation({
        mutationFn: async (data: z.infer<typeof CreateGroupSchema>) => {
            if (!stripe || !elements || !Intent) {
                return null
            }

            // Confirm payment with Stripe using the client secret and card element
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                Intent.secret!,
                {
                    payment_method: {
                        card: elements.getElement(
                            CardElement,
                        ) as StripeCardElement,
                    },
                },
            )

            if (error) {
                return toast("Error", {
                    description: "Oops! something went wrong, try again later",
                })
            }

            // If payment is successful, proceed with creating the group
            if (paymentIntent?.status === "succeeded") {
                if (affiliate) {
                    await onTransferCommission(stripeId!) // Transfer commission if the user is an affiliate
                }
                const created = await onCreateNewGroup(userId, data)
                if (created && created.status === 200) {
                    // Show success message and navigate to the new group and channel
                    toast("Success", {
                        description: created.message,
                    })
                    router.push(
                        `/group/${created.data?.group[0].id}/channel/${created.data?.group[0].channel[0].id}`,
                    )
                }
                if (created && created.status !== 200) {
                    reset() // Reset form if group creation fails
                    return toast("Error", {
                        description: created.message,
                    })
                }
            }
        },
    })

    // Function to handle group creation form submission
    const onCreateGroup = handleSubmit(async (values) => createGroup(values))

    return {
        onCreateGroup,
        isPending,
        register,
        errors,
        isCategory,
        creatingIntent,
    }
}

export const useActiveGroupSubscription = (groupId: string) => {
    const { data } = useQuery({
        queryKey: ["active-subscription"],
        queryFn: () => onGetActiveSubscription(groupId),
    })

    return { data }
}

export const useJoinFree = (groupid: string) => {
    const router = useRouter()
    const onJoinFreeGroup = async () => {
        const member = await onJoinGroup(groupid)
        if (member?.status === 200) {
            const channels = await onGetGroupChannels(groupid)
            router.push(
                `/group/${groupid}/channel/${channels?.channels?.[0].id}`,
            )
        }
    }

    return { onJoinFreeGroup }
}

export const useJoinGroup = (groupid: string) => {
    const stripe = useStripe()
    const elements = useElements()

    const router = useRouter()

    const { data: Intent } = useQuery({
        queryKey: ["group-payment-intent"],
        queryFn: () => onGetGroupSubscriptionPaymentIntent(groupid),
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            if (!stripe || !elements || !Intent) {
                return null
            }
            const { error, paymentIntent } = await stripe.confirmCardPayment(
                Intent.secret!,
                {
                    payment_method: {
                        card: elements.getElement(
                            CardElement,
                        ) as StripeCardElement,
                    },
                },
            )

            if (error) {
                console.log(error)
                return toast("Error", {
                    description: "Oops! something went wrong, try again later",
                })
            }

            if (paymentIntent?.status === "succeeded") {
                const member = await onJoinGroup(groupid)
                if (member?.status === 200) {
                    const channels = await onGetGroupChannels(groupid)
                    router.push(
                        `/group/${groupid}/channel/${channels?.channels?.[0].id}`,
                    )
                }
            }
        },
    })

    const onPayToJoin = () => mutate()

    return { onPayToJoin, isPending }
}
