"use client"
import { useSession, useUser } from "@clerk/nextjs"
import { Menu, MenuItem } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"
import Link from "next/link"
import { Gear, SignOut } from "@phosphor-icons/react"

const ProfileIcon: React.FC = () => {
    const { user, isLoaded } = useUser()
    const { session } = useSession()
    const router = useRouter()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleSignOut = async () => {
        if (session) {
            await session.end()
            router.push("/login")
        }
        return
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    if (isLoaded && user)
        return (
            <div>
                <button
                    className={`flex h-11 w-11 cursor-pointer items-center justify-center overflow-clip rounded-full`}
                    aria-controls={open ? "demo-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                >
                    <Image
                        src={user && user.imageUrl}
                        alt="profile"
                        width={44}
                        height={44}
                    />
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
                                mt: 3, // Pomera meni malo dole
                                ml: -1, // Pomera meni malo ulevo
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
                                <Gear size={20}></Gear>Settings
                            </Link>
                        </MenuItem>
                    </div>
                </Menu>
            </div>
        )
    else return <div></div>
}

export default ProfileIcon
