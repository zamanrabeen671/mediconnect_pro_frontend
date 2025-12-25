import { useEffect, useMemo, useState } from "react"
import { FaArrowLeft, FaCalendarPlus, FaSearch, FaUserMd } from "react-icons/fa"
import { useNavigate } from "react-router"

import { getDoctorList } from "../../store/API/doctorApi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"

export default function PatientDoctors() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { doctorList } = useAppSelector((state) => state.doctor)
  const [query, setQuery] = useState("")

  useEffect(() => {
    dispatch(getDoctorList({}))
  }, [dispatch])

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return (doctorList || []).filter((doc: any) =>
      [doc.name, doc.specialization, doc.email].some((field) =>
        field?.toLowerCase().includes(q)
      )
    )
  }, [doctorList, query])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Browse and book</p>
            <h1 className="text-3xl font-bold text-foreground">Doctors</h1>
            <p className="text-muted-foreground">Select a doctor to book an appointment.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
            >
              <FaArrowLeft /> Back
            </button>
            <button
              onClick={() => navigate("/patient/book")}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              <FaCalendarPlus /> Book now
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
          <FaSearch className="text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, specialty, or email"
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((doc: any) => (
            <div key={doc.id} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-accent/10 p-3 text-accent">
                  <FaUserMd />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.specialization || "General"}</p>
                  <p className="text-xs text-muted-foreground">{doc.email || "email hidden"}</p>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                <span>Experience: {doc.experience || "N/A"}</span>
                <span>Fee: {doc.consultation_fee || "—"}</span>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigate("/patient/book", { state: { doctorId: doc.id } })}
                  className="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:brightness-110"
                >
                  Book appointment
                </button>
                <button
                  onClick={() => navigate("/patient/book", { state: { doctorId: doc.id } })}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  View schedule
                </button>
              </div>
            </div>
          ))}
          {!filtered.length && (
            <p className="text-sm text-muted-foreground">No doctors found. Try another search.</p>
          )}
        </div>
      </div>
    </div>
  )
}
