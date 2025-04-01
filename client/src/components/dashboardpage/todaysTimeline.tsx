"use client"

import React, { useState, useEffect } from "react"
import ParametarsIcon from "../util/ParametarsIcon"

import { DailyPlan } from "@/app/api/mealsTest/route"
import { Meal, MealType, Training } from "@/app/api/mealsTest/route"
import SingleActivityFromTimeline from "./singleActivityFromTimeline"

type TodaysTimelineProps = {
    todaysActivity: DailyPlan | null
    totalCalories?: number
    totalProteins?: number
    totalFats?: number
    totalCarbohydrates?: number
}

export type ActivityType =
    | { type: "meal"; meal: Meal; mealType: MealType; time: string }
    | { type: "training"; training: Training; time: string }

const TodaysTimeline: React.FC<TodaysTimelineProps> = ({
    todaysActivity,
    totalCarbohydrates = 0,
    totalCalories = 0,
    totalFats = 0,
    totalProteins = 0,
}) => {
    console.log(todaysActivity, "Acrivity")

    const [sortedTodaysActivities, setSortedTodaysActivities] = useState<
        ActivityType[]
    >([])

    useEffect(() => {
        if (!todaysActivity) return

        const activities = [
            ...(todaysActivity?.mealPlan?.map((meal) => ({
                type: "meal" as const,
                ...meal,
            })) || []),
            ...(todaysActivity?.trainingPlan?.map((training) => ({
                type: "training" as const,
                ...training,
            })) || []),
        ]

        const sorted = activities.sort(
            (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
        )
        setSortedTodaysActivities(sorted)
    }, [todaysActivity])

    //console.log(sortedTodaysActivities, "sorted")

    if (!todaysActivity || sortedTodaysActivities.length === 0) {
        return (
            <div className="bg-White shadow-Combined font-Poppins flex min-h-[300px] flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] text-black">
                <p>No upcoming Activities.</p> {/* UI for no activities */}
            </div>
        )
    }

    return (
        <div className="bg-White shadow-Combined font-Poppins flex min-h-[300px] w-full flex-col gap-8 rounded-xl px-[20px] py-[17px] text-black">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h3 className="text-DarkGreen text-xl font-medium">
                        Today Timeline
                    </h3>
                    <h4 className="text-sm font-normal text-[#757575]">
                        Lorem ipsum dolor sit amet
                    </h4>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:flex-row-reverse md:grid-cols-5">
                    <div className="flex flex-row items-center md:justify-end">
                        <ParametarsIcon
                            parametarName={"Calories"}
                            iconSize={14}
                            containerSize={24}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalCalories ?? 0}kcal
                        </p>
                    </div>
                    <div className="flex flex-row items-center md:justify-end">
                        <ParametarsIcon
                            parametarName={"Proteins"}
                            iconSize={14}
                            containerSize={24}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalProteins ?? 0}g
                        </p>
                    </div>
                    <div className="flex flex-row items-center md:justify-end">
                        <ParametarsIcon
                            parametarName={"Fats"}
                            iconSize={14}
                            containerSize={24}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalFats ?? 0}g
                        </p>
                    </div>
                    <div className="flex flex-row items-center md:justify-end">
                        <ParametarsIcon
                            parametarName={"Carbohydrates"}
                            iconSize={14}
                            containerSize={24}
                        />
                        <p className="ml-2 text-sm font-medium text-[#2D3748]">
                            {totalCarbohydrates ?? 0}g
                        </p>
                    </div>
                    <div className="flex flex-row items-center md:justify-end">
                        <p className="text-lg font-medium text-[#757575]">
                            Total
                        </p>
                    </div>
                </div>
            </div>
            <div className="custom-scrollbar flex snap-x flex-row gap-x-6 overflow-x-scroll whitespace-nowrap">
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
