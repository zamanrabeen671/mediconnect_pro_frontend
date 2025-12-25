import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { FaCalendarCheck, FaCalendarPlus, FaCheckCircle, FaClock, FaInfoCircle, FaMapMarkerAlt, FaPhone, FaTint, FaUserMd } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router"

import { API_URL } from "../../settings/config"
import { getDoctorList } from "../../store/API/doctorApi"
import { createAppointmentByPatient, getBloodGroupList } from "../../store/API/patientApi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import useAxios from "../../utils/useAxios"

type Schedule = {
  day_of_week: string
  start_time: string
  end_time: string
  max_patients: number
  duration_per_appointment: number
  id: number
 }

type StatusMessage = {
  type: "success" | "error"
  message: string
 }

const formatTime = (value: string) => {
  const timePart = value.includes("T") ? value.split("T")[1] : value
  const [hours, minutes] = timePart.split(":")
  if (!hours || !minutes) return value
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`
 }

export default function PatientAppointmentBook() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAppSelector((state) => state.auth)
  const { doctorList } = useAppSelector((state) => state.doctor)
  const { bloodGroups } = useAppSelector((state) => state.patient)

  const [patientForm, setPatientForm] = useState(() => ({
    full_name: user?.name || "",
    age: user?.age ? String(user.age) : "",
    gender: user?.gender || "",
    phone: user?.phone || "",
    blood_group_id: user?.blood_group_id !== undefined && user?.blood_group_id !== null ? String(user.blood_group_id) : "",
    address: user?.address || "",
  }))

  const [selectedDoctor, setSelectedDoctor] = useState("")
  const [selectedSchedule, setSelectedSchedule] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [scheduleLoading, setScheduleLoading] = useState(false)
  const [doctorLoading, setDoctorLoading] = useState(false)
  const [status, setStatus] = useState<StatusMessage | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const today = useMemo(() => new Date().toISOString().split("T")[0], [])

  useEffect(() => {
    const state = location.state as { doctorId?: number } | null
    if (state?.doctorId) {
      setSelectedDoctor(String(state.doctorId))
    }
  }, [location.state])

  useEffect(() => {
    if (!user) return
    setPatientForm((prev) => ({
      full_name: user.name || prev.full_name,
      age: user.age ? String(user.age) : prev.age,
      gender: user.gender || prev.gender,
      phone: user.phone || prev.phone,
      blood_group_id: user.blood_group_id !== undefined && user.blood_group_id !== null ? String(user.blood_group_id) : prev.blood_group_id,
      address: user.address || prev.address,
    }))
  }, [user])

  useEffect(() => {
    const loadReferenceData = async () => {
      setDoctorLoading(true)
      try {
        await dispatch(getDoctorList({})).unwrap()
      } catch (err: any) {
        setStatus({ type: "error", message: err?.message || "Unable to load doctors" })
      } finally {
        setDoctorLoading(false)
      }
      dispatch(getBloodGroupList())
    }

    loadReferenceData()
  }, [dispatch])

  useEffect(() => {
    const fetchSchedule = async (doctorId: string) => {
      setScheduleLoading(true)
      setSelectedSchedule("")
      try {
        const api = useAxios()
        const { data } = await api.get(`${API_URL}/schedules/doctor/${doctorId}`)
        setSchedules(data)
      } catch (err: any) {
        setSchedules([])
        setStatus({ type: "error", message: err?.message || "Unable to load doctor availability" })
      } finally {
        setScheduleLoading(false)
      }
    }

    if (selectedDoctor) {
      fetchSchedule(selectedDoctor)
    } else {
      setSchedules([])
      setSelectedSchedule("")
    }
  }, [selectedDoctor])

  const handlePatientChange = (field: keyof typeof patientForm) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPatientForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const validateForm = () => {
    if (!patientForm.full_name.trim()) return "Patient name is required."

    const ageNumber = Number(patientForm.age)
    if (!patientForm.age || Number.isNaN(ageNumber) || ageNumber <= 0) return "Enter a valid age."

    if (!patientForm.gender) return "Gender is required."
    if (!patientForm.phone.trim()) return "Phone number is required."
    if (!patientForm.address.trim()) return "Address is required."
    if (!selectedDoctor) return "Choose a doctor to continue."
    if (!selectedSchedule) return "Choose an available schedule."
    if (!appointmentDate) return "Select an appointment date."

    return null
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus(null)

    const validationError = validateForm()
    if (validationError) {
      setStatus({ type: "error", message: validationError })
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        patient: {
          full_name: patientForm.full_name,
          age: Number(patientForm.age),
          gender: patientForm.gender,
          phone: patientForm.phone,
          blood_group_id: patientForm.blood_group_id ? Number(patientForm.blood_group_id) : null,
          address: patientForm.address,
        },
        doctor_id: Number(selectedDoctor),
        schedule_id: Number(selectedSchedule),
        appointment_date: appointmentDate,
      }

      await dispatch(createAppointmentByPatient(payload)).unwrap()

      setStatus({ type: "success", message: "Appointment booked successfully." })
      setSelectedSchedule("")
      setAppointmentDate("")
    } catch (err: any) {
      setStatus({ type: "error", message: err?.message || "Could not book the appointment." })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="bg-card border border-border/70 shadow-sm rounded-2xl p-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-muted-foreground">Patient Portal</p>
            <h1 className="text-3xl font-semibold text-foreground">Book an appointment</h1>
            <p className="text-muted-foreground">Select a doctor, pick an available schedule, and confirm your visit.</p>
          </div>
          <div className="flex items-center gap-3 text-accent">
            <FaCalendarCheck className="h-10 w-10" />
            <div>
              <p className="text-xs uppercase tracking-wide">Today</p>
              <p className="text-lg font-semibold">{today}</p>
            </div>
          </div>
        </div>

        {status && (
          <div
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
              status.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {status.type === "success" ? (
              <FaCheckCircle className="mt-1 h-4 w-4" />
            ) : (
              <FaInfoCircle className="mt-1 h-4 w-4" />
            )}
            <span>{status.message}</span>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <FaUserMd className="text-accent" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Patient details</p>
                    <p className="text-lg font-semibold text-foreground">Who is this appointment for?</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-6 py-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Full name</label>
                  <input
                    type="text"
                    value={patientForm.full_name}
                    onChange={handlePatientChange("full_name")}
                    placeholder="Patient full name"
                    className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-muted-foreground"
                    disabled
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Age</label>
                  <input
                    type="number"
                    value={patientForm.age}
                    onChange={handlePatientChange("age")}
                    placeholder="18"
                    className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-muted-foreground"
                    disabled
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Gender</label>
                  <select
                    value={patientForm.gender}
                    onChange={handlePatientChange("gender")}
                    className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-muted-foreground"
                    disabled
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FaPhone className="text-muted-foreground" /> Phone
                  </label>
                  <input
                    type="tel"
                    value={patientForm.phone}
                    onChange={handlePatientChange("phone")}
                    placeholder="01XXXXXXXXX"
                    className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-muted-foreground"
                    disabled
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FaTint className="text-muted-foreground" /> Blood group
                  </label>
                  <select
                    value={patientForm.blood_group_id}
                    onChange={handlePatientChange("blood_group_id")}
                    className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-muted-foreground"
                    disabled
                  >
                    <option value="">Select</option>
                    {bloodGroups?.map((bg: any) => (
                      <option key={bg.id} value={bg.id}>
                        {bg.group_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <FaMapMarkerAlt className="text-muted-foreground" /> Address
                  </label>
                  <input
                    type="text"
                    value={patientForm.address}
                    onChange={handlePatientChange("address")}
                    placeholder="Street, city, country"
                    className="mt-2 w-full rounded-lg border border-border bg-muted px-3 py-3 text-sm text-muted-foreground"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  <FaCalendarPlus className="text-accent" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Appointment details</p>
                    <p className="text-lg font-semibold text-foreground">Pick a doctor and schedule</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 px-6 py-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-foreground">Doctor</label>
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm focus:border-accent focus:outline-none"
                  >
                    <option value="">Select a doctor</option>
                    {doctorLoading && <option disabled>Loading doctors...</option>}
                    {!doctorLoading &&
                      (doctorList as any[] | undefined)?.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name} {doc.specialization ? `• ${doc.specialization}` : ""}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Appointment date</label>
                  <input
                    type="date"
                    min={today}
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-3 text-sm focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">Available schedules</label>
                  <div className="mt-2 space-y-2">
                    {scheduleLoading && <p className="text-sm text-muted-foreground">Loading schedule...</p>}
                    {!scheduleLoading && selectedDoctor && schedules.length === 0 && (
                      <p className="text-sm text-muted-foreground">No schedules found for this doctor.</p>
                    )}
                    {!scheduleLoading && schedules.length > 0 && (
                      <div className="space-y-2">
                        {schedules.map((schedule) => {
                          const label = `${schedule.day_of_week} • ${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`
                          return (
                            <label
                              key={schedule.id}
                              className={`flex items-center justify-between rounded-lg border px-3 py-3 text-sm transition hover:border-accent ${
                                selectedSchedule === String(schedule.id) ? "border-accent bg-accent/5" : "border-border bg-background"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="schedule"
                                  value={schedule.id}
                                  checked={selectedSchedule === String(schedule.id)}
                                  onChange={(e) => setSelectedSchedule(e.target.value)}
                                />
                                <div>
                                  <p className="font-medium text-foreground">{label}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {schedule.duration_per_appointment} min slots • up to {schedule.max_patients} patients
                                  </p>
                                </div>
                              </div>
                              <FaClock className="text-muted-foreground" />
                            </label>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
              >
                <FaCalendarCheck />
                {submitting ? "Booking..." : "Book appointment"}
              </button>
            </div>
          </form>

          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Summary</p>
              <h3 className="text-lg font-semibold text-foreground">Your selections</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Patient</span>
                  <span className="font-medium text-foreground">{patientForm.full_name || "Not set"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Doctor</span>
                  <span className="font-medium text-foreground">
                    {selectedDoctor
                      ? (doctorList as any[] | undefined)?.find((d) => String(d.id) === selectedDoctor)?.name || "Selected"
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Schedule</span>
                  <span className="font-medium text-foreground">
                    {selectedSchedule
                      ? (() => {
                          const schedule = schedules.find((s) => String(s.id) === selectedSchedule)
                          return schedule
                            ? `${schedule.day_of_week} • ${formatTime(schedule.start_time)} - ${formatTime(schedule.end_time)}`
                            : "Selected"
                        })()
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium text-foreground">{appointmentDate || "Not selected"}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-muted/60 p-5 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground">How scheduling works</p>
              <ul className="mt-2 space-y-2 list-disc list-inside">
                <li>Select a doctor to load their available schedules.</li>
                <li>Pick a date that matches the chosen schedule.</li>
                <li>We will confirm your booking via the email/phone on file.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
 }
