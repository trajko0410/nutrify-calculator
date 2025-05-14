"use client"
import { Ingredient, Meal, Recipe } from "@/utils/types"
import { Autocomplete, Button, Input, Stack, TextField } from "@mui/material"
import React, { useState } from "react"
import Cookies from "js-cookie"
import { Check, Minus, PencilSimple } from "@phosphor-icons/react"

const CalculateMeal: React.FC = () => {
    const token = Cookies.get("jwtNutrifyS")
    const [searchIngredients, setSearchIngredients] = useState<
        Ingredient[] | null
    >([])
    const [searchRecipes, setSearchRecipes] = useState<Recipe[] | null>([])

    const [editMealName, setEditMealName] = useState<{
        [key: number]: boolean
    }>({})
    const [mealName, setMealName] = useState<{ [key: number]: string }>({})
    const [meals, setMeals] = useState<Meal[]>([
        {
            name: "Meal #1",
            recipes: [
                {
                    Name: "",
                    carbohydrates: 0,
                    fat: 0,
                    glycemicLoad: 0,
                    kcal: 0,
                    protein: 0,
                    preparation: "",
                    Ingredients: [
                        {
                            Name: "",
                            Code: "",
                            Amount: 100,
                        },
                    ],
                },
            ],
            kcal: 0,
            protein: 0,
            fat: 0,
            carbohydrates: 0,
            glycemicLoad: 0,
        },
    ])
    const [mealPlanName, setMealPlanName] = useState("")

    const handleIngredientSearch = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const searchValue = e.target.value.toLowerCase()
        setSearchIngredients(null)
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

            setSearchIngredients(data.data)
        } else {
            setSearchIngredients([])
        }
    }

    const handleRecipeSearch = async (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const searchValue = e.target.value.toLowerCase()
        setSearchRecipes(null)
        if (searchValue.length > 2) {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/recipes?filters[Name][$contains]=${searchValue}&populate=Ingredients`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    cache: "no-store",
                },
            )
            const data = await res.json()
            console.log("Data from search:", data)

            setSearchRecipes(data.data)
        } else {
            setSearchRecipes([])
        }
    }

    const handleAddNewMeal = () => {
        setMeals((prev) => [
            ...prev,
            {
                recipes: [
                    {
                        Name: "Recipe #1",
                        Ingredients: [
                            {
                                Name: "",
                                Code: "",
                                Amount: 100,
                            },
                        ],
                        kcal: 0,
                        protein: 0,
                        fat: 0,
                        carbohydrates: 0,
                        glycemicLoad: 0,
                    },
                ],
                name: `Meal #${prev.length + 1}`,
                kcal: 0,
                protein: 0,
                fat: 0,
                carbohydrates: 0,
                glycemicLoad: 0,
            },
        ])
    }
    const handleAddNewIngredient = (mealIndex: number, recIndex: number) => {
        const newMeals = [...meals]
        newMeals[mealIndex].recipes[recIndex].Ingredients.push({
            Name: "",
            Code: "",
            Amount: 100,
            Kcal: 0,
        })
        setMeals(newMeals)
    }
    const handleRemoveIngredient = (
        mealIndex: number,
        recIndex: number,
        ingIndex: number,
    ) => {
        setMeals((prevMeals) => {
            const updatedMeals = [...prevMeals]
            const updatedMeal = { ...updatedMeals[mealIndex] }
            const updatedIngredients = [
                ...updatedMeal.recipes[recIndex].Ingredients,
            ]

            updatedIngredients.splice(ingIndex, 1)

            updatedMeal.recipes[recIndex].Ingredients = updatedIngredients
            updatedMeals[mealIndex] = calculateMealNutrition(updatedMeal)

            return updatedMeals
        })
    }
    const calculateMealNutrition = (meal: Meal): Meal => {
        const totals = {
            kcal: 0,
            protein: 0,
            fat: 0,
            carbohydrates: 0,
            glycemicLoad: 0,
        }

        for (const recipe of meal.recipes) {
            for (const ingredient of recipe.Ingredients) {
                const amount = ingredient.Amount ?? 0
                totals.kcal += ((ingredient.Kcal ?? 0) / 100) * amount
                totals.protein +=
                    ((ingredient.Protein_total ?? 0) / 100) * amount
                totals.fat += ((ingredient.Fat_total ?? 0) / 100) * amount
                totals.carbohydrates +=
                    ((ingredient.Carbohydrates_total ?? 0) / 100) * amount
                totals.glycemicLoad +=
                    ((ingredient.Glycemic_load ?? 0) / 100) * amount
            }
        }

        return {
            ...meal,
            ...totals,
        }
    }
    const calculateTotalNutrition = () => {
        const totals = {
            kcal: 0,
            protein: 0,
            fat: 0,
            carbohydrates: 0,
            glycemicLoad: 0,
        }
        for (const meal of meals) {
            totals.kcal += meal.kcal
            totals.protein += meal.protein
            totals.fat += meal.fat
            totals.carbohydrates += meal.carbohydrates
            totals.glycemicLoad += meal.glycemicLoad
        }
        return totals
    }

    return (
        <>
            <div className="w-full pt-30 pb-10">
                <div className="flex w-full justify-between gap-4 pb-10">
                    <div className="flex gap-10">
                        <h1 className="text-DarkGreen font-Poppins text-4xl">
                            Create Meal Plan
                        </h1>
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
                    <div className="flex gap-10">
                        <Input
                            placeholder="Meal Plan Name"
                            className="w-full max-w-[300px] bg-white px-5"
                            slotProps={{
                                input: {
                                    type: "search",
                                },
                            }}
                            onChange={(e) => {
                                setMealPlanName(e.target.value)
                            }}
                            value={mealPlanName}
                        />
                        <Button
                            variant="contained"
                            className="bg-DarkGreen! hover:bg-DarkGreen/80 w-full"
                            onClick={() => {
                                console.log("Save meal plan")
                            }}
                        >
                            Save Meal Plan
                        </Button>
                    </div>
                </div>
                <div className="flex w-full gap-100">
                    <div className="flex flex-col gap-10">
                        <form className="text-DarkGreen flex flex-col gap-10">
                            {meals.map((meal, index) => (
                                <div
                                    key={index + meal.name}
                                    className="flex w-full flex-col items-start gap-3"
                                >
                                    <div className="flex w-full">
                                        <div className="flex w-full justify-between">
                                            <div className="flex items-center gap-3">
                                                {editMealName[index] ? (
                                                    <TextField
                                                        label="Meal Name"
                                                        value={
                                                            mealName[index] ??
                                                            meal.name
                                                        }
                                                        onChange={(e) => {
                                                            setMealName(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [index]:
                                                                        e.target
                                                                            .value,
                                                                }),
                                                            )
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
                                                            setEditMealName(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [index]:
                                                                        true,
                                                                }),
                                                            )
                                                            setMealName(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [index]:
                                                                        meal.name,
                                                                }),
                                                            )
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
                                                                const newMeals =
                                                                    [...prev]
                                                                newMeals[
                                                                    index
                                                                ].name =
                                                                    mealName[
                                                                        index
                                                                    ] ||
                                                                    meal.name
                                                                return newMeals
                                                            })
                                                            setEditMealName(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [index]:
                                                                        false,
                                                                }),
                                                            )
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
                                                        className="bg-DarkGreen! hover:bg-DarkGreen/80 flex! h-9 w-9 min-w-0! justify-center px-0! py-0!"
                                                        onClick={() => {
                                                            const newMeals = [
                                                                ...meals,
                                                            ]
                                                            newMeals.splice(
                                                                index,
                                                                1,
                                                            )
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
                                                <Button
                                                    variant="contained"
                                                    className="bg-DarkGreen! hover:bg-DarkGreen/80"
                                                    onClick={() => {}}
                                                >
                                                    Add Recipe
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    {meal.recipes.map((recipe, recIndex) => (
                                        <div
                                            key={recIndex + recipe.Name}
                                            className="flex w-full flex-col gap-3"
                                        >
                                            <div className="flex w-full flex-col">
                                                <Stack spacing={2}>
                                                    <Autocomplete
                                                        freeSolo
                                                        id={`autocomplete-${index}`}
                                                        disableClearable
                                                        options={
                                                            searchRecipes || []
                                                        }
                                                        getOptionLabel={(
                                                            option,
                                                        ) =>
                                                            typeof option ===
                                                            "string"
                                                                ? option
                                                                : option.Name
                                                        }
                                                        onChange={(
                                                            event,
                                                            value,
                                                        ) => {
                                                            if (
                                                                value &&
                                                                typeof value !==
                                                                    "string"
                                                            ) {
                                                                setMeals(
                                                                    (prev) => {
                                                                        return prev.map(
                                                                            (
                                                                                meal,
                                                                                mealIdx,
                                                                            ) => {
                                                                                if (
                                                                                    mealIdx !==
                                                                                    index
                                                                                )
                                                                                    return meal

                                                                                const updatedRecipes =
                                                                                    meal.recipes.map(
                                                                                        (
                                                                                            r,
                                                                                            rIdx,
                                                                                        ) => {
                                                                                            if (
                                                                                                rIdx !==
                                                                                                recIndex
                                                                                            )
                                                                                                return r

                                                                                            return {
                                                                                                ...value,
                                                                                                Ingredients:
                                                                                                    value.Ingredients ??
                                                                                                    [],
                                                                                                kcal:
                                                                                                    value.kcal ??
                                                                                                    0,
                                                                                                protein:
                                                                                                    value.protein ??
                                                                                                    0,
                                                                                                fat:
                                                                                                    value.fat ??
                                                                                                    0,
                                                                                                carbohydrates:
                                                                                                    value.carbohydrates ??
                                                                                                    0,
                                                                                                glycemicLoad:
                                                                                                    value.glycemicLoad ??
                                                                                                    0,
                                                                                                preparation:
                                                                                                    value.preparation ??
                                                                                                    "",
                                                                                                Name:
                                                                                                    value.Name ??
                                                                                                    "Recipe",
                                                                                            }
                                                                                        },
                                                                                    )

                                                                                const updatedMeal: Meal =
                                                                                    {
                                                                                        ...meal,
                                                                                        recipes:
                                                                                            updatedRecipes,
                                                                                    }

                                                                                return calculateMealNutrition(
                                                                                    updatedMeal,
                                                                                )
                                                                            },
                                                                        )
                                                                    },
                                                                )
                                                            }
                                                        }}
                                                        renderInput={(
                                                            params,
                                                        ) => (
                                                            <TextField
                                                                {...params}
                                                                label={
                                                                    recipe.Name ||
                                                                    "Recipe #" +
                                                                        (recIndex +
                                                                            1)
                                                                }
                                                                onChange={
                                                                    handleRecipeSearch
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
                                            {recipe.Ingredients.map(
                                                (ingredient, ingIndex) => (
                                                    <div
                                                        key={
                                                            ingIndex +
                                                            recipe.Name +
                                                            ingredient.Name
                                                        }
                                                        className="flex gap-1"
                                                    >
                                                        <div className="flex w-full flex-col">
                                                            <Stack spacing={2}>
                                                                <Autocomplete
                                                                    freeSolo
                                                                    id={`autocomplete-${index}`}
                                                                    disableClearable
                                                                    options={
                                                                        searchIngredients ||
                                                                        []
                                                                    }
                                                                    getOptionLabel={(
                                                                        option,
                                                                    ) =>
                                                                        typeof option ===
                                                                        "string"
                                                                            ? option
                                                                            : option.Name
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                        value,
                                                                    ) => {
                                                                        if (
                                                                            value &&
                                                                            typeof value !==
                                                                                "string"
                                                                        ) {
                                                                            setMeals(
                                                                                (
                                                                                    prev,
                                                                                ) => {
                                                                                    const newMeals =
                                                                                        [
                                                                                            ...prev,
                                                                                        ]
                                                                                    newMeals[
                                                                                        index
                                                                                    ].recipes[
                                                                                        recIndex
                                                                                    ].Ingredients[
                                                                                        ingIndex
                                                                                    ] =
                                                                                        {
                                                                                            ...value,
                                                                                            Name: ingredient.Name,
                                                                                            Amount:
                                                                                                ingredient.Amount ??
                                                                                                100,
                                                                                        }
                                                                                    newMeals[
                                                                                        index
                                                                                    ] =
                                                                                        calculateMealNutrition(
                                                                                            newMeals[
                                                                                                index
                                                                                            ],
                                                                                        )
                                                                                    return newMeals
                                                                                },
                                                                            )
                                                                        }
                                                                    }}
                                                                    renderInput={(
                                                                        params,
                                                                    ) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label={
                                                                                ingredient.Name ||
                                                                                "Ingredient #" +
                                                                                    (ingIndex +
                                                                                        1)
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
                                                                onChange={(
                                                                    e,
                                                                ) => {
                                                                    const amount =
                                                                        parseInt(
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        ) || 0
                                                                    setMeals(
                                                                        (
                                                                            prev,
                                                                        ) => {
                                                                            const newMeals =
                                                                                [
                                                                                    ...prev,
                                                                                ]
                                                                            newMeals[
                                                                                index
                                                                            ].recipes[
                                                                                recIndex
                                                                            ].Ingredients[
                                                                                ingIndex
                                                                            ].Amount =
                                                                                amount
                                                                            newMeals[
                                                                                index
                                                                            ] =
                                                                                calculateMealNutrition(
                                                                                    newMeals[
                                                                                        index
                                                                                    ],
                                                                                )
                                                                            return newMeals
                                                                        },
                                                                    )
                                                                }}
                                                                slotProps={{
                                                                    input: {
                                                                        type: "number",
                                                                        value: ingredient.Amount,
                                                                    },
                                                                }}
                                                            />
                                                        </div>
                                                        {recipe.Ingredients
                                                            .length > 1 && (
                                                            <Button
                                                                variant="contained"
                                                                className="bg-DarkGreen! hover:bg-DarkGreen/80"
                                                                onClick={() =>
                                                                    handleRemoveIngredient(
                                                                        index,
                                                                        recIndex,
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
                                                ),
                                            )}
                                            <Button
                                                variant="contained"
                                                className="bg-DarkGreen! hover:bg-DarkGreen/80"
                                                onClick={() =>
                                                    handleAddNewIngredient(
                                                        index,
                                                        recIndex,
                                                    )
                                                }
                                            >
                                                Add Ingredient
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </form>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-DarkGreen font-Poppins pb-5 text-4xl">
                            Result
                        </h1>
                        {meals.map((meal, index: number) => (
                            <div
                                key={meal.name + index}
                                className="flex w-full flex-col"
                            >
                                <div className="flex w-full justify-between">
                                    <h3 className="text-DarkGreen font-Poppins flex items-center pr-4 text-2xl">
                                        {mealName[index] ?? meal.name}
                                    </h3>
                                    <div className="flex max-w-[80%] gap-3">
                                        <TextField
                                            disabled
                                            label="Calories"
                                            className="max-w-[120px]!"
                                            value={meal.kcal}
                                            slotProps={{
                                                input: {
                                                    type: "number",
                                                },
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label="Protein"
                                            className="max-w-[120px]!"
                                            value={meal.protein}
                                            slotProps={{
                                                input: {
                                                    type: "number",
                                                },
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label="Fat"
                                            className="max-w-[120px]!"
                                            value={meal.fat}
                                            slotProps={{
                                                input: {
                                                    type: "number",
                                                },
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label="Carbohydrates"
                                            className="max-w-[120px]!"
                                            value={meal.carbohydrates}
                                            slotProps={{
                                                input: {
                                                    type: "number",
                                                },
                                            }}
                                        />
                                        <TextField
                                            disabled
                                            label="Glycemic Load"
                                            className="max-w-[120px]!"
                                            value={meal.glycemicLoad}
                                            slotProps={{
                                                input: {
                                                    type: "number",
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                                {index === meals.length - 1 && (
                                    <div className="flex w-full flex-col gap-3 py-4">
                                        <div className="bg-DarkGreen h-[3px] w-full"></div>
                                        <div className="flex w-full justify-between">
                                            <h3 className="text-DarkGreen font-Poppins flex items-center pr-4 text-2xl">
                                                Total
                                            </h3>
                                            <div className="flex max-w-[80%] gap-3">
                                                <TextField
                                                    disabled
                                                    label="Calories"
                                                    className="max-w-[120px]!"
                                                    value={
                                                        calculateTotalNutrition()
                                                            .kcal
                                                    }
                                                    slotProps={{
                                                        input: {
                                                            type: "number",
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Protein"
                                                    className="max-w-[120px]!"
                                                    value={
                                                        calculateTotalNutrition()
                                                            .protein
                                                    }
                                                    slotProps={{
                                                        input: {
                                                            type: "number",
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Fat"
                                                    className="max-w-[120px]!"
                                                    value={meal.fat}
                                                    slotProps={{
                                                        input: {
                                                            type: "number",
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Carbohydrates"
                                                    className="max-w-[120px]!"
                                                    value={
                                                        calculateTotalNutrition()
                                                            .carbohydrates
                                                    }
                                                    slotProps={{
                                                        input: {
                                                            type: "number",
                                                        },
                                                    }}
                                                />
                                                <TextField
                                                    disabled
                                                    label="Glycemic Load"
                                                    className="max-w-[120px]!"
                                                    value={
                                                        calculateTotalNutrition()
                                                            .glycemicLoad
                                                    }
                                                    slotProps={{
                                                        input: {
                                                            type: "number",
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CalculateMeal
