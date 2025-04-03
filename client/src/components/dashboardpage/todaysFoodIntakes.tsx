"use client"

import { JSX } from "react";
import { percentageOfTotal } from "../../utils/procentageCalculator"
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
                <div className="flex flex-row  items-center gap-2 ">
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
                className={`h-[45px] w-[45px] min-w-[45px] rounded-lg text-sm  flex justify-center items-center ${
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
    userName?: string;
    totalCalories?: number;
    totalProteins?: number;
    totalFats?: number;
    totalCarbohydrates?: number;
}


//"When I create the timeline component, I will send the current intake based on the time of day."
const TodaysFoodInteake: React.FC<TodaysFoodIntakeProps> = ({
    userName = "User",
    totalCalories = 0,
    totalProteins = 0,
    totalCarbohydrates=0,
    totalFats=0
}) => {
    return (
        <>
            <div className="flex flex-col gap-2 text-black">
                <h2 className="text-DarkGreen font-Poppins text-2xl font-medium">
                    Hi, {userName}
                </h2>
                <p className="text-lg font-normal text-[#757575]">
                    Lorem ipsum dolor sit amet
                </p>
            </div>
            <div className=" grid w-full grid-cols-1 flex-wrap justify-between gap-6 md:grid-cols-2 lg:grid-cols-4">
                <DailyInatakeSpecific
                    title={"Calories"}
                    planedIntake={totalCalories}
                    currentIntake={500}
                />
                <DailyInatakeSpecific
                    title={"Proteins"}
                    planedIntake={totalProteins}
                    currentIntake={100}
                />
                <DailyInatakeSpecific
                    title={"Fats"}
                    planedIntake={totalFats}
                    currentIntake={20}
                />
                <DailyInatakeSpecific
                    title={"Carbohydrates"}
                    planedIntake={totalCarbohydrates}
                    currentIntake={7}
                />
            </div>
        </>
    )
}

export default TodaysFoodInteake
