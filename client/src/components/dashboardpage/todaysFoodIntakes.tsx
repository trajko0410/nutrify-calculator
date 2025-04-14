"use client"

import { JSX } from "react";
import { percentageOfTotal } from "../../utils/procentageCalculator"
import { FireSimple , Drop, Egg, BowlFood, Bread, Gauge } from "@phosphor-icons/react"
//import { useUser } from "@clerk/nextjs";

type DailyIndexProps = {
    title: string
    currentIndex?: number
    planedIndex?: number}

const DailyIndex: React.FC<DailyIndexProps> = ({
    title,
    currentIndex = 0,
    planedIndex = 100,
}) => { 
    return <div className="bg-[#FFFFFF] shadow-Combined font-Poppins flex min-h-[80px] flex-1/4 flex-row items-center justify-between rounded-xl pr-[20px] pl-[20px] py-[10px] gap-2">
        <div className="flex flex-col gap-1 ">
            <h3 className="text-base font-medium text-[#A0AEC0]">
                Today&apos;s {title}
            </h3>
            <div className="flex flex-row  items-center gap-1 flex-wrap ">
                <p className="text-lg font-medium text-[#2D3748]">
                    {currentIndex} out of {planedIndex}
                </p>

            </div>
        </div>
        <div
            className={`h-[45px] w-[45px] min-w-[45px] rounded-lg text-sm  flex justify-center items-center bg-DarkGreen`}
        >{<Gauge size={24} color="white" />}</div>
    </div>;

}



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
      Gage: <Gauge size={24} />


  };
  //const { user, isSignedIn, isLoaded } = useUser()
  //console.log(isLoaded)



    return (
        <div className="bg-[#FFFFFF] shadow-Combined font-Poppins flex min-h-[80px] flex-1/4 flex-row items-center justify-between rounded-xl pr-[20px] pl-[20px] py-[10px] gap-2">
            <div className="flex flex-col gap-1 ">
                <h3 className="text-base font-medium text-[#A0AEC0]">
                    Today&apos;s {title}
                </h3>
                <div className="flex flex-row  items-center gap-1 flex-wrap ">
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
    totalCalories?: number;
    totalProteins?: number;
    totalFats?: number;
    totalCarbohydrates?: number;
    glycemicIndex?: number;
    planedGlycemicIndex?: number; 
    glycemicLoad?: number; 
    planedGlycemicLoad?: number; 
}


//"When I create the timeline component, I will send the current intake based on the time of day."
const TodaysFoodInteake: React.FC<TodaysFoodIntakeProps> = ({
    totalCalories = 0,
    totalProteins = 0,
    totalCarbohydrates=0,
    totalFats=0,
    glycemicIndex,
    planedGlycemicIndex=100,
    glycemicLoad,
    planedGlycemicLoad=100,
}) => {
    return (
        <>
          
            <div className={`grid w-full grid-cols-1 flex-wrap justify-between gap-6  ${glycemicIndex || glycemicLoad ? "lg:grid-row-3 lg:grid-cols-2" : "lg:grid-cols-4 md:grid-cols-2"}`}>
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
                { glycemicIndex && (
                    <DailyIndex
                        title={"Glycemic Index (GI)"}
                        currentIndex={glycemicIndex}
                        planedIndex={planedGlycemicIndex}
                    />
                )}
                { glycemicLoad && (
                <DailyIndex
                    title={"Glycemic Load (GL)"}
                    currentIndex={glycemicLoad}
                    planedIndex={planedGlycemicLoad}
                />
            )}
            </div>
        </>
    )
}

export default TodaysFoodInteake