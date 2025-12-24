import { FaUserInjured, FaPhone, FaMapMarkerAlt, FaTint, FaBirthdayCake, FaEye, FaMale, FaFemale } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { getPatientList } from "../../store/API/adminApi";

export default function AdminPatients() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { patients } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getPatientList({}));
  }, [dispatch]);

  const handleViewDetails = (patientId: number) => {
    navigate(`/admin/patient/${patientId}/details`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Patient Management</h1>
            <p className="text-gray-600">View and manage all patient records</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-gray-800">{patients?.length || 0}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaUserInjured className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Male Patients</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {patients?.filter((p) => p.gender === "Male").length || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaMale className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Female Patients</p>
                  <p className="text-3xl font-bold text-pink-600">
                    {patients?.filter((p) => p.gender === "Female").length || 0}
                  </p>
                </div>
                <div className="p-3 bg-pink-100 rounded-xl">
                  <FaFemale className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Age</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {patients && patients.length > 0
                      ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length)
                      : 0}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <FaBirthdayCake className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Patients List */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-100">
              {patients && patients.length > 0 ? (
                patients.map((patient) => (
                  <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between gap-6">
                      {/* Left Side - Patient Info */}
                      <div className="flex-1">
                        {/* First Row: Name, Blood Group, Gender, Age */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <FaUserInjured className="w-5 h-5 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-lg text-gray-800">
                              {patient.full_name}
                            </h3>
                          </div>

                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                            <FaTint className="w-3 h-3" />
                            {patient.blood_group?.group_name || "N/A"}
                          </span>

                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${
                              patient.gender === "Male"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-pink-100 text-pink-700"
                            }`}
                          >
                            {patient.gender === "Male" ? (
                              <FaMale className="w-3 h-3" />
                            ) : (
                              <FaFemale className="w-3 h-3" />
                            )}
                            {patient.gender}
                          </span>

                          <div className="flex items-center gap-2 text-gray-600">
                            <FaBirthdayCake className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium">{patient.age} yrs</span>
                          </div>
                        </div>

                        {/* Second Row: Phone & Address */}
                        <div className="flex items-center gap-6 text-sm text-gray-600 ml-12">
                          <div className="flex items-center gap-2">
                            <FaPhone className="w-3.5 h-3.5 text-gray-400" />
                            <span>{patient.phone}</span>
                          </div>

                          {patient.address && (
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400" />
                              <span>{patient.address}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side - Action Button */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(patient.id)}
                          className="group relative p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                          title="View Details"
                        >
                          <FaEye className="w-5 h-5" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            View Details
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-3">
                    <FaUserInjured className="w-12 h-12 text-gray-300" />
                    <p className="text-lg font-medium">No patients found</p>
                    <p className="text-sm">Patient records will appear here</p>
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