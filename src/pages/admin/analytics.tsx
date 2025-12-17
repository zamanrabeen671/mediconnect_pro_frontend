import { FaUserMd, FaUserInjured, FaCalendarCheck, FaDollarSign } from "react-icons/fa"
import AdminSidebar from "../../components/Layout/admin-sidebar"

export default function AdminAnalytics() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
            <p className="text-muted-foreground">Monitor platform performance and metrics</p>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <FaUserMd className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  {/* <FaTrendUp className="w-4 h-4" /> */}
                  <span className="text-sm font-medium">+12%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Doctors</p>
              <p className="text-3xl font-bold text-foreground">145</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <FaUserInjured className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  {/* <FaTrendUp className="w-4 h-4" /> */}
                  <span className="text-sm font-medium">+23%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Total Patients</p>
              <p className="text-3xl font-bold text-foreground">1,284</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <FaCalendarCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-red-600">
                  {/* <FaTrendDown className="w-4 h-4" /> */}
                  <span className="text-sm font-medium">-5%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Appointments</p>
              <p className="text-3xl font-bold text-foreground">3,642</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <FaDollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  {/* <FaTrendUp className="w-4 h-4" /> */}
                  <span className="text-sm font-medium">+18%</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Revenue</p>
              <p className="text-3xl font-bold text-foreground">$52,420</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Appointments Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Appointments Overview</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 78, 52, 89, 73, 82, 95].map((height, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-accent rounded-t-lg transition-all hover:bg-accent/80"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-muted-foreground">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations Distribution */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Popular Specializations</h3>
              <div className="space-y-4">
                {[
                  { name: "Cardiology", count: 32, percentage: 85 },
                  { name: "Neurology", count: 28, percentage: 72 },
                  { name: "Pediatrics", count: 24, percentage: 65 },
                  { name: "Orthopedics", count: 21, percentage: 58 },
                  { name: "Dermatology", count: 18, percentage: 48 },
                ].map((spec, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{spec.name}</span>
                      <span className="text-muted-foreground">{spec.count} doctors</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-accent h-2 rounded-full transition-all"
                        style={{ width: `${spec.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                {
                  action: "New doctor registration",
                  user: "Dr. Sarah Johnson",
                  time: "2 hours ago",
                  type: "doctor",
                },
                {
                  action: "Appointment completed",
                  user: "John Doe with Dr. Michael Chen",
                  time: "3 hours ago",
                  type: "appointment",
                },
                {
                  action: "New patient registration",
                  user: "Jane Smith",
                  time: "5 hours ago",
                  type: "patient",
                },
                {
                  action: "Doctor profile approved",
                  user: "Dr. Emily Rodriguez",
                  time: "6 hours ago",
                  type: "approval",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-muted rounded-lg">
                  <div
                    className={`p-3 rounded-full ${
                      activity.type === "doctor"
                        ? "bg-blue-50 text-blue-600"
                        : activity.type === "patient"
                          ? "bg-green-50 text-green-600"
                          : activity.type === "appointment"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {activity.type === "doctor" ? (
                      <FaUserMd className="w-5 h-5" />
                    ) : activity.type === "patient" ? (
                      <FaUserInjured className="w-5 h-5" />
                    ) : (
                      <FaCalendarCheck className="w-5 h-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
