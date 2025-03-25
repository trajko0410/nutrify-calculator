"use server"

import MainContainer from "../util/MainContainer"

import testimonialImage1 from "../../../public/testimonial1Image.png"
import { StaticImageData } from "next/image"

import { ImageCustom } from "../util/ImageCustom"

type MainTestimonialSectionProps = {
    title: string
    text: string
    image: string | StaticImageData
    author: string
}
const MainTestimonialSection: React.FC<MainTestimonialSectionProps> = ({
    title,
    text,
    image,
    author,
}) => {
    return (
        <div className="bg-BlackGreen flex min-h-[510px] w-full flex-row flex-wrap justify-center overflow-clip rounded-2xl bg-[url('/shape3.png')] bg-cover bg-center lg:flex-nowrap">
            <div className="font-Poppins flex max-w-[600px] flex-1/2 flex-col justify-center gap-4 p-10 font-normal">
                <h3 className="text-4xl text-white">{title}</h3>
                <p className="text-base">{text}</p>
                <h4 className="text-CyanGreen text-sm font-medium">{author}</h4>
            </div>

            <div className="relative flex min-h-[250px] max-w-[600px] flex-1/2">
                <ImageCustom
                    src={image}
                    alt={title}
                    className="overflow-cover flex grow rounded-2xl"
                ></ImageCustom>
            </div>
        </div>
    )
}

type SecondaryTestimonialSection = {
    author: string
    text: string
    image: string | StaticImageData
}

const SecondaryTestimonialSection: React.FC<SecondaryTestimonialSection> = ({
    author,
    text,
    image,
}) => {
    return (
        <div className="font-Poppins flex max-w-[840] flex-col items-center justify-center gap-5 text-black sm:flex-row lg:gap-10">
            <div className=" max-w-[180px] sm:max-w-[220px] min-w-[100] overflow-clip rounded-2xl">
                <ImageCustom
                    src={image}
                    alt={"secondaryTestimonial"}
                    width={220}
                    height={220}
                    className="object-cover"
                ></ImageCustom>
            </div>
            <div className={"flex flex-col py-5 pl-2 text-center sm:text-left"}>
                <p className="pl-2 text-sm font-medium">{author}</p>
                <p className="pt-8 text-base font-normal">{text}</p>
            </div>
        </div>
    )
}

const TestimonialSection = () => {
    return (
        <div className="bg-[#FAF9F6]">
            <div className="flex flex-col items-center pt-24 pb-[20px]">
                <div className="flex max-w-[500px] flex-col items-center gap-8 p-8 text-center">
                    <h2 className="text-DarkGreen text-5xl font-medium">
                        What you get from
                        <span className="text-LightGreen"> NutrysApp</span>
                    </h2>
                </div>
            </div>
            <MainContainer>
                <div className="lg:px-30">
                    <MainTestimonialSection
                        title={"Knowledge is power"}
                        text={
                            "Studies show that people who keep a food diary are more likely to achieve their goals. NutrysApp simplifies nutrition tracking, healthy living, and workouts, provides meal plans and the data you need, and helps you make sense of it all. Healthy eating and an active lifestyle are a continuous journey of self-discovery. The more you track, the more empowered you’ll become to make healthy choices that support your goals."
                        }
                        image={testimonialImage1}
                        author={"John Doe, NutrysApp CEO"}
                    />
                </div>
                <div className="flex flex-col items-center gap-15 px-15 py-19">
                    <SecondaryTestimonialSection
                        author={"John Doe, Our Client"}
                        text={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                        }
                        image={testimonialImage1}
                    ></SecondaryTestimonialSection>
                    <SecondaryTestimonialSection
                        author={"John Doe, Nutritionist"}
                        text={
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                        }
                        image={testimonialImage1}
                    ></SecondaryTestimonialSection>
                </div>
            </MainContainer>
        </div>
    )
}

export default TestimonialSection
