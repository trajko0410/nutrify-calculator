"use client"

import { Training } from "@/app/api/mealsTest/route"
import { useState, useEffect } from "react"

//import TrainingImage from "../../../public/trainingImage.png"
import Image from "next/image"

import ParametarsIcon from "../util/ParametarsIcon"
import Link from "next/link"
import { ArrowDown, Eraser, ForkKnife } from "@phosphor-icons/react"

type YourNextTrainingProps = {
    nextTrainingProp: { training: Training; time: string } | undefined | null
    isNextTrainingComponent: boolean
    userId?: number | string | null
}

const YourNextTraining: React.FC<YourNextTrainingProps> = ({
    nextTrainingProp,
    isNextTrainingComponent,
    userId,
}) => {
    const [nextTraining, setNextTraining] = useState<{
        training: Training
        time: string
    } | null>(null)
    const [loading, setLoading] = useState(true)

    console.log(userId, "userIdTRAINING")

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
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!nextTraining) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>No upcoming training found.</p> {/* UI for no meals */}
            </div>
        )
    }

    return (
        <div className="shadow-Combined font-Poppins flex h-full flex-col-reverse justify-between gap-8 rounded-xl bg-[#FFFFFF] p-[17px] text-black md:flex-row">
            <div
                className={`flex h-full min-h-[200px] flex-col justify-between ${isNextTrainingComponent ? "relative" : "min-h-[265px]"} ${!nextTraining?.training?.image && isNextTrainingComponent ? "relative w-full overflow-hidden" : "w-full md:w-3/5"} rounded-xl`}
            >
                {nextTraining?.training?.image && isNextTrainingComponent && (
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
                    className={`font-Poppins flex h-full w-full flex-1 flex-col justify-between gap-6 ${nextTraining?.training?.image && isNextTrainingComponent ? "p-[10px]" : ""} ${isNextTrainingComponent ? "relative" : ""}`}
                >
                    <div className="max-gap-[6px] flex h-full flex-col justify-between gap-[6px]">
                        <h3
                            className={`text-xs leading-[150%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#A0AEC0]" : "text-[#A0AEC0]"}`}
                        >
                            Your Training
                        </h3>
                        <h3
                            className={`text-lg leading-[140%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-white" : "text-[#2D3748]"}`}
                        >
                            {nextTraining?.training?.name
                                ? nextTraining?.training?.name
                                : "Next Training"}
                        </h3>
                        {isNextTrainingComponent ? (
                            <p
                                className={`text-sm leading-[140%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#E0E0E0]" : "text-[#A0AEC0]"}`}
                            >
                                {nextTraining?.training?.description
                                    ? nextTraining?.training?.description
                                          ?.length > 255
                                        ? nextTraining.training?.description.slice(
                                              0,
                                              120,
                                          ) + "..."
                                        : nextTraining?.training?.description
                                    : "Description of your training..."}
                            </p>
                        ) : (
                            <p
                                className={`text-sm leading-[140%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#E0E0E0]" : "text-[#A0AEC0]"}`}
                            >
                                {nextTraining?.training?.description
                                    ? nextTraining?.training?.description
                                    : "Description of your training..."}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-row flex-wrap gap-4">
                        <div className="z-10 flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Calories"}
                                iconSize={18}
                                containerSize={32}
                            />
                            <p
                                className={`ml-2 text-base leading-[140%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
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
                                className={`ml-2 text-base leading-[140%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
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
                                className={`ml-2 text-base leading-[140%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                            >
                                {nextTraining?.training?.exercises?.length ?? 0}
                                &nbsp;Exercises
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-between sm:flex-row">
                        <p
                            className={`flex flex-col text-lg leading-[140%] font-medium ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                        >
                            {!isNextTrainingComponent && (
                                <span className="text-xs font-normal text-[#757575]">
                                Training Time
                                </span>
                            )}
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
                        {isNextTrainingComponent && (
                            <button
                                className={`flex flex-row items-center justify-center gap-2 text-xs leading-[150%] font-normal ${nextTraining?.training?.image && isNextTrainingComponent ? "text-[#E0E0E0]" : "text-[#2D3748]"}`}
                            >
                                <Link
                                    href={`/singleTraining/${nextTraining?.training.id}`}
                                >
                                    Read More
                                </Link>
                                <ArrowDown
                                    color={
                                        isNextTrainingComponent &&
                                        !nextTraining?.training?.image
                                            ? "white"
                                            : "black"
                                    }
                                    size="12"
                                    className="rotate-270"
                                />
                            </button>
                        )}
                        {!isNextTrainingComponent &&
                            userId === nextTraining.training?.authorUserId && (
                                <button className="bg-LightGreen flex flex-row items-center justify-center gap-4 rounded-lg p-3 text-sm leading-[140%] font-medium text-[#FFFFFF]">
                                    <Link
                                        href={`/meal/${nextTraining?.training.id}`}
                                    >
                                        Edit Training
                                    </Link>
                                    <Eraser color="white" size="16" />
                                </button>
                            )}
                    </div>
                </div>
            </div>
            {!isNextTrainingComponent && (
                <div className="flex w-full justify-center md:w-2/5">
                    {!nextTraining?.training?.image ? (
                        <div className="flex h-[265px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                            <ForkKnife color="#00000033" size={80}></ForkKnife>
                        </div>
                    ) : (
                        <div className="relative h-[265px] w-full overflow-clip rounded-xl">
                            <Image
                                src={nextTraining?.training?.image}
                                alt={nextTraining.training.name}
                                fill
                                className="overflow-cover object-cover"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default YourNextTraining
