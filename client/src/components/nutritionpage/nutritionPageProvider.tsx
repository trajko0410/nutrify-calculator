"use client"
import { Meal, WaterConsumption } from "@/app/api/mealsTest/route"
import { createContext, useContext, useState, ReactNode } from "react"
import { MealType } from "@/app/enum/enums"

type NutritionPageCtxType = {
    meals: { meal: Meal; time: string; mealType: MealType }[] | null
    setMeals: (
        meals: { meal: Meal; time: string; mealType: MealType }[] | null,
    ) => void
    waterConsumption: WaterConsumption | null
    setWaterConsumption: (waterConsumption: WaterConsumption | null) => void
    selectedDate: Date
    setSelectedDate: (date: Date) => void
    addMealModalOpen: boolean
    handleCloseCreateMealModal: () => void
    handleOpenCreateMealModal: () => void
    userSubscribed: boolean
    setUserSubscribed: (subscribed: boolean) => void
}

const NutritionPageContext = createContext<NutritionPageCtxType | undefined>(
    undefined,
)

export const NutritionPageCtxProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [meals, setMeals] = useState<
        { meal: Meal; mealType: MealType; time: string }[] | null
    >(null)
    //console.log(meals, "meals")

    const [waterConsumption, setWaterConsumption] =
        useState<WaterConsumption | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())

    const [addMealModalOpen, setAddMealModalOpen] = useState(false)

    const [userSubscribed, setUserSubscribed] = useState(false)

    const handleCloseCreateMealModal = () => {  
        setAddMealModalOpen(false)
    }   

    const handleOpenCreateMealModal = () => {
        setAddMealModalOpen(true)
    }

    console.log(meals, "meals")
    return (
        <NutritionPageContext.Provider
            value={{
                meals,
                setMeals,

                waterConsumption,
                setWaterConsumption,

                selectedDate,
                setSelectedDate,

                addMealModalOpen,
                handleCloseCreateMealModal,
                handleOpenCreateMealModal,

                userSubscribed,
                setUserSubscribed,
            }}
        >
            {children}
        </NutritionPageContext.Provider>
    )
}

export const useNutritionPageCtx = () => {
    const context = useContext(NutritionPageContext)
    if (context === undefined) {
        throw new Error("useMealCtx must be used within a MealCtxProvider")
    }
    return context
}
