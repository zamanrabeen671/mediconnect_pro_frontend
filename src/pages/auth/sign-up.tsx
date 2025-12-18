"use client"

import type React from "react"

import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { FaEnvelope, FaLock, FaUser, FaUserMd } from "react-icons/fa"
import { Link, useNavigate } from "react-router"
import { userCreate } from "../../store/API/userApis"

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient" as "patient" | "doctor",
  })
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    const newUser = {
      email: formData.email,
      password: formData.password,
      role: formData.role,
    }
    dispatch(userCreate({
        postData: newUser,
        router: navigate,
      }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join our healthcare platform</p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-3">I am a</label>
              <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Select role">
                <button
                  type="button"
                  role="radio"
                  aria-checked={formData.role === "patient"}
                  onClick={() => setFormData({ ...formData, role: "patient" })}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                    formData.role === "patient"
                      ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/20 scale-105"
                      : "border-border hover:border-accent/50 bg-card"
                  }`}
                >
                  <div className="relative">
                    <FaUser className="w-6 h-6" />
                  </div>
                  <span className="font-medium">Patient</span>
                </button>

                <button
                  type="button"
                  role="radio"
                  aria-checked={formData.role === "doctor"}
                  onClick={() => setFormData({ ...formData, role: "doctor" })}
                  className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                    formData.role === "doctor"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-600 ring-2 ring-emerald-200 scale-105"
                      : "border-border hover:border-accent/50 bg-card"
                  }`}
                >
                  <div className="relative">
                    <FaUserMd className="w-6 h-6" />
                  </div>
                  <span className="font-medium">Doctor</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-accent hover:underline font-medium">
                Sign In
              </Link>
            </p>
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
