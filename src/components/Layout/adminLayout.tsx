import { Routes, Route, Navigate } from "react-router"
import AdminDashboard from "../../pages/admin/dashboard"
import AdminSidebar from "./admin-sidebar"
import AdminDoctors from "../../pages/admin/doctors"
import AdminPatients from "../../pages/admin/patients"
import AdminSettings from "../../pages/admin/settings"
import { CreateMedicine } from "../common/createmedicine"
import AdminAnalytics from "../../pages/admin/analytics"
import { PatientDetails } from "../Patient/patientDetails"

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />

      <div className="flex-1 px-8 py-8 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="patients" element={<AdminPatients />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="create-medicine" element={<CreateMedicine />} />
          <Route path="patient/:id/details" element={<PatientDetails />} />
        </Routes>
      </div>
    </div>
  )
}
