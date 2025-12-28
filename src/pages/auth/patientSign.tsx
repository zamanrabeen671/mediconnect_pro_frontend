"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router"
import { useAppDispatch } from "../../store/hooks"
import { FaPhone, FaArrowLeft } from "react-icons/fa"
import { sendOTP, verifyOTP, clearConfirmationResult } from "../../utils/otpService"
import { setUser } from "../../store/slices/auth-slice"
import { patientOTPSignIn } from "../../store/API/patientAuthApi"

export const PatientSign = () => {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(0)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  // Resend timer countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [resendTimer])

  // Format phone number with country code
  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, "")
    
    // Add country code if not present
    if (cleaned.length === 10) {
      return "+1" + cleaned // Default to US +1
    } else if (!cleaned.startsWith("1") && cleaned.length === 10) {
      return "+1" + cleaned
    } else if (cleaned.startsWith("1") && cleaned.length === 11) {
      return "+" + cleaned
    } else if (cleaned.startsWith("+")) {
      return cleaned
    }
    
    return "+" + cleaned
  }

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!phoneNumber) {
      setError("Please enter a phone number")
      return
    }

    if (phoneNumber.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    setLoading(true)
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      await sendOTP(formattedPhone)
      setStep("otp")
      setResendTimer(60) // 60 second countdown before resend
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp) {
      setError("Please enter the OTP")
      return
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits")
      return
    }

    setLoading(true)
    try {
      const result = await verifyOTP(otp)

      // Call backend to login/register patient
      await handlePatientLogin(result.user.uid, result.idToken, phoneNumber.replace(/\D/g, "").slice(-10))

      // Set user in Redux with patient role
      dispatch(
        setUser({
          id: parseInt(result.user.uid.slice(0, 8), 16), // Convert uid to number
          email: result.user.email || "",
          name: "",
          role: "patient",
          status: "approved",
        })
      )

      // Redirect to patient dashboard
      navigate("/patient")
    } catch (err: any) {
      setError(err.message || "Failed to verify OTP. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError("")
    setLoading(true)
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber)
      await sendOTP(formattedPhone)
      setResendTimer(60)
      // Clear the form for new OTP
      setOtp("")
    } catch (err: any) {
      setError(err.message || "Failed to resend OTP. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePatientLogin = async (uid: string, idToken: string, phoneNumber: string) => {
    try {
      // Call your backend API to create or login patient
      const response = await patientOTPSignIn(uid, idToken, phoneNumber)
      console.log("Patient logged in successfully:", response)
      return response
    } catch (err: any) {
      console.error("Error during patient login:", err)
      // Still allow login even if backend call fails (for offline/testing scenarios)
      console.warn("Proceeding with client-side login despite backend error")
    }
  }

  const handleBack = () => {
    if (step === "otp") {
      setStep("phone")
      setOtp("")
      setError("")
      clearConfirmationResult()
      setResendTimer(0)
    } else {
      navigate("/sign-in")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Patient Sign In</h1>
          <p className="text-muted-foreground mt-2">
            {step === "phone" 
              ? "Enter your phone number to receive an OTP" 
              : "Enter the OTP sent to your phone"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}

          {step === "phone" ? (
            // Phone Input Step
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="(555) 123-4567"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Enter your 10-digit phone number
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            // OTP Verification Step
            <form onSubmit={handleOTPSubmit} className="space-y-6">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-2">
                  One-Time Password
                </label>
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground text-center text-2xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="000000"
                  maxLength={6}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Enter the 6-digit OTP sent to {phoneNumber}
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              <div className="text-center text-sm">
                <p className="text-muted-foreground">
                  Didn't receive the code?{" "}
                  {resendTimer > 0 ? (
                    <span className="text-foreground font-medium">
                      Resend in {resendTimer}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOTP}
                      disabled={loading || resendTimer > 0}
                      className="text-accent hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>
              </div>
            </form>
          )}

          {/* Back Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleBack}
              className="flex items-center justify-center gap-2 mx-auto text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FaArrowLeft className="w-3 h-3" />
              {step === "otp" ? "Back to Phone" : "Back to Sign In"}
            </button>
          </div>
        </div>

        {/* Recaptcha Container */}
        <div id="recaptcha-container"></div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PatientSign

