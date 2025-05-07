"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { WeaklyPlan } from "./recipedClientWrapper"
import ParametarsIcon from "../util/ParametarsIcon"

import avatarImage from "../../../public/avatarImage.jpeg"
import { ForkKnife } from "@phosphor-icons/react"

type ModalProp = {
    weaklyPlan: WeaklyPlan
    closeModal: () => void
    authorAvatar: string | undefined
    totalCalories: number
    totalFats: number
    totalProteins: number
    totalCarbohydrates: number
}

const MealPlanModal: React.FC<ModalProp> = ({
    weaklyPlan,
    closeModal,
    authorAvatar,
    totalCalories,
    totalCarbohydrates,
    totalFats,
    totalProteins,
}) => {
    const [selectedMealType, setSelectedMealType] =
        useState<string>("breakfast")

    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    useEffect(() => {
        setIsOpening(true)
    }, [])

    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                setIsOpening(false)
            }, 500)
        }
    }, [isClosing])

    const allMeals = Object.entries(weaklyPlan.meals).flatMap(([day, meals]) =>
        meals.map((meal) => ({ ...meal, day })),
    )

    const filteredMeals = selectedMealType
        ? allMeals.filter((meal) => meal.mealType === selectedMealType)
        : allMeals

    const handleCloseModal = () => {
        setIsClosing(true)
        setTimeout(() => {
            closeModal()
        }, 500)
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal()
        }
    }

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(weaklyPlan, "weakly plan i will post")

        handleCloseModal()
    }

    return (
        <form onSubmit={submitHandler}>
            <div
                onClick={handleBackdropClick}
                className="font-Poppins fixed inset-0 z-40 flex items-end justify-center bg-[#00000035] backdrop-blur-xs md:items-center"
            >
                <div
                    className={`relative z-50 flex max-h-screen w-full max-w-[1000px] flex-col gap-[32px] overflow-y-scroll rounded-t-xl rounded-b-none bg-white px-[32px] py-[24px] transition-all duration-500 md:h-[80vh] md:max-h-[80vh] md:w-[80vw] md:rounded-xl ${
                        isClosing
                            ? "translate-y-full opacity-0"
                            : isOpening
                              ? "translate-y-0 opacity-100"
                              : "translate-y-full opacity-0"
                    }`}
                >
                    <div className="flex flex-col justify-between gap-6">
                        <div className="flex flex-row justify-between">
                            <h2 className="text-DarkGreen text-2xl font-medium">
                                {weaklyPlan.title ?? "Weakly plan"}
                            </h2>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="text-xl font-bold text-gray-500 hover:text-red-600"
                                aria-label="Close modal"
                            >
                                ×
                            </button>
                        </div>
                        <p className="text-sm leading-[140%] font-normal text-[#A0AEC0]">
                            {weaklyPlan.description
                                ? weaklyPlan.description
                                : "Description of your meal..."}
                        </p>
                        <div className="flex flex-row items-center gap-4">
                            <div className="h-[32px] w-[32px] overflow-clip rounded-full">
                                <Image
                                    src={
                                        authorAvatar &&
                                        authorAvatar.trim() !== ""
                                            ? authorAvatar
                                            : avatarImage
                                    }
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
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-sm font-medium text-[#757575]">
                            Meal Type:
                        </p>
                        <select
                            onChange={(e) =>
                                setSelectedMealType(e.target.value)
                            }
                            value={selectedMealType}
                            className="text-DarkGreen w-30 text-xl font-medium focus:ring-0 focus:outline-none"
                        >
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                    </div>
                    {filteredMeals.map((meal, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col gap-7 md:flex-row"
                        >
                            <div className="relative h-[190px] w-full overflow-clip rounded-xl md:w-1/3">
                                {meal.recipe.image ? (
                                    <Image
                                        src={meal.recipe.image}
                                        alt={meal.recipe.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-[190px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                                        <ForkKnife
                                            color="#00000033"
                                            size={80}
                                        />
                                    </div>
                                )}
                            </div>
                            <div className="flex h-full w-full flex-col justify-between gap-2 md:w-2/3">
                                <h2 className="text-DarkGreen text-xl font-medium">
                                    {meal.recipe.name ?? "Meal name"}
                                </h2>
                                <p className="text-sm leading-[140%] font-normal text-[#A0AEC0]">
                                    {meal.recipe.description
                                        ? meal.recipe.description.length > 200
                                            ? meal.recipe.description.slice(
                                                  0,
                                                  200,
                                              ) + "..."
                                            : meal.recipe.description
                                        : "Description of your meal..."}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-row items-center">
                                        <ParametarsIcon
                                            parametarName={"Calories"}
                                            iconSize={14}
                                            containerSize={24}
                                        />
                                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                            {meal?.recipe?.calories ?? 0}kcal
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <ParametarsIcon
                                            parametarName={"Proteins"}
                                            iconSize={14}
                                            containerSize={24}
                                        />
                                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                            {meal?.recipe?.proteins ?? 0}g
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <ParametarsIcon
                                            parametarName={"Fats"}
                                            iconSize={14}
                                            containerSize={24}
                                        />
                                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                            {meal?.recipe?.fats ?? 0}g
                                        </p>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <ParametarsIcon
                                            parametarName={"Carbohydrates"}
                                            iconSize={14}
                                            containerSize={24}
                                        />
                                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                            {meal?.recipe?.carbohydrates ?? 0}g
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="flex-grow border-t border-[#b7b7b7]"></div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            onClick={() => handleCloseModal()}
                            className="bg-LightGreen flex w-full justify-center rounded px-4 py-2 text-white md:w-1/4"
                        >
                            Add Plan +
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default MealPlanModal
