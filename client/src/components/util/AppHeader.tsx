"use client"
import React from "react"
import ProfileIcon from "../util/ProfileIcon"
import { useClerk } from "@clerk/nextjs"

const Header: React.FC = () => {
    const { session } = useClerk()
    session?.getToken().then((token) => console.log(token))
    return (
        <div className="fixed z-20 flex h-[76px] w-full items-center justify-end bg-white pr-4 shadow-[0_0_8px_rgba(0,0,0,0.25)]">
            <ProfileIcon />
        </div>
    )
}

export default Header
