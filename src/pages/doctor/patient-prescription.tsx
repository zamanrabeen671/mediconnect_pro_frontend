import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { FaPrescriptionBottleAlt, FaSave, FaPlus } from "react-icons/fa";
import useAxios from "../../utils/useAxios";
import { API_URL, BASE_URL } from "../../settings/config";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  createPrescription,
  addMedicineToPrescription,
} from "../../store/API/doctorApi";
import { get } from "lodash";
import { getPatientDetails } from "../../store/API/patientApi";
import { Editor } from "../../components/common/editor";
import { getMedicineList } from "../../store/API/adminApi";

type Medicine = {
  id: number;
  name: string;
  strength?: string | null;
  form?: string | null;
};

type Patient = {
  id: number;
  full_name: string;
  age: number;
  gender: string;
  phone: string;
  address?: string;
  blood_group?: { group_name: string };
};

type Appointment = {
  id: number;
  appointment_date: string;
  appointment_time: string | null;
};

type PatientOption = {
  id: number;
  full_name: string;
};

type Prescription = {
  id: number;
  notes: string;
  appointment_id: number;
  patient_id: number;
  medicines: {
    medicine?: Medicine | null;
    dosage?: string | null;
    duration?: string | null;
    instruction?: string | null;
  }[];
};

