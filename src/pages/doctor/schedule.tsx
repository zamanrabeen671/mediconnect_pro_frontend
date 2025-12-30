import { useEffect, useState } from "react"
import { FaClock, FaPlus } from "react-icons/fa"
import { useNavigate } from "react-router"

import { doctorSchedule, doctorScheduleDelete } from "../../store/API/doctorApi"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { Schedule as ScheduleForm } from "../../components/schedule/schedule"

export default function DoctorSchedulePage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { schedule, loading } = useAppSelector((state) => state.doctor)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    dispatch(doctorSchedule())
  }, [dispatch])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
            <p className="text-muted-foreground">View and manage your availability</p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:brightness-110 border border-border"
          >
            <FaPlus /> {showCreate ? "Close" : "Add schedule"}
          </button>
        </div>

        {showCreate && (
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <ScheduleForm onCreated={() => { setShowCreate(false); dispatch(doctorSchedule()) }} />
          </div>
        )}

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-accent/10 p-3 text-accent">
                <FaClock />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">Availability</p>
                <h2 className="text-xl font-semibold text-foreground">Saved schedules</h2>
              </div>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110 border border-border"
            >
              Add schedule
            </button>
          </div>

          {loading && <p className="text-sm text-muted-foreground">Loading schedules...</p>}
          {!loading && (!schedule || schedule.length === 0) && (
            <div className="flex items-center justify-between rounded-lg bg-green-50 px-4 py-3 text-sm">
              <p className="text-green-700">No schedules yet. Click "Add schedule" to create one.</p>
              <button
                onClick={() => setShowCreate(true)}
                className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:brightness-110 border border-border"
              >
                Add schedule
              </button>
            </div>
          )}

          {!loading && (schedule || []).length > 0 && (
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {(schedule || []).map((slot: any) => (
                <div key={slot.id} className="rounded-xl border border-border bg-background p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-foreground">{slot.day_of_week}</span>
                    <span className="text-muted-foreground">{slot.duration_per_appointment} min</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {slot.start_time?.slice(0, 5)} - {slot.end_time?.slice(0, 5)} • Max {slot.max_patients}
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => dispatch(doctorScheduleDelete(slot.id))}
                      className="rounded-lg border border-destructive px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
