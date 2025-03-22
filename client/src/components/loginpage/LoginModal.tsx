"use client"
import { useSignIn } from "@clerk/nextjs"
import { IconButton, Input, InputAdornment } from "@mui/material"
import { Eye, EyeClosed } from "@phosphor-icons/react"
import React   from "react"
import { toast } from "react-toastify"

const LoginModal: React.FC = () => {
    const { signIn, setActive } = useSignIn()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [showPassword, setShowPassword] = React.useState(false)

     

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

    const handleSignIn = async () => {
        if (!email || !password) {
            toast.error("Email or password is empty")
            return
        }

        try {
            console.log("signIn object:", signIn)

            if (!signIn) {
                toast.error("Authentication service is not available.")
                return
            }

            const result = await signIn.create({
                identifier: email.trim(),
                password: password,
            })

            if (result?.status === "complete") {
                await setActive({ session: result.createdSessionId })

                toast.success("Login successful!")
                return
            } else {
                console.error("Unhandled sign-in status:", result)
                toast.error("There was an error signing in. Please try again.")
            }
        } catch (error: unknown | any) {
            console.error(error)
            toast.error(String(error.message))
            switch (error.errors[0].meta.paramName) {
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
            console.log("error here:", error.errors[0].meta.paramName)
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            handleSignIn()
        }
    }

    return (
        <div className="w-full max-w-[510px] justify-around rounded-2xl bg-white p-8">
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
            />
            <button
                onClick={handleSignIn}
                className="bg-LightGreen mt-16 w-full rounded-lg py-2 text-white"
            >
                Login
            </button>
        </div>
    )
}

export default LoginModal
