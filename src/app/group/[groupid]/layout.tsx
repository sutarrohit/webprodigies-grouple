import { onAuthenticatedUser } from "@/actions/auth"
import {
    onGetAllGroupMembers,
    onGetGroupChannels,
    onGetGroupInfo,
    onGetGroupSubscriptions,
    onGetUserGroups,
} from "@/actions/groups"
import Sidebar from "@/components/global/sidebar"
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query"
import { redirect } from "next/navigation"

type Props = {
    children: React.ReactNode
    params: {
        groupId: string
    }
}

const GroupLayout = async ({ children, params }: Props) => {
    const query = new QueryClient()
    const user = await onAuthenticatedUser()

    if (!user.id) redirect("/sign-in")

    // Get group Info
    await query.prefetchQuery({
        queryKey: ["group-info"],
        queryFn: () => onGetGroupInfo(params.groupId),
    })

    // Get all the groups belongs to the user
    await query.prefetchQuery({
        queryKey: ["user-groups"],
        queryFn: () => onGetUserGroups(user.id as string),
    })

    // Get Channels using groupId
    await query.prefetchQuery({
        queryKey: ["group-channels"],
        queryFn: () => onGetGroupChannels(params.groupId),
    })

    // Get group's all subscriptions
    await query.prefetchQuery({
        queryKey: ["group-subscriptions"],
        queryFn: () => onGetGroupSubscriptions(params.groupId),
    })

    // Get member chats | list of all group members
    await query.prefetchQuery({
        queryKey: ["member-chats"],
        queryFn: () => onGetAllGroupMembers(params.groupId),
    })

    return (
        <HydrationBoundary state={dehydrate(query)}>
            <div className="flex h-screen md:pt-5">
                <Sidebar
                    groupid={params.groupId}
                    userid={user.id}
                    mobile={false}
                />
            </div>
            {children}
        </HydrationBoundary>
    )
}

export default GroupLayout
