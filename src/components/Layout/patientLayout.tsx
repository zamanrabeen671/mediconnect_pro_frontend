import { Navigate, Route, Routes } from "react-router"
import PatientDashboard from "../../pages/patient/dashboard"
import { DoctorsList } from "../../pages/patient/doctorsList"
import { Appointments } from "../../pages/patient/appointments"

export const PatientLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      

      <div className="flex-1 px-8 py-8 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="doctors" element={<DoctorsList />} />
          <Route path="appointments" element={<Appointments />} />
         
        </Routes>
      </div>
    </div>
  )
}

