import SideMenu from "@/components/util/SideMenu"
import Header from "@/components/util/AppHeader"

import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

export default async function SingleTraining() {
    const { userId } = await auth()

    if (!userId) {
        redirect("/login")
    }

    return (
        <div className="h-screen w-full bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            trening
        </div>
    )
}
