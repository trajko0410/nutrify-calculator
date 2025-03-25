"use client"
import React from "react"
import MainContainer from "../util/MainContainer"
import { ArrowCircleRight } from "@phosphor-icons/react"
import Image from "next/image"
import { Button } from "@mui/material"

type HookCardProps = {
    number: number
    title: string
    desc: string
    image: string
}

const HookCard: React.FC<HookCardProps> = ({ desc, image, number, title }) => {
    return (
        <div className="bg-DarkGreen flex min-w-[30%] shrink flex-col justify-between rounded-xl p-5 pb-[42px] text-white lg:p-10">
            <div className="flex flex-wrap gap-2 text-xl font-medium">
                <h2>{`${number}.`}</h2>
                <h2>{title}</h2>
            </div>
            <p className="py-10">{desc}</p>
            <div className="w-full rounded-xl">
                <Image
                    className="w-full"
                    src={image}
                    width={314}
                    height={142}
                    alt={title}
                />
            </div>
        </div>
    )
}

const HookSection: React.FC = () => {
    return (
        <div className="flex flex-col bg-white pt-8 pb-20 text-white">
            <MainContainer>
                <div className="bg-BlackGreen relative flex w-full flex-col items-center overflow-clip rounded-2xl px-10 pb-10">
                    <div className="z-10 my-6 mt-10 flex flex-wrap items-baseline gap-2">
                        <h2 className="text-CyanGreen text-5xl font-medium">
                            Hit your health goals in{" "}
                        </h2>
                        <h2 className="text-5xl font-medium">1-2-3</h2>
                    </div>
                    <p className="z-10 mb-8">
                        Facilitate payments from users to your customers
                    </p>
                    <div className="z-10 mb-10 flex items-center gap-4">
                        See documentation
                        <ArrowCircleRight weight="fill" size={24} />
                    </div>
                    <div className="z-10 flex flex-wrap justify-between gap-10 md:flex-nowrap">
                        <HookCard
                            number={1}
                            title="Track food, fitness & fasting"
                            desc="Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Arcu odio ut sem nulla pharetra."
                            image="/picture1.png"
                        />
                        <HookCard
                            number={2}
                            title="Get personalized insights"
                            desc="Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Arcu odio ut sem nulla pharetra."
                            image="/picture2.png"
                        />
                        <HookCard
                            number={3}
                            title="Stay motivated"
                            desc="Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Arcu odio ut sem nulla pharetra."
                            image="/picture3.png"
                        />
                    </div>
                    <Image
                        className="absolute top-0 left-0 w-full"
                        src={"/shape3.png"}
                        alt="shape"
                        width={1000}
                        height={1000}
                    />
                </div>
                <div className="flex flex-col items-center gap-10">
                    <p className="text-DarkGreen mt-10 max-w-[600px] text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Facilisis gravida neque convallis a cras
                        semper.
                    </p>
                    <Button className="bg-LightGreen! flex items-center rounded-xl! px-6! py-[14px]! font-bold! text-white! normal-case!">
                        Start your journey
                    </Button>
                </div>
            </MainContainer>
        </div>
    )
}

export default HookSection
