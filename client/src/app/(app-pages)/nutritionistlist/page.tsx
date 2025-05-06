"use server"

import SideMenu from "@/components/util/SideMenu"
import Header from "@/components/util/AppHeader"

import AppContainer from "@/components/util/AppContainer"
import NutritionistListClientWrapper from "@/components/nutritionlistpage/nutritionistListClientWraper"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { authenticateUser } from "@/utils/authenticateUser"

const NutritionistListPage = async () => {
          const cookieStore = await cookies()
            const token = cookieStore.get("jwtNutrifyS")?.value
        
            if (!token) {
                redirect("/login")
            }
        
            const user = await authenticateUser(token)
            if (!user) {
                redirect("/login")
            }


    return (
        <div className="min-h-full min-h-screen w-full bg-[#FAF9F6]">
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
