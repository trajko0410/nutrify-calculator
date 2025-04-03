"use client"

import { Meal, MealType } from "@/app/api/mealsTest/route"
import { useState, useEffect } from "react"
import ParametarsIcon from "../util/ParametarsIcon"
import Link from "next/link"
import { ForkKnife, ArrowDown } from "@phosphor-icons/react"
import Image from "next/image"

//import slika from "../../../public/work2.png"

type YourNextMealsProps = {
    nextMealProp: { meal: Meal; mealType: MealType; time: string } | undefined | null
}

const YourNextMeal: React.FC<YourNextMealsProps> = ({ nextMealProp }) => {
    const [nextMeal, setNextMeal] = useState<{
        meal: Meal
        mealType: MealType
        time: string
    } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!nextMealProp) {
            setLoading(false)
            return
        }
        //console.log(meal, "dsfas")

        setNextMeal(nextMealProp)
        setLoading(false)
    }, [nextMealProp])

    //console.log(nextMeal)

    if (loading) {
        return (
            <div className="bg-White shadow-Combined h-full font-Poppins flex min-h-[200px] flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] text-black md:flex-row">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!nextMeal) {
        return (
            <div className="bg-White shadow-Combined h-full font-Poppins flex min-h-[200px] flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] text-black md:flex-row">
                <p>No upcoming meal found.</p> {/* UI for no meals */}
            </div>
        )
    }

    return (
        <div className="bg-White shadow-Combined font-Poppins flex h-full flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] md:flex-row-reverse">
            <div className="flex w-full items-center justify-center md:w-2/5">
                {!nextMeal?.meal?.image ? (
                    <div className="flex h-[265px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                        <ForkKnife color="#00000033" size={80}></ForkKnife>
                    </div>
                ) : (
                    <div className="relative h-[265px] w-full overflow-clip rounded-xl">
                        <Image
                            src={nextMeal?.meal?.image}
                            alt={nextMeal.meal.name}
                            fill
                            className="overflow-cover object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex w-full flex-col justify-between gap-6 md:w-3/5">
                <div className="flex flex-col gap-[6px]">
                    <h3 className="text-xs leading-[150%] font-medium text-[#A0AEC0]">
                        Your Next Meal
                    </h3>
                    <h3 className="text-lg leading-[140%] font-medium text-[#2D3748]">
                        {nextMeal.meal?.name ? nextMeal.meal.name : "Next Meal"}
                    </h3>
                    <p className="text-sm leading-[140%] font-normal text-[#A0AEC0]">
                        {nextMeal.meal.description
                            ? nextMeal.meal.description.length > 255
                                ? nextMeal.meal.description.slice(0, 255) +
                                  "..."
                                : nextMeal.meal.description
                            : "Description of your meal..."}
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Calories"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-base font-medium text-[#2D3748]">
                            {nextMeal?.meal?.calories ?? 0}kcal
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Proteins"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-base font-medium text-[#2D3748]">
                            {nextMeal?.meal?.proteins ?? 0}g
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Fats"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-base font-medium text-[#2D3748]">
                            {nextMeal?.meal?.fats ?? 0}g
                        </p>
                    </div>
                    <div className="flex flex-row items-center">
                        <ParametarsIcon
                            parametarName={"Carbohydrates"}
                            iconSize={18}
                            containerSize={32}
                        />
                        <p className="ml-2 text-base font-medium text-[#2D3748]">
                            {nextMeal?.meal?.carbohydrates ?? 0}g
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <p className="text-lg leading-[140%] font-medium text-[#2D3748]">
                        {nextMeal?.time
                            ? new Date(nextMeal.time).toLocaleTimeString(
                                  "en-US",
                                  {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                  },
                              )
                            : "No time available"}
                    </p>
                    <p className="flex flex-row items-center justify-center gap-2 text-xs leading-[150%] font-normal text-[#2D3748]">
                        <Link href={`/singlefood/${nextMeal?.meal.id}`}>Read More</Link>
                        <ArrowDown
                            color="black"
                            size="12"
                            className="rotate-270"
                        />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default YourNextMeal
