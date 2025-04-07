"use client"

import React, { useState, useEffect } from "react"
import ParametarsIcon from "../util/ParametarsIcon"

import { Meal, MealType, Training } from "@/app/api/mealsTest/route"
import SingleActivityFromTimeline from "./singleActivityFromTimeline"
import Link from "next/link"
import { Eraser } from "@phosphor-icons/react"
import SingleExercise from "../singleTraining/singleExercise"

type TodaysTimelineProps = {
    todaysActivityProps: ActivityType[]
    isTodayTimelineComponent: boolean

    totalCalories?: number
    totalProteins?: number
    totalFats?: number
    totalCarbohydrates?: number
    userId?: string | null
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
    isTodayTimelineComponent,
    userId = null,
}) => {
    const [sortedTodaysActivities, setSortedTodaysActivities] = useState<
        ActivityType[]
    >([])
    const [loading, setLoading] = useState(true)

    //console.log(sortedTodaysActivities, "sortedTodaysActivities")

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
            <div className="shadow-Combined font-Poppins flex min-h-[300px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!sortedTodaysActivities || sortedTodaysActivities.length === 0) {
        return (
            <div className="shadow-Combined font-Poppins flex min-h-[300px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
                <p>No upcoming Activities.</p> {/* UI for no activities */}
            </div>
        )
    }

    return (
        <div className="shadow-Combined font-Poppins flex min-h-[300px] w-full flex-col gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
            <div
                className={`flex flex-col justify-between gap-4 ${isTodayTimelineComponent ? "md:flex-row" : "sm:flex-row"} md:items-center`}
            >
                <div
                    className={`flex w-full flex-col gap-6 ${isTodayTimelineComponent ? "md:flex-row" : "sm:flex-row"} sm:justify-between`}
                >
                    <div>
                        <h3 className="text-DarkGreen text-xl font-medium">
                            {isTodayTimelineComponent
                                ? "Today Timeline"
                                : "Exercise"}
                        </h3>
                        <h4 className="text-sm font-normal text-[#757575]">
                            Lorem ipsum dolor sit amet
                        </h4>
                    </div>
                    {isTodayTimelineComponent && (
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
                    )}
                    {!isTodayTimelineComponent &&
                        sortedTodaysActivities[0]?.type === "training" &&
                        userId ===
                            sortedTodaysActivities[0]?.training
                                ?.authorUserId && (
                            <button className="bg-LightGreen flex flex-row items-center justify-center gap-4 rounded-lg p-3 text-sm leading-[140%] font-medium text-[#FFFFFF]">
                                <Link
                                    href={`/meal/${sortedTodaysActivities[0]?.training.id}`}
                                >
                                    Edit Exercises
                                </Link>
                                <Eraser color="white" size="16" />
                            </button>
                        )}
                </div>
            </div>
            <div className="custom-scrollbar flex snap-x flex-row gap-x-6 overflow-x-scroll scroll-smooth whitespace-nowrap">
                {isTodayTimelineComponent &&
                    sortedTodaysActivities.map(
                        (activity, index) => (
                            console.log(activity, "activity"),
                            (
                                <SingleActivityFromTimeline
                                    key={index}
                                    activity={activity}
                                ></SingleActivityFromTimeline>
                            )
                        ),
                    )}
                {!isTodayTimelineComponent &&
                    sortedTodaysActivities[0].type === "training" &&
                    sortedTodaysActivities[0].training?.exercises?.map(
                        (exercise, index) => {
                            console.log(exercise, "exercise")
                            return (
                                <SingleExercise
                                    key={exercise.id}
                                    index={index}
                                    exercise={exercise}
                                    trainingId = {
                                        sortedTodaysActivities[0].type === "training"
                                            ? sortedTodaysActivities[0].training.id : null}
                                ></SingleExercise>
                            )
                        },
                    )}
            </div>
        </div>
    )
}

export default TodaysTimeline
