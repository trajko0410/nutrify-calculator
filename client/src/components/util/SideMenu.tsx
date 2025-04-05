"use client"
import Image from "next/image"
import React from "react"
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
import { useUser } from "@clerk/nextjs"
import ExtendedSideMenu from "./ExtendedSideMenu"
import { MenuOption } from "@/utils/types"

const SideMenu: React.FC = () => {
    const { user } = useUser()

    const menuOptions: MenuOption[] = []

    if (user) {
        switch (user.unsafeMetadata.role) {
            case "Admin":
                menuOptions.push(
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
                break
            case "Client":
                menuOptions.push(
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
                break
        }
    }

    return (
        <>
            <div className="fixed right-0 bottom-0 left-0 z-40 flex h-[72px] w-full flex-row items-center justify-between bg-white p-[24px] shadow-[0_0_8px_rgba(0,0,0,0.25)] md:top-0 md:left-0 md:h-screen md:w-[92px] md:flex-col md:gap-6 md:p-6">
                <div className="flex w-full flex-row items-center justify-between gap-6 md:flex-col md:justify-baseline">
                    <div className="hidden h-11 w-11 items-center justify-center md:flex">
                        <Image
                            src="/Vector.svg"
                            alt="logo"
                            width={32}
                            height={32}
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
