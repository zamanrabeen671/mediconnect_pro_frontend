import { FaUserInjured, FaPhone, FaMapMarkerAlt, FaTint, FaBirthdayCake, FaEye, FaPrescriptionBottleAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getDoctorPatientList } from "../../store/API/doctorApi";
import { useNavigate } from "react-router";

export default function DoctorPatients() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { patientList } = useAppSelector((state) => state.doctor);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getDoctorPatientList(user.id));
    }
  }, [dispatch, user]);

  const handleViewDetails = (patientId: number) => {
    navigate(`/doctor/patient/${patientId}/details`);
  };

  const handlePrescription = (patientId: number) => {
    navigate(`/doctor/patient/${patientId}/prescription`);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Patients</h1>
            <p className="text-gray-600">View and manage your patient records</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                  <p className="text-3xl font-bold text-gray-800">{patientList?.length || 0}</p>
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
                    {patientList?.filter((p) => p.gender === "Male").length || 0}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-xl">
                  <FaUserInjured className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Female Patients</p>
                  <p className="text-3xl font-bold text-pink-600">
                    {patientList?.filter((p) => p.gender === "Female").length || 0}
                  </p>
                </div>
                <div className="p-3 bg-pink-100 rounded-xl">
                  <FaUserInjured className="w-6 h-6 text-pink-600" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Age</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {patientList && patientList.length > 0
                      ? Math.round(patientList.reduce((sum, p) => sum + p.age, 0) / patientList.length)
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
              {patientList && patientList.length > 0 ? (
                patientList.map((patient) => (
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

                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
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

                      {/* Right Side - Action Buttons */}
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

                        <button
                          onClick={() => handlePrescription(patient.id)}
                          className="group relative p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                          title="Prescription"
                        >
                          <FaPrescriptionBottleAlt className="w-5 h-5" />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Prescription
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
                    <p className="text-sm">Your patients will appear here</p>
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