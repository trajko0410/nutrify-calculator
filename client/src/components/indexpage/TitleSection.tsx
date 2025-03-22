import React from "react"
import MainContainer from "../util/MainContainer"
import { Button } from "@mui/material"
import Image from "next/image"

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
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit —sed do eiusmod tempor
                                incididunt ut labore et dolore magna.Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <Button className="bg-LightGreen! max-w-[116px] px-4! py-[14px]! text-sm! text-white! normal-case!">
                                Start Now
                            </Button>
                        </div>
                        <div className="z-10 w-full md:max-h-[620px] md:max-w-[620px]">
                            <Image
                                alt="image"
                                src={"/image.png"}
                                height={1000}
                                width={1000}
                                className="w-full"
                            ></Image>
                        </div>
                    </div>
                </MainContainer>
                <Image
                    alt="image"
                    src={"/Group.svg"}
                    className="absolute right-0 bottom-0 z-0 w-full"
                    width={620}
                    height={620}
                ></Image>
            </div>
        </>
    )
}

export default TitleSection
