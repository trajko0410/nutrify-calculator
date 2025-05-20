"use client"

//import { Training } from "@/app/api/mealsTest/route"
import { useState, useEffect } from "react"

//import TrainingImage from "../../../public/trainingImage.png"
import Image from "next/image"

import ParametarsIcon from "../util/ParametarsIcon"
import {Eraser, ForkKnife } from "@phosphor-icons/react"
import { useTrainingCtx } from "./trainingProvider"
import SingleTrainingLoader from "../skeletonLoaders/singleTrainingTraining"


type YourNextTrainingProps = {
    userId?: number | string | null
}

const SingleTraining: React.FC<YourNextTrainingProps> = ({
    userId,
}) => {

    const {nextTraining, openEditTrainingModal} = useTrainingCtx()
    const [loading, setLoading] = useState(true)

    //console.log(userId, "userIdTRAINING")

    useEffect(() => {
        if (!nextTraining) {
            setLoading(false)
            return
        }
        //zconsole.log(nextTraining)
        setLoading(false)
    }, [nextTraining])

    

    //console.log(training)

    if (loading) {
        return (
          <SingleTrainingLoader />
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
                className={`flex h-full min-h-[200px] flex-col justify-between relative  ${!nextTraining?.training?.image ? "relative w-full overflow-hidden" : "w-full md:w-3/5"} rounded-xl`}
            >
  

                <div
                    className={`font-Poppins flex h-full w-full flex-1 flex-col justify-between gap-6 `}
                >
                    <div className="max-gap-[6px] flex h-full flex-col justify-between gap-[6px]">
                        <h3
                            className={`text-xs leading-[150%] font-medium`}
                        >
                            Your Training
                        </h3>
                        <h3
                            className={`text-lg leading-[140%] font-medium text-DarkGreen`}
                        >
                            {nextTraining?.training?.name
                                ? nextTraining?.training?.name
                                : "Next Training"}
                        </h3>
                       
                    
                            <p
                                className={`text-sm leading-[140%] font-medium  text-[#A0AEC0]`}
                            >
                                {nextTraining?.training?.description
                                    ? nextTraining?.training?.description
                                    : "Description of your training..."}
                            </p>
                    </div>

                    <div className="flex flex-row flex-wrap gap-4">
                        <div className="z-10 flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Calories"}
                                iconSize={18}
                                containerSize={32}
                            />
                            <p
                                className={`ml-2 text-base leading-[140%] font-medium `}
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
                                className={`ml-2 text-base leading-[140%] font-medium `}
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
                                className={`ml-2 text-base leading-[140%] font-medium `}
                            >
                                {nextTraining?.training?.exercises?.length ?? 0}
                                &nbsp;Exercises
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 justify-between sm:flex-row">
                        <p
                            className={`flex flex-col text-lg leading-[140%] font-medium `}
                        >
                       
                                <span className="text-xs font-normal text-[#757575]">
                                Training Time
                                </span>
                            
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
                       
                        {
                            userId !== nextTraining.training?.authorUserId && (
                                <button className="bg-LightGreen flex flex-row items-center justify-center gap-4 rounded-lg p-3 text-sm leading-[140%] font-medium text-[#FFFFFF]" onClick={openEditTrainingModal}>
                                    <div 
                                    >
                                        Edit Training
                                    </div>
                                    <Eraser color="white" size="16" />
                                </button>
                            )}
                    </div>
                </div>
            </div>
                <div className="flex w-full justify-center md:w-2/5">
                    {!nextTraining?.training?.image ? (
                        <div className="flex h-[265px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                            <ForkKnife color="#00000033" size={80}></ForkKnife>
                        </div>
                    ) : (
                        <div className="relative h-[265px] w-full overflow-clip rounded-xl">
                            <Image
                                src={nextTraining.training.image}
                                alt={nextTraining.training.name}
                                fill
                                className="overflow-cover object-cover"
                            />
                        </div>
                    )}
                </div>
        </div>
    )
}

export default SingleTraining