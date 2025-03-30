import TodaysFoodInteake from "@/components/dashboardpage/todaysFoodIntakes"
import Header from "@/components/util/AppHeader"
import SideMenu from "@/components/util/SideMenu"
import React from "react"
const HomePage: React.FC = () => {
    return (
        <div className="h-screen w-screen bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            <TodaysFoodInteake />
            <div className="ml-[92px] text-black">Ja sam djordje</div>
        </div>
    )
}

export default HomePage
