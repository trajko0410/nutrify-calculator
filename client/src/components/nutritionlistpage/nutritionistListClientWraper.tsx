"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import FilterButton from "./filterButton"
import SingleNutritionist from "./singleNutritionist"

import NutritionistListLoader from "../skeletonLoaders/nutritionistListLoader"
import FilterNutritionistModal from "./filterModal"

const nutritionistList = [
    {
        id: 1,
        avatarPhoto: "",
        name: "John Doe",
        shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        education: "Bachelor's in Nutrition",
        location: "New York",
        rating: 4.5,
        yearOfExperience: 5,
        aboutMe:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ut mauris at congue. Sed id molestie massa. Fusce ac lacus diam. Maecenas varius felis vitae eleifend congue. Maecenas porttitor felis sit amet gravida facilisis. Vivamus in dui feugiat, interdum quam et, posuere quam.",
        email: "test@gmail.com",
        languages: ["Serbian", "English"],
        phone: "+38144444444444",
    },
    {
        id: 2,
        avatarPhoto: "",
        name: "Jane Smith",
        shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        education: "Master's in Nutrition",
        location: "Los Angeles",
        rating: 4.8,
        yearOfExperience: 7,
        aboutMe:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ut mauris at congue. Sed id molestie massa. Fusce ac lacus diam. Maecenas varius felis vitae eleifend congue. Maecenas porttitor felis sit amet gravida facilisis. Vivamus in dui feugiat, interdum quam et, posuere quam.",
        email: "test@gmail.com",
        languages: ["Serbian", "English"],
        phone: "+38144444444444",
    },
    {
        id: 3,
        avatarPhoto: "",
        name: "Alice Johnson",
        shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        location: "Chicago",
        education: "PhD in Nutrition",
        rating: 4.2,
        yearOfExperience: 3,
        aboutMe:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ut mauris at congue. Sed id molestie massa. Fusce ac lacus diam. Maecenas varius felis vitae eleifend congue. Maecenas porttitor felis sit amet gravida facilisis. Vivamus in dui feugiat, interdum quam et, posuere quam.",
        email: "test@gmail.com",
        languages: ["Serbian", "English"],
        phone: "+38144444444444",
    },
    {
        id: 4,
        avatarPhoto: "",

        name: "Bob Brown",
        shortDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        location: "Houston",
        education: "Bachelor's in Nutrition",
        rating: 4.9,
        yearOfExperience: 10,
        aboutMe:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada ut mauris at congue. Sed id molestie massa. Fusce ac lacus diam. Maecenas varius felis vitae eleifend congue. Maecenas porttitor felis sit amet gravida facilisis. Vivamus in dui feugiat, interdum quam et, posuere quam.",
        email: "test@gmail.com",
        languages: ["Serbian", "English"],
        phone: "+38144444444444",
    },
]

export default function NutritionListClientWrapper() {
    const [data, setData] = useState<typeof nutritionistList>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()

    const [modalOpen, setModalOpen] = useState(false)

    const name = searchParams.get("name")
    const location = searchParams.get("location")
    const minRating = searchParams.get("minRating")
    const maxRating = searchParams.get("maxRating")
    const yearOfExperience = searchParams.get("yearOfExperience")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const query = new URLSearchParams()
            if (name) query.set("name", name)
            if (location) query.set("location", location)
            if (minRating) query.set("minRating", minRating)
            if (maxRating) query.set("maxRating", maxRating)
            if (yearOfExperience)
                query.set("yearOfExperience", yearOfExperience)

            console.log("Query:", query.toString())
            setTimeout(() => {
                setData(nutritionistList)
                setLoading(false)
            }, 1000) // 1 sek delite setTimout when we get real api
        }

        fetchData()
    }, [name, location, minRating, maxRating, yearOfExperience])


    const openModalHadler = () => {
        setModalOpen(true)
    }

    const closeModalHandler = () => {
        setModalOpen(false)
    }

    return (
        <>
            <div className="flex w-full flex-col justify-between gap-2 text-black md:flex-row md:items-center">
                <div>
                    <h2 className="text-DarkGreen font-Poppins text-2xl font-medium">
                        List of our Nutritionists
                    </h2>
                    <p className="text-lg font-normal text-[#757575]">
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
                <FilterButton openModal={openModalHadler} />
            </div>
            <div className="flex-col bg-[#FAF9F6]">
                {loading ? (
                    <NutritionistListLoader />
                ) : !data ? (
                    <div className="text-black">No data</div>
                ) : data.length === 0 ? (
                    // Show "no results" only if loading is done AND data is empty
                    <div className="text-center text-gray-500">
                        No nutritionists found.
                    </div>
                ) : (
                    <div className="mt-6 grid w-full gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {data.map((nutritionistData) => (
                            <SingleNutritionist
                                key={nutritionistData.id}
                                nutritionist={nutritionistData}
                            />
                        ))}
                    </div>
                )}
            </div>
            {modalOpen && (
                <FilterNutritionistModal closeModal={closeModalHandler} />
            )}
        </>
    )
}
