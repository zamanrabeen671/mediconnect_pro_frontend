import { useEffect, useMemo } from "react"
import { FaCalendarAlt, FaCalendarCheck, FaClock, FaHeartbeat, FaMapMarkerAlt, FaStethoscope } from "react-icons/fa"
import { useNavigate } from "react-router"

import { getDoctorList } from "../../store/API/doctorApi"
import { getPatientAppointments } from "../../store/API/patientApi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-100 text-emerald-700",
  accepted: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  cancelled: "bg-red-100 text-red-700",
  rejected: "bg-red-100 text-red-700",
}

const formatTime = (value: string | null) => {
  if (!value) return "N/A"
  return value.replace("PM", " PM").replace("AM", " AM")
}

export default function PatientAppointments() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.auth)
  const { appointments } = useAppSelector((state) => state.patient)
  const { doctorList } = useAppSelector((state) => state.doctor)

  useEffect(() => {
    if (user?.id) {
      dispatch(getPatientAppointments(user.id))
    }
    dispatch(getDoctorList({}))
  }, [dispatch, user?.id])

  const appointmentsWithDoctor = useMemo(() => {
    if (!appointments?.length) return []
    return appointments.map((appointment: any) => {
      const doctor = (doctorList as any[] | undefined)?.find((doc) => doc.id === appointment.doctor_id)
      return {
        ...appointment,
        doctorName: doctor?.name || "Unknown doctor",
        specialization: doctor?.specialization || "General",
      }
    })
  }, [appointments, doctorList])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
        <header className="flex flex-col gap-2">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">Patient portal</p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-foreground">My appointments</h1>
              <p className="text-muted-foreground">Review upcoming visits, check statuses, and follow up easily.</p>
            </div>
            <button
              onClick={() => navigate("/patient/book")}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <FaCalendarCheck />
              Book new appointment
            </button>
          </div>
        </header>

        {!appointmentsWithDoctor.length ? (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
              <FaHeartbeat className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">No appointments yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Schedule your first visit to see it listed here. We will keep all of your bookings in one place.
            </p>
            <button
              onClick={() => navigate("/patient/book")}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <FaCalendarCheck />
              Book an appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {appointmentsWithDoctor.map((appointment: any) => (
              <div key={appointment.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyles[
                            typeof appointment.status === "string" ? appointment.status.toLowerCase() : ""
                          ] || "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <FaCalendarAlt />
                        {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || "Pending"}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <FaClock />
                        {formatTime(appointment.appointment_time)}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{appointment.doctorName}</h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <FaStethoscope className="text-accent" />
                        {appointment.specialization}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-2">
                        <FaCalendarCheck className="text-accent" />
                        {appointment.appointment_date}
                      </span>
                      {appointment.schedule && appointment.schedule.location && (
                        <span className="inline-flex items-center gap-2">
                          <FaMapMarkerAlt className="text-accent" />
                          {appointment.schedule.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <button
                      onClick={() => navigate(`/patient/book`, { state: { doctorId: appointment.doctor_id } })}
                      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted"
                    >
                      Rebook visit
                    </button>
                    <button
                      onClick={() =>
                        navigate("/patient/book", {
                          state: { doctorId: appointment.doctor_id, followUpFor: appointment.id },
                        })
                      }
                      className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-xs font-semibold text-accent"
                    >
                      Follow-up
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
