"use client"
import { useRouter, usePathname } from "next/navigation"
import React from "react"
import Cookies from "js-cookie"

type SideMenuOptionProps = {
    icon: React.ReactNode
    title?: string
    path: string
    isSignOut?: boolean
}

const SideMenuOption: React.FC<SideMenuOptionProps> = ({
    icon,
    path,
    title,
    isSignOut,
}) => {
    const router = useRouter()
    const pathname = usePathname() // Get the current active path
    const isSelected = pathname.startsWith(path)

    const handleClick = async () => {
        if (isSignOut) {

            Cookies.remove("jwtNutrifyS")
            router.push("/login") // Redirect to login or home page
            return
        }

        if (path === "/calculator") {
            router.push("/calculator/create-ingredient")
        } else {
            router.push(path)
        }
    }

    return (
        <button
            onClick={handleClick}
            className="group flex h-11 w-11 cursor-pointer items-center gap-5 rounded-lg"
        >
            <div
                className={`group-hover:bg-DarkGreen flex h-11 w-[43px] shrink-0 items-center justify-center rounded-lg group-hover:text-white ${
                    isSelected
                        ? "bg-DarkGreen text-white"
                        : "bg-transparent text-[#757575]"
                } ${
                    isSignOut &&
                    "bg-gray-100 text-[#FF5151] group-hover:bg-[#FF5151]"
                } transition duration-200 ease-in`}
            >
                {icon}
            </div>
            {title && (
                <div className="relative z-50 hidden min-h-11 rounded-lg transition duration-200 group-hover:flex">
                    <div className="bg-DarkGreen flex h-full w-full items-center justify-center rounded-lg px-[12px] py-[10px]">
                        {title}
                    </div>
                    <div className="bg-DarkGreen absolute top-[33%] -left-1 h-[12px] w-[12px] rotate-45"></div>
                </div>
            )}
        </button>
    )
}

export default SideMenuOption
