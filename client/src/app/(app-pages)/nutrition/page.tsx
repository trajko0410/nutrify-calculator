"use server"

import SideMenu from "@/components/util/SideMenu"
import Header from "@/components/util/AppHeader"

import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import DashboardContainer from "@/components/util/AppContainer"
import { DailyPlan } from "@/app/api/mealsTest/route"
import TodaysFoodInteake from "@/components/dashboardpage/todaysFoodIntakes"
import DatePicker from "@/components/nutritionpage/datePicker"
import WaterConsumption from "@/components/nutritionpage/waterConsumption"





export default async function NutritionPage() {
    const { userId } = await auth()

    if (!userId) {
        redirect("/login")
    }

    const res = await fetch("http://localhost:3000/api/mealsTest")
    const personActivites: DailyPlan[] = await res.json()

    const personActivitiesForId = personActivites.find(
        (activity) => activity.personId === 11,
    )

    //console.log(personActivitiesForId?.waterConsumption, "personActivites")

    //fetching data for user

 
    return (
        <div className="h-screen w-full bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            <div className="bg-[#FAF9F6] pt-[100px] pb-10">
                <DashboardContainer>
                    <h2 className="text-DarkGreen pb-6 text-xl font-medium">
                        Nutrition
                    </h2>
                    <div className="flex flex-col-reverse gap-6 lg:flex-row">
                        <div className="flex w-full flex-col gap-6 lg:w-9/12">
                            <TodaysFoodInteake
                                glycemicIndex={40}
                                glycemicLoad={20}
                            />
                            <WaterConsumption waterConsumption={personActivitiesForId?.waterConsumption ? [personActivitiesForId.waterConsumption] : null}/>
                        </div>
                        <div className="flex w-full flex-col gap-6 lg:w-3/12">
                            <DatePicker />
                            <div className="shadow-Combined font-Poppins text-p-[10px] hidden min-h-[260px] w-full min-w-[200px] items-center justify-center gap-2 rounded-xl bg-[#FFFFFF] text-[#2D3748] lg:flex lg:h-fit">
                                Reklama
                            </div>
                        </div>
                    </div>
                </DashboardContainer>
            </div>
        </div>
    )
}
