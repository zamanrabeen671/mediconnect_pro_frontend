import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { FaCalendarPlus, FaUserMd, FaHistory, FaPrescription } from "react-icons/fa"
import { getPatientStatistic } from "../../store/API/patientApi";

export default function PatientDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth)
  const { patientStatistics } = useAppSelector((state) => state.patient)

  useEffect(() => {
    // You can fetch additional data here if needed
    dispatch(getPatientStatistic());
  }, [dispatch])

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">Book appointments and manage your health records</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <FaCalendarPlus className="w-6 h-6 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground">Upcoming</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{patientStatistics?.upcoming_appointments}</div>
            <div className="text-sm text-muted-foreground">Appointments</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <FaUserMd className="w-6 h-6 text-success" />
              </div>
              <span className="text-sm text-muted-foreground">Visited</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{patientStatistics?.visited_doctors}</div>
            <div className="text-sm text-muted-foreground">Doctors</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <FaPrescription className="w-6 h-6 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-1">{patientStatistics?.active_prescriptions}</div>
            <div className="text-sm text-muted-foreground">Prescriptions</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
              <FaCalendarPlus className="w-5 h-5 text-accent" />
              <div>
                <div className="font-medium text-foreground">Book Appointment</div>
                <div className="text-sm text-muted-foreground">Schedule with a doctor</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
              <FaUserMd className="w-5 h-5 text-accent" />
              <div>
                <div className="font-medium text-foreground">Find Doctors</div>
                <div className="text-sm text-muted-foreground">Search specialists</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
              <FaHistory className="w-5 h-5 text-accent" />
              <div>
                <div className="font-medium text-foreground">Medical History</div>
                <div className="text-sm text-muted-foreground">View past records</div>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-muted transition-colors text-left">
              <FaPrescription className="w-5 h-5 text-accent" />
              <div>
                <div className="font-medium text-foreground">Prescriptions</div>
                <div className="text-sm text-muted-foreground">View active prescriptions</div>
              </div>
            </button>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                    <FaUserMd className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Dr. Smith</div>
                    <div className="text-sm text-muted-foreground">Cardiology Consultation</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">Tomorrow</div>
                  <div className="text-sm text-muted-foreground">2:00 PM</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
