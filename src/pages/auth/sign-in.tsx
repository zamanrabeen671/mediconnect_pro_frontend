"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { setUser } from "../../store/slices/auth-slice"
import { FaEnvelope, FaLock, FaStethoscope } from "react-icons/fa"
import { Link, useNavigate } from "react-router"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Mock authentication - In production, this would be an API call
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    // Demo users for testing
    const demoUsers = {
      "admin@mediconnect.com": { role: "admin", name: "Admin User", profileCompleted: true },
      "doctor@mediconnect.com": { role: "doctor", name: "Dr. Smith", profileCompleted: false },
      "patient@mediconnect.com": { role: "patient", name: "John Doe", profileCompleted: true },
    }

    const userEmail = email as keyof typeof demoUsers
    if (demoUsers[userEmail]) {
      const userData = demoUsers[userEmail]
      dispatch(
        setUser({
          id: Math.random().toString(),
          email,
          name: userData.name,
          role: userData.role as "admin" | "doctor" | "patient",
          profileCompleted: userData.profileCompleted,
        }),
      )
      navigate(`/${userData.role}`)
    } else {
      setError("Invalid credentials. Try: admin@mediconnect.com, doctor@mediconnect.com, or patient@mediconnect.com")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaStethoscope className="w-10 h-10 text-accent" />
            <span className="text-3xl font-bold text-foreground">MediConnect Pro</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Sign In Form */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
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
