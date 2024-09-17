"use client"
import { FormGenerator } from "@/components/global/form-generator"
import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { GROUPLE_CONSTANTS } from "@/constants"
import { useAuthSignIn } from "@/hooks/authentication"

type Props = {}
const SignInForm = (props: Props) => {
    const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn()

    return (
        <form
            className="flex flex-col gap-3 mt-10"
            onSubmit={onAuthenticateUser}
        >
            {GROUPLE_CONSTANTS.signInForm.map((field) => (
                <FormGenerator
                    {...field}
                    key={field.name}
                    register={register}
                    errors={errors}
                />
            ))}

            <Button type="submit" className="rounded-xl">
                <Loader loading={isPending}> Sing In with email</Loader>
            </Button>
        </form>
    )
}

export default SignInForm
