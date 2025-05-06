"use server"

import Header from "@/components/header/Header"
import LoginModal from "@/components/loginpage/LoginModal"
import { ImageCustom } from "@/components/util/ImageCustom"
import MainContainer from "@/components/util/MainContainer"



const LoginPage: React.FC =  () => {
    return (
        <>
            <Header />
            <div className="flex h-full min-h-screen justify-center md:justify-between">
                <div className="min-h-full w-full bg-[#FAF9F6] pt-52 md:w-1/2">
                    <MainContainer>
                        <div className="flex h-full justify-center md:justify-start">
                            <LoginModal />
                        </div>
                    </MainContainer>
                </div>
                <div className="bg-DarkGreen hidden w-1/2 items-center justify-center md:flex">
                    <ImageCustom
                        src={"/Frame 21.png"}
                        alt="frame21"
                        width={518}
                        height={491}
                    />
                </div>
            </div>
        </>
    )
}

export default LoginPage
