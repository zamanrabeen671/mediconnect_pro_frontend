import { Routes, Route, Navigate } from "react-router"
import AdminDashboard from "../../pages/admin/dashboard"
import AdminSidebar from "./admin-sidebar"
import AdminDoctors from "../../pages/admin/doctors"
import AdminPatients from "../../pages/admin/patients"

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
          <Route path="analytics" element={<div>Analytics Page</div>} />
          <Route path="settings" element={<div>Settings Page</div>} />
        </Routes>
      </div>
    </div>
  )
}
