"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { Training } from "@/app/api/mealsTest/route"

type TrainingCtxContextType = {
    nextTraining: { training: Training; time: string } | null
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
    updateTraining: (updated: Training, updatedTime: string) => void
    setNextTraining: (training: Training[], time: string) => void
}

const TrainingContext = createContext<
    TrainingCtxContextType | undefined
>(undefined)

export const TrainingCtxProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const [nextTraining, setNextTraining] = useState<{
        training: Training
        time: string
    } | null>(null)
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const updateTraining = (updated: Training, updatedTime: string) => {
        setNextTraining((prev) => {
            console.log(prev, "prev")
            console.log(updated, "updated")

            if (!prev) {
                return { training: updated, time: updatedTime } // Initialize state if it's null
            }

            // Merge the existing training state with the updated one
            return {
                ...prev,
                training: {
                    ...prev.training, // Preserve previous training data
                    ...updated, // Override with the updated data
                },
                time: updatedTime || prev.time, // Keep previous time if not updated
            }
        })
    }

    const setNextTrainingWrapper = (trainings: Training[], time: string) => {
        if (trainings.length > 0) {
            setNextTraining({ training: trainings[0], time })
        } else {
            setNextTraining(null)
        }
    }

    return (
        <TrainingContext.Provider
            value={{
                nextTraining,
                isOpen,
                openModal,
                closeModal,
                updateTraining,
                setNextTraining: setNextTrainingWrapper,
            }}
        >
            {children}
        </TrainingContext.Provider>
    )
}

export const useTrainingCtx = () => {
    const context = useContext(TrainingContext)
    if (!context) {
        throw new Error(
            "useTrainingModal must be used within a TrainingModalProvider",
        )
    }
    return context
}
