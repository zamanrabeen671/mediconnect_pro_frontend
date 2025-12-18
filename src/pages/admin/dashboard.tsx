import { FaUserMd, FaUserInjured, FaCheckCircle, FaClock } from "react-icons/fa"

export default function AdminDashboard() {

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 px-8 py-8 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage doctors, patients, and platform overview</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FaUserMd className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">42</div>
              <div className="text-sm text-muted-foreground">Total Doctors</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <FaUserInjured className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">328</div>
              <div className="text-sm text-muted-foreground">Total Patients</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <FaClock className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">7</div>
              <div className="text-sm text-muted-foreground">Pending Approvals</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">1,234</div>
              <div className="text-sm text-muted-foreground">Total Appointments</div>
            </div>
          </div>

          {/* Pending Doctor Approvals */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Pending Doctor Approvals</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <FaUserMd className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Dr. John Doe {i}</div>
                      <div className="text-sm text-muted-foreground">Cardiology • BMDC: A-{12345 + i}</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors text-sm">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-colors text-sm">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {[
                { action: "New doctor registration", user: "Dr. Sarah Johnson", time: "2 hours ago" },
                { action: "Patient account created", user: "Michael Brown", time: "5 hours ago" },
                { action: "Doctor approved", user: "Dr. Emily White", time: "1 day ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <div className="font-medium text-foreground">{activity.action}</div>
                    <div className="text-sm text-muted-foreground">{activity.user}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
