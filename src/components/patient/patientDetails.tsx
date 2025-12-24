
import React, { useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { getPatientDetails } from "../../store/API/patientApi"

export const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const patient = useAppSelector(s => s.patient.patientDetails)
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-muted rounded w-1/3" />
            <div className="h-40 bg-muted rounded" />
          </div>
        )}

        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Avatar / Basic */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-28 h-28 rounded-full bg-accent text-white flex items-center justify-center text-2xl font-semibold">
                {initials(patient?.full_name)}
              </div>
              <h2 className="mt-4 text-lg font-semibold">{patient?.full_name || "Unknown Patient"}</h2>
              <p className="text-sm text-muted mt-1">{patient?.gender ? patient.gender : "-"} • {patient?.age ?? "-"} yrs</p>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate(-1)}
                  className="px-3 py-2 bg-muted/60 rounded-md text-sm"
                >
                  Back
                </button>
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm text-muted">Contact</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <FaPhone /> {patient?.phone || "-"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted">
                      <FaMapMarkerAlt /> {patient?.address || "-"}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <h3 className="text-sm text-muted">Blood Group</h3>
                  <div className="mt-2">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">{patient?.blood_group?.name || "-"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="text-sm font-medium">Personal</h4>
                  <p className="text-sm mt-2"><span className="font-semibold">Name:</span> {patient?.full_name || "-"}</p>
                  <p className="text-sm mt-1"><span className="font-semibold">Age:</span> {patient?.age ?? "-"}</p>
                  <p className="text-sm mt-1"><span className="font-semibold">Gender:</span> {patient?.gender || "-"}</p>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="text-sm font-medium">Contact & Address</h4>
                  <p className="text-sm mt-2"><span className="font-semibold">Phone:</span> {patient?.phone || "-"}</p>
                  <p className="text-sm mt-1"><span className="font-semibold">Address:</span> {patient?.address || "-"}</p>
                </div>
              </div>

              {/* Appointments preview (if available) */}
              <div>
                <h4 className="text-sm font-medium">Recent Appointments</h4>
                {patient && (patient as any).appointments && (patient as any).appointments.length ? (
                  <ul className="mt-3 space-y-2">
                    {(patient as any).appointments.slice(0, 5).map((a: any) => (
                      <li key={a.id} className="p-3 bg-white border rounded-md flex justify-between items-center">
                        <div>
                          <div className="font-medium">{a.doctor_name || a.doctor || "Appointment"}</div>
                          <div className="text-sm text-muted">{a.date || a.slot || "-"}</div>
                        </div>
                        <div className="text-sm text-muted">{a.status || "-"}</div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted">No recent appointments found.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
