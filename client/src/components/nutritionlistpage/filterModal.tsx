"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@mui/material"
import GeneralModalComponent from "../util/GeneralModalComponent"

type waterConsumptionModalProp = {
    closeModal?: () => void
}

const FilterNutritionistModal: React.FC<waterConsumptionModalProp> = ({
    closeModal = () => {},
}) => {
    const router = useRouter()

    const [closeModalFn, setCloseModalFn] = useState<() => void>(() => () => {})


    const [nutritionistName, setNutritionistName] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [ratingMinimum, setRatingMinimum] = useState<number | null>(0.1)
    const [ratingMaximum, setRatingMaximum] = useState<number | null>(5)
    const [yearsOfExperience, setYearsOfExperience] = useState<string>("")

    const [error, setError] = useState("")

 

    useEffect(() => {
        const min = ratingMinimum ?? 0
        const max = ratingMaximum ?? 0

        if (min > max) {
            setError("Minimum rating cannot be higher than maximum rating.")
        } else {
            setError("")
        }
    }, [ratingMinimum, ratingMaximum])



  


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (
            ratingMinimum !== null &&
            (ratingMinimum < 0.1 || ratingMinimum > 5)
        ) {
            setError("Minimum rating must be between 0.1 and 5.")
            return
        }
        if (
            ratingMaximum !== null &&
            (ratingMaximum < 0.1 || ratingMaximum > 5)
        ) {
            setError("Maximum rating must be between 0.1 and 5.")
            return
        }
        if (
            ratingMinimum !== null &&
            ratingMaximum !== null &&
            ratingMinimum > ratingMaximum
        ) {
            setError("Minimum rating cannot be higher than maximum rating.")
            return
        }

        if (error) return

        setError("")

        const params = new URLSearchParams()

        if (nutritionistName) params.set("name", nutritionistName)
        if (location) params.set("location", location)
        if (ratingMinimum !== null)
            params.set("minRating", ratingMinimum.toString())
        if (ratingMaximum !== null)
            params.set("maxRating", ratingMaximum.toString())
        if (yearsOfExperience)
            params.set("yearsOfExperience", yearsOfExperience)

        router.push(`?${params.toString()}`)
        closeModalFn()
    }

    return (
        <form onSubmit={handleSubmit}>
           <GeneralModalComponent closeGeneralModal={closeModal}             onReady={(action) => setCloseModalFn(() => action)} // setujemo funkciju
>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-DarkGreen text-xl font-medium">
                            Filter
                        </h3>
                        <h4 className="text-sm font-normal text-[#757575]">
                            Lorem ipsum dolor sit amet
                        </h4>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-DarkGreen text-base font-medium">
                            Search by name
                        </h3>
                        <Input
                            placeholder="Enter nutritionist name"
                            className="w-full"
                            type="text"
                            value={nutritionistName}
                            onChange={(e) =>
                                setNutritionistName(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-DarkGreen text-base font-medium">
                            Search by Location
                        </h3>
                        <Input
                            placeholder="Enter nutritionist location"
                            className="w-full"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <h3 className="text-DarkGreen text-base font-medium">
                            Search by Career Experience
                        </h3>
                        <Input
                            placeholder="Enter years of experience"
                            className="w-full"
                            type="number"
                            value={yearsOfExperience}
                            onChange={(e) =>
                                setYearsOfExperience(e.target.value)
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-4 items-stretch">
                        <div className="flex flex-row gap-4">
                            <div className="w-1/2">
                                <h3 className="text-DarkGreen text-base font-medium">
                                    Search by Rating (Min)
                                </h3>
                                <Input
                                    placeholder="Min Rating"
                                    type="number"
                                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                                    value={
                                        ratingMinimum !== null
                                            ? ratingMinimum.toString()
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setRatingMinimum(
                                            e.target.value !== ""
                                                ? parseFloat(e.target.value)
                                                : null,
                                        )
                                    }
                                    fullWidth
                                />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-DarkGreen text-base font-medium">
                                    Search by Rating (Max)
                                </h3>
                                <Input
                                    placeholder="Max Rating"
                                    type="number"
                                    inputProps={{ min: 0, max: 5, step: 0.1 }}
                                    value={
                                        ratingMaximum !== null
                                            ? ratingMaximum.toString()
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setRatingMaximum(
                                            e.target.value !== ""
                                                ? parseFloat(e.target.value)
                                                : null,
                                        )
                                    }
                                    fullWidth
                                />
                            </div>
                        </div>
                        <p
                            className={`text-xs font-normal text-red-500 ${error ? "visible" : "invisible"}`}
                        >
                            {error ? error : "nema greske"}
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={!!error}
                        className={`flex w-full flex-row items-center justify-center gap-6 rounded-lg p-2 text-sm font-medium ${error ? "cursor-not-allowed bg-gray-300 text-gray-500" : "bg-LightGreen cursor-pointer text-white"}`}
                    >
                        Filter
                    </button>
                    </GeneralModalComponent>
        </form>
    )
}

export default FilterNutritionistModal
