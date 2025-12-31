import { useEffect, useMemo, useState } from "react"
import { FaArrowRight, FaCalendarAlt, FaCalendarCheck, FaCalendarPlus, FaClock, FaPrescription, FaSearch, FaUserMd } from "react-icons/fa"
import { useNavigate } from "react-router"

import { getDoctorList } from "../../store/API/doctorApi"
import { getAppointmentPrescriptions, getPatientAppointments, getPatientDetails, getPatientPrescriptions, getPatientStatistic } from "../../store/API/patientApi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

export default function PatientDashboard() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { doctorList } = useAppSelector((state) => state.doctor)
  const { prescriptions, appointments, patientDetails } = useAppSelector((state) => state.patient)
  const [appointmentId, setAppointmentId] = useState("")
  
  useEffect(() => {
    dispatch(getDoctorList({}))
    if (user?.id) {
      dispatch(getPatientPrescriptions(user.id))
      dispatch(getPatientAppointments(user.id))
      dispatch(getPatientDetails(user.id))
    }
  }, [dispatch, user?.id])

  const upcomingAppointments = useMemo(() => {
    if (!appointments?.length) return []
    const doctorIndex = new Map((doctorList || []).map((doc: any) => [doc.id, doc]))
    const safeTime = (value: string | null | undefined) => {
      if (!value) return Number.MAX_SAFE_INTEGER
      const time = Date.parse(value)
      return Number.isFinite(time) ? time : Number.MAX_SAFE_INTEGER
    }

    return appointments
      .slice()
      .sort((a: any, b: any) => safeTime(a.appointment_date) - safeTime(b.appointment_date))
      .slice(0, 3)
      .map((appointment: any) => {
        const doctor = doctorIndex.get(appointment.doctor_id)
        const status = typeof appointment.status === "string" ? appointment.status : "Pending"
        return {
          ...appointment,
          doctorName:
            appointment.doctor_name || appointment.doctor?.name || doctor?.name || "Doctor visit",
          statusLabel: status.charAt(0).toUpperCase() + status.slice(1),
        }
      })
  }, [appointments, doctorList])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Welcome back</p>
          <h1 className="text-3xl font-bold text-foreground">{patientDetails?.full_name || "Patient"}</h1>
          <p className="text-muted-foreground">Book appointments, find doctors, and view prescriptions.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button
            onClick={() => navigate("/patient/book")}
            className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 text-left transition hover:border-accent hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaCalendarPlus />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Book appointment</p>
                <p className="text-sm text-muted-foreground">Create a new booking</p>
              </div>
            </div>
              <FaArrowRight className="text-muted-foreground transition group-hover:text-accent" />
          </button>

          <button
            onClick={() => navigate("/patient/appointments")}
            className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 text-left transition hover:border-accent hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaCalendarCheck />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">My appointments</p>
                <p className="text-sm text-muted-foreground">{appointments?.length || 0} booked</p>
              </div>
            </div>
            <FaArrowRight className="text-muted-foreground transition group-hover:text-accent" />
          </button>

          <button
            onClick={() => navigate("/patient/doctors")}
            className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 text-left transition hover:border-accent hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaUserMd />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Doctors</p>
                <p className="text-sm text-muted-foreground">{doctorList?.length || 0} available</p>
              </div>
            </div>
            <FaArrowRight className="text-muted-foreground transition group-hover:text-accent" />
          </button>

          <button
            onClick={() => navigate("#prescriptions")}
            className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-4 text-left transition hover:border-accent hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaPrescription />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Prescriptions</p>
                <p className="text-sm text-muted-foreground">{prescriptions?.length || 0} records</p>
              </div>
            </div>
            <FaArrowRight className="text-muted-foreground transition group-hover:text-accent" />
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaCalendarAlt />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Schedule</p>
                <h2 className="text-xl font-semibold text-foreground">Upcoming appointments</h2>
              </div>
            </div>
            {appointments?.length ? (
              <button
                onClick={() => navigate("/patient/appointments")}
                className="text-sm font-semibold text-accent hover:underline"
              >
                View all
              </button>
            ) : null}
          </div>

          {!upcomingAppointments.length ? (
            <p className="text-sm text-muted-foreground">
              You have no upcoming appointments. Book your next visit to see it here.
            </p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-3">
              {upcomingAppointments.map((appointment: any) => (
                <div key={appointment.id} className="rounded-xl border border-border/70 bg-background p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {appointment.statusLabel}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-foreground">{appointment.doctorName}</h3>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <FaCalendarCheck className="text-accent" />
                      {appointment.appointment_date}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-accent" />
                      {appointment.appointment_time || "Time pending"}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigate("/patient/book", { state: { doctorId: appointment.doctor_id, followUpFor: appointment.id } })
                    }
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-accent hover:underline"
                  >
                    Book follow-up
                    <FaArrowRight />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaSearch />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Find doctor</p>
                <h2 className="text-xl font-semibold text-foreground">Available doctors</h2>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/patient/doctors")}
                className="text-sm font-semibold text-foreground hover:underline"
              >
                View all
              </button>
              <button
                onClick={() => navigate("/patient/book")}
                className="text-sm font-semibold text-accent hover:underline"
              >
                Book now
              </button>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {(doctorList || []).slice(0, 6).map((doc: any) => (
              <div key={doc.id} className="rounded-xl border border-border/70 bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-accent/10 p-2 text-accent">
                    <FaUserMd />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{doc.full_name}</p>
                    <p className="text-xs text-muted-foreground">{doc.specialization || "General"}</p>
                    <p className="text-xs text-muted-foreground">{doc.qualifications || "General"}</p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm text-muted-foreground">
                  <span>{doc.email || "email hidden"}</span>
                  <button
                    onClick={() => navigate(`/patient/book`, { state: { doctorId: doc.id } })}
                    className="text-accent hover:underline"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
            {!doctorList?.length && <p className="text-sm text-muted-foreground">No doctors available.</p>}
          </div>
        </div>

        <div id="prescriptions" className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaPrescription />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Prescriptions</p>
                <h2 className="text-xl font-semibold text-foreground">Latest prescriptions</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                placeholder="Appointment ID"
                className="w-32 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-accent focus:outline-none"
              />
              <button
                onClick={() => {
                  if (appointmentId) {
                    dispatch(getAppointmentPrescriptions(Number(appointmentId)))
                  }
                }}
                className="rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white hover:brightness-110"
              >
                Fetch by appointment
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {(prescriptions || []).slice(0, 5).map((p: any) => (
              <div key={p.id} className="rounded-xl border border-border/70 bg-background p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{p.medicine_name || p.title || "Prescription"}</p>
                    <p className="text-sm text-muted-foreground">Appointment #{p.appointment_id || "-"}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{p.created_at ? new Date(p.created_at).toLocaleDateString() : ""}</span>
                </div>
                {p.instructions && <p className="mt-2 text-sm text-muted-foreground">{p.instructions}</p>}
              </div>
            ))}
            {!prescriptions?.length && <p className="text-sm text-muted-foreground">No prescriptions yet.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
