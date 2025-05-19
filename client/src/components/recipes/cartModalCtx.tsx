// context/CartModalContext.tsx
"use client"
import { createContext, useContext, useState } from "react"
import { Recipe } from "@/utils/types"

type mealPlaned = 
{
  meal:Recipe
  dateWhenPlanned: Date
}
type CartModalContextType = {
    cartModalIsOpen: boolean
    //selectedMeal: Meal | null
    openModal: () => void
    closeModal: () => void
    mealsInPlan: mealPlaned[]
    addMealToPlan: (meal: Recipe) => void
    removeMealFromPlan: (mealId:  number)=> void
    updateMealDate: (index: number, newDate: Date) => void
    resetCart: () => void
    openSearchModal: () => void
    closeSearchModal: () => void
    searchModalIsOpen: boolean
    searchTerm: string
    handleSearchTermChange: (term: string) => void
}

const CartModalContext = createContext<CartModalContextType | undefined>(undefined)

export const CartModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartModalIsOpen, setCartModalIsOpen] = useState(false)
    //const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null)
    const [mealsInPlan, setMealsInPlan] = useState<mealPlaned[]>([])

    const [searchModalIsOpen, setSearchModalIsOpen] = useState(false)

    const [searchTerm, setSearchTerm] = useState("")

    const handleSearchTermChange = (term: string) => {
        setSearchTerm(term)
    }

    const openSearchModal = () => {
        setSearchModalIsOpen(true)}
    const closeSearchModal = () => {
        setSearchModalIsOpen(false)}

    const openModal = () => {
        setCartModalIsOpen(true)
    }

    const closeModal = () => {
        setCartModalIsOpen(false)
    }

    const resetCart = () => {
      setMealsInPlan([])
    }

    const addMealToPlan =(meal:Recipe)=>{
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
        <CartModalContext.Provider value={{ cartModalIsOpen,  openModal, closeModal, mealsInPlan,resetCart, addMealToPlan, removeMealFromPlan, updateMealDate, openSearchModal, closeSearchModal, searchModalIsOpen, searchTerm, handleSearchTermChange }}>
            {children}
        </CartModalContext.Provider>
    )
}

export const useCartModal = () => {
    const context = useContext(CartModalContext)
    if (!context) throw new Error("useCartModal must be used within CartModalProvider")
    return context
}