export default function DoctorPatientPrescription() {
  const { patientId } = useParams();
  const location = useLocation();
  const locationState = location.state as {
    appointmentId?: number;
    patientId?: number;
    prescriptionId?: number;
  } | null;
  const navigate = useNavigate();
  const api = useAxios();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { patientDetails, loading } = useAppSelector((state) => state.patient);
  const [error, setError] = useState<string | null>(null);

  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [currentPrescription, setCurrentPrescription] =
    useState<Prescription | null>(null);

  const [appointmentId, setAppointmentId] = useState<string>(() =>
    locationState?.appointmentId ? String(locationState.appointmentId) : ""
  );
  const [medicineId, setMedicineId] = useState<string>("");
  const [dosage, setDosage] = useState("1 tab");
  const [duration, setDuration] = useState("7 days");
  const [instruction, setInstruction] = useState("After meal");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string>(
    patientId ||
      (locationState?.patientId ? String(locationState.patientId) : "")
  );

  useEffect(() => {
    if (patientId) {
      dispatch(getPatientDetails(Number(patientId)));
      dispatch(getMedicineList({ limit: 1000 }));
    }
  }, [dispatch]);
  // Initial load: patients + medicines
  // useEffect(() => {
  //   const loadLists = async () => {
  //     setLoading(true)
  //     setError(null)
  //     try {
  //       const [patientsRes, medsRes] = await Promise.all([
  //         api.get(`${API_URL}/patients/`),
  //         api.get(`${API_URL}/medicines/`),
  //       ])
  //       const fetchedPatients = patientsRes.data || []
  //       if (!selectedPatient && fetchedPatients.length > 0) {
  //         setSelectedPatient(String(fetchedPatients[0].id))
  //       }
  //       setMedicines(medsRes.data || [])
  //     } catch (err: any) {
  //       setError(err?.message || "Failed to load data")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   loadLists()
  // }, [])

  // useEffect(() => {
  //   if (locationState?.appointmentId) {
  //     setAppointmentId(String(locationState.appointmentId))
  //   }
  // }, [locationState?.appointmentId])

  // Load selected patient detail/appointments/prescriptions
  // useEffect(() => {
  //   const loadPatientData = async () => {
  //     if (!selectedPatient) {
  //       // setPatient(null)
  //       setAppointments([])
  //       setPrescriptions([])
  //       return
  //     }
  //     setLoading(true)
  //     setError(null)
  //     try {
  //       const pid = selectedPatient
  //       const patientRes = await api.get(`${API_URL}/patients/${pid}`)
  //       // setPatient(patientRes.data)

  //       try {
  //         const presRes = await api.get(`${API_URL}/prescriptions/patient/${pid}/`)
  //         const list: Prescription[] = Array.isArray(presRes.data)
  //           ? presRes.data
  //           : presRes.data
  //           ? [presRes.data]
  //           : []
  //         setPrescriptions(list)

  //         if (locationState?.prescriptionId) {
  //           const match = list.find((p) => p.id === Number(locationState.prescriptionId))
  //           if (match) {
  //             setCurrentPrescription(match)
  //           }
  //         } else {
  //           setCurrentPrescription(null)
  //         }
  //       } catch (presErr: any) {
  //         if (presErr?.response?.status === 404) {
  //           setPrescriptions([])
  //           setCurrentPrescription(null)
  //         } else {
  //           throw presErr
  //         }
  //       }

  //       // Try patient appointments; if backend returns validation error, fallback to doctor appointments filtered by patient
  //       try {
  //         const appointRes = await api.get(`${API_URL}/appointments/patient/${pid}`)
  //         setAppointments(appointRes.data || [])
  //       } catch (appointErr: any) {
  //         // Fallback: doctor appointments filtered by patient
  //         try {
  //           const doctorId = user?.id
  //           if (doctorId) {
  //             const docAppRes = await api.get(`${API_URL}/appointments/doctor/${doctorId}`)
  //             const filtered = (docAppRes.data || []).filter((a: any) => a.patient_id === Number(pid))
  //             setAppointments(filtered)
  //           } else {
  //             setAppointments([])
  //           }
  //         } catch (_fallbackErr) {
  //           setAppointments([])
  //         }
  //       }
  //     } catch (err: any) {
  //       setError(err?.message || "Failed to load patient data")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   loadPatientData()
  // }, [selectedPatient])

  const handleCreate = async () => {
    const pid = selectedPatient || patientId;
    if (!pid) {
      setError("Select a patient");
      return;
    }
    setError(null);
    if (!appointmentId) {
      setError("Select an appointment");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        appointment_id: Number(appointmentId),
        patient_id: Number(pid),
        notes: notes || "",
        medicines: [],
      };

      const result = await dispatch(createPrescription(payload)).unwrap();

      // Set current prescription for adding medicines
      setCurrentPrescription(result);

      // Refresh prescriptions list
      const presRes = await api.get(
        `${BASE_URL}/prescriptions/patient/${pid}/`
      );
      const list: Prescription[] = Array.isArray(presRes.data)
        ? presRes.data
        : presRes.data
        ? [presRes.data]
        : [];
      setPrescriptions(list);
      if (locationState?.prescriptionId) {
        const match = list.find(
          (p) => p.id === Number(locationState.prescriptionId)
        );
        if (match) {
          setCurrentPrescription(match);
        }
      }

      setNotes("");
      setAppointmentId("");

      setError(null);
      alert("Prescription created successfully! You can now add medicines.");
    } catch (err: any) {
      setError(err || "Failed to create prescription");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddMedicine = async () => {
    if (!currentPrescription) {
      setError("Create a prescription first");
      return;
    }

    if (!medicineId) {
      setError("Select a medicine");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const medicineData = {
        medicine_id: Number(medicineId),
        dosage,
        duration,
        instruction,
      };

      await dispatch(
        addMedicineToPrescription({
          prescriptionId: currentPrescription.id,
          medicine: medicineData,
        })
      ).unwrap();

      // Refresh prescriptions list
      const pid = selectedPatient || patientId;
      const presRes = await api.get(
        `${BASE_URL}/prescriptions/patient/${pid}/`
      );
      const list: Prescription[] = Array.isArray(presRes.data)
        ? presRes.data
        : presRes.data
        ? [presRes.data]
        : [];
      setPrescriptions(list);

      // Update current prescription
      const updatedPrescription = list.find(
        (p: Prescription) => p.id === currentPrescription.id
      );
      if (updatedPrescription) {
        setCurrentPrescription(updatedPrescription);
      }

      // Reset medicine form
      setMedicineId("");
      setDosage("1 tab");
      setDuration("7 days");
      setInstruction("After meal");

      alert("Medicine added successfully!");
    } catch (err: any) {
      setError(err || "Failed to add medicine");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Prescription</h1>
          <p className="text-sm text-muted-foreground">
            Add medicines for patient; patient sees read-only.
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-primary hover:underline"
        >
          Back
        </button>
      </div>

      {loading ? (
        <div className="p-6 border rounded-lg">Loading...</div>
      ) : (
        <div className="space-y-6">
          {patientDetails && (
            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <div className="flex items-start justify-between">
                <div className="text-sm">
                  <div className="font-semibold text-lg">
                    {user?.full_name || user?.name || "Dr. Name"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {"General"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Phone: {user?.phone || "-"}
                  </div>
                </div>
                <div className="text-sm text-right">
                  <div className="font-semibold">Clinic / Hospital</div>
                  <div className="text-xs text-muted-foreground">
                    Address or License
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Phone: {user?.phone || "-"}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-6 items-center">
                  <div className="font-medium">{patientDetails.full_name}</div>
                  <div className="text-sm text-muted-foreground">
                    Age: {patientDetails.age}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Phone: {patientDetails.phone}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="mt-4">
                <Editor />
              </div>
            </div>
          )}
          {/* Existing prescriptions (read-only for patient) */}
          {/* <div className="space-y-4">
            {prescriptions.length === 0 ? (
              <div className="p-4 border rounded-lg bg-white shadow-sm text-sm text-muted-foreground">No prescriptions yet.</div>
            ) : (
              prescriptions.map((p) => (
                <div key={p.id} className="p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Prescription #{p.id}</div>
                    <div className="text-sm text-muted-foreground">Appointment #{p.appointment_id}</div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{p.notes || "No notes"}</div>
                  <div className="mt-3 space-y-2">
                    {p.medicines?.map((m, idx) => (
                      <div key={idx} className="p-3 border rounded-md bg-muted/40">
                        <div className="font-medium">{m.medicine?.name || "Medicine"}</div>
                        <div className="text-xs text-muted-foreground flex gap-3 mt-1">
                          {m.medicine?.strength && <span>Strength: {m.medicine.strength}</span>}
                          {m.medicine?.form && <span>Form: {m.medicine.form}</span>}
                          {m.dosage && <span>Dosage: {m.dosage}</span>}
                          {m.duration && <span>Duration: {m.duration}</span>}
                          {m.instruction && <span>Instruction: {m.instruction}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div> */}
        </div>
      )}
    </div>
  );
}
