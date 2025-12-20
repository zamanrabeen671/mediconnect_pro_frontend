"use client"

import { FaUser, FaShieldAlt, FaCalendar } from "react-icons/fa"
import { useState } from "react"
import { Schedule } from "../../components/schedule/schedule"

export default function DoctorSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "schedule">("profile")

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your profile and preferences</p>
          </div>

          {/* Tabs */}
          <div className="bg-card border border-border rounded-lg overflow-hidden mb-6">
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === "profile"
                    ? "bg-accent text-blue-600 border-2 border-blue-100"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaUser className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === "security"
                    ? "bg-accent text-blue-600 border-2 border-blue-100"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaShieldAlt className="w-4 h-4" />
                Security
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === "schedule"
                    ? "bg-accent text-blue-600 border-2 border-blue-100"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaCalendar className="w-4 h-4" />
                Schedule
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "profile" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue="Dr. Sarah Johnson"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Specialization</label>
                      <input
                        type="text"
                        defaultValue="Cardiology"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="sarah.johnson@example.com"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 234 567 8900"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Institute</label>
                      <input
                        type="text"
                        defaultValue="City General Hospital"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">BMDC Number</label>
                      <input
                        type="text"
                        defaultValue="BMDC-12345"
                        disabled
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                    <textarea
                      rows={4}
                      defaultValue="Experienced cardiologist with over 10 years of practice in cardiovascular medicine."
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    />
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    />
                  </div>
                </div>
              )}

              {activeTab === "schedule" && (
               <Schedule  />
              )}

    
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
