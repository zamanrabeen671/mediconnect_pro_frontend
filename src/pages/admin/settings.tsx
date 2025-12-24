"use client"

import { FaUser, FaCog, FaSave } from "react-icons/fa"
import { useState } from "react"
import { Medicine } from "../../components/common/medicine"

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<"profile" | "medicine">("profile")

  return (
    <div className="flex min-h-screen bg-background">

      <main className="flex-1 p-2">
        <div className="w-full mx-auto">
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
                    ? "bg-blue-600 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaUser className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("medicine")}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                  activeTab === "medicine"
                    ? "bg-blue-600 text-white"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FaCog className="w-4 h-4" />
                Medicine
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
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="admin@mediconnect.com"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="+1 234 567 8900"
                        className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
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

                  {/* Save Button */}
                  <div className="mt-8 flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      <FaSave className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "medicine" && (
                <Medicine />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}