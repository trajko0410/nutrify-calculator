"use server"

import React from "react"
import MainContainer from "../util/MainContainer"
import { Button } from "@mui/material"

import { ImageCustom } from "../util/ImageCustom"

const TitleSection = () => {
    return (
        <>
            <div className="text-DarkGreen relative flex flex-row items-center overflow-clip bg-[#faf9f6] pt-0 pb-52 md:pt-52">
                <MainContainer>
                    <div className="relative z-20 flex flex-row flex-wrap-reverse items-center justify-between md:flex-nowrap">
                        <div className="z-20 flex flex-col gap-10 md:max-w-[510px] md:bg-transparent">
                            <h1 className="pt-5 text-6xl font-bold md:pt-0 md:text-[64px]">
                                Healthy Living Starts Here!
                            </h1>
                            <p className="">
                                At NutrifyS, we believe that a balanced
                                lifestyle is the cornerstone of well-being. Our
                                platform empowers you to take control of your
                                health journey with personalized tools and
                                insights..
                            </p>
                            <Button className="bg-LightGreen! max-w-[116px] px-4! py-[14px]! text-sm! text-white! normal-case!">
                                Start Now
                            </Button>
                        </div>
                        <div className="z-10 w-full md:max-h-[620px] md:max-w-[620px]">
                            <ImageCustom
                                alt="image"
                                src={"/image.png"}
                                height={1000}
                                width={1000}
                                className="w-full"
                            ></ImageCustom>
                        </div>
                    </div>
                </MainContainer>
                <ImageCustom
                    alt="image"
                    src={"/Group.svg"}
                    className="absolute right-0 bottom-0 z-0 w-full"
                    width={620}
                    height={620}
                ></ImageCustom>
            </div>
        </>
    )
}

export default TitleSection
