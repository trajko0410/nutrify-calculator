import Header from "@/components/header/Header"
import SponsorSection from "@/components/indexpage/SponsorSection"
import TitleSection from "@/components/indexpage/TitleSection"
import HookSection from "@/components/indexpage/HookSection"
import HowWeWorkSection from "@/components/indexpage/HowWeWorkSection"

export default function Home() {
    return (
        <div>
            <Header />
            <TitleSection />
            <SponsorSection
                logos={["/next.svg", "/next.svg", "/next.svg", "/next.svg"]}
            />
            <HookSection />
            <HowWeWorkSection />
        </div>
    )
}
