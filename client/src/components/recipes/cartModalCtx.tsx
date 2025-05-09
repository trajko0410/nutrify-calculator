// context/CartModalContext.tsx
"use client"
import { createContext, useContext, useState } from "react"
import { Meal } from "./recipedClientWrapper"

type mealPlaned = 
{
  meal:Meal
  dateWhenPlanned: Date
}
type CartModalContextType = {
    cartModalIsOpen: boolean
    //selectedMeal: Meal | null
    openModal: () => void
    closeModal: () => void
    mealsInPlan: mealPlaned[]
    addMealToPlan: (meal: Meal) => void
    removeMealFromPlan: (mealId:  number)=> void
    updateMealDate: (index: number, newDate: Date) => void
    resetCart: () => void
}

const CartModalContext = createContext<CartModalContextType | undefined>(undefined)

export const CartModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartModalIsOpen, setCartModalIsOpen] = useState(false)
    //const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
    const [mealsInPlan, setMealsInPlan] = useState<mealPlaned[]>([])


    const openModal = () => {
        setCartModalIsOpen(true)
    }

    const closeModal = () => {
        setCartModalIsOpen(false)
    }

    const resetCart = () => {
      setMealsInPlan([])
    }

    const addMealToPlan =(meal:Meal)=>{
      setMealsInPlan((prev)=> [...prev, { meal, dateWhenPlanned: new Date() }])
    }
    const removeMealFromPlan = (indexToRemove: number) => {
      setMealsInPlan((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      )
    }

    const updateMealDate = (index: number, newDate: Date) => {
      setMealsInPlan((prev) => {
        const updated = [...prev]
        updated[index] = { ...updated[index], dateWhenPlanned: newDate }
        return updated
      })
    }

    return (
        <CartModalContext.Provider value={{ cartModalIsOpen,  openModal, closeModal, mealsInPlan,resetCart, addMealToPlan, removeMealFromPlan, updateMealDate }}>
            {children}
        </CartModalContext.Provider>
    )
}

export const useCartModal = () => {
    const context = useContext(CartModalContext)
    if (!context) throw new Error("useCartModal must be used within CartModalProvider")
    return context
}
