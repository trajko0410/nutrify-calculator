import React, { ReactNode } from "react"

const MainContainer = ({ children }: { children: ReactNode }) => {
    return (
        <div className="bg-[#FAF9F6] pt-[100px] pb-10">
            <div className="w-full pr-[24px] pb-[70px] pl-[24px] md:pb-[0px] md:pl-[118px]">
                {children}
            </div>
        </div>
    )
}

export default MainContainer
