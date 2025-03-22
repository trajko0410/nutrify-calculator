"use client"
import { useSession, useSignIn, useSignUp } from "@clerk/nextjs"
import { Input } from "@mui/material"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"

const RegisterModal: React.FC = () => {
    const router = useRouter()
    const { setActive } = useSignIn()
    const { session } = useSession()
    const { signUp } = useSignUp()
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [date_of_birth, setDateOfBirth] = useState("")
    const [verificationCode, setVerificationCode] = useState("")
    const [showVerificationModal, setShowVerificationModal] = useState(false)
    const [disableSignUp, setDisableSignUp] = useState(false)

     

    useEffect(() => {
        if (session?.status === "active") {
            router.push("/home")
        }
    }, [session, router])

    const handleSignUp = async () => {
        if (!email || !password) {
            setTimeout(() => {
                setDisableSignUp(false)
            }, 3500)
            setDisableSignUp(true)
            toast.error("Email or password is empty")
            return
        }

        if (!signUp) {
            toast.error("Authentication service is not available.")
            return
        }

        try {
            const result = await signUp.create({
                emailAddress: email.trim(),
                password,
                firstName,
                lastName,
                unsafeMetadata: { dateOfBirth: date_of_birth },
            })

            if (result.status === "missing_requirements") {
                await signUp.prepareEmailAddressVerification()
                setShowVerificationModal(true) // Show verification modal
                toast.info("Verification email sent. Check your inbox.")
                return
            }
        } catch (error: unknown) {
            console.error("Error signing up:", error)
            const clerkError = error as { errors?: { message: string }[] }
            toast.error(
                clerkError.errors?.[0]?.message || "Sign-up failed. Try again.",
            )
        }
        setTimeout(() => {
            setDisableSignUp(true)
        }, 3500)
        setDisableSignUp(false)
    }

    const handleVerifyEmail = async () => {
        if (!signUp) {
            toast.error("Authentication service is not available.")
            return
        }
        try {
            const verificationResult =
                await signUp.attemptEmailAddressVerification({
                    code: verificationCode,
                })

            if (verificationResult.status === "complete" && setActive) {
                toast.success("Email verified!")
                await setActive({
                    session: verificationResult.createdSessionId,
                })
                router.push("/dashboard")
                toast.success("Sign-up successful!")
                setShowVerificationModal(false) // Close the modal
            } else {
                toast.error("Verification failed. Try again.")
            }
        } catch (error: unknown) {
            console.error("Error verifying email:", error)
            const clerkError = error as { errors?: { message: string }[] }
            toast.error(
                clerkError.errors?.[0]?.message || "Verification failed.",
            )
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
            <p className="text-DarkGreen pt-8 pb-1">Confirm your password</p>
            <Input
                className="w-full"
                placeholder="Confirm your password"
                type="password"
                required
                value={date_of_birth}
                onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <p className="text-DarkGreen pt-8 pb-1">Date of birth</p>
            <Input
                className="w-full"
                placeholder="Enter your password"
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
