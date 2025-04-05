import { NextResponse } from "next/server"

/// Only for testing since i dont have database yet
export interface GroceryItem {
    name: string
    amount: string
    groceryId: number
}

export interface Meal {
    id: number
    name: string
    description: string
    calories: number
    proteins: number
    fats: number
    carbohydrates: number
    grocerys: GroceryItem[]
    image: string | null
    authorUserId?: number | string | null
    preparationVideoUrl?: string | null
    detailePreparation?: PreperationType[] | null | undefined
}

export interface PreperationType {
    stepTitle?: string
    instructions?: string[]
}

interface Exercise {
    name: string
    sets: number
    reps: number | string
}

export interface Training {
    id: number
    name: string
    caloriesBurned: number
    duration: string
    exercises: Exercise[]
    image: string | null
    description: string
}

interface User {
    personId: number
    name: string
    subscribed: boolean
}

export enum MealType {
    Breakfast = "breakfast",
    Lunch = "lunch",
    Dinner = "dinner",
}

export interface DailyPlan {
    personId: number
    name: string
    mealPlan: {
        meal: Meal
        mealType: MealType
        time: string
    }[]
    trainingPlan:
        | {
              training: Training
              time: string
          }[]
        | null
}

type DailyPlansResponse = DailyPlan[]

export async function GET(): Promise<NextResponse> {
    const TodaysMeals: Meal[] = [
        {
            id: 1,
            name: "Grilled Chicken Salad",
            description:
                "Fresh mixed greens with grilled chicken, cherry tomatoes, and balsamic dressing.",
            calories: 450,
            proteins: 40,
            fats: 10,
            carbohydrates: 30,
            grocerys: [
                { name: "chicken", amount: "300gr", groceryId: 1 },
                { name: "lettuce", amount: "100gr", groceryId: 2 },
                { name: "tomatoes", amount: "50gr", groceryId: 3 },
            ],
            image: null,
        },
        {
            id: 2,
            name: "Spaghetti Carbonara",
            description:
                "Classic Italian pasta with creamy sauce, bacon, and parmesan cheese.",
            calories: 700,
            proteins: 35,
            fats: 25,
            carbohydrates: 80,
            grocerys: [
                { name: "spaghetti", amount: "200gr", groceryId: 4 },
                { name: "bacon", amount: "100gr", groceryId: 5 },
                { name: "parmesan", amount: "50gr", groceryId: 6 },
            ],
            image: null,
        },
        {
            id: 3,
            name: "Margherita Pizza",
            description:
                "Tomato sauce, fresh mozzarella, and basil on a thin crust.",
            calories: 900,
            proteins: 30,
            fats: 40,
            carbohydrates: 90,
            grocerys: [
                { name: "pizza dough", amount: "250gr", groceryId: 7 },
                { name: "mozzarella", amount: "150gr", groceryId: 8 },
                { name: "tomato sauce", amount: "100gr", groceryId: 9 },
            ],
            image: null,
        },
    ]

    const TodaysTraining: Training[] = [
        {
            id: 1,
            name: "Full Body Workout",
            caloriesBurned: 500,
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...",
            duration: "60",
            exercises: [
                { name: "Squats", sets: 4, reps: 12 },
                { name: "Bench Press", sets: 3, reps: 10 },
                { name: "Deadlifts", sets: 3, reps: 8 },
                { name: "Pull-ups", sets: 3, reps: 10 },
            ],
            image: null,
        },
        {
            id: 2,
            name: "Cardio Session",
            caloriesBurned: 300,
            duration: "45",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...",
            exercises: [
                { name: "Running", sets: 1, reps: "30 minutes" },
                { name: "Jump Rope", sets: 3, reps: "5 minutes" },
                { name: "Cycling", sets: 1, reps: "15 minutes" },
            ],
            image: null,
        },
    ]

    const User: User[] = [
        { personId: 11, name: "John Doe", subscribed: true },
        { personId: 12, name: "Jane Doe", subscribed: false },
    ]

    const dailyPlans: DailyPlansResponse = User.map((user) => {
        const mealPlan = user.subscribed
            ? [
                  {
                      meal: TodaysMeals[0],
                      mealType: MealType.Breakfast,
                      time: "2025-03-31T09:30:00Z",
                  },
                  {
                      meal: TodaysMeals[1],
                      mealType: MealType.Lunch,
                      time: "2025-04-05T13:00:00Z",
                  },
                  {
                      meal: TodaysMeals[2],
                      mealType: MealType.Dinner,
                      time: "2025-04-02T19:30:00Z",
                  },
              ]
            : []

        const trainingPlan = user.subscribed
            ? [
                  {
                      training: TodaysTraining[0],
                      time: "2025-04-02T17:00:00Z",
                  },
                  {
                      training: TodaysTraining[1],
                      time: "2025-04-02T16:00:00Z",
                  },
              ]
            : []

        return {
            personId: user.personId,
            name: user.name,
            mealPlan,
            trainingPlan,
        }
    })

    return NextResponse.json(dailyPlans)
}
