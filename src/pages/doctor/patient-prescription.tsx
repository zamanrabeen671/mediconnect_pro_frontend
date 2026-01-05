import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getPatientDetails } from "../../store/API/patientApi";
import { Editor } from "../../components/common/editor";
import { getMedicineList } from "../../store/API/adminApi";

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
  


  const [appointmentId, setAppointmentId] = useState<string>(() =>
    locationState?.appointmentId ? String(locationState.appointmentId) : ""
  );
  

  useEffect(() => {
    if (patientId) {
      dispatch(getPatientDetails(Number(patientId)));
      dispatch(getMedicineList({ limit: 1000 }));
    }
  }, [dispatch]);
 

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
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
