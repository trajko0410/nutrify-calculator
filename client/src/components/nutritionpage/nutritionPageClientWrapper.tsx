"use client"

import { useEffect } from "react"
import TodaysFoodInteake from "../dashboardpage/todaysFoodIntakes";
import WaterConsumption from "./waterConsumption";
import DatePicker from "./datePicker";
import { DailyPlan } from "@/app/api/mealsTest/route";
import { useNutritionPageCtx } from "./nutritionPageProvider";
import MealTimeline from "./mealTimeline";
import MealVitamins from "./mealVitamins";

interface ActivitiesForIdClientWrapperProps {
    initialDailyPlanForId: DailyPlan[] | undefined
    userId: string
}

export default function NutritionPageClientWrapper({
    initialDailyPlanForId, userId
}: ActivitiesForIdClientWrapperProps) {
      const { setMeals, setWaterConsumption, selectedDate, setUserSubscribed} = useNutritionPageCtx()


//fetch user to see if userId is subscribed if or not
console.log(userId, "userId")


  useEffect(() => {
        if (initialDailyPlanForId) {
            setMeals(initialDailyPlanForId[0].mealPlan.map(({ meal, mealType, time }) => ({
                meal,
                mealType,
                time,
            })))
        }

        setUserSubscribed(true)


        if(initialDailyPlanForId?.[0]?.waterConsumption) {
            setWaterConsumption(initialDailyPlanForId[0].waterConsumption)
        }
    }, [initialDailyPlanForId, setMeals, setWaterConsumption, selectedDate, setUserSubscribed]) // UPDATE WHEN GET DATA FROM REAL API ON DATE CHANGE IT WILL BE IN PROVIDER
 

  

    return (
        <>
                <div className="flex flex-col-reverse gap-6 lg:flex-row">
                        <div className="flex w-full flex-col gap-6 lg:w-9/12">
                            <TodaysFoodInteake
                                glycemicIndex={40}
                                glycemicLoad={20}
                            />
                            <WaterConsumption waterConsumption={initialDailyPlanForId?.[0]?.waterConsumption ? [initialDailyPlanForId[0].waterConsumption] : null}/>
                            <MealTimeline />
                            <MealVitamins/>
                        </div>
                        <div className="flex w-full flex-col gap-6 lg:w-3/12">
                            <DatePicker />
                            <div className="shadow-Combined font-Poppins text-p-[10px] hidden min-h-[260px] w-full min-w-[200px] items-center justify-center gap-2 rounded-xl bg-[#FFFFFF] text-[#2D3748] lg:flex lg:h-fit">
                                Reklama
                            </div>
                        </div>
                    </div>

        </>
    )
}
