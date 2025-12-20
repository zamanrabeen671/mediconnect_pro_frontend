import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createAppointmentWithPatient } from "../../store/API/doctorApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getBloodGroupList } from "../../store/API/patientApi";
import { getUser } from "../../store/API/userApis";



const CreateAppointment: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { bloodGroups } = useAppSelector((state) => state.patient);
    const {user} = useAppSelector((state) => state.auth);
    //   const { loading, error } = useSelector((state) => state.appointment);
    const userDetails = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '{}') : null;
    console.log(user)


    useEffect(() => {
        dispatch(getBloodGroupList());
        dispatch(getUser())
    }, []);
    const [patient, setPatient] = useState({
        full_name: "",
        age: "",
        gender: "",
        phone: "",
        blood_group_id: "",
        address: "",
    });

    const [appointment, setAppointment] = useState({
        appointment_date: "",
    });

    const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        setLoading(true);
        console.log(user)
        const postData = {
            patient: {
                full_name: patient.full_name,
                age: parseInt(patient.age),
                gender: patient.gender,
                phone: patient.phone,
                blood_group_id: patient.blood_group_id ? parseInt(patient.blood_group_id) : null,
                address: patient.address,
            },
            doctor_id: userDetails?.id as any,
            appointment_date: appointment.appointment_date,
        };

        dispatch(createAppointmentWithPatient({ postData, router: navigate }));
        setLoading(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-semibold mb-4">Create Appointment with Patient</h2>

            <h3 className="text-xl font-medium mt-4 mb-2">Patient Information</h3>
            <input
                type="text"
                placeholder="Full Name"
                name="full_name"
                value={patient.full_name}
                onChange={handlePatientChange}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="number"
                placeholder="Age"
                name="age"
                value={patient.age}
                onChange={handlePatientChange}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="text"
                placeholder="Gender"
                name="gender"
                value={patient.gender}
                onChange={handlePatientChange}
                className="w-full p-2 border rounded mb-2"
            />
            <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={patient.phone}
                onChange={handlePatientChange}
                className="w-full p-2 border rounded mb-2"
            />
            <select
                name="blood_group_id"
                value={patient.blood_group_id}
                onChange={handlePatientChange}
                className="w-full p-2 border rounded mb-2"
            >
                <option value="">Select Blood Group</option>
                {bloodGroups?.map((bg) => (
                    <option key={bg.id} value={bg.id}>
                        {bg.group_name}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Address"
                name="address"
                value={patient.address}
                onChange={handlePatientChange}
                className="w-full p-2 border rounded mb-2"
            />

            <h3 className="text-xl font-medium mt-4 mb-2">Appointment Information</h3>
            <input
                type="date"
                name="appointment_date"
                value={appointment.appointment_date}
                onChange={handleAppointmentChange}
                className="w-full p-2 border rounded mb-2"
            />

            {/* {error && <p className="text-red-500 mb-2">{error}</p>} */}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
            >
                {loading ? "Creating..." : "Create Appointment"}
            </button>
        </div>
    );
};

export default CreateAppointment;
