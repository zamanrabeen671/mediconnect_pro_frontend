import { FaCalendarAlt, FaClock, FaUserInjured, FaVideo, FaCheckCircle, FaClock as FaPending } from "react-icons/fa"
import { useNavigate } from "react-router"

export default function DoctorAppointments() {
  const navigate = useNavigate()
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "Video Call",
      status: "upcoming",
      reason: "Regular Checkup",
      duration: "30 min",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-03-25",
      time: "11:30 AM",
      type: "In-person",
      status: "upcoming",
      reason: "Follow-up",
      duration: "45 min",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      date: "2024-03-24",
      time: "02:00 PM",
      type: "Video Call",
      status: "completed",
      reason: "Consultation",
      duration: "30 min",
    },
    {
      id: 4,
      patientName: "Maria Garcia",
      date: "2024-03-26",
      time: "09:00 AM",
      type: "In-person",
      status: "upcoming",
      reason: "New Patient",
      duration: "60 min",
    },
  ]

  const upcomingAppointments = appointments.filter((apt) => apt.status === "upcoming")
  const completedAppointments = appointments.filter((apt) => apt.status === "completed")

  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Appointments</h1>
              <p className="text-muted-foreground">Manage your patient appointments</p>
            </div>
            <div>
              <button onClick={() => navigate("/doctor/appointments/create")}>
                <span className="px-4 py-2 text-white  bg-blue-500 rounded-lg hover:bg-primary/90 transition-colors">
                  New Appointment
                </span>
              </button>
            </div>
          </div>



          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Today's Appointments</p>
                  <p className="text-3xl font-bold text-foreground">
                    {appointments.filter((a) => a.date === "2024-03-25").length}
                  </p>
                </div>
                <FaCalendarAlt className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-blue-500">{upcomingAppointments.length}</p>
                </div>
                <FaPending className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-500">{completedAppointments.length}</p>
                </div>
                <FaCheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Upcoming Appointments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <FaUserInjured className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{appointment.patientName}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      {appointment.type}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FaCalendarAlt className="w-4 h-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FaClock className="w-4 h-4" />
                      {appointment.time} ({appointment.duration})
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {appointment.type === "Video Call" && (
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors">
                        <FaVideo className="w-4 h-4" />
                        Join Call
                      </button>
                    )}
                    <button className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completed Appointments */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Completed Appointments</h2>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Patient</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Reason</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {completedAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-foreground font-medium">{appointment.patientName}</td>
                      <td className="px-6 py-4 text-foreground">
                        {appointment.date} at {appointment.time}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-medium rounded-full">
                          {appointment.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground">{appointment.reason}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                          <FaCheckCircle className="w-3 h-3" />
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
