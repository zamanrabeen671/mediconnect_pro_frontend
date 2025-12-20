import { Routes, Route, Navigate } from "react-router"
import DoctorDashboard from "../../pages/doctor/dashboard"
import DoctorSidebar from "./doctor-sidebar"
import DoctorAppointments from "../../pages/doctor/appointments"
import DoctorSettings from "../../pages/doctor/settings"
import CreateAppointment from "../appointment/appointmentCreate"

export default function DoctorLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />

      <div className="flex-1 px-8 py-8 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="appointments/create" element={<CreateAppointment />} />
          <Route path="patients" element={<div>Patients Page</div>} />
          <Route path="analytics" element={<div>Analytics Page</div>} />
          <Route path="settings" element={<DoctorSettings />} />
        </Routes>
      </div>
    </div>
  )
}
