"use client"

import { useState } from "react"
import GeneralModalComponent from "../util/GeneralModalComponent"
//import { useRouter } from "next/navigation"

type confirmModalProp = {
    closeModal?: () => void
}

const ConfirmNutritionistModal: React.FC<confirmModalProp> = ({
    closeModal = () => {},
}) => {
    //const router = useRouter()

    const [closeModalFn, setCloseModalFn] = useState<() => void>(() => () => {})



   




    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("send request for hireing")
        closeModalFn()
    }

    return (
        <form onSubmit={handleSubmit} className="inset-0 absolute"> 
           <GeneralModalComponent closeGeneralModal={closeModal}             onReady={(action) => setCloseModalFn(() => action)} // setujemo funkciju
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
                    type="button"
                    onClick={closeModalFn}
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
                    </GeneralModalComponent>
        </form>
    )
}

export default ConfirmNutritionistModal
