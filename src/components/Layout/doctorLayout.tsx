import { Routes, Route } from "react-router";
import DoctorSidebar from "./doctor-sidebar";

import DoctorDashboard from "../../pages/doctor/dashboard";
import DoctorAppointments from "../../pages/doctor/appointments";
import CreateAppointment from "../appointment/appointmentCreate";
import DoctorSettings from "../../pages/doctor/settings";
import DoctorPatients from "../../pages/doctor/patients";

export default function DoctorLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <DoctorSidebar />

      <div className="flex-1 px-8 py-8 overflow-auto">
        <Routes>
          {/* Default dashboard when visiting /doctor */}
          <Route index element={<DoctorDashboard />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<DoctorDashboard />} />

          {/* Appointments */}
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="appointments/create" element={<CreateAppointment />} />

          {/* Patients */}
          <Route path="patients" element={<DoctorPatients />} />

          {/* Analytics */}
          <Route path="analytics" element={<div>Analytics Page</div>} />

          {/* Settings */}
          <Route path="settings" element={<DoctorSettings />} />

          {/* Removed catch-all redirect to avoid blinking */}
        </Routes>
      </div>
    </div>
  );
}
