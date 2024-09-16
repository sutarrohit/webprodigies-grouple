"use server"

export const onAuthenticatedUser = async () => {
    try {
        const user = await currentUser()
        if (!user) return { status: 404 }
    } catch (error) {}
}
