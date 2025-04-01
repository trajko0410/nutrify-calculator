"use server"

import TodaysFoodInteake from "@/components/dashboardpage/todaysFoodIntakes"
import Header from "@/components/util/AppHeader"
import SideMenu from "@/components/util/SideMenu"
import React from "react"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DailyPlan } from "@/app/api/mealsTest/route"

import DashboardContainer from "../../../components/util/DashboardContainer"
import YourNextMeal from "@/components/dashboardpage/yourNextMeal"
import YourNextTraining from "@/components/dashboardpage/yourNextTraining"
import TodaysTimeline from "@/components/dashboardpage/todaysTimeline"

const DashboardPage: React.FC = async () => {
    const { userId } = await auth()

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

    console.log(personActivitiesForId)

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

    //console.log(personActivitiesForId)

    return (
        <div className="h-screen w-full bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            <div className="bg-[#FAF9F6] pt-[100px] pb-10">
                <DashboardContainer>
                    <TodaysFoodInteake
                        userName={personActivitiesForId?.name}
                        totalCalories={totalCalories}
                        totalProteins={totalProteins}
                        totalCarbohydrates={totalCarbohydrates}
                        totalFats={totalFats}
                    />
                    <div className="grid grid-cols-1 items-stretch gap-6 pt-6 lg:grid-cols-5 lg:grid-rows-1">
                        <div className="h-full w-full lg:col-span-3">
                            <YourNextMeal
                                nextMeals={personActivitiesForId?.mealPlan}
                            />
                        </div>
                        <div className="h-full w-full lg:col-span-2">
                            <YourNextTraining
                                nextTrainings={
                                    personActivitiesForId?.trainingPlan
                                }
                            />
                        </div>
                    </div>
                    <div className="pt-6">
                        <TodaysTimeline
                            todaysActivity={personActivitiesForId ?? null}
                            totalCalories={totalCalories}
                            totalProteins={totalProteins}
                            totalCarbohydrates={totalCarbohydrates}
                            totalFats={totalFats}
                        />
                    </div>
                </DashboardContainer>
            </div>
        </div>
    )
}

export default DashboardPage
