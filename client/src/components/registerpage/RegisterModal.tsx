"use client"
import { Input } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import Cookies from "js-cookie" // To handle storing the JWT token in a cookie

const RegisterModal: React.FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [date_of_birth, setDateOfBirth] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [showVerificationModal, setShowVerificationModal] = useState(false)
    const [disableSignUp, setDisableSignUp] = useState(false)

    useEffect(() => {
        if (Cookies.get("jwtNutrifyS")) {
            router.push("/dashboard")
        }
    }, [router])

    const handleSignUp = async () => {
        if (!email || !password) {
            setTimeout(() => {
                setDisableSignUp(false)
            }, 3500)
            setDisableSignUp(true)
            toast.error("Email or password is empty")
            return
        }

        try {
            const res = await fetch(
                "http://localhost:1337/api/auth/local/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: email.trim(),
                        email,
                        password,
                        first_name: firstName,
                        last_name: lastName,
                    }),
                },
            )

            const data = await res.json()

            console.log("Response status:", res.status)
            console.log("Parsed response:", data)

            if (res.ok && data.jwt && data.user) {
                Cookies.set("jwtNutrifyS", data.jwt, { expires: 1 })

                toast.success("Sign-up successful!")
                router.push("/dashboard")
            } else {
                toast.error("Unexpected response from server.")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: unknown | any) {
            console.error("Error signing up:", error)
            toast.error(error.message || "Sign-up failed. Try again.")
        }

        setDisableSignUp(false)
    }

    const handleVerifyEmail = async () => {
        if (!verificationCode) {
            toast.error("Please enter the verification code.")
            return
        }

        try {
            const response = await fetch(
                `http://localhost:1337/api/auth/email-verification/${verificationCode}`,
                {
                    method: "POST",
                },
            )

            const result = await response.json()

            if (
                response.ok &&
                result?.message === "Email successfully confirmed"
            ) {
                toast.success("Email verified!")
                setShowVerificationModal(false)
                router.push("/dashboard") // Redirect after successful verification
            } else {
                toast.error("Verification failed. Please try again.")
            }
        } catch (error) {
            console.error("Error verifying email:", error)
            toast.error("Verification failed. Please try again.")
        }
    }

    return (
        <div className="w-full max-w-[510px] justify-around rounded-2xl bg-white p-8">
            <h1 className="text-DarkGreen text-2xl font-medium">Register</h1>

            <p className="text-DarkGreen pt-8 pb-1">First name</p>
            <Input
                className="w-full"
                placeholder="Enter your first name"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <p className="text-DarkGreen pt-8 pb-1">Last name</p>
            <Input
                className="w-full"
                placeholder="Enter your last name"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <p className="text-DarkGreen pt-8 pb-1">Email</p>
            <Input
                className="w-full"
                placeholder="Enter your email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <p className="text-DarkGreen pt-8 pb-1">Password</p>
            <Input
                className="w-full"
                placeholder="Enter your password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <p className="text-DarkGreen pt-8 pb-1">Date of birth</p>
            <Input
                className="w-full"
                placeholder="Enter your birth date"
                type="date"
                required
                value={date_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />

            <button
                onClick={handleSignUp}
                disabled={disableSignUp}
                className={`mt-8 w-full py-2 ${
                    disableSignUp ? "bg-gray-400" : "bg-LightGreen"
                } cursor-pointer rounded-lg text-white`}
            >
                Sign Up
            </button>

            {/* Verification Modal */}
            {showVerificationModal && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
                    <div className="w-[400px] rounded-lg bg-white p-6">
                        <h2 className="text-DarkGreen text-xl font-medium">
                            Verify Your Email
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Enter the 6-digit code sent to your email.
                        </p>

                        <Input
                            className="mt-4 w-full"
                            placeholder="Enter code"
                            type="text"
                            value={verificationCode}
                            onChange={(e) =>
                                setVerificationCode(e.target.value)
                            }
                        />

                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setShowVerificationModal(false)}
                                className="rounded-lg bg-gray-400 px-4 py-2 text-white"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleVerifyEmail}
                                className="bg-LightGreen rounded-lg px-4 py-2 text-white"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RegisterModal
