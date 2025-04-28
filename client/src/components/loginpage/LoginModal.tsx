"use client"
import { IconButton, Input, InputAdornment } from "@mui/material"
import { Eye, EyeClosed } from "@phosphor-icons/react"
import React from "react"
import { toast } from "react-toastify"
import { strapi } from "@strapi/client"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const LoginModal: React.FC = () => {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)
    const router = useRouter()

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        event.preventDefault()
    }

    const handleSignIn = async (event?: React.FormEvent) => {
        if (event) event.preventDefault()

        if (!email || !password) {
            toast.error("Email or password is empty")
            return
        }

        try {
            const loginRes = await fetch(
                "http://localhost:1337/api/auth/local",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ identifier: email, password }),
                },
            )

            const loginData = await loginRes.json()

            if (!loginRes.ok) {
                throw new Error(loginData?.error?.message || "Login failed")
            }

            const jwt = loginData.jwt

            const client = strapi({
                baseURL: "http://localhost:1337/api",
                auth: jwt,
            })

            const me = await (await client.fetch("users/me?populate=*")).json()

            console.log("User info:", me)
            toast.success("Login successful")

            Cookies.set("jwtNutrifyS", jwt, { expires: 1, path: "/" })

            // maybe redirect here if you want
            router.push("/dashboard")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: unknown | any) {
            console.error(error)
            toast.error(String(error.message))

            const param = error?.errors?.[0]?.meta?.paramName
            switch (param) {
                case "identifier":
                    setError("identifier")
                    break
                case "password":
                    setError("password")
                    break
                case "account":
                    setError("account")
                    break
                default:
                    setError("unknown")
                    break
            }
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault() // Prevent form submission behavior
            handleSignIn() // Call sign-in logic
        }
    }

    return (
        <form className="w-full max-w-[510px] justify-around rounded-2xl bg-white p-8">
            <h1 className="text-DarkGreen text-2xl font-medium">Login</h1>
            <p className={`text-DarkGreen pt-8 pb-6`}>Email</p>
            <Input
                className="w-full"
                placeholder="Enter your email"
                type="email"
                required
                value={email}
                autoComplete="email"
                autoFocus={true}
                error={
                    error.includes("identifier") || error.includes("account")
                        ? true
                        : false
                }
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <p className="text-DarkGreen pt-8 pb-6">Password</p>
            <Input
                className="w-full"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label={
                                showPassword
                                    ? "hide the password"
                                    : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                            {showPassword ? (
                                <Eye size={24} />
                            ) : (
                                <EyeClosed size={24} />
                            )}
                        </IconButton>
                    </InputAdornment>
                }
                required
                value={password}
                error={
                    error.includes("password") || error.includes("account")
                        ? true
                        : false
                }
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                autoComplete="current-password"
            />
            <button
                onClick={handleSignIn}
                className="bg-LightGreen mt-16 w-full rounded-lg py-2 text-white"
            >
                Login
            </button>
        </form>
    )
}

export default LoginModal
