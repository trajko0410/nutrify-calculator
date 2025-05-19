"use client"

import { useEffect } from "react"
import { useTrainingCtx } from "./trainingProvider"
import { Training } from "@/app/api/mealsTest/route"
import TrainingEditModal from "./trainingEditModal"
import SingleTraining from "./singleTraining"
import EcerciseTimeline from "./exerciseTimeline"
import ExerciseEditModal from "./exerciseEditModal"
import SingeleExerciseModal from "./singleExerciseModal"


interface TrainingClientWrapperProps {
    initialTraining: { training: Training; time: string }
    userId: string
}

export default function TrainingClientWrapper({
    initialTraining,
    userId,
}: TrainingClientWrapperProps) {
    const { setNextTraining, nextTraining, isEditTrainingModalOpen, isEditExerciseModalOpen, isSingleExerciseModalOpen} = useTrainingCtx()

    useEffect(() => {
        if (
            !nextTraining ||
            nextTraining.training.id !== initialTraining.training.id
        ) {
            setNextTraining([initialTraining.training], initialTraining.time)
        }
    }, [setNextTraining, nextTraining, initialTraining.training, initialTraining.time])

    return (
        <>
            <div className="flex flex-col gap-6">
                <SingleTraining userId={userId} />
                <EcerciseTimeline
                    userId={userId}
                />
            </div>
            {isEditTrainingModalOpen && <TrainingEditModal />}
            {isEditExerciseModalOpen && <ExerciseEditModal />}
            {isSingleExerciseModalOpen && <SingeleExerciseModal/>}


        </>
    )
}
