"use client"

import { useState, useEffect } from "react"
import { useNutritionPageCtx } from "./nutritionPageProvider"
import { Input, MenuItem, Select, TextField } from "@mui/material"
import { Upload } from "@phosphor-icons/react"
import Image from "next/image"
import { ForkKnife } from "@phosphor-icons/react"

//import { Input } from "@mui/material"

const AddMealModal = ({}) => {
    const { setAddMealModalOpen, userSubscribed } = useNutritionPageCtx()

    const [mealName, setMealName] = useState("")
    const [mealDescription, setMealDescription] = useState("")
    const [mealLongDescription, setMealLongDescription] = useState("")
    const [ingredients, setIngredients] = useState<
        { ingidient: string; quantity: string }[]
    >([{ ingidient: "", quantity: "" }])
    const [mealType, setMealType] = useState("breakfast")

    const [mealImage, setMealImage] = useState("")

    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const handleCloseModal = () => {
        setIsClosing(true)
        setTimeout(() => {
            setAddMealModalOpen(false)
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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files[0]) {
            setMealImage(URL.createObjectURL(files[0]))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const mealData = {
            mealName,
            mealDescription,
            mealLongDescription,
            mealType,
            ingredients,
            mealImage, // this is just the preview URL; for actual uploads, you'd need to send the file itself
        }

        console.log("Meal Data:", mealData)

        handleCloseModal()
    }

    const handleIngredientChange = (
        index: number,
        field: string,
        value: string,
    ) => {
        const updated = [...ingredients]
        updated[index][field as keyof (typeof updated)[number]] = value
        setIngredients(updated)
    }

    const handleAddIngredient = () => {
        setIngredients([...ingredients, { ingidient: "", quantity: "" }])
    }

    return (
        <form onSubmit={handleSubmit}>
            <div
                onClick={handleBackdropClick}
                className="font-Poppins fixed inset-0 z-40 flex items-end justify-center bg-[#00000035] backdrop-blur-xs md:items-center"
            >
                <div
                    className={`font-Poppins scrollbar-thin-mobile relative z-50 flex h-[80vh] w-full max-w-[1000px] flex-col gap-[32px] overflow-y-scroll rounded-xl bg-white px-[32px] py-[24px] transition-all duration-500 ease-in-out md:w-[80vw] ${
                        isClosing
                            ? "translate-y-full opacity-0"
                            : isOpening
                              ? "translate-y-0 opacity-100"
                              : "translate-y-full opacity-0"
                    }`}
                >
                    <div className="flex flex-col gap-2">
                        <h3 className="text-DarkGreen text-xl font-medium">
                            Create Meal
                        </h3>
                        <h4 className="text-lg font-normal text-[#757575]">
                            Lorem ipsum dolor sit amet
                        </h4>
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-DarkGreen text-base font-medium">
                            Meal Name
                        </p>
                        <Input
                            className="w-full"
                            placeholder="Enter meal name"
                            type="text"
                            required
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-DarkGreen text-base font-medium">
                            Meal Type
                        </p>
                        <Select
                            labelId="meal-type-label"
                            value={mealType}
                            onChange={(e) => setMealType(e.target.value)}
                            required
                            variant="standard"
                            MenuProps={{
                                disableScrollLock: true, // <- prevents scrollbar flicker
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                    },
                                },
                            }}
                        >
                            <MenuItem value="breakfast">Breakfast</MenuItem>
                            <MenuItem value="lunch">Lunch</MenuItem>
                            <MenuItem value="dinner">Dinner</MenuItem>
                            <MenuItem value="snack">Snack</MenuItem>
                        </Select>
                    </div>

                    {userSubscribed && (
                        <div className="flex flex-row-reverse items-start gap-6">
                            <div className="w-2/5 items-start">
                                <input
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    id="image-upload"
                                    type="file"
                                    onChange={handleImageUpload}
                                />
                                <label htmlFor="image-upload">
                                    <div className="bg-LightGreen flex w-full cursor-pointer flex-row items-center justify-center gap-2 rounded-lg p-2 text-xs font-medium text-white sm:gap-6">
                                        Upload Image
                                        <Upload size={16} color="#ffffff" />
                                    </div>
                                </label>
                            </div>
                            {mealImage ? (
                                <div className="relative flex h-[125px] w-3/5 items-center justify-center overflow-clip rounded-xl bg-[#F5F5F5] md:h-[250px]">
                                    <Image
                                        src={mealImage}
                                        alt={mealImage || "mealImage"}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-[125px] w-3/5 items-center justify-center rounded-xl bg-[#F5F5F5] md:h-[250px]">
                                    <ForkKnife color="#00000033" size={65} />
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-2">
                        <p className="text-DarkGreen text-base font-medium">
                            Meal Short Description
                        </p>
                        <TextField
                            placeholder="Enter meal description"
                            className="w-full"
                            multiline
                            rows={4}
                            type="text"
                            required
                            value={mealDescription}
                            onChange={(e) => setMealDescription(e.target.value)}
                            variant="standard"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-DarkGreen text-base font-medium">
                            Meal Long Description
                        </p>
                        <TextField
                            placeholder="Enter meal long description"
                            className="w-full"
                            multiline
                            rows={4}
                            type="text"
                            required
                            value={mealLongDescription}
                            onChange={(e) =>
                                setMealLongDescription(e.target.value)
                            }
                            variant="standard"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <p className="text-DarkGreen text-base font-medium">
                            Ingredients
                        </p>
                        {ingredients.map((ingredient, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-2 pb-4 sm:flex-row sm:items-center"
                            >
                                <Input
                                    placeholder="Ingredient"
                                    className="w-full sm:w-2/3"
                                    type="text"
                                    required
                                    value={ingredient.ingidient}
                                    onChange={(e) =>
                                        handleIngredientChange(
                                            index,
                                            "ingidient",
                                            e.target.value,
                                        )
                                    }
                                />
                                <Input
                                    placeholder="Quantity"
                                    className="w-full sm:w-1/3"
                                    type="text"
                                    required
                                    value={ingredient.quantity}
                                    onChange={(e) =>
                                        handleIngredientChange(
                                            index,
                                            "quantity",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddIngredient}
                            className="text-LightGreen self-start text-sm hover:underline"
                        >
                            + Add Another Ingredient
                        </button>
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

export default AddMealModal
