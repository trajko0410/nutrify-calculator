import Header from "@/components/header/Header"
import SponsorSection from "@/components/indexpage/SponsorSection"
import TitleSection from "@/components/indexpage/TitleSection"
import HookSection from "@/components/indexpage/HookSection"
import HowWeWorkSection from "@/components/indexpage/HowWeWorkSection"
import WhatYouGetSection from "../components/indexpage/WhatYouGetSection"
import TestimonialSection from "@/components/indexpage/TestimonialSection"
import Footer from "@/components/footer/Footer"

export default function Home() {
    return (
        <div>
            <Header />
            <TitleSection />
            <SponsorSection
                logos={[
                    "https://res.cloudinary.com/dwiuj7jqw/image/upload/q_auto:best/f_bmp/e_background_removal/c_crop,w_0.54/Nutrify_S_Watermark_da9350594b",
                    "https://res.cloudinary.com/dwiuj7jqw/image/upload/q_auto:best/f_bmp/e_background_removal/c_crop,w_0.54/Nutrify_S_Watermark_da9350594b",
                    "https://res.cloudinary.com/dwiuj7jqw/image/upload/q_auto:best/f_bmp/e_background_removal/c_crop,w_0.54/Nutrify_S_Watermark_da9350594b",
                    "https://res.cloudinary.com/dwiuj7jqw/image/upload/q_auto:best/f_bmp/e_background_removal/c_crop,w_0.54/Nutrify_S_Watermark_da9350594b",
                ]}
            />
            <HookSection />
            <HowWeWorkSection />
            <WhatYouGetSection />
            <TestimonialSection />
            <Footer />
        </div>
    )
}
