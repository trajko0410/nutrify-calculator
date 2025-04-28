"use client"
import React from "react"
import ProfileIcon from "../util/ProfileIcon"
import Image from "next/image"

const Header: React.FC = () => {
    return (
        <div className="fixed z-20 flex h-[76px] w-full items-center justify-between bg-white px-[24px] shadow-[0_0_8px_rgba(0,0,0,0.25)]">
            <div className="visible flex h-11 w-11 items-center justify-center md:invisible">
                <Image src="/Vector.svg" alt="logo" width={32} height={32} />
            </div>
            <ProfileIcon />
        </div>
    )
}

export default Header
