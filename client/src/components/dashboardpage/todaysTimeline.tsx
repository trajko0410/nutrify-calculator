"use client"


import React, { useState, useEffect } from "react"
import ParametarsIcon from "../util/ParametarsIcon"

import { Meal, MealType, Training } from "@/app/api/mealsTest/route"
import SingleActivityFromTimeline from "./singleActivityFromTimeline"

type TodaysTimelineProps = {
    todaysActivityProps: ActivityType[]

    totalCalories?: number
    totalProteins?: number
    totalFats?: number
    totalCarbohydrates?: number
}

export type ActivityType =
    | { type: "meal"; meal: Meal; mealType: MealType; time: string }
    | { type: "training"; training: Training; time: string }

const TodaysTimeline: React.FC<TodaysTimelineProps> = ({
    todaysActivityProps,
    totalCarbohydrates = 0,
    totalCalories = 0,
    totalFats = 0,
    totalProteins = 0,
}) => {
    const [sortedTodaysActivities, setSortedTodaysActivities] = useState<
        ActivityType[]
    >([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!todaysActivityProps) {
            setLoading(false)
            return
        }

        setSortedTodaysActivities(todaysActivityProps)
        setLoading(false)
    }, [todaysActivityProps])

    //console.log(sortedTodaysActivities, "sorted")

    if (loading) {
        return (
            <div className="bg-[#FFFFFF] shadow-Combined font-Poppins flex min-h-[300px] flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] text-black">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!sortedTodaysActivities || sortedTodaysActivities.length === 0) {
        return (
            <div className="bg-[#FFFFFF] shadow-Combined font-Poppins flex min-h-[300px] flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] text-black">
                <p>No upcoming Activities.</p> {/* UI for no activities */}
            </div>
        )
    }

    return (
        <div className="bg-[#FFFFFF] shadow-Combined font-Poppins flex min-h-[300px] w-full flex-col gap-8 rounded-xl px-[20px] py-[17px] text-black">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex w-full flex-col gap-6 md:flex-row md:justify-between">
                    <div>
                        <h3 className="text-DarkGreen text-xl font-medium">
                            Today Timeline
                        </h3>
                        <h4 className="text-sm font-normal text-[#757575]">
                            Lorem ipsum dolor sit amet
                        </h4>
                    </div>
                    <div className="flex flex-col gap-2 md:flex-row-reverse">
                        <div className="flex flex-row items-center md:justify-end">
                            <p className="text-sm font-medium text-[#757575] md:pl-4 md:text-lg">
                                Total
                            </p>
                        </div>
                        <div className="grid-wrap grid grid-cols-2 gap-x-3 gap-y-2 md:flex">
                            <div className="flex flex-row items-center">
                                <ParametarsIcon
                                    parametarName={"Calories"}
                                    iconSize={14}
                                    containerSize={24}
                                />
                                <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                    {totalCalories ?? 0}kcal
                                </p>
                            </div>
                            <div className="flex flex-row items-center">
                                <ParametarsIcon
                                    parametarName={"Proteins"}
                                    iconSize={14}
                                    containerSize={24}
                                />
                                <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                    {totalProteins ?? 0}g
                                </p>
                            </div>
                            <div className="flex flex-row items-center">
                                <ParametarsIcon
                                    parametarName={"Fats"}
                                    iconSize={14}
                                    containerSize={24}
                                />
                                <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                    {totalFats ?? 0}g
                                </p>
                            </div>
                            <div className="flex flex-row items-center">
                                <ParametarsIcon
                                    parametarName={"Carbohydrates"}
                                    iconSize={14}
                                    containerSize={24}
                                />
                                <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                    {totalCarbohydrates ?? 0}g
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="custom-scrollbar scroll-smooth flex snap-x flex-row gap-x-6 overflow-x-scroll whitespace-nowrap">
                {sortedTodaysActivities.map((activity, index) => (
                    <SingleActivityFromTimeline
                        key={index}
                        activity={activity}
                    ></SingleActivityFromTimeline>
                ))}
            </div>
        </div>
    )
}

export default TodaysTimeline
