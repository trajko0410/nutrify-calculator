"use client"
import { Ingredient, Meal } from "@/utils/types"
import { Autocomplete, Button, Stack, TextField } from "@mui/material"
import React, { useState } from "react"
import Cookies from "js-cookie"
import { Check, Minus, PencilSimple } from "@phosphor-icons/react"

const CalculateMeal: React.FC = () => {
    const token = Cookies.get("jwtNutrifyS")
    const [search, setSearch] = useState<Ingredient[] | null>([])
    const [editMealName, setEditMealName] = useState<{
        [key: number]: boolean
    }>({})
    const [mealName, setMealName] = useState<{ [key: number]: string }>({})
    const [meals, setMeals] = useState<Meal[]>([
        {
            name: "Meal #1",
            ingredients: [
                {
                    Name: "",
                    Code: "",
                    Amount: 100,
                },
            ],
            kcal: 0,
        },
    ])

    const handleIngredientSearch = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const searchValue = e.target.value.toLowerCase()
        setSearch(null)
        if (searchValue.length > 2) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/ingredients?filters[Name][$contains]=${searchValue}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    cache: "no-store",
                },
            )
            const data = await res.json()
            console.log("Data from search:", data)

            setSearch(data.data)
        } else {
            setSearch([])
        }
    }
    const handleAddNewMeal = () => {
        setMeals((prev) => [
            ...prev,
            {
                name: `Meal #${prev.length + 1}`,
                ingredients: [
                    {
                        Name: "",
                        Code: "",
                        Amount: 100,
                    },
                ],
                kcal: 0,
            },
        ])
    }
    const handleAddNewIngredient = (mealIndex: number) => {
        const newMeals = [...meals]
        newMeals[mealIndex].ingredients.push({
            Name: "",
            Code: "",
            Amount: 100,
        })
        setMeals(newMeals)
    }
    const handleRemoveIngredient = (mealIndex: number, ingIndex: number) => {
        const newMeals = [...meals]
        newMeals[mealIndex].ingredients.splice(ingIndex, 1)
        setMeals(newMeals)
    }
    return (
        <>
            <div className="flex w-full justify-start gap-4 py-10">
                <h1 className="text-DarkGreen font-Poppins text-4xl">
                    Calculate Meal
                </h1>
                <div>
                    <Button
                        variant="contained"
                        className="bg-DarkGreen! hover:bg-DarkGreen/80"
                        onClick={() => {
                            handleAddNewMeal()
                        }}
                    >
                        Add New Meal
                    </Button>
                </div>
            </div>

            <form className="text-DarkGreen flex flex-col gap-10">
                {meals.map((meal, index) => (
                    <div
                        key={index + meal.name}
                        className="flex w-full flex-col items-start gap-3"
                    >
                        <div className="flex w-full">
                            <div className="flex">
                                {editMealName[index] ? (
                                    <TextField
                                        label="Meal Name"
                                        value={mealName[index] ?? meal.name}
                                        onChange={(e) => {
                                            setMealName((prev) => ({
                                                ...prev,
                                                [index]: e.target.value,
                                            }))
                                        }}
                                    />
                                ) : (
                                    <h2 className="text-DarkGreen font-Poppins text-3xl">
                                        {meal.name}
                                    </h2>
                                )}
                                {!editMealName[index] ? (
                                    <Button
                                        className="block! min-w-0! px-2! py-2!"
                                        onClick={() => {
                                            setEditMealName((prev) => ({
                                                ...prev,
                                                [index]: true,
                                            }))
                                            setMealName((prev) => ({
                                                ...prev,
                                                [index]: meal.name,
                                            }))
                                        }}
                                    >
                                        <PencilSimple
                                            size={24}
                                            className="text-DarkGreen"
                                            weight="bold"
                                        ></PencilSimple>
                                    </Button>
                                ) : (
                                    <Button
                                        className="block! min-w-0! px-2! py-2!"
                                        onClick={() => {
                                            setMeals((prev) => {
                                                const newMeals = [...prev]
                                                newMeals[index].name =
                                                    mealName[index] || meal.name
                                                return newMeals
                                            })
                                            setEditMealName((prev) => ({
                                                ...prev,
                                                [index]: false,
                                            }))
                                        }}
                                    >
                                        <Check
                                            size={24}
                                            className="text-DarkGreen"
                                            weight="bold"
                                        ></Check>
                                    </Button>
                                )}
                                {meals.length > 1 && (
                                    <Button
                                        className="bg-DarkGreen! hover:bg-DarkGreen/80 block! min-w-0! px-2! py-2!"
                                        onClick={() => {
                                            const newMeals = [...meals]
                                            newMeals.splice(index, 1)
                                            setMeals(newMeals)
                                        }}
                                    >
                                        <Minus
                                            size={24}
                                            color="#FAF9F6"
                                            weight="regular"
                                        ></Minus>
                                    </Button>
                                )}
                            </div>
                            <div></div>
                        </div>
                        {meal.ingredients.map((ingredient, ingIndex) => (
                            <div
                                key={ingIndex + ingredient.Name}
                                className="flex gap-1"
                            >
                                <div className="flex w-full flex-col">
                                    <Stack spacing={2}>
                                        <Autocomplete
                                            freeSolo
                                            id={`autocomplete-${index}`}
                                            disableClearable
                                            options={search || []}
                                            getOptionLabel={(option) =>
                                                typeof option === "string"
                                                    ? option
                                                    : option.Name
                                            }
                                            onChange={(event, value) => {
                                                if (
                                                    value &&
                                                    typeof value !== "string"
                                                ) {
                                                    setMeals((prev) => {
                                                        const newMeals = [
                                                            ...prev,
                                                        ]
                                                        newMeals[
                                                            index
                                                        ].ingredients[
                                                            ingIndex
                                                        ] = {
                                                            ...value,
                                                            Amount: ingredient.Amount, // Keep existing amount
                                                        }
                                                        return newMeals
                                                    })
                                                }
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label={
                                                        ingredient.Name ||
                                                        "Ingredient #" +
                                                            (ingIndex + 1)
                                                    }
                                                    onChange={
                                                        handleIngredientSearch
                                                    }
                                                    slotProps={{
                                                        input: {
                                                            ...params.InputProps,
                                                            type: "search",
                                                        },
                                                    }}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <TextField
                                        label="Amount"
                                        onChange={(e) => {
                                            const newMeals = [...meals]
                                            newMeals[index].ingredients[
                                                ingIndex
                                            ].Amount = parseInt(e.target.value)
                                            setMeals(newMeals)
                                        }}
                                        slotProps={{
                                            input: {
                                                type: "number",
                                                value: ingredient.Amount,
                                            },
                                        }}
                                    />
                                </div>
                                {meal.ingredients.length > 1 && (
                                    <Button
                                        variant="contained"
                                        className="bg-DarkGreen! hover:bg-DarkGreen/80"
                                        onClick={() =>
                                            handleRemoveIngredient(
                                                index,
                                                ingIndex,
                                            )
                                        }
                                    >
                                        <Minus
                                            size={24}
                                            color="#FAF9F6"
                                            weight="regular"
                                        ></Minus>
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            variant="contained"
                            className="bg-DarkGreen! hover:bg-DarkGreen/80"
                            onClick={() => handleAddNewIngredient(index)}
                        >
                            Add Ingredient
                        </Button>
                    </div>
                ))}
            </form>
        </>
    )
}

export default CalculateMeal
