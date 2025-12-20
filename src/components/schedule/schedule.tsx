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
    duration: string
    startTime: string
    endTime: string
    maxPatients: string
    selectedDays: string[]
}

export const Schedule = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState<ScheduleForm>({
        duration: "30",
        startTime: "09:00",
        endTime: "17:00",
        maxPatients: "10",
        selectedDays: DAYS.filter(d => d !== "Sunday"),
    })

    const [error, setError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    /* -------------------- handlers -------------------- */

    const toggleDay = (day: string) => {
        setForm(prev => ({
            ...prev,
            selectedDays: prev.selectedDays.includes(day)
                ? prev.selectedDays.filter(d => d !== day)
                : [...prev.selectedDays, day],
        }))
    }

    const handleChange =
        (key: keyof Omit<ScheduleForm, "selectedDays">) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                setForm(prev => ({ ...prev, [key]: e.target.value }))
            }

    /* -------------------- validation -------------------- */

    const validate = () => {
        if (!form.selectedDays.length) {
            return "Please select at least one working day."
        }
        if (!form.startTime || !form.endTime) {
            return "Start time and end time are required."
        }
        if (form.startTime >= form.endTime) {
            return "End time must be later than start time."
        }
        return null
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
                day_of_week: form.selectedDays.join(","),
                start_time: form.startTime,        // "14:00"
                end_time: form.endTime,            // "22:00"
                max_patients: Number(form.maxPatients),
                duration_per_appointment: Number(form.duration),
            }

            await dispatch(
                doctorScheduleCreate({
                    router: navigate,
                    postData: payload,
                })
            ).unwrap()
        } catch (err: any) {
            setError(err?.message || "Failed to create schedule")
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
                        value={form.duration}
                        onChange={handleChange("duration")}
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
                ${form.selectedDays.includes(day)
                                        ? "bg-muted"
                                        : "bg-muted/40 hover:bg-muted/80"}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={form.selectedDays.includes(day)}
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
                            value={form.startTime}
                            onChange={handleChange("startTime")}
                            className="input"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">End Time</label>
                        <input
                            type="time"
                            value={form.endTime}
                            onChange={handleChange("endTime")}
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
                        value={form.maxPatients}
                        onChange={handleChange("maxPatients")}
                        className="input w-32"
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}
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
