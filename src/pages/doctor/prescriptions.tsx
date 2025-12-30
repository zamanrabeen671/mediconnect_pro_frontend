import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { FaFileAlt, FaPills, FaPlus, FaEye, FaDownload } from "react-icons/fa"
import DoctorSidebar from "../../components/Layout/doctor-sidebar"
import useAxios from "../../utils/useAxios"
import { API_URL, BASE_URL } from "../../settings/config"
import { useAppSelector } from "../../store/hooks"

type PrescriptionMedicine = {
  id?: number
  medicine?: {
    id?: number
    name?: string
    strength?: string | null
    form?: string | null
  } | null
  dosage?: string | null
  duration?: string | null
  instruction?: string | null
}

type Prescription = {
  id: number
  appointment_id: number
  patient_id: number
  notes?: string | null
  medicines?: PrescriptionMedicine[] | null
}

type Appointment = {
  id: number
  doctor_id: number
  patient_id: number
  appointment_date: string
  appointment_time: string
  status?: string
}

type Patient = {
  id: number
  full_name: string
  age?: number
  gender?: string
}

type DoctorAppointment = Appointment & {
  patient?: Patient
}

type EnrichedPrescription = Prescription & {
  appointment?: DoctorAppointment
  patient?: Patient
}

export default function DoctorPrescriptions() {
  const api = useAxios()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [prescriptions, setPrescriptions] = useState<EnrichedPrescription[]>([])

  useEffect(() => {
    const loadPrescriptions = async () => {
      setLoading(true)
      setError(null)

      try {
        if (!user?.id) {
          setPrescriptions([])
          setLoading(false)
          return
        }

        const { data: appointmentData } = await api.get(`${API_URL}/appointments/doctor/${user.id}`)
        const appointments: DoctorAppointment[] = Array.isArray(appointmentData) ? appointmentData : []

        if (!appointments.length) {
          setPrescriptions([])
          setLoading(false)
          return
        }

        const enriched: EnrichedPrescription[] = []

        await Promise.all(
          appointments.map(async (appointment) => {
            try {
              const { data: prescriptionData } = await api.get(`${BASE_URL}/prescriptions/appointment/${appointment.id}/`)
              if (!prescriptionData) return

              const normalized: Prescription[] = Array.isArray(prescriptionData)
                ? (prescriptionData as Prescription[])
                : [prescriptionData as Prescription]

              normalized.forEach((prescription) => {
                if (!prescription) return
                enriched.push({ ...prescription, appointment, patient: appointment.patient })
              })
            } catch (prescriptionErr: any) {
              if (prescriptionErr?.response?.status === 404) {
                return
              }
              console.error(`Failed to load prescription for appointment ${appointment.id}`, prescriptionErr)
              throw prescriptionErr
            }
          })
        )

        // Sort by appointment date descending for clarity
        enriched.sort((a, b) => {
          const dateA = a.appointment?.appointment_date || ""
          const dateB = b.appointment?.appointment_date || ""
          return dateB.localeCompare(dateA)
        })

        setPrescriptions(enriched)
      } catch (err: any) {
        console.error("Failed to load prescriptions", err)
        setError(err?.message || "Unable to load prescriptions.")
      } finally {
        setLoading(false)
      }
    }

    loadPrescriptions()
  }, [api, user?.id])

  const completedCount = useMemo(
    () => prescriptions.filter((p) => p.appointment?.status?.toLowerCase() === "completed").length,
    [prescriptions]
  )

  const activeCount = prescriptions.length - completedCount

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
            <button
              onClick={() => navigate("/doctor/appointments")}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
            >
              <FaPlus className="w-4 h-4" />
              New Prescription
            </button>
          </div>

          {error && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

          {loading ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">Loading prescriptions...</div>
          ) : prescriptions.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-8 text-center text-muted-foreground">No prescriptions found.</div>
          ) : (
            <>
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
                      <p className="text-3xl font-bold text-green-500">{activeCount}</p>
                    </div>
                    <FaPills className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Completed</p>
                      <p className="text-3xl font-bold text-blue-500">{completedCount}</p>
                    </div>
                    <FaFileAlt className="w-8 h-8 text-blue-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">
                          {prescription.patient?.full_name || `Patient #${prescription.patient_id}`}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {prescription.notes || "No notes provided."}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          (prescription.appointment?.status || "active").toLowerCase() === "completed"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-green-50 text-green-600"
                        }`}
                      >
                        {prescription.appointment?.status || "Active"}
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-foreground mb-2">Medicines:</p>
                      <div className="space-y-1">
                        {prescription.medicines?.length ? (
                          prescription.medicines.map((medicine, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FaPills className="w-3 h-3 text-accent" />
                              {medicine.medicine?.name || "Medicine"}
                              {medicine.dosage ? ` • ${medicine.dosage}` : ""}
                              {medicine.duration ? ` • ${medicine.duration}` : ""}
                            </div>
                          ))
                        ) : (
                          <div className="text-sm text-muted-foreground">No medicines added.</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-sm text-muted-foreground">
                        Date: {prescription.appointment?.appointment_date || "N/A"} {" "}
                        {prescription.appointment?.appointment_time}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/doctor/patient/${prescription.patient_id}/prescription`, {
                              state: {
                                patientId: prescription.patient_id,
                                appointmentId: prescription.appointment_id,
                              },
                            })
                          }
                          className="p-2 hover:bg-muted rounded-lg transition-colors text-accent"
                        >
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
            </>
          )}
        </div>
      </main>
    </div>
  )
}
