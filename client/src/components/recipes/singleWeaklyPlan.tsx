//import { useState } from "react"
import { WeaklyPlan } from "./recipedClientWrapper"

type SingleWeaklyPlanProp = {
    weaklyPlan: WeaklyPlan | undefined
}

const SingleWeaklyPlan: React.FC<SingleWeaklyPlanProp> = ({ weaklyPlan }) => {
    if (!weaklyPlan || !weaklyPlan.meals) return null

    //const [selectedMealType, setSelectedMealType] = useState<MealType | null>(
       // null,
    //)

    //const filteredMeals = selectedMealType

    let totalCalories = 0
    let totalFats = 0
    //let totalProteins = 0
    //let totalCarbohydrates = 0

    const mealEntries = Object.entries(weaklyPlan.meals)

    mealEntries.forEach(([_,meals]) => {
        console.log(_)
        meals.forEach((meal) => {
            totalCalories += meal.recipe.calories
            totalFats += meal.recipe.fats
            //totalProteins += meal.recipe.proteins
            //totalCarbohydrates += meal.recipe.carbohydrates
        })
    })

    return (
        <div className="shadow-Combined font-Poppins flex h-full cursor-pointer flex-col justify-between gap-[10px] rounded-xl bg-[#FFFFFF] p-[24px] text-black">
            <div className="mb-4">
                <h3 className="text-DarkGreen text-lg font-bold">
                    Total Nutrition for the Week
                </h3>
                <p>Calories: {totalCalories}</p>
                <p>Fats: {totalFats}g</p>
            </div>
        </div>
    )
}

export default SingleWeaklyPlan
