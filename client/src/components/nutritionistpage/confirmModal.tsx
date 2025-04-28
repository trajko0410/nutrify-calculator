"use client"

import { useState, useEffect } from "react"
//import { useRouter } from "next/navigation"

type confirmModalProp = {
    closeModal?: () => void
}

const ConfirmNutritionistModal: React.FC<confirmModalProp> = ({
    closeModal = () => {},
}) => {
    //const router = useRouter()


    const [isOpening, setIsOpening] = useState(false)
    const [isClosing, setIsClosing] = useState(false)

    const handleCloseModal = () => {
        setIsClosing(true)
        setTimeout(() => {
            closeModal()
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("send request for hireing")
        handleCloseModal()
    }

    return (
        <form onSubmit={handleSubmit} className="inset-0 absolute"> 
            <div
                onClick={handleBackdropClick}
                className="font-Poppins fixed inset-0 z-40 flex items-end justify-center bg-[#00000035] backdrop-blur-xs md:items-center"
            >
                <div
                    className={`font-Poppins relative z-50 flex w-full max-w-[1000px] flex-col gap-[32px] rounded-xl bg-white px-[32px] py-[24px] transition-all duration-500 ease-in-out md:w-[60vw] md:max-w-[500px] ${
                        isClosing
                            ? "translate-y-full opacity-0"
                            : isOpening
                              ? "translate-y-0 opacity-100"
                              : "translate-y-full opacity-0"
                    }`}
                >
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[#2D3748] text-xl font-medium">
                        Are you sure?
                        </h3>
                        <h4 className="text-sm font-normal text-[#A0AEC0]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend ante ac tortor hendrerit sollicitudin. Nullam sed nulla odio. Sed ultricies quis odio ut dignissim...
                        </h4>
                    </div>

                   
                    <div className=" flex flex-col sm:flex-row gap-4 sm:gap-[30px] ">
                    <button
                    onClick={handleCloseModal}
                        className="flex w-full flex-row items-center justify-center gap-6 rounded-lg p-2 text-sm font-medium  bg-transparent border-1 cursor-pointer text-DarkGreen"
                    >
                        Cancle
                    </button>
                    <button
                        type="submit"
                        className="flex w-full flex-row items-center justify-center gap-6 rounded-lg p-2 text-sm font-medium  bg-LightGreen cursor-pointer text-white"
                    >
                        Send Request
                    </button>
                
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ConfirmNutritionistModal
