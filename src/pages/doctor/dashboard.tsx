import { useAppSelector } from "../../store/hooks"
import { FaCalendarAlt, FaUserInjured, FaFileAlt, FaCog } from "react-icons/fa"

export default function DoctorDashboard() {
  const { user } = useAppSelector((state) => state.auth)

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex-1 flex flex-col">

        <div className="flex-1 px-8 py-8 overflow-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, Dr. {user?.name}</h1>
            <p className="text-muted-foreground">Manage your appointments and patients from your dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FaCalendarAlt className="w-6 h-6 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Today</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">8</div>
              <div className="text-sm text-muted-foreground">Appointments</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <FaUserInjured className="w-6 h-6 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Total</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">124</div>
              <div className="text-sm text-muted-foreground">Patients</div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <FaFileAlt className="w-6 h-6 text-warning" />
                </div>
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">3</div>
              <div className="text-sm text-muted-foreground">Reports</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <FaCalendarAlt className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium text-foreground">View Appointments</div>
                  <div className="text-sm text-muted-foreground">Check today's schedule</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <FaUserInjured className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium text-foreground">Patient Records</div>
                  <div className="text-sm text-muted-foreground">Access patient history</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <FaFileAlt className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium text-foreground">Create Prescription</div>
                  <div className="text-sm text-muted-foreground">Write new prescription</div>
                </div>
              </button>
              <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
                <FaCog className="w-5 h-5 text-accent" />
                <div>
                  <div className="font-medium text-foreground">Settings</div>
                  <div className="text-sm text-muted-foreground">Update profile & preferences</div>
                </div>
              </button>
            </div>
          </div>

          {/* Today's Appointments */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Today's Appointments</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <FaUserInjured className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Patient {i}</div>
                      <div className="text-sm text-muted-foreground">Regular Checkup</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{9 + i}:00 AM</div>
                    <div className="text-sm text-muted-foreground">30 min</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
