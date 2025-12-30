import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createAppointmentWithPatient } from "../../store/API/doctorApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getBloodGroupList } from "../../store/API/patientApi";
import { FaCalendarAlt, FaUser, FaPhone, FaMapMarkerAlt, FaTint, FaClock, FaMailBulk, FaMailchimp } from "react-icons/fa";

const CreateAppointment: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { bloodGroups } = useAppSelector((state) => state.patient);
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getBloodGroupList());
    }, []);

    const [patient, setPatient] = useState({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        blood_group_id: "",
        address: "",
    });

    const [appointment, setAppointment] = useState({
        appointment_date: "",
        appointment_time: "",
    });

    const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setLoading(true);
        const postData = {
            patient: {
                full_name: patient.full_name,
                age: parseInt(patient.age),
                gender: patient.gender,
                phone: patient.phone,
                email: patient.email,
                blood_group_id: patient.blood_group_id ? parseInt(patient.blood_group_id) : null,
                address: patient.address,
            },
            doctor_id: user?.id as any,
            appointment_date: appointment.appointment_date,
            appointment_time:  appointment.appointment_time,
        };

        dispatch(createAppointmentWithPatient({ postData, router: navigate }));
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-blue-600 p-3 rounded-xl">
                            <FaCalendarAlt className="text-white" size={28} />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800">New Appointment</h2>
                    </div>
                    <p className="text-gray-600 ml-16">Create a new appointment and register patient details</p>
                </div>

                {/* Main Form */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Patient Information Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-blue-100">
                            <FaUser className="text-blue-600" size={24} />
                            <h3 className="text-xl font-semibold text-gray-800">Patient Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Full Name */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter patient's full name"
                                    name="full_name"
                                    value={patient.full_name}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Age */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Age <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Age"
                                    name="age"
                                    value={patient.age}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Gender <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="gender"
                                    value={patient.gender}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FaPhone size={16} className="text-gray-500" />
                                        Phone Number <span className="text-red-500">*</span>
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    name="phone"
                                    value={patient.phone}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>

                            {/* Blood Group */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FaTint size={16} className="text-gray-500" />
                                        Blood Group
                                    </div>
                                </label>
                                <select
                                    name="blood_group_id"
                                    value={patient.blood_group_id}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none appearance-none bg-white"
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups?.map((bg) => (
                                        <option key={bg.id} value={bg.id}>
                                            {bg.group_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FaMailchimp size={16} className="text-gray-500" />
                                        Email
                                    </div>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={patient.email}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                             <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt size={16} className="text-gray-500" />
                                        Address
                                    </div>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter full address"
                                    name="address"
                                    value={patient.address}
                                    onChange={handlePatientChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Appointment Information Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6 pb-3 border-b-2 border-purple-100">
                            <FaClock className="text-purple-600" size={24} />
                            <h3 className="text-xl font-semibold text-gray-800">Appointment Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Appointment Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="appointment_date"
                                    value={appointment.appointment_date}
                                    onChange={handleAppointmentChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Appointment Time
                                </label>
                                <input
                                    type="time"
                                    name="appointment_time"
                                    value={appointment.appointment_time}
                                    onChange={handleAppointmentChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200">
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating Appointment...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <FaCalendarAlt size={20} />
                                    Create Appointment
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAppointment;