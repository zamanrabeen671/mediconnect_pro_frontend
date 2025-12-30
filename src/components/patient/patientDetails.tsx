
import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router"
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getPatientDetails } from "../../store/API/patientApi"

export const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const patient = useAppSelector(s => s.patient.patientDetails)
  const patientPrescriptions = useAppSelector(s => s.patient.patientPrescriptions);
  const patientAppointments = useAppSelector(s => s.patient.patientAppointments);
  const loading = useAppSelector(s => s.patient.loading)

  useEffect(() => {
    if (!id) return
    dispatch(getPatientDetails(Number(id)))
  }, [id, dispatch])

  const initials = (name?: string) => {
    if (!name) return "?"
    return name
      .split(" ")
      .map(n => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()
  }

  const [openAppointments, setOpenAppointments] = useState(true)
  const [openPrescriptions, setOpenPrescriptions] = useState(false)

  return (
    <div className="w-full">
      <div className="bg-white shadow rounded-lg p-6">
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-40 bg-muted rounded" />
          </div>
        )}

        {!loading && (
          <div className="space-y-6">
            {/* Top minimal card */}
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold">
                {initials(patient?.full_name)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{patient?.full_name || "Unknown Patient"}</h2>
                    <p className="text-sm text-muted mt-1">{patient?.gender ?? "-"} • {patient?.age ?? "-"} yrs</p>
                  </div>

                  <div className="text-right">
                    <button
                      onClick={() => navigate(-1)}
                      className="px-3 py-2 bg-muted/60 rounded-md text-sm"
                    >
                      Back
                    </button>
                  </div>
                </div>

                <div className="flex gap-4 mt-3 text-sm text-muted">
                  <div className="flex items-center gap-2"><FaPhone /> {patient?.phone || "-"}</div>
                  <div className="flex items-center gap-2"><FaMapMarkerAlt /> {patient?.address || "-"}</div>
                  <div className="ml-4"><span className="px-3 py-1 bg-muted rounded-full text-sm">{patient?.blood_group?.name || "-"}</span></div>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="space-y-4">
              {/* Appointments Accordion */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenAppointments(v => !v)}
                  className="w-full text-left px-4 py-3 bg-muted/5 flex items-center justify-between"
                >
                  <span className="font-medium">Appointments</span>
                  <span className="text-sm text-muted">{openAppointments ? '−' : '+'}</span>
                </button>

                {openAppointments && (
                  <div className="p-4 bg-white">
                    {patientAppointments && patientAppointments.length ? (
                      <ul className="space-y-2">
                        {patientAppointments.map((a: any) => (
                          <li key={a.id} className="p-3 bg-muted/10 rounded-md flex justify-between items-center">
                            <div>
                              <div className="font-medium">{a.doctor_name || a.doctor || 'Appointment'}</div>
                              <div className="text-sm text-muted">{a.date || a.slot || '-'}</div>
                            </div>
                            <div className="text-sm text-muted">{a.status || '-'}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted">No appointments found.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Prescriptions Accordion */}
              <div className="border rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenPrescriptions(v => !v)}
                  className="w-full text-left px-4 py-3 bg-muted/5 flex items-center justify-between"
                >
                  <span className="font-medium">Prescriptions</span>
                  <span className="text-sm text-muted">{openPrescriptions ? '−' : '+'}</span>
                </button>

                {openPrescriptions && (
                  <div className="p-4 bg-white">
                    {patientPrescriptions && patientPrescriptions.length ? (
                      <ul className="space-y-2">
                        {patientPrescriptions.map((p: any) => (
                          <li key={p.id} className="p-3 bg-muted/10 rounded-md">
                            <div className="font-medium">{p.title || p.description || 'Prescription'}</div>
                            <div className="text-sm text-muted mt-1">{p.date || p.created_at || ''}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted">No prescriptions found.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
