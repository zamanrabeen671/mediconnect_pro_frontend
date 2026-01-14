import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPatientPrescriptions } from "../../store/API/patientApi";

interface ViewProps {
  patientId: string;
  patient?: any;
}

export const ViewPrescription = ({ patientId, patient }: ViewProps) => {
  const dispatch = useAppDispatch();
  const prescriptions = useAppSelector(
    (s) => s.patient.patientPrescriptions
  );

  useEffect(() => {
    dispatch(getPatientPrescriptions(Number(patientId)));
  }, [patientId]);

  if (!prescriptions?.length) return null;

  const prescription = prescriptions[0] as any;
  const doctor = prescription.appointment?.doctor;

  return (
    <div className="bg-white text-gray-900 border border-gray-300 mx-auto p-8 w-full min-h-[1123px]">

      <div className="flex justify-between border-b pb-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold">{doctor?.full_name}</h2>
           <p className="font-semibold capitalize">{doctor?.specializations?.map((s: any) => s.name).join(", ")}</p>
          <p className="text-sm">{doctor?.qualifications?.map((q: any) => q.name).join(", ")}</p>
        </div>

        <div className="text-right text-sm leading-5">
         
          <p>{doctor?.chamber}</p>
          <p> {doctor?.institutes?.map((i: any) => i.name).join(", ")}</p>
          <p>📞 {doctor?.phone}</p>
        </div>
      </div>

      <div className="flex justify-between border-b pb-3 mb-5 text-sm">
        <div className="flex gap-6">
          <p><strong>Name:</strong> {patient?.full_name}</p>
          <p><strong>Age:</strong> {patient?.age}</p>
          <p><strong>Phone:</strong> {patient?.phone}</p>
        </div>

        <p>
          <strong>Date:</strong>{" "}
          {prescription.appointment?.appointment_date}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-5">Rx,</h3>

        <div className="space-y-5">
          {prescription.medicines.map((item: any, index: number) => (
            <div key={item.id}>
              <p className="font-semibold text-base">
                {index + 1}. {item.medicine.name}{" "}
                <span className="text-sm font-normal">
                  ({item.medicine.strength}, {item.medicine.form})
                </span>
              </p>

            
              <p className="text-sm text-gray-700 ml-6 mt-1">
                {item.dosage}
                <span className="mx-3">----</span>
                {item.duration} days
                <span className="mx-3">----</span>
                {item.instruction}
              </p>
            </div>
          ))}
        </div>
      </div>

      {prescription.notes && (
        <div className="mt-8 border-t pt-4 text-sm">
          <strong>Advice:</strong> {prescription.notes}
        </div>
      )} 
    </div>
  );
};
