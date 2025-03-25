import { Button } from "@mui/material"
import MainContainer from "../util/MainContainer"
import Link from "next/link"
import { StaticImageData } from "next/image"
import Image from "next/image"

import LogoImage from "../../../public/next.svg"
import LinkedinImage from "../../../public/LinkedinImage.png"

type LinkItem = {
    text: string
    href: string
}

type SocialLinks = {
    image: string | StaticImageData
    text: string
    href: string
}

type FooterLinksProps = {
    title: string
    links: LinkItem[]
    socials?: SocialLinks[]
}

const FooterLinks: React.FC<FooterLinksProps> = ({ title, links, socials }) => {
    return (
        <div className="font-Poppins flex flex-1/6 flex-col gap-7.5 text-sm font-medium">
            <h4 className="text-[#6B9C6F]">{title}</h4>
            <ul>
                {links.map((link, index) => (
                    <li
                        key={index}
                        className="cursor-pointer pb-4 text-[#FAF9F6]"
                    >
                        <Link href={link.href}>{link.text}</Link>
                    </li>
                ))}
                {socials && <h4 className="py-7.5 text-[#6B9C6F]">Socials</h4>}
                {socials && (
                    <ul>
                        {socials?.map((social, index) => (
                            <li
                                key={index}
                                className="cursor-pointer pb-4 text-[#FAF9F6]"
                            >
                                <div className="flex justify-center gap-4 md:justify-start">
                                    <Image
                                        src={social.image}
                                        alt="socialImage"
                                        width={20}
                                        height={20}
                                    />
                                    <Link href={social.href}>
                                        {social.text}
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </ul>
        </div>
    )
}

const Footer = () => {
    return (
        <footer className="font-Poppins flex flex-col items-center bg-[url('/shape3.png')] bg-cover bg-center pb-[32px]">
            <div className="flex max-w-[500px] flex-col items-center gap-6 pt-[130px] pb-[140px] text-center">
                <h2 className="text-5xl font-normal tracking-[-0.58px] text-white">
                    Get started today
                </h2>
                <Button className="bg-LightGreen! max-w-[116px] rounded-lg px-[24px]! py-[14px]! text-sm! text-white! normal-case!">
                    Start Now
                </Button>
            </div>
            <MainContainer>
                <div className="grid min-h-[200px] w-full grid-cols-1 gap-6 rounded-2xl bg-[#00473C] px-12 pt-12 pb-16 text-center sm:grid-cols-3 md:grid-cols-6 md:text-left">
                    <FooterLinks
                        title={"Get Started"}
                        links={[
                            { text: "Book a Demo", href: "/" },
                            { text: "Sign In", href: "/s" },
                            {
                                text: "Contact",
                                href: "/a",
                            },
                        ]}
                    />
                    <FooterLinks
                        title={"Product"}
                        links={[
                            { text: "Overview", href: "/b" },
                            { text: "Use Case", href: "/" },
                            {
                                text: "Pricing",
                                href: "/",
                            },
                        ]}
                    />
                    <FooterLinks
                        title={"Developers"}
                        links={[
                            { text: "Overview", href: "/" },
                            { text: "Documentation", href: "/" },
                            {
                                text: "Api Status",
                                href: "/",
                            },
                            {
                                text: "Support",
                                href: "/",
                            },
                            {
                                text: "Security & Compliance",
                                href: "/",
                            },
                        ]}
                    />
                    <FooterLinks
                        title={"Company"}
                        links={[
                            { text: "Expertise", href: "/" },
                            { text: "Newstoom", href: "/" },
                            {
                                text: "Glassary",
                                href: "/",
                            },
                            {
                                text: "Careers",
                                href: "/",
                            },
                            {
                                text: "Platform Spotlight",
                                href: "/",
                            },
                        ]}
                    />
                    <FooterLinks
                        title={" Resources"}
                        links={[
                            { text: "Product Updates", href: "/" },
                            { text: "Blog", href: "/" },
                        ]}
                        socials={[
                            {
                                text: "Linkedin",
                                href: "/",
                                image: LinkedinImage,
                            },
                        ]}
                    />
                    <FooterLinks
                        title={"Legal"}
                        links={[
                            { text: "Privacy Policy", href: "/" },
                            { text: "Legal", href: "/" },
                        ]}
                    />
                </div>
                <div className="flex flex-col items-center justify-between pt-[50px] sm:flex-row">
                    <Image
                        src={LogoImage}
                        alt="LogoImage"
                        width={140}
                        height={22}
                    ></Image>
                    <p className="font-Poppins pt-4 text-[10px] font-normal sm:pt-0">
                        © 2025 Rainforest Pay, Inc
                    </p>
                </div>
            </MainContainer>
        </footer>
    )
}

export default Footer
