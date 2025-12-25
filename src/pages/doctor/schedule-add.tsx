import { FaClock } from "react-icons/fa"
import { Schedule as ScheduleForm } from "../../components/schedule/schedule"

export default function DoctorScheduleAddPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-8 py-8 space-y-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-accent/10 p-3 text-accent">
            <FaClock />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">Availability</p>
            <h1 className="text-3xl font-bold text-foreground">Add schedule</h1>
            <p className="text-muted-foreground">Create a new availability slot.</p>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <ScheduleForm />
        </div>
      </div>
    </div>
  )
}
