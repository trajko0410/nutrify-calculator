import { ForkKnife } from "@phosphor-icons/react"
import { Meal } from "./recipedClientWrapper"
import Image from "next/image"

//import nekaslika from "../../../public/picture1.png"
import ParametarsIcon from "../util/ParametarsIcon"
import { useEffect, useState } from "react"

import avatarImage from "../../../public/avatarImage.jpeg"
import { useCartModal as useCartModalCtx } from "./cartModalCtx"


type SingleMealPlanProp = {
    mealInfo: Meal
}

export type Author = {
    id: string
    name: string
    image: string
}

const authorFetch = { id: "23", name: "Filip", image: "" }

const SingleMealPlan: React.FC<SingleMealPlanProp> = ({ mealInfo }) => {
    const { addMealToPlan } = useCartModalCtx()

    const [author, setAuthor] = useState<Author | null>(null)

    //FETCH AUTHOR BY HIS ID
    useEffect(() => {
        setAuthor(authorFetch)
    }, [mealInfo.recipe.authorUserId])

    return (
        <div className="shadow-Combined font-Poppins flex h-full cursor-pointer flex-col justify-between gap-[10px] rounded-xl bg-[#FFFFFF] p-[24px] text-black">
            <div className="relative h-[190px] w-full overflow-clip rounded-xl">
                {mealInfo.recipe.image ? (
                    <Image
                        src={mealInfo.recipe.image}
                        alt={mealInfo.recipe.name}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="flex h-[190px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                        <ForkKnife color="#00000033" size={80} />
                    </div>
                )}

                {/* Slika autora u desnom gornjem kutu unutar slike obroka */}
                {author && (
                    <div className="absolute top-2 right-2 h-10 w-10 overflow-hidden rounded-full border-2 border-white">
                        <Image
                            src={author.image ? author.image : avatarImage}
                            alt={author.name}
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                )}
            </div>
            <h2 className="text-DarkGreen text-xl font-medium">
                {mealInfo.recipe.name ?? "Recipe Name"}
            </h2>
            <p className="min-h-[140px] text-sm leading-[140%] font-normal text-[#A0AEC0]">
                {mealInfo.recipe.description
                    ? mealInfo.recipe.description.length > 255
                        ? mealInfo.recipe.description.slice(0, 255) + "..."
                        : mealInfo.recipe.description
                    : "Description of your meal..."}
            </p>
            <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-row items-center">
                    <ParametarsIcon
                        parametarName={"Calories"}
                        iconSize={14}
                        containerSize={24}
                    />
                    <p className="ml-2 text-sm font-medium text-[#2D3748]">
                        {mealInfo?.recipe?.calories ?? 0}kcal
                    </p>
                </div>
                <div className="flex flex-row items-center">
                    <ParametarsIcon
                        parametarName={"Proteins"}
                        iconSize={14}
                        containerSize={24}
                    />
                    <p className="ml-2 text-sm font-medium text-[#2D3748]">
                        {mealInfo?.recipe?.proteins ?? 0}g
                    </p>
                </div>
                <div className="flex flex-row items-center">
                    <ParametarsIcon
                        parametarName={"Fats"}
                        iconSize={14}
                        containerSize={24}
                    />
                    <p className="ml-2 text-sm font-medium text-[#2D3748]">
                        {mealInfo?.recipe?.fats ?? 0}g
                    </p>
                </div>
                <div className="flex flex-row items-center">
                    <ParametarsIcon
                        parametarName={"Carbohydrates"}
                        iconSize={14}
                        containerSize={24}
                    />
                    <p className="ml-2 text-sm font-medium text-[#2D3748]">
                        {mealInfo?.recipe?.carbohydrates ?? 0}g
                    </p>
                </div>
            </div>
            <div className="my-2 h-[1px] w-full bg-[#D9D9D9]"></div>
            <button className="bg-LightGreen flex h-[40px] w-full items-center justify-center rounded-lg px-[24px] py-[8px] text-sm text-[#FFFFFF]" onClick={()=>addMealToPlan(mealInfo)}>
                Add Meall +
            </button>
        </div>
    )
}

export default SingleMealPlan
