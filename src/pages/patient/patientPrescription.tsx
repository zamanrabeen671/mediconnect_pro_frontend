import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPatientDetails } from "../../store/API/patientApi";
import { useEffect } from "react";
import { ViewPrescription } from "../../components/common/view";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";

export const PatientPrescription = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const patient = useAppSelector((s) => s.patient.patientDetails);

  useEffect(() => {
    if (!patientId) return;
    dispatch(getPatientDetails(Number(patientId)));
  }, [patientId, dispatch]);

  const initials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };
  return (
    <div>
      <div className="flex items-center gap-6">
        <div className="flex-1">
          <div className="flex items-center justify-between py-4">
            <div>
              <h2 className="text-xl font-semibold">
                Hello {patient?.full_name || "Unknown Patient"}
              </h2>
                <p>Its Your digitalize Prescription</p>
            </div>

            <div className="text-right">
              <button
                onClick={() => navigate(-1)}
                className="px-3 py-2 bg-muted/60 rounded-md text-sm"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
      <ViewPrescription patient={patient} patientId={patientId!} />
    </div>
  );
};
