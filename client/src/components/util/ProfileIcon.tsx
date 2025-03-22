"use client"
import { useSession, useUser } from "@clerk/nextjs"
import { Menu, MenuItem } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React from "react"

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
                >
                    <MenuItem
                        onClick={() => {
                            handleClose()
                            handleSignOut()
                        }}
                    >
                        SignOut
                    </MenuItem>
                </Menu>
            </div>
        )
    else return <div></div>
}

export default ProfileIcon
