import { Button, Menu, MenuItem } from "@mui/material"
import { CaretDown } from "@phosphor-icons/react"
import React from "react"

type DropDownProps = {
    id: string
    content: string[]
    title: string
}

const DropDown: React.FC<DropDownProps> = ({ content, id, title }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    return (
        <div>
            <Button
                className="text-DarkGreen! hover:none text-sm normal-case! hover:bg-gray-500"
                id={id}
                aria-controls={open ? "demo-positioned-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                {title}
                <CaretDown className="size-6 pl-2" />
            </Button>
            <Menu
                id={`${id}-menu`}
                aria-labelledby={`${id}`}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                {content.map((item, index) => (
                    <MenuItem key={index} onClick={handleClose}>
                        {item}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default DropDown
