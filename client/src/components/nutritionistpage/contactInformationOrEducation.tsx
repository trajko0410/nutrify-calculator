"use client"

import { useEffect, useState } from "react"
import ParametarsIcon from "../../components/util/ParametarsIcon"
import NutrtionistEducationOrContactLoader from "../skeletonLoaders/nutrtionistEducationOrContactLoader"

type ContactInformationProps = {
    nutrtionistEmail: string
    nutrtionistPhoneNumber: string
    nutrtionistLanguages: string[]
    education: string
    showType: "contact" | "education"
}

const ContactInformationOrEducation: React.FC<ContactInformationProps> = ({
    nutrtionistEmail,
    nutrtionistLanguages,
    nutrtionistPhoneNumber,
    education,
    showType,
}) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const isDataReady =
            nutrtionistEmail &&
            nutrtionistPhoneNumber &&
            education &&
            Array.isArray(nutrtionistLanguages) &&
            nutrtionistLanguages.length > 0

        if (isDataReady) {
            setLoading(false)
        }
    }, [
        nutrtionistEmail,
        nutrtionistPhoneNumber,
        education,
        nutrtionistLanguages,
    ])

    if (loading) {
        return <NutrtionistEducationOrContactLoader showType={showType} />
    }
    return (
        <div className="shadow-Combined font-Poppins flex h-full flex-col gap-8 rounded-xl bg-[#FFFFFF] px-[20px] py-[17px]">
            <div>
                <h3 className="text-DarkGreen text-xl font-medium">
                    {showType === "contact"
                        ? "Contact Information"
                        : "Education"}
                </h3>
                <p className="text-sm font-normal text-[#757575]">
                    {showType === "contact"
                        ? "Reach out to the nutritionist directly:"
                        : "Get to know the background and expertise."}
                </p>
            </div>

            {showType === "contact" ? (
                <div className="flex flex-wrap gap-6">
                    <div className="flex min-w-[200px] flex-row items-center gap-4">
                        <ParametarsIcon
                            iconSize={16}
                            parametarName="Mail"
                            containerSize={32}
                        />
                        <h5 className="text-base font-medium text-[#2D3748]">
                            <a
                                href={`mailto:${nutrtionistEmail}`}
                                className="hover:underline"
                            >
                                {nutrtionistEmail}
                            </a>
                        </h5>
                    </div>

                    <div className="flex min-w-[200px] flex-row items-center gap-4">
                        <ParametarsIcon
                            iconSize={16}
                            parametarName="Languages"
                            containerSize={32}
                        />
                        {nutrtionistLanguages.length >= 1 ? (
                            <div className="flex flex-wrap gap-2">
                                {nutrtionistLanguages.map((language, index) => (
                                    <h5
                                        key={index}
                                        className="text-base font-medium text-[#2D3748]"
                                    >
                                        {language}
                                        {index < nutrtionistLanguages.length - 1
                                            ? ","
                                            : "."}
                                    </h5>
                                ))}
                            </div>
                        ) : (
                            <h5 className="text-base font-medium text-[#2D3748]">
                                No languages to show
                            </h5>
                        )}
                    </div>

                    <div className="flex min-w-[200px] flex-row items-center gap-4">
                        <ParametarsIcon
                            iconSize={16}
                            parametarName="Phone"
                            containerSize={32}
                        />
                        <h5 className="text-base font-medium text-[#2D3748]">
                            {nutrtionistPhoneNumber}
                        </h5>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row items-center gap-4">
                    <ParametarsIcon
                        iconSize={16}
                        parametarName="Education"
                        containerSize={32}
                    />
                    <h5 className="text-base font-medium text-[#2D3748]">
                        {education}
                    </h5>
                </div>
            )}
        </div>
    )
}

export default ContactInformationOrEducation
