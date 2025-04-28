"use client"
import React, { useEffect, useState } from "react"
import { Menu, MenuItem } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Gear, SignOut } from "@phosphor-icons/react"
import Cookies from "js-cookie"

const ProfileIcon: React.FC = () => {
    const [user, setUser] = useState<{
        first_name: string
        last_name: string
        profile_picture: string
    } | null>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const router = useRouter()

    useEffect(() => {
        const fetchUser = async () => {
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
                        setUser({
                            profile_picture: data.profile_picture || null,
                            first_name: data.first_name,
                            last_name: data.last_name,
                        })
                    } else {
                        console.error("Failed to fetch user data")
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error)
                }
            }
        }
        fetchUser()
    }, [])

    const handleSignOut = () => {
        Cookies.remove("jwtNutrifyS")
        router.push("/login")
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    if (user) {
        return (
            <div>
                <button
                    className="flex h-11 w-11 cursor-pointer items-center justify-center overflow-clip rounded-full"
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    {user.profile_picture ? (
                        <Image
                            src={user.profile_picture}
                            alt="profile"
                            width={44}
                            height={44}
                            className="rounded-full"
                        />
                    ) : (
                        <div className="bg-BlackGreen flex h-11 w-11 items-center justify-center rounded-full">
                            <span className="font-Poppins text-white">
                                {user.first_name.charAt(0) +
                                    "" +
                                    user.last_name.charAt(0)}
                            </span>
                        </div>
                    )}
                </button>
                <Menu
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    onClose={handleClose}
                    disableScrollLock
                    slotProps={{
                        paper: {
                            sx: {
                                mt: 3,
                                ml: -1,
                            },
                        },
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            handleClose()
                            handleSignOut()
                        }}
                    >
                        <div className="flex items-center gap-4">
                            <SignOut size={20} />
                            SignOut
                        </div>
                    </MenuItem>
                    <div className="md:hidden">
                        <MenuItem>
                            <Link
                                href={"/settings"}
                                className="flex items-center gap-4"
                            >
                                <Gear size={20} />
                                Settings
                            </Link>
                        </MenuItem>
                    </div>
                </Menu>
            </div>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default ProfileIcon
