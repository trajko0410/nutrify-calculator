//import { useState } from "react"
import { useEffect, useState } from "react"
import ParametarsIcon from "../util/ParametarsIcon"
import { WeaklyPlan } from "./recipedClientWrapper"
import { Author } from "./singleMealPlan"
import Image from "next/image"

import avatarImage from "../../../public/avatarImage.jpeg"
import MealPlanModal from "./mealPlanModal"

type SingleWeaklyPlanProp = {
    weaklyPlan: WeaklyPlan | undefined
}

const authorFetch = { id: "23", name: "Filip", image: "" }

const SingleWeaklyPlan: React.FC<SingleWeaklyPlanProp> = ({ weaklyPlan }) => {
    const [author, setAuthor] = useState<Author | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    //FETCH AUTHOR BY HIS ID
    useEffect(() => {
        setAuthor(authorFetch)
    }, [weaklyPlan?.authorId])

    if (!weaklyPlan || !weaklyPlan.meals) return null

    //const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
    // null,
    //)

    //const filteredMeals = selectedMealType

    let totalCalories = 0
    let totalFats = 0
    let totalProteins = 0
    let totalCarbohydrates = 0

    const mealEntries = Object.entries(weaklyPlan.meals)

    mealEntries.forEach(([, meals]) => {
        meals.forEach((meal) => {
            totalCalories += meal.recipe.calories / 7
            totalFats += meal.recipe.fats / 7
            totalProteins += meal.recipe.proteins / 7
            totalCarbohydrates += meal.recipe.carbohydrates / 7
        })
    })

    return (
        <>
            <div className="shadow-Combined font-Poppins flex h-full cursor-pointer flex-col justify-between gap-[24px] rounded-xl bg-[#FFFFFF] p-[24px] text-black">
                <h2 className="text-DarkGreen text-xl font-medium">
                    {weaklyPlan.title ?? "Weakly plan"}
                </h2>
                <p className="min-h-[140px] text-sm leading-[140%] font-normal text-[#A0AEC0]">
                    {weaklyPlan.description
                        ? weaklyPlan.description.length > 255
                            ? weaklyPlan.description.slice(0, 255) + "..."
                            : weaklyPlan.description
                        : "Description of your meal..."}
                </p>
                <div className="flex flex-row items-center gap-4">
                    <div className="h-[32px] w-[32px] overflow-clip rounded-full">
                        <Image
                            src={author?.image ? author.image : avatarImage}
                            alt={"author image"}
                            width={32}
                            height={32}
                        ></Image>
                    </div>
                    <p className="text-lg font-medium text-[#2D3748]">
                        {weaklyPlan.authorName}
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Calendar"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {weaklyPlan.days ?? "7"} Days of{" "}
                            {weaklyPlan.mealsPerDay ?? "3"} Meals
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Calories"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalCalories.toFixed() ?? 0} +kcal/Day
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Proteins"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalProteins.toFixed() ?? 0} g/Day
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Fats"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalFats.toFixed() ?? 0} g/Day
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Carbohydrates"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalCarbohydrates.toFixed() ?? 0} g/Day
                        </p>
                    </div>
                </div>
                <div className="my-2 h-[1px] w-full bg-[#D9D9D9]"></div>

                <div className="flex flex-row justify-between gap-6">
                    <button
                        onClick={handleOpenModal}
                        className="text-DarkGreen flex h-[40px] w-1/3 items-center justify-center rounded-lg bg-[#EEEBDA] px-[24px] py-[8px] text-sm"
                    >
                        View Plan
                    </button>
                    <button
                        className="bg-LightGreen flex h-[40px] w-1/3 items-center justify-center rounded-lg px-[24px] py-[8px] text-sm text-[#FFFFFF]"
                        onClick={() =>
                            console.log(
                                "Post this Current meals:",
                                weaklyPlan.meals,
                            )
                        }
                    >
                        Add Meall +
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <MealPlanModal
                    weaklyPlan={weaklyPlan}
                    closeModal={handleCloseModal}
                    authorAvatar={author?.image}
                    totalCalories={totalCalories ?? 0}
                    totalFats={totalFats ?? 0}
                    totalProteins={totalProteins ?? 0}
                    totalCarbohydrates={totalCarbohydrates ?? 0}
                ></MealPlanModal>
            )}
        </>
    )
}

export default SingleWeaklyPlan
