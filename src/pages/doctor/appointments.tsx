import {
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaClock as FaPending,
  FaUserInjured,
  FaPhone,
  FaBirthdayCake,
  FaTimes,
  FaPrescriptionBottleAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { doctorUpdateAppointmentStatus, getDoctorAppointmentList } from "../../store/API/doctorApi";

export default function DoctorAppointments() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { appointmentList } = useAppSelector((state) => state.doctor);
  const { user } = useAppSelector((state) => state.auth);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getDoctorAppointmentList(user?.id!));
  }, []);

  const todayAppointments =
    appointmentList?.filter(
      (a) => a.appointment_date === new Date().toISOString().split("T")[0]
    ).length || 0;

  const upcomingAppointments =
    appointmentList?.filter((a) =>
      ["pending", "upcoming", "accepted"].includes(a.status?.toLowerCase())
    ).length || 0;

  const completedAppointments =
    appointmentList?.filter((a) => a.status === "completed").length || 0;

  const handleFollowup = (patientId: number) => {
    navigate(`/doctor/patient/${patientId}/prescription`);
  };

  const updateStatus = async (appointmentId: number, status: string) => {
    setActionLoadingId(appointmentId);
    try {
      await dispatch(
        doctorUpdateAppointmentStatus({ id: appointmentId, status })
      ).unwrap();
    } catch (err) {
      console.error("Failed to update appointment status", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "N/A";
    // Handle both 12-hour format with AM/PM and 24-hour format
    return time.replace("PM", " PM").replace("AM", " AM");
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "accepted":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Appointments
              </h1>
              <p className="text-gray-600">Manage your patient appointments</p>
            </div>
            <button
              onClick={() => navigate("/doctor/appointments/create")}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              + New Appointment
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Today's Appointments
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    {todayAppointments}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaCalendarAlt className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Upcoming</p>
                  <p className="text-3xl font-bold text-yellow-600">
                    {upcomingAppointments}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-xl">
                  <FaPending className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {completedAppointments}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-xl">
                  <FaCheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-100">
              {appointmentList && appointmentList.length > 0 ? (
                appointmentList.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-6">
                      {/* Left Side - Patient Info */}
                      <div className="flex-1">
                        {/* First Row: Name, Status, Age */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FaUserInjured className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">
                              {appointment.patient.full_name}
                            </h3>
                          </div>
                          <span>
                            Status:{" "}
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                appointment.status
                              )}`}
                            >
                              {appointment.status.charAt(0).toUpperCase() +
                                appointment.status.slice(1)}
                            </span>
                          </span>

                          <div className="flex items-center gap-2 text-gray-600">
                            Age:{" "}
                            <span className="text-sm font-medium">
                              {appointment.patient.age} yrs
                            </span>
                          </div>
                        </div>

                        {/* Second Row: Phone & Blood Group */}
                        <div className="flex items-center gap-6 text-sm text-gray-600 ml-12">
                          <div className="flex items-center gap-2">
                            <FaPhone className="w-3.5 h-3.5 text-gray-400" />
                            <span>{appointment.patient.phone}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-700">
                              Blood:{" "}
                              {appointment.patient.blood_group?.group_name ||
                                "N/A"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="w-3.5 h-3.5 text-gray-400" />
                            <span>{appointment.appointment_date}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FaClock className="w-3.5 h-3.5 text-gray-400" />
                            <span>
                              {formatTime(appointment.appointment_time)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - Action Buttons */}
                      <div className="flex items-center gap-2">
                        {appointment.status === "pending" && (
                          <button
                            onClick={() => updateStatus(appointment.id, "accepted")}
                            className="group relative p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-60"
                            title="Accept"
                            disabled={actionLoadingId === appointment.id}
                          >
                            <FaCheckCircle className="w-5 h-5" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Accept
                            </span>
                          </button>
                        )}

                        {appointment.status !== "cancelled" && appointment.status !== "completed" && appointment.status !== "rejected" && (
                          <button
                            onClick={() => updateStatus(appointment.id, "rejected")}
                            className="group relative p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-60"
                            title="Reject"
                            disabled={actionLoadingId === appointment.id}
                          >
                            <FaTimes className="w-5 h-5" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Reject
                            </span>
                          </button>
                        )}

                        {(appointment.status === "accepted" || appointment.status === "upcoming") && (
                          <button
                            onClick={() => updateStatus(appointment.id, "completed")}
                            className="group relative p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-60"
                            title="Complete"
                            disabled={actionLoadingId === appointment.id}
                          >
                            <FaCheckCircle className="w-5 h-5" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Complete
                            </span>
                          </button>
                        )}

                        <button
                          onClick={() => handleFollowup(appointment.patient.id)}
                          className="group relative p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          title="Follow-up"
                        >
                          <FaPrescriptionBottleAlt className="w-5 h-5" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Follow-up
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <FaCalendarAlt className="w-12 h-12 text-gray-300" />
                    <p className="text-lg font-medium">No appointments found</p>
                    <p className="text-sm">
                      Create a new appointment to get started
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
