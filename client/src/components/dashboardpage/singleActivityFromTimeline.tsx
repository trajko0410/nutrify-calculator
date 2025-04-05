"use client"
import { ForkKnife, Barbell, ArrowDown } from "@phosphor-icons/react"
import { ActivityType } from "./todaysTimeline"
import Image from "next/image"

//import nekaSlika from "../../../public/picture3.png"
import ParametarsIcon from "../util/ParametarsIcon"
import Link from "next/link"

type SingleActivityFromTimelineProps = {
    activity: ActivityType
    
}

const SingleActivityFromTimeline: React.FC<SingleActivityFromTimelineProps> = ({
    activity,
}) => {
    //console.log(activity, "single")

    if (!activity) {
        return <div>No activity for today!</div>
    }

    return (
        <div className="font-Poppins flex w-[370px] shrink-0 flex-col gap-5 pb-4">
            <div>
                {activity.type === "meal" ? (
                    activity?.meal?.image ? (
                        <div className="relative h-[190px] w-full overflow-clip rounded-xl">
                            <Image
                                src={activity.meal.image}
                                alt={activity.meal.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-[190px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                            <ForkKnife color="#00000033" size={80} />
                        </div>
                    )
                ) : activity.type === "training" ? (
                    activity?.training?.image ? (
                        <div className="relative h-[190px] w-full overflow-clip rounded-xl">
                            <Image
                                src={activity.training.image}
                                alt={activity.training.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-[190px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                            <Barbell color="#00000033" size={80} />
                        </div>
                    )
                ) : (
                    // Ako tip nije ni "meal" ni "training", neće prikazati ništa
                    <div className="flex h-[190px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                        <ForkKnife color="#00000033" size={80} />
                    </div>
                )}
            </div>
            <div>
                <h4 className="text-xs leading-[150%] font-medium text-[#A0AEC0]">
                    {activity.type === "training"
                        ? "Training"
                        : activity.mealType
                          ? activity.mealType.charAt(0).toUpperCase() +
                            activity.mealType.slice(1)
                          : "Meal"}
                </h4>
                <h3 className="text-lg leading-[140%] font-medium text-[#2D3748]">
                    {activity.type === "training"
                        ? activity?.training?.name
                        : activity?.meal?.name}
                </h3>
            </div>
            <div>
                {activity.type === "meal" ? (
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Calories"}
                                iconSize={14}
                                containerSize={24}
                            />
                            <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                {activity?.meal?.calories ?? 0}kcal
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Proteins"}
                                iconSize={14}
                                containerSize={24}
                            />
                            <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                {activity?.meal?.proteins ?? 0}g
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Fats"}
                                iconSize={14}
                                containerSize={24}
                            />
                            <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                {activity?.meal?.fats ?? 0}g
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Carbohydrates"}
                                iconSize={14}
                                containerSize={24}
                            />
                            <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                {activity?.meal?.carbohydrates ?? 0}g
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Calories"}
                                iconSize={14}
                                containerSize={24}
                            />
                            <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                -{activity?.training?.caloriesBurned ?? 0}kcal
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Time"}
                                iconSize={14}
                                containerSize={24}
                            />
                            <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                {activity?.training?.duration ?? 0}min
                            </p>
                        </div>
                        <div className="flex flex-row items-center">
                            <ParametarsIcon
                                parametarName={"Exercises"}
                                iconSize={14}
                                containerSize={24}
                            />
                            <p className="ml-2 text-sm font-medium text-[#2D3748]">
                                {activity?.training?.exercises.length ?? 0}{" "}
                                &nbsp;Exercises
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-row justify-between">
                <p className="text-lg leading-[140%] font-medium text-[#2D3748]">
                    {activity?.time
                        ? new Date(activity.time).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                          })
                        : "No time available"}
                </p>
                <button className="flex flex-row items-center justify-center gap-2 text-xs leading-[150%] font-normal text-[#2D3748]">
                    <Link href={activity.type === "meal" ? `/meal/${activity?.meal?.id}` : `/training/${activity?.training?.id}`}>Read More</Link>
                    <ArrowDown color="black" size="12" className="rotate-270" />
                </button>
            </div>
        </div>
    )
}

export default SingleActivityFromTimeline
