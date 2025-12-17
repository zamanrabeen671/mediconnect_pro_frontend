"use client"

import { FaUser, FaBell, FaShieldAlt, FaCalendar, FaSave } from "react-icons/fa"
import { useState } from "react"
import DoctorSidebar from "../../components/Layout/doctor-sidebar"

export default function DoctorSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "schedule">("profile")

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
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
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaUser className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === "notifications"
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaBell className="w-4 h-4" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === "security"
                    ? "bg-accent text-white"
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
                    ? "bg-accent text-white"
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

              {activeTab === "notifications" && (
                <div className="space-y-4">
                  {[
                    { label: "Email notifications for new appointments", checked: true },
                    { label: "SMS reminders for upcoming appointments", checked: true },
                    { label: "Push notifications for patient messages", checked: false },
                    { label: "Weekly performance reports", checked: true },
                    { label: "Prescription renewal reminders", checked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span className="text-foreground">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                  ))}
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Consultation Duration</label>
                    <select className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground">
                      <option>15 minutes</option>
                      <option selected>30 minutes</option>
                      <option>45 minutes</option>
                      <option>60 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-4">Working Days</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <label
                          key={day}
                          className="flex items-center gap-2 p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
                        >
                          <input type="checkbox" defaultChecked={day !== "Sunday"} className="w-4 h-4 text-accent" />
                          <span className="text-foreground">{day}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Start Time</label>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">End Time</label>
                      <input
                        type="time"
                        defaultValue="17:00"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 flex justify-end">
                <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium">
                  <FaSave className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
