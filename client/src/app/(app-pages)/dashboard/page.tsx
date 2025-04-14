"use server"

import TodaysFoodInteake from "@/components/dashboardpage/todaysFoodIntakes"
import Header from "@/components/util/AppHeader"
import SideMenu from "@/components/util/SideMenu"
import React from "react"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DailyPlan, Meal, MealType, Training } from "@/app/api/mealsTest/route"

import AppContainer from "../../../components/util/AppContainer"
import YourNextMeal from "@/components/dashboardpage/yourNextMeal"
import YourNextTraining from "@/components/dashboardpage/yourNextTraining"
import TodaysTimeline from "@/components/dashboardpage/todaysTimeline"
import {
    mealsSortedByTime,
    trainingSortedByTime,
} from "@/utils/activitySortByTime"
import GrocerysForNextMeal from "@/components/dashboardpage/grocerysForNextMeal"

const DashboardPage: React.FC = async () => {
    const {userId} = await auth()

    if (!userId) {
        redirect("/login")
    }

    //no database using my json

    const res = await fetch("http://localhost:3000/api/mealsTest")
    const personActivites: DailyPlan[] = await res.json()

    const personActivitiesForId = personActivites.find(
        (activity) => activity.personId === 11,
    )
    //wont need this when i fetch just logein user data
    //We don't need to create a UI for 'no user found' since this section is only accessible to registered and logged-in users.

    let totalCalories: number = 0
    let totalProteins: number = 0
    let totalFats: number = 0
    let totalCarbohydrates: number = 0

    //console.log(personActivitiesForId)

    if (personActivitiesForId) {
        personActivitiesForId.mealPlan.forEach((entry) => {
            if ("meal" in entry) {
                totalCalories += entry.meal.calories
                totalProteins += entry.meal.proteins
                totalFats += entry.meal.fats
                totalCarbohydrates += entry.meal.carbohydrates
            }
        })
    }

    let nextTraining: { training: Training; time: string } | null = null
    if (personActivitiesForId?.trainingPlan) {
        nextTraining = trainingSortedByTime(personActivitiesForId?.trainingPlan)
    }

    let nextMeal: { meal: Meal; mealType: MealType; time: string } | null = null
    if (personActivitiesForId?.mealPlan) {
        nextMeal = mealsSortedByTime(personActivitiesForId?.mealPlan)
    }

    const sortedActivities = [
        ...(personActivitiesForId?.mealPlan?.map((meal) => ({
            type: "meal" as const,
            ...meal,
        })) || []),
        ...(personActivitiesForId?.trainingPlan?.map((training) => ({
            type: "training" as const,
            ...training,
        })) || []),
    ].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())

    //console.log(sortedActivities)
    //console.log(nextMeal)
    //console.log(nextTraining)
    //console.log(personActivitiesForId)

    return (
        <div className="h-screen w-full bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            <div className="bg-[#FAF9F6] pt-[100px] pb-10">
                <AppContainer>
                    <div className="flex flex-col gap-6">
                   <div className="flex flex-col gap-2 text-black">
                <h2 className="text-DarkGreen font-Poppins text-2xl font-medium">
                    Hi, username
                </h2>
                <p className="text-lg font-normal text-[#757575]">
                    Lorem ipsum dolor sit amet
                </p>
            </div>
                        <TodaysFoodInteake
                            totalCalories={totalCalories}
                            totalProteins={totalProteins}
                            totalCarbohydrates={totalCarbohydrates}
                            totalFats={totalFats}
                        />
                        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-5 lg:grid-rows-1">
                            <div className="h-full w-full lg:col-span-3">
                                <YourNextMeal nextMealProp={nextMeal} />
                            </div>
                            <div className="h-full w-full lg:col-span-2">
                                <YourNextTraining
                                    nextTrainingProp={nextTraining}
                                />
                            </div>
                        </div>
                        <TodaysTimeline
                            todaysActivityProps={sortedActivities}
                            totalCalories={totalCalories}
                            totalProteins={totalProteins}
                            totalCarbohydrates={totalCarbohydrates}
                            totalFats={totalFats}
                        />
                        <GrocerysForNextMeal />
                    </div>
                </AppContainer>
            </div>
        </div>
    )
}

export default DashboardPage