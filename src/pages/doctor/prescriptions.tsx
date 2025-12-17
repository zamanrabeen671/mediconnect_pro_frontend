import { FaFileAlt, FaPills, FaPlus, FaEye, FaDownload } from "react-icons/fa"
import DoctorSidebar from "../../components/Layout/doctor-sidebar"

export default function DoctorPrescriptions() {
  const prescriptions = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-03-20",
      medicines: ["Aspirin 100mg", "Metformin 500mg"],
      diagnosis: "Hypertension",
      status: "active",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-03-18",
      medicines: ["Insulin Glargine", "Metformin 850mg"],
      diagnosis: "Type 2 Diabetes",
      status: "active",
    },
    {
      id: 3,
      patientName: "Robert Johnson",
      date: "2024-03-15",
      medicines: ["Salbutamol Inhaler", "Montelukast 10mg"],
      diagnosis: "Asthma",
      status: "completed",
    },
    {
      id: 4,
      patientName: "Maria Garcia",
      date: "2024-03-22",
      medicines: ["Vitamin D3", "Calcium Supplement"],
      diagnosis: "Regular Checkup",
      status: "active",
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Prescriptions</h1>
              <p className="text-muted-foreground">Manage patient prescriptions and medications</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium">
              <FaPlus className="w-4 h-4" />
              New Prescription
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Prescriptions</p>
                  <p className="text-3xl font-bold text-foreground">{prescriptions.length}</p>
                </div>
                <FaFileAlt className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active</p>
                  <p className="text-3xl font-bold text-green-500">
                    {prescriptions.filter((p) => p.status === "active").length}
                  </p>
                </div>
                <FaPills className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold text-blue-500">
                    {prescriptions.filter((p) => p.status === "completed").length}
                  </p>
                </div>
                <FaFileAlt className="w-8 h-8 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Prescriptions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1">{prescription.patientName}</h3>
                    <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      prescription.status === "active" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {prescription.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Medicines:</p>
                  <div className="space-y-1">
                    {prescription.medicines.map((medicine, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FaPills className="w-3 h-3 text-accent" />
                        {medicine}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">Date: {prescription.date}</span>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-accent">
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors text-accent">
                      <FaDownload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
