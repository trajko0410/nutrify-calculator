import { Input } from "@mui/material"
import React from "react"

type CustomInputProps = {
    value: string | number | boolean | null | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type: string
    required?: boolean
    title: string
    customWidth?: string
    keyIndex?: string
}

const CustomInput: React.FC<CustomInputProps> = ({
    onChange,
    placeholder,
    type,
    value,
    required,
    title,
    customWidth,
    keyIndex,
}) => {
    return (
        <div className={`z-0 flex flex-col gap-1 ${customWidth}`} key={keyIndex}>
            <p className="text-DarkGreen pt-8 pb-1">{title}</p>
            <Input
                className="z-0 max-w-3xs"
                placeholder={placeholder}
                type={type}
                required={required}
                value={value ?? ""}
                onChange={onChange}
            />
        </div>
    )
}

export default CustomInput
