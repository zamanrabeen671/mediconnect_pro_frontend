import { FaUserInjured, FaPhone, FaEnvelope, FaCalendar, FaEye, FaNotesMedical } from "react-icons/fa"
import DoctorSidebar from "../../components/Layout/doctor-sidebar"

export default function DoctorPatients() {
  const patients = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      age: 35,
      bloodGroup: "A+",
      lastVisit: "2024-03-20",
      totalVisits: 5,
      condition: "Hypertension",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 234 567 8901",
      age: 28,
      bloodGroup: "B+",
      lastVisit: "2024-03-18",
      totalVisits: 3,
      condition: "Diabetes",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+1 234 567 8902",
      age: 42,
      bloodGroup: "O+",
      lastVisit: "2024-03-15",
      totalVisits: 8,
      condition: "Asthma",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+1 234 567 8903",
      age: 31,
      bloodGroup: "AB+",
      lastVisit: "2024-03-22",
      totalVisits: 2,
      condition: "Regular Checkup",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Patients</h1>
            <p className="text-muted-foreground">View and manage your patient records</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-foreground">{patients.length}</p>
                </div>
                <FaUserInjured className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">New This Week</p>
                  <p className="text-3xl font-bold text-green-500">2</p>
                </div>
                <FaCalendar className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Visits</p>
                  <p className="text-3xl font-bold text-blue-500">
                    {patients.reduce((sum, p) => sum + p.totalVisits, 0)}
                  </p>
                </div>
                <FaNotesMedical className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg Age</p>
                  <p className="text-3xl font-bold text-foreground">
                    {Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)}
                  </p>
                </div>
                <FaUserInjured className="w-8 h-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Patients Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <FaUserInjured className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">{patient.name}</h3>
                      <p className="text-sm text-muted-foreground">{patient.condition}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-sm font-medium rounded-full">
                    {patient.bloodGroup}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FaEnvelope className="w-4 h-4" />
                    {patient.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FaPhone className="w-4 h-4" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FaCalendar className="w-4 h-4" />
                    Last visit: {patient.lastVisit}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Age:</span>
                    <span className="ml-1 font-medium text-foreground">{patient.age} years</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Visits:</span>
                    <span className="ml-1 font-medium text-foreground">{patient.totalVisits}</span>
                  </div>
                  <button className="p-2 hover:bg-muted rounded-lg transition-colors text-accent">
                    <FaEye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
