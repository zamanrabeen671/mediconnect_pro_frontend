import {  useAppSelector } from "./store/hooks"
import SignIn from "./pages/auth/sign-in"
import SignUp from "./pages/auth/sign-up"
import DoctorDashboard from "./pages/doctor/dashboard"
import DoctorProfileCompletion from "./pages/doctor/profile-completion"
import PatientDashboard from "./pages/patient/dashboard"
import LandingPage from "./pages/landing"
import MainLayout from "./components/Layout/main-sidebar"
import { Navigate, Route, Routes } from "react-router"
import AdminLayout from "./components/Layout/adminLayout"
// import { useEffect } from "react"
// import { getUser } from "./store/API/userApis"

function App() {
  // const dispatch = useAppDispatch();
  // const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const getUserInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo') || '{}');
  console.log(getUserInfo)
  const isAuthenticated = !!getUserInfo;
  // useEffect(() => {
  //   dispatch(getUser());
  // }, [user]);
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-in" element={!isAuthenticated ? <SignIn /> : <Navigate to={`/${getUserInfo?.role}`} />} />
        <Route path="/sign-up" element={!isAuthenticated ? <SignUp /> : <Navigate to={`/${getUserInfo?.role}`} />} />

        <Route
          path="/doctor/*"
          element={
            isAuthenticated && getUserInfo?.role === "doctor" ? (
              getUserInfo.status === 'approved' ? (
                <DoctorDashboard />
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
            isAuthenticated && getUserInfo?.role === "doctor" ? <DoctorProfileCompletion /> : <Navigate to="/sign-in" />
          }
        />
        <Route
          path="/patient"
          element={isAuthenticated && getUserInfo?.role === "patient" ? <PatientDashboard /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/admin/*"
          element={
            isAuthenticated && getUserInfo?.role === "admin"
              ? <AdminLayout />
              : <Navigate to="/sign-in" />
          }
        />
      </Routes>
    </MainLayout>
  )
}

export default App
