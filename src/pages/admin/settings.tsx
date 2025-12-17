"use client"

import { FaUser, FaBell, FaShieldAlt, FaCog, FaSave } from "react-icons/fa"
import { useState } from "react"
import AdminSidebar from "../../components/Layout/admin-sidebar"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security" | "system">("profile")

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account and system preferences</p>
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
                onClick={() => setActiveTab("system")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === "system"
                    ? "bg-accent text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaCog className="w-4 h-4" />
                System
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
                        defaultValue="Admin User"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="admin@mediconnect.com"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 234 567 8900"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Role</label>
                      <input
                        type="text"
                        value="Administrator"
                        disabled
                        className="w-full px-4 py-2 bg-muted border border-border rounded-lg text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "notifications" && (
                <div className="space-y-4">
                  {[
                    { label: "Email notifications for new doctor registrations", checked: true },
                    { label: "Email notifications for patient registrations", checked: true },
                    { label: "Daily analytics reports", checked: false },
                    { label: "Weekly system health reports", checked: true },
                    { label: "Push notifications for urgent matters", checked: true },
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
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Make sure your password is at least 8 characters long and includes numbers and special characters.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === "system" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Platform Name</label>
                    <input
                      type="text"
                      defaultValue="MediConnect Pro"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Maintenance Mode</label>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span className="text-foreground">Enable maintenance mode</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Default Appointment Duration (minutes)
                    </label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-foreground"
                    />
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
