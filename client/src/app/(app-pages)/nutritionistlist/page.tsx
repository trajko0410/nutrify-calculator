"use server"

import SideMenu from "@/components/util/SideMenu"
import Header from "@/components/util/AppHeader"

import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import AppContainer from "@/components/util/AppContainer"
import NutritionistListClientWrapper from "@/components/nutritionlistpage/nutritionistListClientWraper"

const NutritionistListPage = async () => {
    const { userId } = await auth()

    if (!userId) {
        redirect("/login")
    }

    return (
        <div className="min-h-screen w-full bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            <div className="h-full pt-[100px] pb-10">
                <AppContainer>
                    <div className="flex h-full flex-col gap-6 bg-[#FAF9F6]">
                        <NutritionistListClientWrapper />
                    </div>
                </AppContainer>
            </div>
        </div>
    )
}

export default NutritionistListPage
