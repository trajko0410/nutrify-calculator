import CalculateMeal from "@/components/calculatemeal/CalculateMeal"
import Header from "@/components/util/AppHeader"
import DashboardContainer from "@/components/util/DashboardContainer"
import SideMenu from "@/components/util/SideMenu"
import React from "react"
const HomePage: React.FC = () => {
    return (
        <div className="h-screen w-screen bg-[#FAF9F6]">
            <SideMenu />
            <Header />
            <DashboardContainer>
                <CalculateMeal />
            </DashboardContainer>
        </div>
    )
}

export default HomePage
