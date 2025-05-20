import { useState } from "react"
import { useCartModal as useSearchModalCtx } from "./cartModalCtx"
import { Input } from "@mui/material"
import GeneralModalComponent from "../util/GeneralModalComponent"

export default function SearchModal() {
    const { closeSearchModal, searchTerm, handleSearchTermChange } =
        useSearchModalCtx()

    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || "")
    const [closeModalFn, setCloseModalFn] = useState<() => void>(() => () => {})

    const handleSearch = () => {
        handleSearchTermChange(localSearchTerm)
        closeModalFn()
    }

    return (
        <GeneralModalComponent
            closeGeneralModal={closeSearchModal}
            onReady={(action) => setCloseModalFn(() => action)} // setujemo funkciju
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
        </GeneralModalComponent>
    )
}
