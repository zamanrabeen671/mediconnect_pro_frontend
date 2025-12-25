import { FaSave } from "react-icons/fa"
import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { doctorScheduleCreate } from "../../store/API/doctorApi"
import { useNavigate } from "react-router"

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
]

type ScheduleForm = {
    duration_per_appointment: string
    start_time: string
    end_time: string
    max_patients: string
    day_of_week: string[]
}

export const Schedule = ({ onCreated }: { onCreated?: () => void }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState<ScheduleForm>({
        duration_per_appointment: "30",
        start_time: "09:00",
        end_time: "17:00",
        max_patients: "10",
        day_of_week: DAYS.filter(d => d !== "Sunday"),
    })

    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    /* -------------------- handlers -------------------- */

    const toggleDay = (day: string) => {
        setForm(prev => ({
            ...prev,
            day_of_week: prev.day_of_week.includes(day)
                ? prev.day_of_week.filter(d => d !== day)
                : [...prev.day_of_week, day],
        }))
    }

    const handleChange =
        (key: keyof Omit<ScheduleForm, "day_of_week">) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                setForm(prev => ({ ...prev, [key]: e.target.value }))
            }

    /* -------------------- validation -------------------- */

    const validate = () => {
        if (!form.day_of_week.length) {
            return "Please select at least one working day."
        }
        if (!form.start_time || !form.end_time) {
            return "Start time and end time are required."
        }
        if (form.start_time >= form.end_time) {
            return "End time must be later than start time."
        }
        return null
    }

    const toISOTime = (hhmm: string) => {
        // API expects time format HH:MM, not ISO string
        return hhmm
    }

    /* -------------------- submit -------------------- */

    const handleSubmit = async () => {
        setError(null)

        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setSubmitting(true)

        try {
            const payload = {
                day_of_week: form.day_of_week.join(","),
                start_time: toISOTime(form.start_time),
                end_time: toISOTime(form.end_time),
                max_patients: Number(form.max_patients),
                duration_per_appointment: Number(form.duration_per_appointment),
            }

            console.log("Submitting schedule payload:", payload)
            await dispatch(doctorScheduleCreate(payload)).unwrap()
            if (onCreated) onCreated()
        } catch (err: any) {
            const errorMsg = typeof err === "string" ? err : err?.message || "Failed to create schedule"
            console.error("Schedule creation failed:", errorMsg)
            setError(errorMsg)
        } finally {
            setSubmitting(false)
        }
    }

    /* -------------------- UI -------------------- */

    return (
        <div>
            <div className="space-y-6">
                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Consultation Duration
                    </label>
                    <select
                        value={form.duration_per_appointment}
                        onChange={handleChange("duration_per_appointment")}
                        className="input"
                    >
                        {["15", "30", "45", "60"].map(v => (
                            <option key={v} value={v}>
                                {v} minutes
                            </option>
                        ))}
                    </select>
                </div>

                {/* Days */}
                <div>
                    <label className="block text-sm font-medium mb-4">
                        Working Days
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {DAYS.map(day => (
                            <label
                                key={day}
                                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer
                ${form.day_of_week.includes(day)
                                        ? "bg-muted"
                                        : "bg-muted/40 hover:bg-muted/80"}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={form.day_of_week.includes(day)}
                                    onChange={() => toggleDay(day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Time */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Start Time</label>
                        <input
                            type="time"
                            value={form.start_time}
                            onChange={handleChange("start_time")}
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">End Time</label>
                        <input
                            type="time"
                            value={form.end_time}
                            onChange={handleChange("end_time")}
                            className="input"
                        />
                    </div>
                </div>

                {/* Max Patients */}
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Max Patients per Slot
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={form.max_patients}
                        onChange={handleChange("max_patients")}
                        className="input w-32"
                    />
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                        <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                )}
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-2 px-6 py-3 bg-accent rounded-lg disabled:opacity-60"
                >
                    <FaSave />
                    {submitting ? "Saving..." : "Save Schedule"}
                </button>
            </div>
        </div>
    )
}
