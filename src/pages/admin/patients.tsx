import { FaUserInjured, FaMale, FaFemale, FaPhone, FaEnvelope, FaCalendar, FaEye } from "react-icons/fa"
import AdminSidebar from "../../components/Layout/admin-sidebar"

export default function AdminPatients() {
  const patients = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      gender: "Male",
      age: 35,
      bloodGroup: "A+",
      address: "123 Main St, New York, NY",
      joinedDate: "2024-01-10",
      appointments: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 234 567 8901",
      gender: "Female",
      age: 28,
      bloodGroup: "B+",
      address: "456 Oak Ave, Los Angeles, CA",
      joinedDate: "2024-02-15",
      appointments: 3,
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert.j@example.com",
      phone: "+1 234 567 8902",
      gender: "Male",
      age: 42,
      bloodGroup: "O+",
      address: "789 Pine Rd, Chicago, IL",
      joinedDate: "2024-01-20",
      appointments: 8,
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      phone: "+1 234 567 8903",
      gender: "Female",
      age: 31,
      bloodGroup: "AB+",
      address: "321 Elm St, Houston, TX",
      joinedDate: "2024-03-05",
      appointments: 2,
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Patient Management</h1>
            <p className="text-muted-foreground">View and manage patient records</p>
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
                  <p className="text-sm text-muted-foreground mb-1">Male</p>
                  <p className="text-3xl font-bold text-blue-500">
                    {patients.filter((p) => p.gender === "Male").length}
                  </p>
                </div>
                <FaMale className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Female</p>
                  <p className="text-3xl font-bold text-pink-500">
                    {patients.filter((p) => p.gender === "Female").length}
                  </p>
                </div>
                <FaFemale className="w-8 h-8 text-pink-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Appointments</p>
                  <p className="text-3xl font-bold text-foreground">
                    {patients.reduce((sum, p) => sum + p.appointments, 0)}
                  </p>
                </div>
                <FaCalendar className="w-8 h-8 text-accent" />
              </div>
            </div>
          </div>

          {/* Patients Table */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Patient</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Gender</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Age</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Blood Group</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Appointments</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {patients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-foreground">{patient.name}</div>
                          <div className="text-sm text-muted-foreground">{patient.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <FaEnvelope className="w-3 h-3 text-muted-foreground" />
                            {patient.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <FaPhone className="w-3 h-3 text-muted-foreground" />
                            {patient.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                            patient.gender === "Male" ? "bg-blue-50 text-blue-600" : "bg-pink-50 text-pink-600"
                          }`}
                        >
                          {patient.gender === "Male" ? (
                            <FaMale className="w-3 h-3" />
                          ) : (
                            <FaFemale className="w-3 h-3" />
                          )}
                          {patient.gender}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground">{patient.age}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-50 text-red-600">
                          {patient.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground">{patient.appointments}</td>
                      <td className="px-6 py-4">
                        <button className="p-2 hover:bg-muted rounded-lg transition-colors text-accent">
                          <FaEye className="w-4 h-4" />
                        </button>
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
