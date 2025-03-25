"use server"

import React from "react"
import Marquee from "react-fast-marquee"
import { ImageCustom } from "../util/ImageCustom"

type SponsorSectionProps = {
    logos: string[]
}

const SponsorSection: React.FC<SponsorSectionProps> = ({ logos }) => {
    return (
        <div className="flex h-full max-h-[232px] w-full flex-col items-center justify-between bg-white py-8">
            <p className="text-BlackGreen pb-8 text-[16px]">TRUSTED BY</p>
            <Marquee
                speed={50}
                gradient={true}
                autoFill={true}
                gradientWidth={200}
                style={{
                    backgroundColor: "white",
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "stretch",
                    maxWidth: "1050px",
                }}
            >
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="flex h-20 w-40 items-center justify-center"
                    >
                        <ImageCustom
                            src={logo}
                            width={800}
                            height={100}
                            alt={`logo-${index}`}
                            className="px-10"
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    )
}

export default SponsorSection
