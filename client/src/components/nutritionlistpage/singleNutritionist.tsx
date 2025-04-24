"use client"

import Image from "next/image"
import avatarImage from "../../../public/avatarImage.jpeg"
import ParametarsIcon from "../util/ParametarsIcon"
import { ArrowRight } from "@phosphor-icons/react"
import Link from "next/link"

type NutritionistProp = {
    nutritionist: {
        id: number | string
        avatarPhoto: string
        name: string
        shortDescription: string
        education: string
        location: string
        rating: number
        yearOfExperience: number
    }
}
const SingleNutritionist: React.FC<NutritionistProp> = ({ nutritionist }) => {
    return (
        <div className="shadow-Combined font-Poppins flex flex-col gap-[16px] rounded-xl bg-[#FFFFFF] p-6">
            <div className="flex w-full flex-row gap-4">
                <div className="h-[64px] w-[64px] overflow-clip rounded-full">
                    <Image
                        src={
                            nutritionist.avatarPhoto
                                ? nutritionist.avatarPhoto
                                : avatarImage
                        }
                        alt={"avatar photo"}
                        height={64}
                        width={64}
                    ></Image>
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-xl font-medium text-[#2D3748]">
                        {nutritionist.name}
                    </h3>
                    <h4 className="text-sm font-normal text-[#A0AEC0]">
                        {nutritionist.education}
                    </h4>
                </div>
            </div>
            <div className="h-[1px] bg-[#D9D9D9]"></div>
            <div className="flex flex-col gap-4">
                <h4 className="text-sm font-medium text-[#2D3748]">Ablut me</h4>
                <p
                    className={`text-sm leading-[140%] font-normal text-wrap text-clip text-[#A0AEC0]`}
                >
                    {nutritionist?.shortDescription
                        ? nutritionist?.shortDescription?.length > 120
                            ? nutritionist?.shortDescription.slice(0, 120) +
                              "..."
                            : nutritionist?.shortDescription
                        : "Description of your training..."}
                </p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4">
                    <ParametarsIcon
                        iconSize={14}
                        parametarName="Location"
                        containerSize={24}
                    ></ParametarsIcon>
                    <h5 className="text-sm font-medium text-[#2D3748]">
                        {nutritionist.location}
                    </h5>
                </div>
                <div className="flex flex-row gap-4">
                    <ParametarsIcon
                        iconSize={14}
                        parametarName="Rating"
                        containerSize={24}
                    ></ParametarsIcon>
                    <h5 className="text-sm font-medium text-[#2D3748]">
                        {nutritionist.rating
                            ? nutritionist.rating
                            : "no rating"}
                    </h5>
                </div>
                <div className="flex flex-row gap-4">
                    <ParametarsIcon
                        iconSize={14}
                        parametarName="Experience"
                        containerSize={24}
                    ></ParametarsIcon>
                    <h5 className="text-sm font-medium text-[#2D3748]">
                        {nutritionist.yearOfExperience
                            ? nutritionist.yearOfExperience
                            : "0"}{" "}
                        Years of Experience
                    </h5>
                </div>
            </div>
            <div className="h-[1px] bg-[#D9D9D9]"></div>
            <div className="flex justify-end">
                <Link
                    href={`nutritionistlist/nutritionist/${nutritionist.id}`}
                    className="flex w-fit flex-row items-center gap-4"
                >
                    <p className="text-xs font-medium text-[#2D3748]">
                        View Profile
                    </p>
                    <ArrowRight size={12} color="black" />
                </Link>
            </div>
        </div>
    )
}

export default SingleNutritionist
