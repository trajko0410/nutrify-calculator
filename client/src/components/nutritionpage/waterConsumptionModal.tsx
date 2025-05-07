"use client"
import { useState, useEffect } from "react"
import { Input } from "@mui/material"

type waterConsumptionModalProp = {
    planedWaterConsumption: number | null | undefined
    currentWatterConsumption: number | null | undefined
    closeModal?: () => void
    updateWaterConsumptionGoal: (
        newWaterConsumptionGoal: number,
        currentWaterConsumption: number,
        planedWaterConsumptionGoal: number,
    ) => void
}

const WaterConsumptionModal: React.FC<waterConsumptionModalProp> = ({
    planedWaterConsumption = 0,
    currentWatterConsumption = 0,
    closeModal = () => {},
    updateWaterConsumptionGoal,
}) => {
    const [newWaterConsumption, setNewWaterConsumption] = useState(1800)

    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    console.log(planedWaterConsumption, "planedWaterConsumption", currentWatterConsumption, "currentWatterConsumption")

    const handleCloseModal = () => {
        setIsClosing(true)
        setTimeout(() => {
            closeModal()
        }, 500)
    }

    useEffect(() => {
        setIsOpening(true)
    }, [])

    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                setIsOpening(false)
            }, 500)
        }
    }, [isClosing])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal()
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            newWaterConsumption < 0 ||
            newWaterConsumption < (currentWatterConsumption ?? 0)
        ) {
            alert(
                "Water consumption goal cannot be negative or smaller than current consumption",
            )
            return
        }

        console.log("Submitted water consumption goal:", {
            newWaterConsumption,
            currentWatterConsumption,
            planedWaterConsumption,
        })

        updateWaterConsumptionGoal(
            newWaterConsumption,
            currentWatterConsumption ?? 0,
            planedWaterConsumption ?? 0,
        )

        handleCloseModal()
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                onClick={handleBackdropClick}
                className="font-Poppins fixed inset-0 z-40 flex items-end justify-center bg-[#00000035] backdrop-blur-xs md:items-center"
            >
                <div
                    className={`font-Poppins relative z-50 flex w-full max-w-[1000px] flex-col gap-[32px] rounded-b-none rounded-t-xl md:rounded-xl bg-white px-[32px] py-[24px] transition-all duration-500 ease-in-out md:w-[40vw] ${
                        isClosing
                            ? "translate-y-full opacity-0"
                            : isOpening
                              ? "translate-y-0 opacity-100"
                              : "translate-y-full opacity-0"
                    }`}
                >
                    <div className="flex flex-col gap-2">
                        <h3 className="text-DarkGreen text-xl font-medium">
                            Water Eentry
                        </h3>
                        <h4 className="text-lg font-normal text-[#757575]">
                            Lorem ipsum dolor sit amet
                        </h4>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-DarkGreen text-2xl font-medium">
                            Amount of water (ML)
                        </h3>
                        <Input
                            placeholder="Enter amount of water"
                            className="w-full"
                            type="number"
                            required
                            value={newWaterConsumption}
                            onChange={(e) =>
                                setNewWaterConsumption(Number(e.target.value))
                            }
                        />
                        {(newWaterConsumption ?? 0) < (currentWatterConsumption ?? 0) && (
                            <p className="text-[8px] font-normal text-red-400">Planned consumption can not be less than current consumption</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-LightGreen flex w-full cursor-pointer flex-row items-center justify-center gap-6 rounded-lg p-2 text-sm font-medium text-white"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </form>
    )
}

export default WaterConsumptionModal
