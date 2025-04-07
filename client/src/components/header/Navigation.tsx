"use client"

import Link from "next/link"
import Image from "next/image"
import DropDown from "../util/DropDown"
import { useSession, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"



export const Navigation: React.FC = () => {
    const { user, isSignedIn } = useUser()
    const router = useRouter()
    const { session } = useSession()


   

    const handleSignOut = () => {
        if (session) {
            session.end()
            router.push("/home")
        }
        return
    }

    /*
    useEffect(() => {
        if (isSignedIn) {
            router.push("/dashboard")
        }
    }, [isSignedIn, router])*/

    return (
        <>
        {/* Desktop Navigation */}
        <div className="hidden min-h-20 justify-between rounded-b-2xl bg-white px-8 md:flex">
            <div className="flex items-center">
                <Link href="/" className="text-lg font-bold text-gray-800">
                    <Image src="/next.svg" alt="logo" width={40} height={40} />
                </Link>
            </div>

            {!isSignedIn && (
                <div className="flex shrink items-center gap-4 px-4 text-sm text-[#00473C] lg:gap-10">
                    <Link href="/contact" className="text-gray-800">Why NutrifyS</Link>
                    <Link href="/contact" className="text-gray-800">About</Link>
                    <DropDown
                        content={["Calculator", "Food diary", "Workout plan"]}
                        id="services"
                        title="Services"
                    />
                    <DropDown
                        content={["Contact", "FAQ", "Support"]}
                        id="support"
                        title="Support"
                    />
                    <Link href="/contact" className="ml-4 text-gray-800">Contact</Link>
                </div>
            )}

            {isSignedIn ? (
                <div className="flex items-center gap-2">
                    <Link
                        href="/login"
                        onClick={handleSignOut}
                        className="text-gray-800"
                    >
                        Logout
                    </Link>
                    <Link href="/profile" className="text-gray-800">
                        <Image
                            src={user.imageUrl}
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



     
    </>
    )
}
