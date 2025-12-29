import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { getUser } from "./store/API/userApis";

import MainLayout from "./components/Layout/main-sidebar";
import AdminLayout from "./components/Layout/adminLayout";
import DoctorLayout from "./components/Layout/doctorLayout";

import LandingPage from "./pages/landing";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import DoctorProfileCompletion from "./pages/doctor/profile-completion";
import PatientDashboard from "./pages/patient/dashboard";
import { PendingDoctor } from "./components/common/pendingdoctor";

function App() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // wait until user is loaded
  }

  return (
    <MainLayout>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/sign-in"
          element={!isAuthenticated ? <SignIn /> : <Navigate to={`/${user?.role}`} />}
        />
        <Route
          path="/sign-up"
          element={!isAuthenticated ? <SignUp /> : <Navigate to={`/${user?.role}`} />}
        />

        {/* Doctor routes */}
        <Route
          path="/doctor"
          element={
            isAuthenticated && user?.role === "doctor" ? (
              user.status === "approved" ? (
                <DoctorLayout />
              ) : user.status === "pending" ? (
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
          path="/doctor/*"
          element={isAuthenticated && user?.role === "doctor" ? <DoctorLayout /> : <Navigate to="/sign-in" />}
        />

        <Route
          path="/doctor/complete-profile"
          element={
            isAuthenticated && user?.role === "doctor" ? (
              <DoctorProfileCompletion />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />

        {/* Patient routes */}
        <Route
          path="/patient/*"
          element={isAuthenticated && user?.role === "patient" ? <PatientDashboard /> : <Navigate to="/sign-in" />}
        />

        {/* Admin routes */}
        <Route
          path="/admin/*"
          element={isAuthenticated && user?.role === "admin" ? <AdminLayout /> : <Navigate to="/sign-in" />}
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
