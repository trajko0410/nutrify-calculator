"use client"

import Cookies from "js-cookie"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import DropDown from "../util/DropDown"

import { useRouter } from "next/navigation"
import { List, X } from "@phosphor-icons/react"

export const NavigationMobile: React.FC = () => {
    const router = useRouter()
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [user, setUser] = useState<{ imageUrl: string } | null>(null)

    useEffect(() => {
        const token = Cookies.get("jwtNutrifyS")
        const fetchUser = async () => {
            try {
                console.log(process.env.STRAPI_URL)

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/me?populate=*`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                        cache: "no-store",
                    },
                )

                if (res.ok) {
                    const data = await res.json()
                    setUser({
                        imageUrl: data.avatar?.url || null,
                    })
                    setIsSignedIn(true)
                } else {
                    setIsSignedIn(false)
                }
            } catch (error) {
                console.error("Error fetching user:", error)
                setIsSignedIn(false)
            }
        }
        if (token) fetchUser()
    }, [])

    const handleSignOut = () => {
        Cookies.remove("jwtNutrifyS")

        // OR, if you're using cookie auth, maybe remove the cookie manually (if accessible)
        // Otherwise, you might just "fake logout" by clearing state

        setIsSignedIn(false)
        setUser(null)
        router.push("/login")
    }
    const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false)
    const handleHamburgerMenuToggle = () => {
        setHamburgerMenuOpen(!hamburgerMenuOpen)
    }

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="flex items-center justify-between bg-white px-4 py-4 text-sm text-[#00473C] md:hidden">
                <Link href="/">
                    <Image src="/next.svg" alt="logo" width={40} height={40} />
                </Link>
                <button onClick={handleHamburgerMenuToggle}>
                    {hamburgerMenuOpen ? (
                        <X size={28} color="black" />
                    ) : (
                        <List size={28} color="black" />
                    )}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}

            <div
                className={`shadow-DarkBottom text-DarkGreen font-Poppins flex flex-col items-center justify-center space-y-4 overflow-hidden bg-white px-4 pt-8 pb-15 text-sm font-medium transition-all duration-600 ease-in-out md:hidden ${
                    hamburgerMenuOpen
                        ? "max-h-[800px] opacity-100"
                        : "max-h-[100px] opacity-0"
                }`}
            >
                {!isSignedIn && (
                    <>
                        <Link
                            href="/"
                            className="w-[60%] border-b-[1px] border-[#E2E8F0] p-[6px] pb-4 text-center"
                        >
                            Home
                        </Link>

                        <Link
                            href="/contact"
                            className="w-[60%] border-b-[1px] border-[#E2E8F0] p-[6px] pb-4 text-center"
                        >
                            Why NutrifyS
                        </Link>
                        <Link
                            href="/contact"
                            className="w-[60%] border-b-[1px] border-[#E2E8F0] p-[6px] pb-4 text-center"
                        >
                            About Us
                        </Link>
                        <div className="w-[60%] border-b-[1px] border-[#E2E8F0] pb-4 text-center">
                            <DropDown
                                content={[
                                    "Calculator",
                                    "Food diary",
                                    "Workout plan",
                                ]}
                                id="services"
                                title="Services"
                            />
                        </div>
                        <div className="w-[60%] border-b-[1px] border-[#E2E8F0] pb-4 text-center">
                            <DropDown
                                content={["Contact", "FAQ", "Support"]}
                                id="support"
                                title="Support"
                            />
                        </div>
                        <Link href="/contact" className="p-[6px]">
                            Contact
                        </Link>
                    </>
                )}
                {isSignedIn ? (
                    <>
                        <Link
                            href="/login"
                            onClick={handleSignOut}
                            className="block text-gray-800"
                        >
                            Logout
                        </Link>
                        <Link
                            href="/profile"
                            className="flex items-center gap-2"
                        >
                            <Image
                                src={user?.imageUrl || "/default-profile.png"}
                                alt="profile"
                                width={30}
                                height={30}
                                className="rounded-full"
                            />
                            <span className="text-gray-800">Profile</span>
                        </Link>
                    </>
                ) : (
                    <div className="flex flex-row gap-2 pt-6">
                        <Link
                            href="/login"
                            className="text-DarkGreen bg-Cream rounded-lg px-4 py-2 text-center"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-LightGreen rounded-lg px-4 py-2 text-center text-white"
                        >
                            Start Now
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default NavigationMobile
