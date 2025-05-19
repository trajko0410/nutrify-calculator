import { Recipe } from "./types"

export const calculatreRecipeParametars = (recipe: Recipe) => {
    return recipe?.Ingredients?.reduce(
        (acc, ing) => {
            const usedAmount = ing.Amount ?? 0
            const referenceAmount = ing?.ingredient.Amount ?? 100

            acc.kcal +=
                (ing.ingredient.Kcal ?? 0) * (usedAmount / referenceAmount)
            acc.protein +=
                (ing.ingredient.Protein_total ?? 0) *
                (usedAmount / referenceAmount)
            acc.fat +=
                (ing.ingredient.Fat_total ?? 0) * (usedAmount / referenceAmount)
            acc.carbohydrates +=
                (ing.ingredient.Carbohydrates_total ?? 0) *
                (usedAmount / referenceAmount)

            return acc
        },
        {
            kcal: 0,
            protein: 0,
            fat: 0,
            carbohydrates: 0,
        },
    )
}
