"use client"

import { Training } from "@/app/api/mealsTest/route"
import { useState, useEffect } from "react"

//import TrainingImage from "../../../public/trainingImage.png"
import Image from "next/image"

import ParametarsIcon from "../util/ParametarsIcon"
import Link from "next/link"
import { ArrowDown } from "@phosphor-icons/react"

type YourNextTrainingProps = {
    nextTrainingProp: { training: Training; time: string } | undefined | null
}

const YourNextTraining: React.FC<YourNextTrainingProps> = ({
    nextTrainingProp,
}) => {
    const [nextTraining, setNextTraining] = useState<{
        training: Training;
        time: string;
    } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!nextTrainingProp) {
            setLoading(false)
            return
        }
        //console.log(nextTraining)
        setNextTraining(nextTrainingProp)
        setLoading(false)
    }, [nextTrainingProp])

    //console.log(training)

    if (loading) {
        return (
            <div className="bg-[#FFFFFF] shadow-Combined font-Poppins h-full flex min-h-[200px] flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] text-black md:flex-row">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!nextTraining) {
        return (
            <div className="bg-[#FFFFFF] shadow-Combined font-Poppins flex min-h-[200px] h-full flex-col justify-between gap-8 rounded-xl px-[20px] py-[17px] text-black md:flex-row">
                <p>No upcoming training found.</p> {/* UI for no meals */}
            </div>
        )
    }

    return (
        <div className="bg-[#FFFFFF] shadow-Combined font-Poppins flex h-full flex-col justify-between gap-8 rounded-xl p-[17px] text-black md:flex-row">
            <div
                className={`relative h-full min-h-[200px] w-full ${nextTraining?.training?.image ? "overflow-hidden" : ""} rounded-xl`}
            >
                {nextTraining?.training?.image && (
                    <>
                        <Image
                            src={nextTraining?.training?.image}
                            alt="image"
                            fill
                            className="absolute inset-0 h-full object-cover"
                        ></Image>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/20"></div>
                    </>
                )}
                <div
                    className={`font-Poppins relative flex h-full w-full flex-1 flex-col justify-between ${nextTraining?.training?.image ? "p-[10px]" : ""}`}
                >
                    <div className="flex flex-col gap-[6px]">
                        <h3
                            className={`text-xs leading-[150%] font-medium ${nextTraining?.training?.image ? "text-[#A0AEC0]" : "text-[#A0AEC0]"}`}
                        >
                            Your Next Meal
                        </h3>
                        <h3
                            className={`text-lg leading-[140%] font-medium ${nextTraining?.training?.image ? "text-white" : "text-[#2D3748]"}`}
                        >
                            {nextTraining?.training?.name
                                ? nextTraining?.training?.name
                                : "Next Training"}
                        </h3>
                        <p
                            className={`text-sm leading-[140%] font-medium ${nextTraining?.training?.image ? "text-[#E0E0E0]" : "text-[#A0AEC0]"}`}
                        >
                            {nextTraining?.training?.description
                                ?   nextTraining?.training?.description.length > 255
                                    ? nextTraining.training?.description.slice(
                                          0,
                                          120,
                                      ) + "..."
                                    : nextTraining?.training?.description
                                : "Description of your training..."}
                        </p>
                    </div>

                    <div className="flex flex-row flex-wrap gap-4 pt-4">
                        <div className="z-10 flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Calories"}
                                iconSize={18}
                                containerSize={32}
                            />
                            <p
                                className={`ml-2 text-base leading-[140%] font-medium ${nextTraining?.training?.image ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                            >
                                -{nextTraining?.training?.caloriesBurned ?? 0}
                                kcal
                            </p>
                        </div>
                        <div className="z-10 flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Time"}
                                iconSize={18}
                                containerSize={32}
                            />
                            <p
                                className={`ml-2 text-base leading-[140%] font-medium ${nextTraining?.training?.image ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                            >
                                {nextTraining?.training?.duration ?? 0} &nbsp;m
                            </p>
                        </div>
                        <div className="z-10 flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Exercises"}
                                iconSize={18}
                                containerSize={32}
                            />
                            <p
                                className={`ml-2 text-base leading-[140%] font-medium ${nextTraining?.training?.image ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                            >
                                {nextTraining?.training?.exercises.length ?? 0}
                                &nbsp;Exercises
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between pt-6">
                        <p
                            className={`text-lg leading-[140%] font-medium ${nextTraining?.training?.image ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                        >
                            {nextTraining?.time
                                ? new Date(
                                      nextTraining?.time,
                                  ).toLocaleTimeString("en-US", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                      hour12: true,
                                  })
                                : "No time available"}
                        </p>
                        <p
                            className={`flex flex-row items-center justify-center gap-2 text-xs leading-[150%] font-normal ${nextTraining?.training?.image ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                        >
                            <Link href={`/singleTraining/${nextTraining?.training.id}`}>Read More</Link>
                            <ArrowDown
                                color={
                                    nextTraining?.training?.image
                                        ? "white"
                                        : "black"
                                }
                                size="12"
                                className="rotate-270"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourNextTraining
