export const authenticateUser = async (token: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=*`,
            {
                headers: { Authorization: `Bearer ${token}` },
                cache: "no-store",
            },
        )
        if (!response.ok) throw new Error("Unauthorized")
        const user = await response.json()
        return user
    } catch (error) {
        console.error(error)
        return null
    }
}
