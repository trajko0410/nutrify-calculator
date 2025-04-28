"use client"

import Image from "next/image"
import avatarImage from "../../../public/avatarImage.jpeg"
import ParametarsIcon from "../util/ParametarsIcon"
import { Testimonial } from "./aboutNutritionist"

import {useState, useEffect} from "react"

type SingleTestimonialProps = {
    singleTestimonialProp: Testimonial
}

const fetcheduser = {
    id: 4,
    name: "Filip Trajkovic",
    avatar: "",
}

const SingleTestimonial: React.FC<SingleTestimonialProps> = ({
    singleTestimonialProp,
}) => {
    const [testimonial, setTestimonial] = useState<Testimonial | undefined>()
    const [user, setUser] = useState<
        { id: number; name: string; avatar: string } | undefined
    >()

    useEffect(() => {
        if (!singleTestimonialProp) {
            return
        }

        setTestimonial(singleTestimonialProp)

        //fetch user
        setUser(fetcheduser)
    }, [singleTestimonialProp])

    return (
        <div className="flex min-h-[100px] flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
                <div className="h-[42px] w-[42px] overflow-clip rounded-full">
                    <Image
                        src={
                            user?.avatar && user?.avatar !== ""
                                ? user.avatar
                                : avatarImage
                        }
                        alt={"avatarPhoto"}
                        height={42}
                        width={42}
                    />
                </div>
                <h3 className="text-DarkGreen text-lg font-medium">
                    {user?.name ? user.name : "User Name"}
                </h3>
            </div>
            <div className="h-[1px] bg-[#D9D9D9]"></div>

            <p className="flex-wrap text-sm break-words whitespace-normal text-[#2D3748]">
                {testimonial?.comment ?? "Testimonial comment"}
            </p>

            <div className="flex gap-2">
                <ParametarsIcon
                    iconSize={14}
                    containerSize={24}
                    parametarName="Rating"
                />
                <h4>{testimonial?.rating ?? "Rating"}</h4>
            </div>
        </div>
    )
}

export default SingleTestimonial