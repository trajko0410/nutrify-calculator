"use client"
import React from "react"
import ProfileIcon from "../util/ProfileIcon"
import Image from "next/image"

const Header: React.FC = () => {
    return (
        <div className="fixed z-20 flex h-[76px] w-full items-center justify-between bg-white px-[24px] shadow-[0_0_8px_rgba(0,0,0,0.25)]">
            <div className="visible flex h-16 w-16 items-center justify-center md:invisible">
                <Image
                    src="https://res.cloudinary.com/dwiuj7jqw/image/upload/t_upscale_and_bmp/Screenshot_2025_05_08_at_13_42_03_e0cc206919"
                    alt="logo"
                    width={128}
                    height={128}
                />
            </div>
            <ProfileIcon />
        </div>
    )
}

export default Header
