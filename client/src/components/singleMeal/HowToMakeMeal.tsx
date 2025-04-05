"use client"
import { ArrowDown } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

type HowToMakeMealProps = {
    videoInstructions: string | null | undefined
    mealInstructionProp:
        | {
              stepTitle?: string
              instructions?: string[]
          }[]
        | null
        | undefined
}

const HowToMakeMeal: React.FC<HowToMakeMealProps> = ({
    mealInstructionProp,
    videoInstructions,
}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!mealInstructionProp) {
            setLoading(false)
            return
        }
        //console.log(meal, "dsfas")

        //setNextMeal(nextMealProp)
        setLoading(false)
    }, [mealInstructionProp])

    if (loading) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!mealInstructionProp || mealInstructionProp?.length === 0) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>No meal instructions found.</p> {/* UI for no meals */}
            </div>
        )
    }

    return (
        <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
            <div className="flex w-full flex-row justify-between">
                <h3 className="text-DarkGreen text-xl font-normal">
                    Dish Preparation
                </h3>
                {videoInstructions && (
                    <button className="flex flex-row items-center gap-2 text-xs font-medium text-[#2D3748]">
                        <a href="https://www.youtube.com/watch?v=zpzdgmqIHOQ">
                            View Video
                        </a>
                        <ArrowDown
                            color="black"
                            size="12"
                            className="rotate-270"
                        />
                    </button>
                )}
            </div>
            <div className="flex flex-col gap-4">
                {mealInstructionProp.map((step, index) => (
                    <div key={index} className="mb-[10px] flex flex-col">
                        <h3 className="text-base font-medium text-[#2D3748]">
                            {step.stepTitle}
                        </h3>
                        <ul className="list-none">
                            {step.instructions?.map((instruction, index) => (
                                <li
                                    key={index}
                                    className="text-sm font-normal text-[#A0AEC0]"
                                >
                                    - {instruction}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HowToMakeMeal
