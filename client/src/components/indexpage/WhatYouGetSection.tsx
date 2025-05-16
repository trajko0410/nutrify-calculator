"use server"

import MainContainer from "../util/MainContainer"

import { ImageCustom } from "../util/ImageCustom"

import whatYouGetImage2 from "../../../public/WhatYouGetSectionImage2.png"
import whatYouGetImage1 from "../../../public/WhatYouGetSectionImage1.png"

const WhatYouGetSection = () => {
    return (
        <div>
            <div className="flex flex-col items-center bg-white py-15">
                <div className="flex max-w-[500px] flex-col items-center gap-8 text-center">
                    <h1 className="text-DarkGreen text-5xl font-medium">
                        What you get from
                        <span className="text-LightGreen"> NutrifyS</span>
                    </h1>
                </div>
                <MainContainer>
                    <div className="flex w-full flex-wrap justify-center gap-8 lg:px-3.75 pt-[130px] sm:flex-col md:flex-col lg:flex-row">
                        <div className="flex flex-col gap-8 pt-[70px] lg:max-w-[455px] lg:flex-[5.25] lg:items-end">
                            <div className="relative h-[380px] rounded-2xl lg:w-4/5 lg:max-w-[290px]">
                                <ImageCustom
                                    src={whatYouGetImage1}
                                    alt="WhatYouGetImage1"
                                    className="rounded-2xl object-cover"
                                />
                            </div>
                            <div className="bg-CyanGreen w-5/5 rounded-2xl p-[40px]">
                                <h3 className="font-Poppins text-DarkGreen pb-[15px] text-2xl font-medium">
                                    Personalized Meal Plans
                                </h3>
                                <p className="text-DarkGreen font-Poppins text-sm font-normal">
                                    Users receive tailored dietary
                                    recommendations based on their goals (weight
                                    loss, muscle gain, improving health).
                                    Nutritionists can use these apps to create
                                    detailed plans for patients, making it
                                    easier to track progress and adjust as
                                    needed.
                                </p>
                            </div>
                            <div className="rounded-2xl bg-[#C56532] p-[40px] lg:w-4/5 lg:max-w-[290px]">
                                <h3 className="font-Poppins pb-[15px] text-2xl font-medium text-white">
                                    Integration with Other Health Tools
                                </h3>
                                <p className="font-Poppins text-sm font-normal text-white">
                                    Many apps can sync with fitness devices and
                                    other health tools, offering a more holistic
                                    view of a patient&apos;s well-being.
                                    Nutritionists can leverage this data to
                                    provide more comprehensive guidance.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-8 lg:max-w-[290px] lg:flex-[4.5]">
                            <div className="bg-DarkGreen w-5/5 rounded-2xl p-[40px]">
                                <h3 className="font-Poppins text-CyanGreen pb-[15px] text-2xl font-medium">
                                    Flexible working
                                </h3>
                                <p className="font-Poppins text-sm font-normal text-white">
                                    Enjoy, untracked paid time off (PTO) with no
                                    set limits — we want you to take the time
                                    that you need to operate at your peak
                                    performance
                                </p>
                            </div>
                            <div className="w-5/5 rounded-2xl bg-[#DEDBC7] p-[40px]">
                                <h3 className="font-Poppins pb-[15px] text-2xl font-medium text-[#322E2E]">
                                    Increased Motivation and Accountability
                                </h3>
                                <p className="font-Poppins text-sm font-normal text-[#322E2E]">
                                    Users can track their progress through
                                    charts and reports, which helps them stay
                                    motivated and consistent. Nutritionists can
                                    use this data to support patients and adapt
                                    plans over time.
                                </p>
                            </div>
                            <div className="bg-DarkGreen w-5/5 rounded-2xl p-[40px]">
                                <h3 className="font-Poppins text-CyanGreen pb-[15px] text-2xl font-medium">
                                    Time Savings and Improved Efficiency
                                </h3>
                                <p className="font-Poppins text-sm font-normal text-white">
                                    Users can quickly and easily track their
                                    diet without the need for manual journaling.
                                    Nutritionists can use apps to automate part
                                    of their workflow, allowing them to focus on
                                    individual patient needs.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-8 lg:max-w-[455px] lg:flex-[5.25] lg:items-start lg:pt-[140px]">
                            <div className="rounded-2xl bg-[#C1D3FF] p-[40px] lg:w-4/5 lg:max-w-[290px]">
                                <h3 className="font-Poppins pb-[15px] text-2xl font-medium text-black">
                                    Easy Food Tracking
                                </h3>
                                <p className="font-Poppins text-sm font-normal text-black">
                                    Users can effortlessly log meals by scanning
                                    barcodes or searching a food database.
                                    Nutritionists gain insight into patients&apos;
                                    eating habits, enabling more accurate advice
                                    and targeted interventions.
                                </p>
                            </div>
                            <div className="w-5/5 rounded-2xl bg-[#F54B6A] p-[40px]">
                                <h3 className="font-Poppins pb-[15px] text-2xl font-medium text-white">
                                    Detailed Nutritional Analysis
                                </h3>
                                <p className="font-Poppins text-sm font-normal text-white">
                                    Apps provide comprehensive data on calorie
                                    intake, macronutrients (proteins, fats,
                                    carbs), vitamins, and minerals.
                                    Nutritionists can use this information to
                                    identify deficiencies and recommend dietary
                                    adjustments.
                                </p>
                            </div>
                            <div className="relative h-[300px] rounded-2xl lg:w-4/5 lg:max-w-[290px]">
                                <ImageCustom
                                    src={whatYouGetImage2}
                                    alt="WhatYouGetImage2"
                                    className="rounded-2xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </MainContainer>
            </div>
        </div>
    )
}

export default WhatYouGetSection
