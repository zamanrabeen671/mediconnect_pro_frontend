"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { FaEnvelope, FaLock } from "react-icons/fa"
import { Link, useNavigate } from "react-router"
import { login } from "../../store/API/userApis"

export default function SignIn() {
  const [signInType, setSignInType] = useState<"normal" | "patient-otp">("normal")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNormalSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    try {
      const data = await dispatch(
        login({ postData: { email, password }, router: navigate }),
      )
      console.log(data)
    } catch (error) {
      setError("Invalid email or password")
    }
  }

  const handlePatientOTPSignIn = () => {
    navigate("/sign-in/patient-otp")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Sign In Type Selection */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSignInType("normal")}
              className={`p-4 rounded-lg font-medium transition-all ${
                signInType === "normal"
                  ? "bg-accent text-accent-foreground border-2 border-accent"
                  : "bg-muted text-muted-foreground border-2 border-transparent hover:border-accent/50"
              }`}
            >
              Normal Sign In
            </button>
            <button
              onClick={() => setSignInType("patient-otp")}
              className={`p-4 rounded-lg font-medium transition-all ${
                signInType === "patient-otp"
                  ? "bg-accent text-accent-foreground border-2 border-accent"
                  : "bg-muted text-muted-foreground border-2 border-transparent hover:border-accent/50"
              }`}
            >
              Patient OTP
            </button>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          {signInType === "normal" ? (
            // Normal Sign In Form
            <form onSubmit={handleNormalSignIn} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Sign In
              </button>
            </form>
          ) : (
            // Patient OTP Sign In Info
            <div className="space-y-6 py-4">
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div className="text-center space-y-2">
                <p className="text-foreground font-medium">Sign in as Patient with OTP</p>
                <p className="text-sm text-muted-foreground">
                  Enter your phone number to receive an OTP
                </p>
              </div>

              <button
                onClick={handlePatientOTPSignIn}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
              >
                Continue with OTP
              </button>
            </div>
          )}

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-accent hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs font-medium text-foreground mb-2">Demo Credentials:</p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>Admin: admin@mediconnect.com</p>
              <p>Doctor: doctor@mediconnect.com</p>
              <p>Patient: patient@mediconnect.com</p>
              <p className="text-[10px] mt-2">Password: any password</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
