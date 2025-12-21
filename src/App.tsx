import SignIn from "./pages/auth/sign-in"
import SignUp from "./pages/auth/sign-up"
import DoctorProfileCompletion from "./pages/doctor/profile-completion"
import PatientDashboard from "./pages/patient/dashboard"
import LandingPage from "./pages/landing"
import MainLayout from "./components/Layout/main-sidebar"
import { Navigate, Route, Routes } from "react-router"
import AdminLayout from "./components/Layout/adminLayout"
import DoctorLayout from "./components/Layout/doctorLayout"
import { useAppDispatch, useAppSelector } from "./store/hooks"
import { useEffect } from "react"
import { getUser } from "./store/API/userApis"
import { PendingDoctor } from "./components/common/pendingdoctor"
// import { useEffect } from "react"
// import { getUser } from "./store/API/userApis"

function App() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  // const user = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo') || '{}');
  // console.log(user)
  // const isAuthenticated = !!user;
  console.log(user)
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={!isAuthenticated ? <SignIn /> : <Navigate to={`/${user?.role}`} />} />
        <Route path="/sign-up" element={!isAuthenticated ? <SignUp /> : <Navigate to={`/${user?.role}`} />} />

        <Route
          path="/doctor/*"
          element={
            isAuthenticated && user?.role === "doctor" ? (
              user.status === 'approved' ? (
                <DoctorLayout />
              ) : (user.status === 'pending') ? (
                <PendingDoctor />
              ) : (
                <Navigate to="/doctor/complete-profile" />
              )
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route
          path="/doctor/complete-profile"
          element={
            isAuthenticated && user?.role === "doctor" ? <DoctorProfileCompletion /> : <Navigate to="/sign-in" />
          }
        />
        <Route
          path="/patient"
          element={isAuthenticated && user?.role === "patient" ? <PatientDashboard /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/admin/*"
          element={
            isAuthenticated && user?.role === "admin"
              ? <AdminLayout />
              : <Navigate to="/sign-in" />
          }
        />
      </Routes>
    </MainLayout>
  )
}

export default App
