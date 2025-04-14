"use client"

import { WaterConsumption as WaterConsumptionType } from "@/app/api/mealsTest/route"
import { useState, useEffect } from "react"

import Image from "next/image"
import waterGlassImageFull from "../../../public/waterGlassFull.png"
import waterGlassImageEmpty from "../../../public/waterGlassEmpty.png"

type WaterConsumptionProps = {
    waterConsumption: WaterConsumptionType[] | undefined | null
}

const WaterConsumption: React.FC<WaterConsumptionProps> = ({
    waterConsumption,
}) => {
    const [loading, setLoading] = useState(true)
    const [waterConsumptionData, setWaterConsumptionData] = useState<
        WaterConsumptionType[]
    >([])

    const GLASS_SIZE = 250 // ml

    const [totalGlasses, setTotalGlasses] = useState(0)
    const [filledGlasses, setFilledGlasses] = useState(0)

    useEffect(() => {
        if (!waterConsumption) {
            setLoading(false)
            return
        }
        //console.log(meal, "dsfas")

        setWaterConsumptionData(waterConsumption)
        setLoading(false)

        const water = waterConsumption[0]
        if (water) {
            const total = Math.round(water.planedWaterConsumption / GLASS_SIZE)
            const filled = Math.round(
                water.currentWatterConsumption / GLASS_SIZE,
            )
            setTotalGlasses(total)
            setFilledGlasses(filled)
        }
    }, [waterConsumption])

    console.log(totalGlasses, filledGlasses, "waterConsumptionData")

    const handleAddWater = () => {
        if (filledGlasses < totalGlasses) {
            setFilledGlasses((prev) => prev + 1)
        }
        // Logic to add water consumption
        // For example, you can update the state or make an API call here

        console.log("Add water clicked")
    }

    if (loading) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>Loading...</p> {/* Loading UI */}
            </div>
        )
    }

    if (!waterConsumptionData) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>No water consumption plan found.</p> {/* UI for no meals */}
            </div>
        )
    }

    if (
        waterConsumptionData.length === 0 ||
        waterConsumptionData[0].planedWaterConsumption === 0
    ) {
        return (
            <div className="shadow-Combined font-Poppins flex h-full min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
                <p>
                    No water consumption data available want to create a data.
                </p>
            </div>
        )
    }

    return (
        <div className="shadow-Combined font-Poppins flex h-fit min-h-[200px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black md:flex-row">
            <div>
                <h3>Water consumption</h3>
                <button>Edit Goal</button>
            </div>

            <div className="flex h-fit flex-row flex-wrap gap-2">
                {Array.from({ length: totalGlasses }).map((_, index) => {
                    if (index < filledGlasses) {
                        return (
                            <div key={index} className="text-3xl text-blue-500">
                                <Image
                                    src={waterGlassImageFull}
                                    alt={"waterGlassImage"}
                                    width={47}
                                    height={64}
                                ></Image>
                            </div> // filled glass
                        )
                    }

                    if (index === filledGlasses) {
                        return (
                            <div
                                key={index}
                                className="relative text-3xl text-gray-300"
                                onClick={handleAddWater}
                            >
                                <Image
                                    src={waterGlassImageEmpty}
                                    alt={"waterGlassImage"}
                                    width={47}
                                    height={64}
                                />

                                <span className="absolute top-1/2 left-1/2 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00B011] text-xs text-white">
                                    +
                                </span>
                            </div>
                        )
                    }

                    return (
                        <div key={index} className="text-3xl text-gray-300">
                            <Image
                                src={waterGlassImageEmpty}
                                alt={"waterGlassImage"}
                                width={47}
                                height={64}
                            ></Image>
                        </div> // empty glass
                    )
                })}
            </div>
        </div>
    )
}

export default WaterConsumption
