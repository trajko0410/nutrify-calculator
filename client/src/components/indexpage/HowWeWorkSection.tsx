"use server"

import React from "react"
import MainContainer from "../util/MainContainer"

import ArrowCircleRightIcon from "./util/ArrowCircleRightIcon"
import { ImageCustom } from "../util/ImageCustom"

type ExplainCardProps = {
    title: string
    description: string
    image: string
    linkText: string
    link: string
    variant: "left" | "right"
}

const ExplainCard: React.FC<ExplainCardProps> = ({
    description,
    image,
    link,
    linkText,
    title,
    variant,
}) => {
    return (
        <div
            className={`flex justify-between md:rounded-2xl ${
                variant == "left"
                    ? "bg-Cream flex-row flex-wrap md:flex-nowrap"
                    : "flex-row-reverse flex-wrap bg-white md:flex-nowrap"
            } md:p-5`}
        >
            <div className="flex flex-col px-16 py-16 md:max-w-[500px]">
                <h2 className="font-Poppins text-[28px] font-bold">{title}</h2>
                <p className="my-10">{description}</p>
                <a href={link} className="flex items-center gap-2 font-medium">
                    {linkText}
                    <ArrowCircleRightIcon
                        weight="fill"
                        size={24}
                        className="fill-BlackGreen"
                    />
                </a>
            </div>
            <div className="flex w-full items-center md:max-w-1/2">
                <ImageCustom
                    src={image}
                    alt="image"
                    width={1000}
                    height={486}
                />
            </div>
        </div>
    )
}

const HowWeWorkSection = () => {
    return (
        <div className="text-DarkGreen flex flex-col items-center bg-[#FAF9F6] py-40">
            <div className="flex max-w-[500px] flex-col items-center gap-8 text-center">
                <h1 className="text-5xl font-medium">How we work?</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit —sed
                    do eiusmod tempor.
                </p>
            </div>
            <MainContainer>
                <div className="flex flex-col py-24 md:gap-10 lg:px-32">
                    <ExplainCard
                        title="Start your journey as a Nutritionist"
                        description="Join our network to offer your expertise to a broader audience. Utilize our tools to manage clients, create meal plans, and track progress efficiently."
                        image="/work1.png"
                        link="/"
                        linkText="Register as a Nutritionist"
                        variant="left"
                    />
                    <ExplainCard
                        title="Start your journey as a Patient"
                        description="Embark on a personalized health journey with guidance from certified nutritionists. Access customized plans and track your improvements over time."
                        image="/work2.png"
                        link="/"
                        linkText="Register as a Patient"
                        variant="right"
                    />
                </div>
            </MainContainer>
        </div>
    )
}

export default HowWeWorkSection
