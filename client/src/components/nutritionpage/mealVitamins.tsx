"use client"

import { useEffect, useState } from "react"
import { useNutritionPageCtx } from "./nutritionPageProvider"



const MealVitamins = () => {
    const {meals} = useNutritionPageCtx()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!meals) {
            setLoading(false)
            return
        }
        //console.log(meal, "dsfas")

        //setNextMeal(nextMealProp)
        setLoading(false)
    }, [meals])

    if (loading) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!meals) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>No meal instructions found.</p> {/* UI for no meals */}
            </div>
        )
    }

    return (
        <div className="shadow-Combined font-Poppins flex h-full flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
            <div className="flex w-full gap-2 flex-col">
                <h3 className="text-DarkGreen text-xl font-normal">
                Meal vitamins
                </h3>
                <h4 className=" text-xs font-medium text-[#2D3748]">Lorem ipsum dolor sit amet</h4>
            </div>
           <p>Waiting for backend for meals and there vitamins so i could calculate evrything</p>
        </div>
    )
}

export default MealVitamins
