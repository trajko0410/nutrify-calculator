"use client"

import React, { useState, useEffect } from "react"

import TodayTimelineLoader from "../skeletonLoaders/todayTimelineLoader"
import type { Testimonial } from "./aboutNutritionist"

import SingleTestimonial from "./singleTestimonial"

type TestimonialProps = {
    testimonialProp: Testimonial[]
}

const Testimonial: React.FC<TestimonialProps> = ({ testimonialProp }) => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)

    //console.log(sortedTodaysActivities, "sortedTodaysActivities")

    useEffect(() => {
        if (!testimonialProp) {
            setLoading(false)
            return
        }

        setTestimonials(testimonialProp)

        setLoading(false)
    }, [testimonialProp])

    console.log(testimonials)
    if (loading) {
        return <TodayTimelineLoader />
    }

    if (!testimonials || testimonials.length === 0) {
        return (
            <div className="shadow-Combined font-Poppins flex min-h-[300px] flex-col justify-between gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
                <p>No upcoming Activities.</p> {/* UI for no activities */}
            </div>
        )
    }

    return (
        <div className="shadow-Combined font-Poppins flex min-h-[300px] w-full flex-col gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px] text-black">
            <div
                className={`flex flex-col justify-between gap-4 sm:flex-row md:items-center`}
            >
                <div
                    className={`flex w-full flex-col gap-6 sm:flex-row sm:justify-between`}
                >
                    <div>
                        <h3 className="text-DarkGreen text-xl font-medium">
                            Testimonials
                        </h3>
                        <h4 className="text-sm font-normal text-[#757575]">
                            Lorem ipsum dolor sit amet
                        </h4>
                    </div>
                </div>
            </div>
            <div className="custom-scrollbar flex snap-x flex-row gap-x-6 overflow-x-scroll scroll-smooth whitespace-nowrap">
                {testimonials.map((testimonial, index) => {
                    //console.log(testimonial, "testimonial")
                    return (
                        <div
                            className="font-Poppins flex w-[370px] shrink-0 flex-col gap-5 pb-4"
                            key={index}
                        >
                            <SingleTestimonial
                                singleTestimonialProp={testimonial}
                            ></SingleTestimonial>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Testimonial
