import { useEffect, useState } from "react"
import { useCartModal as useSearchModalCtx } from "./cartModalCtx"
import { Input } from "@mui/material"

export default function SearchModal() {
    const { closeSearchModal, searchTerm, handleSearchTermChange } =
        useSearchModalCtx()

    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "")

    const handleCloseModal = () => {
        setIsClosing(true)
        setTimeout(() => {
            closeSearchModal()
        }, 500)
    }

    useEffect(() => {
        setIsOpening(true)
    }, [])

    useEffect(() => {
        if (isClosing) {
            setTimeout(() => {
                setIsOpening(false)
            }, 500)
        }
    }, [isClosing])

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleCloseModal()
        }
    }

    const handleSearch = () => {
        handleSearchTermChange(localSearchTerm)
        handleCloseModal()
    }
    return (
        <div
            onClick={handleBackdropClick}
            className="font-Poppins fixed inset-0 z-40 flex items-end justify-center bg-[#00000035] backdrop-blur-xs md:items-center"
        >
            <div
                className={`scrollbar-thin-mobile relative z-50 flex max-h-[80vh] w-full max-w-[1000px] flex-col gap-[32px] overflow-y-scroll rounded-t-xl rounded-b-none bg-white px-[32px] py-[24px] transition-all duration-500 ease-in-out md:h-fit md:w-[60vw] md:rounded-xl ${
                    isClosing
                        ? "translate-y-full opacity-0"
                        : isOpening
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                }`}
            >
                <div className="flex flex-col gap-2">
                    <h3 className="text-DarkGreen text-xl font-medium">
                        Search fro recipe
                    </h3>
                    <h4 className="text-normal text-sm text-[#757575]">
                        Lorem ipsum dolor sit amet
                    </h4>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-DarkGreen text-base font-medium">
                        Recipe Name
                    </p>
                    <Input
                        className="w-full"
                        placeholder="Enter training name"
                        type="text"
                        required
                        value={localSearchTerm}
                        onChange={(e) => setLocalSearchTerm(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleSearch}
                    className="bg-LightGreen flex h-[48px] w-full items-center justify-center rounded-xl p-3 sm:w-full"
                >
                    Search
                </button>
            </div>
        </div>
    )
}
