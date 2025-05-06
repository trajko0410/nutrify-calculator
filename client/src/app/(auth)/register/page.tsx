import Header from "@/components/header/Header"
import RegisterModal from "@/components/registerpage/RegisterModal"
import MainContainer from "@/components/util/MainContainer"
import Image from "next/image"

const RegisterPage: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="flex h-full min-h-screen justify-center md:justify-between">
                <div className="flex min-h-full w-full items-center overflow-y-scroll bg-[#FAF9F6] pt-24 md:w-1/2">
                    <MainContainer>
                        <div className="flex h-full justify-center md:justify-start">
                            <RegisterModal />
                        </div>
                    </MainContainer>
                </div>
                <div className="bg-DarkGreen hidden w-1/2 items-center justify-center md:flex">
                    <Image
                        src={"/Frame 21.png"}
                        alt="frame21"
                        width={518}
                        height={491}
                    />
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
