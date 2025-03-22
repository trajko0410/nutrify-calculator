import CreateIngredient from "@/components/createIngredient/CreateIngredient"
import Header from "@/components/util/AppHeader"
import SideMenu from "@/components/util/SideMenu"
import React from "react"
const HomePage: React.FC = () => {
    return (
        <div className="h-full w-screen bg-[#FAF9F6]">
            <Header />
            <SideMenu />
            <CreateIngredient />
        </div>
    )
}

export default HomePage
