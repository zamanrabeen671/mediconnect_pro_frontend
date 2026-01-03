import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  createPrescription,
  addMedicineToPrescription,
} from "../../store/API/doctorApi";
import { getPatientDetails } from "../../store/API/patientApi";
import { Editor } from "../../components/common/editor";
import { getMedicineList } from "../../store/API/adminApi";

type Medicine = {
  id: number;
  name: string;
  strength?: string | null;
  form?: string | null;
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
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { patientDetails, loading } = useAppSelector((state) => state.patient);
  const [error, setError] = useState<string | null>(null);

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
  

  useEffect(() => {
    if (patientId) {
      dispatch(getPatientDetails(Number(patientId)));
      dispatch(getMedicineList({ limit: 1000 }));
    }
  }, [dispatch]);
 

  const handleCreate = async () => {
    if (!patientId) {
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
        patient_id: Number(patientId),
        notes: notes || "",
        medicines: [],
      };

      const result = await dispatch(createPrescription(payload)).unwrap();

      // Set current prescription for adding medicines
      setCurrentPrescription(result);

      // Refresh prescriptions list
  

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
                <Editor 
                appointmentId={appointmentId}
                patientId={patientId}
                onCreate={handleCreate}
                />
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
