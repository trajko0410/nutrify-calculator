"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import DropDown from "../util/DropDown"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export const Navigation: React.FC = () => {
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

    return (
        <>
            <div className="hidden min-h-20 justify-between rounded-b-2xl bg-white px-8 md:flex">
                <div className="flex items-center">
                    <Link href="/" className="text-lg font-bold text-gray-800">
                        <Image
                            src="/next.svg"
                            alt="logo"
                            width={40}
                            height={40}
                        />
                    </Link>
                </div>
                {!isSignedIn && (
                    <div className="flex shrink items-center gap-4 px-4 text-sm text-[#00473C]! lg:gap-10">
                        <Link href="/contact" className="text-gray-800">
                            Why NutrifyS
                        </Link>
                        <Link href="/contact" className="text-gray-800">
                            About
                        </Link>
                        <DropDown
                            content={[
                                "Calculator",
                                "Food diary",
                                "Workout plan",
                            ]}
                            id="services"
                            title="Services"
                        />
                        <DropDown
                            content={["Contact", "FAQ", "Support"]}
                            id="support"
                            title="Support"
                        />
                        <Link href="/contact" className="ml-4 text-gray-800">
                            Contact
                        </Link>
                    </div>
                )}
                {isSignedIn ? (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleSignOut}
                            className="text-gray-800"
                        >
                            Logout
                        </button>
                        <Link href="/profile" className="text-gray-800">
                            <Image
                                src={user?.imageUrl || "/default-profile.png"}
                                alt="profile"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-center">
                        <Link
                            href="/login"
                            className="text-DarkGreen bg-Cream rounded-lg px-4 py-[10px]"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-LightGreen rounded-lg px-4 py-[10px] text-white"
                        >
                            Start Now
                        </Link>
                    </div>
                )}
            </div>
            <div className="block w-full text-black md:hidden">in</div>
        </>
    )
}
