import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";

import { useEffect } from "react";
import { useAppSelector } from "./store/hooks";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const { isDarkMode } = useAppSelector((state) => state.darkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <></>
              </ProtectedRoute>
            }
          />
          
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>

      <ToastContainer
        position="top-center" // 👈 This makes toasts appear at the top
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
