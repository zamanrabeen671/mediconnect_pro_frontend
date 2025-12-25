import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { FaPrescriptionBottleAlt, FaPlus, FaSave } from "react-icons/fa"
import useAxios from "../../utils/useAxios"
import { API_URL } from "../../settings/config"
import { useNavigate } from "react-router"
import { useAppSelector } from "../../store/hooks"

type Medicine = {
  id: number
  name: string
  strength?: string | null
  form?: string | null
}

type Patient = {
  id: number
  full_name: string
  age: number
  gender: string
  phone: string
  address?: string
  blood_group?: { group_name: string }
}

type Appointment = {
  id: number
  appointment_date: string
  appointment_time: string | null
}

type PatientOption = {
  id: number
  full_name: string
}

type Prescription = {
  id: number
  notes: string
  appointment_id: number
  patient_id: number
  medicines: {
    medicine?: Medicine | null
    dosage?: string | null
    duration?: string | null
    instruction?: string | null
  }[]
}

export default function DoctorPatientPrescription() {
  const { patientId } = useParams()
  const navigate = useNavigate()
  const api = useAxios()
  const { user } = useAppSelector((s) => s.auth)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)
  const [patients, setPatients] = useState<PatientOption[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])

  const [appointmentId, setAppointmentId] = useState<string>("")
  const [medicineId, setMedicineId] = useState<string>("")
  const [dosage, setDosage] = useState("1 tab")
  const [duration, setDuration] = useState("7 days")
  const [instruction, setInstruction] = useState("After meal")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<string>(patientId || "")

  // Initial load: patients + medicines
  useEffect(() => {
    const loadLists = async () => {
      setLoading(true)
      setError(null)
      try {
        const [patientsRes, medsRes] = await Promise.all([
          api.get(`${API_URL}/patients`),
          api.get(`${API_URL}/medicines`),
        ])
        const fetchedPatients = patientsRes.data || []
        setPatients(fetchedPatients)
        if (!selectedPatient && fetchedPatients.length > 0) {
          setSelectedPatient(String(fetchedPatients[0].id))
        }
        setMedicines(medsRes.data || [])
      } catch (err: any) {
        setError(err?.message || "Failed to load data")
      } finally {
        setLoading(false)
      }
    }
    loadLists()
  }, [])

  // Load selected patient detail/appointments/prescriptions
  useEffect(() => {
    const loadPatientData = async () => {
      if (!selectedPatient) {
        setPatient(null)
        setAppointments([])
        setPrescriptions([])
        return
      }
      setLoading(true)
      setError(null)
      try {
        const pid = selectedPatient
        const [patientRes, presRes] = await Promise.all([
          api.get(`${API_URL}/patients/${pid}`),
          api.get(`${API_URL}/prescriptions/patient/${pid}`),
        ])
        setPatient(patientRes.data)
        setPrescriptions(presRes.data || [])

        // Try patient appointments; if backend returns validation error, fallback to doctor appointments filtered by patient
        try {
          const appointRes = await api.get(`${API_URL}/appointments/patient/${pid}`)
          setAppointments(appointRes.data || [])
        } catch (appointErr: any) {
          // Fallback: doctor appointments filtered by patient
          try {
            const doctorId = user?.id
            if (doctorId) {
              const docAppRes = await api.get(`${API_URL}/appointments/doctor/${doctorId}`)
              const filtered = (docAppRes.data || []).filter((a: any) => a.patient_id === Number(pid))
              setAppointments(filtered)
            } else {
              setAppointments([])
            }
          } catch (_fallbackErr) {
            setAppointments([])
          }
        }
      } catch (err: any) {
        setError(err?.message || "Failed to load patient data")
      } finally {
        setLoading(false)
      }
    }
    loadPatientData()
  }, [selectedPatient])

  const handleCreate = async () => {
    const pid = selectedPatient || patientId
    if (!pid) {
      setError("Select a patient")
      return
    }
    setError(null)
    if (!appointmentId) {
      setError("Select an appointment")
      return
    }
    if (!medicineId) {
      setError("Select a medicine")
      return
    }
    setSubmitting(true)
    try {
      const payload = {
        appointment_id: Number(appointmentId),
        patient_id: Number(pid),
        notes: notes || "",
        medicines: [
          {
            medicine_id: Number(medicineId),
            dosage,
            duration,
            instruction,
          },
        ],
      }
      const res = await api.post(`${API_URL}/prescriptions`, payload)
      // refresh list
      const presRes = await api.get(`${API_URL}/prescriptions/patient/${pid}`)
      setPrescriptions(presRes.data || [])
      setNotes("")
      setDosage("1 tab")
      setDuration("7 days")
      setInstruction("After meal")
      setMedicineId("")
      setAppointmentId("")
      return res.data
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to add prescription")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Prescription</h1>
          <p className="text-sm text-muted-foreground">Add medicines for patient; patient sees read-only.</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-primary hover:underline"
        >
          Back
        </button>
      </div>

      {loading ? (
        <div className="p-6 border rounded-lg">Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* Patient select */}
          <div className="p-4 border rounded-lg bg-white shadow-sm">
            <label className="block text-sm font-medium mb-2">Select patient</label>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="input"
            >
              <option value="">Choose patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name}
                </option>
              ))}
            </select>
            {error && selectedPatient && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
            {!selectedPatient && !error && (
              <p className="mt-2 text-sm text-muted-foreground">Select a patient to view or add prescriptions.</p>
            )}
          </div>

          {/* Patient summary */}
          {patient && (
            <div className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="font-semibold text-lg">{patient.full_name}</div>
              <div className="text-sm text-muted-foreground flex gap-4 mt-1">
                <span>Age: {patient.age}</span>
                <span>Gender: {patient.gender}</span>
                <span>Phone: {patient.phone}</span>
                {patient.blood_group?.group_name && <span>Blood: {patient.blood_group.group_name}</span>}
              </div>
            </div>
          )}

          {/* Add prescription (doctor only) */}
          <div className="p-4 border rounded-lg bg-white shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaPrescriptionBottleAlt /> Add Medicine
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Appointment</label>
                <select
                  value={appointmentId}
                  onChange={(e) => setAppointmentId(e.target.value)}
                  className="input"
                >
                  <option value="">Select appointment</option>
                  {appointments.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.appointment_date} {a.appointment_time || ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Medicine</label>
                <select
                  value={medicineId}
                  onChange={(e) => setMedicineId(e.target.value)}
                  className="input"
                >
                  <option value="">Select medicine</option>
                  {medicines.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.strength ? `- ${m.strength}` : ""} {m.form ? `(${m.form})` : ""}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dosage</label>
                <input
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="input"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Instruction</label>
                <input
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="input"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreate}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-60"
              >
                <FaSave /> {submitting ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

          {/* Existing prescriptions (read-only for patient) */}
          <div className="space-y-4">
            {prescriptions.length === 0 ? (
              <div className="p-4 border rounded-lg bg-white shadow-sm text-sm text-muted-foreground">No prescriptions yet.</div>
            ) : (
              prescriptions.map((p) => (
                <div key={p.id} className="p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Prescription #{p.id}</div>
                    <div className="text-sm text-muted-foreground">Appointment #{p.appointment_id}</div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{p.notes || "No notes"}</div>
                  <div className="mt-3 space-y-2">
                    {p.medicines?.map((m, idx) => (
                      <div key={idx} className="p-3 border rounded-md bg-muted/40">
                        <div className="font-medium">{m.medicine?.name || "Medicine"}</div>
                        <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                          {m.medicine?.strength && <span>Strength: {m.medicine.strength}</span>}
                          {m.medicine?.form && <span>Form: {m.medicine.form}</span>}
                          {m.dosage && <span>Dosage: {m.dosage}</span>}
                          {m.duration && <span>Duration: {m.duration}</span>}
                          {m.instruction && <span>Instruction: {m.instruction}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
