import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"

export const fetchRecipes = async () => {
    try {
        const jwt = Cookies.get("jwtNutrifyS")

        if (!jwt) {
            toast.error("You are not authenticated.")
            return
        }

        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/recipes?populate=Ingredients`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            },
        )

        toast.success("Recipes fetched successfully.")

        return res.data

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown | any) {
        console.error(error)

        if (error.response?.status === 403) {
            toast.error("Access forbidden. You might not have permission.")
        } else if (error.response?.status === 401) {
            toast.error("Unauthorized. Please log in again.")
        } else {
            toast.error("Failed to fetch recipes.")
        }

        return null
    }
}
