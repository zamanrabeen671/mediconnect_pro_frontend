import { Navigate, Route, Routes } from "react-router"
import PatientDashboard from "../../pages/patient/dashboard"
import PatientAppointmentBook from "../../pages/patient/appointment-book"
import PatientDoctors from "../../pages/patient/doctors"
import PatientAppointments from "../../pages/patient/appointments"
import { PatientPrescription } from "../../pages/patient/patientPrescription"

export const PatientLayout = () => {
  return (
    <div className="flex min-h-screen bg-background">
      

      <div className="flex-1 px-8 py-8 overflow-auto">
        <Routes>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="doctors" element={<PatientDoctors />} />
          <Route path="book" element={<PatientAppointmentBook />} />
          <Route path="appointments" element={<PatientAppointments />} />
          <Route path="details/:patientId/prescription" element={<PatientPrescription />} />
        </Routes>
      </div>
    </div>
  )
}

