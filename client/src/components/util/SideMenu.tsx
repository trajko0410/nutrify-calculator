"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import SideMenuOption from "./SideMenuOption"
import {
    Barbell,
    Calculator,
    ForkKnife,
    Gear,
    HouseSimple,
    Notebook,
    SignOut,
} from "@phosphor-icons/react"
import ExtendedSideMenu from "./ExtendedSideMenu"
import { MenuOption } from "@/utils/types"
import Cookies from "js-cookie"

const SideMenu: React.FC = () => {
    const [menuOptions, setMenuOptions] = useState<MenuOption[]>([])

    useEffect(() => {
        const fetchUserRole = async () => {
            const token = Cookies.get("jwtNutrifyS")

            if (token) {
                try {
                    const res = await fetch(
                        `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=*`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        },
                    )

                    if (res.ok) {
                        const data = await res.json()
                        const role = data.role?.name
                        const options: MenuOption[] = []

                        if (role === "Nutritionist") {
                            options.push(
                                {
                                    icon: <HouseSimple size={20} />,
                                    title: "Dashboard",
                                    path: "/dashboard",
                                },
                                {
                                    icon: <Calculator size={20} />,
                                    title: "Calculator",
                                    path: "/calculator",
                                },
                                {
                                    icon: <Notebook size={20} />,
                                    title: "Diary",
                                    path: "/diary",
                                },
                                // {
                                //     icon: <ForkKnife size={20} />,
                                //     title: "Nutrition",
                                //     path: "/nutrition",
                                // },
                                // {
                                //     icon: <Barbell size={20} />,
                                //     title: "Workout",
                                //     path: "/workout",
                                // },
                            )
                        } else if (role === "User-Free") {
                            options.push(
                                {
                                    icon: <HouseSimple size={20} />,
                                    title: "Dashboard",
                                    path: "/dashboard",
                                },
                                {
                                    icon: <Notebook size={20} />,
                                    title: "Diary",
                                    path: "/diary",
                                },
                                {
                                    icon: <ForkKnife size={20} />,
                                    title: "Nutrition",
                                    path: "/nutrition",
                                },
                                {
                                    icon: <Barbell size={20} />,
                                    title: "Workout",
                                    path: "/workout",
                                },
                            )
                        }
                        setMenuOptions(options)
                    } else {
                        console.error("Failed to fetch user data")
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error)
                }
            }
        }

        fetchUserRole()
    }, [])

    return (
        <>
            <div className="fixed right-0 bottom-0 left-0 z-40 flex h-[72px] w-full flex-row items-center justify-between bg-white p-[24px] shadow-[0_0_8px_rgba(0,0,0,0.25)] md:top-0 md:left-0 md:h-screen md:w-[92px] md:flex-col md:gap-6 md:p-6">
                <div className="flex w-full flex-row items-center justify-between gap-6 md:flex-col md:justify-baseline">
                    <div className="hidden h-16 w-16 items-center justify-center md:flex">
                        <Image
                            src="https://res.cloudinary.com/dwiuj7jqw/image/upload/t_upscale_and_bmp/Screenshot_2025_05_08_at_13_42_03_e0cc206919"
                            alt="logo"
                            width={128}
                            height={128}
                        />
                    </div>
                    <div className="hidden h-[2px] w-full bg-[#F6F6F6] md:block"></div>
                    <span className="font-Poppins hidden text-[10px] font-medium text-[#757575] md:block">
                        MAIN
                    </span>
                    {menuOptions.map((option) => (
                        <SideMenuOption
                            key={option.title}
                            icon={option.icon}
                            path={option.path}
                            title={option.title}
                        />
                    ))}
                    <div className="hidden h-[2px] w-full bg-[#F6F6F6] md:block"></div>
                    <div className="hidden md:block">
                        <span className="font-Poppins text-[10px] font-medium text-[#757575]">
                            SETTINGS
                        </span>
                        <SideMenuOption
                            icon={<Gear size={20} />}
                            path="/settings"
                        />
                    </div>
                </div>
                <div className="hidden md:block">
                    <SideMenuOption
                        icon={<SignOut size={20} />}
                        path="/"
                        isSignOut={true}
                        
                    />
                </div>
            </div>
            <ExtendedSideMenu />
        </>
    )
}

export default SideMenu
