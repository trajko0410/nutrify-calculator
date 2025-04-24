"use client"
import { User } from "@phosphor-icons/react"
import Image from "next/image"
import ParametarsIcon from "../util/ParametarsIcon"
import { useState } from "react"
import ConfirmNutritionistModal from "./confirmModal"

export type Testimonial = {
    userId: number
    comment: string
    rating: number
}

type Nutritionist = {
    id: number
    avatarPhoto: string
    name: string
    shortDescription: string
    location: string
    education: string
    rating: number
    yearOfExperience: number
    aboutMe: string
    email: string
    languages: string[]
    phone: string
    testimonial: Testimonial[]
}

type AboutNutritionistProps = {
    nutritionist: Nutritionist
}

const AboutNutritionist: React.FC<AboutNutritionistProps> = ({
    nutritionist,
}) => {
        const [modalOpen, setModalOpen] = useState(false)

        const openModalHadler = () => {
            setModalOpen(true)
        }
    
        const closeModalHandler = () => {
            setModalOpen(false)
        }
    
    return (
        <>
    
        <div className="shadow-Combined font-Poppins flex h-full flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] md:flex-row">
            <div className="flex w-full justify-center md:w-2/5">
                {nutritionist?.avatarPhoto === "" ||
                nutritionist?.avatarPhoto === undefined ? (
                    <div className="flex h-[265px] w-full items-center justify-center rounded-xl bg-[#F5F5F5]">
                        <User color="#00000033" size={100}></User>
                    </div>
                ) : (
                    <div className="relative h-[265px] w-full overflow-clip rounded-xl">
                        <Image
                            src={nutritionist.avatarPhoto}
                            alt={"avatarPhoto"}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}
            </div>
            <div className="flex w-full flex-col justify-between gap-6 md:w-3/5">
                <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-2xl font-medium text-[#2D3748]">
                            {nutritionist.name ?? "Name"}
                        </h3>
                        <p className="text-sm font-normal text-[#2D3748B2]">
                            {nutritionist.education ?? "Education"}
                        </p>
                    </div>
                    <button onClick={openModalHadler} className="bg-LightGreen flex h-[44px] min-w-[200px] items-center justify-center gap-4 rounded-lg px-4 text-sm font-medium text-[#FFFFFF]">
                        Hire Nutritionist
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium text-[#2D3748]">
                        About Me
                    </h2>
                    <h3 className="text-sm font-medium text-[#A0AEC0]">
                        {nutritionist.shortDescription}
                    </h3>
                </div>
                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <div className="flex flex-row items-center gap-4">
                        <ParametarsIcon
                            iconSize={24}
                            parametarName="Location"
                            containerSize={48}
                        ></ParametarsIcon>
                        <h5 className="text-lg font-medium text-[#2D3748]">
                            {nutritionist.location}
                        </h5>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <ParametarsIcon
                            iconSize={24}
                            parametarName="Rating"
                            containerSize={48}
                        ></ParametarsIcon>
                        <h5 className="text-lg font-medium text-[#2D3748]">
                            {nutritionist.rating
                                ? nutritionist.rating
                                : "no rating"}
                        </h5>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                        <ParametarsIcon
                            iconSize={24}
                            parametarName="Experience"
                            containerSize={48}
                        ></ParametarsIcon>
                        <h5 className="text-lg font-medium text-[#2D3748]">
                            {nutritionist.yearOfExperience
                                ? nutritionist.yearOfExperience
                                : "0"}{" "}
                            Years of Experience
                        </h5>
                    </div>
                </div>
            </div>
        </div>
        {modalOpen && (
                <ConfirmNutritionistModal closeModal={closeModalHandler} />
            )}
        </>
    )
}

export default AboutNutritionist
