"use client"

import { JSX } from "react";
import { percentageOfTotal } from "../../utils/procentageCalculator"
import DashboardContainer from "../util/DashboardContainer"
import { FireSimple , Drop, Egg, BowlFood, Bread } from "@phosphor-icons/react"


type DailyInatakeSpecificProps = {
    title: string
    planedIntake?: number
    currentIntake?: number
}

const DailyInatakeSpecific: React.FC<DailyInatakeSpecificProps> = ({
    title,
    planedIntake = 0,
    currentIntake = 0,
}) => {
    const procentage = percentageOfTotal(currentIntake, planedIntake)

    const iconMap: Record<string, JSX.Element> = {
      Calories: <FireSimple size={24} color="white" />,
      Proteins:  <Egg size={24} color="white" />,
      Fats: <Drop  size={24} color="white" />,
      Carbohydrates: <Bread size={24} color="white" />,
  };


    return (
        <div className="bg-White shadow-Combined font-Poppins flex h-[80px] flex-1/4 flex-row items-center justify-between rounded-xl pr-[20px] pl-[20px]">
            <div className="flex flex-col">
                <h3 className="text-base font-medium text-[#A0AEC0]">
                    Today&apos;s {title}
                </h3>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-lg font-medium text-[#2D3748]">
                        {planedIntake}
                        {title === "Calories" ? "kcal" : "gr"}
                    </p>
                    <p
                        className={`text-sm ${
                            title === "Calories"
                                ? "text-[#FF4163]"
                                : title === "Proteins"
                                  ? "text-[#C56532]"
                                  : title === "Fats"
                                    ? "text-[#5A8AFF]"
                                    : "text-[#E3CB2A]"
                        }`}
                    >
                        {currentIntake} {title === "Calories" ? "kcal" : "gr"} (
                        {procentage}%)
                    </p>
                </div>
            </div>
            <div
                className={`h-[45px] w-[45px] rounded-lg text-sm  flex justify-center items-center ${
                    title === "Calories"
                        ? "bg-[#FF4163]"
                        : title === "Proteins"
                          ? "bg-[#C56532]"
                          : title === "Fats"
                            ? "bg-[#5A8AFF]"
                            : "bg-[#E3CB2A]"
                }`}
            >{iconMap[title] || <BowlFood size={24} color="white"/>}</div>
        </div>
    )
}

type TodaysFoodIntakeProps = {
    userId?: string
}

const TodaysFoodInteake: React.FC<TodaysFoodIntakeProps> = ({
    userId = "User",
}) => {
    return (
        <DashboardContainer>
            <div className="flex flex-col gap-2 text-black">
                <h2 className="text-DarkGreen font-Poppins text-2xl font-medium">
                    Hi, {userId}
                </h2>
                <p className="text-lg font-normal text-[#757575]">
                    Lorem ipsum dolor sit amet
                </p>
            </div>
            <div className="mt-8 grid w-full grid-cols-1 flex-wrap justify-between gap-6 md:grid-cols-2 lg:grid-cols-4">
                <DailyInatakeSpecific
                    title={"Calories"}
                    planedIntake={1000}
                    currentIntake={500}
                />
                <DailyInatakeSpecific
                    title={"Proteins"}
                    planedIntake={500}
                    currentIntake={100}
                />
                <DailyInatakeSpecific
                    title={"Fats"}
                    planedIntake={100}
                    currentIntake={20}
                />
                <DailyInatakeSpecific
                    title={"Carbohydrates"}
                    planedIntake={10}
                    currentIntake={7}
                />
            </div>
        </DashboardContainer>
    )
}

export default TodaysFoodInteake
