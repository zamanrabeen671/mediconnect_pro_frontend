import { useState, useEffect, useRef } from "react";
import { BiSearch, BiPlus, BiTrash } from "react-icons/bi";
import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getMedicineList } from "../../store/API/adminApi";

// Types based on your backend models
interface MedicineOut {
  id: number;
  name: string;
  strength: string | null;
  form: string | null;
  manufacturer: string | null;
}

interface PrescriptionMedicineCreate {
  medicine_id: number;
  medicine?: MedicineOut;
  dosage: string;
  duration: string;
  instruction: string;
}

interface PrescriptionCreate {
  appointment_id: number;
  patient_id: number;
  notes: string;
  medicines: PrescriptionMedicineCreate[];
}


const DOSAGE_AMOUNT_OPTIONS = ["0", "1", "1.5", "2", "2.5", "3"];

interface EditorProps {
  appointmentId?: number | string;
  patientId?: number | string;
  onCreate?: (payload: Partial<PrescriptionCreate>) => Promise<any>;
}

export const Editor = ({ appointmentId, patientId, onCreate }: EditorProps) => {
  const [prescribedMedicines, setPrescribedMedicines] = useState<
    PrescriptionMedicineCreate[]
  >([]);
  const dispatch = useAppDispatch();
 
  const { medicines } = useAppSelector((state) => state.admin);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  useEffect(() => {
    dispatch(getMedicineList({ limit: 1000 }));
  }, [dispatch]);

  const filteredMedicines = medicines.filter(
    (med) =>
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (med.manufacturer &&
        med.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddMedicine = (medicine: MedicineOut): void => {
    const isAlreadyAdded = prescribedMedicines.some(
      (pm) => pm.medicine_id === medicine.id
    );

    if (!isAlreadyAdded) {
      setPrescribedMedicines([
        ...prescribedMedicines,
        {
          medicine_id: medicine.id,
          medicine: medicine,
          dosage: "",
          duration: "",
          instruction: "",
        },
      ]);
    }
    setSearchTerm("");
  };

  const handleRemoveMedicine = (medicineId: number): void => {
    setPrescribedMedicines(
      prescribedMedicines.filter((pm) => pm.medicine_id !== medicineId)
    );
  };

  const handleUpdateMedicine = (
    medicineId: number,
    field: keyof PrescriptionMedicineCreate,
    value: string
  ): void => {
    setPrescribedMedicines(
      prescribedMedicines.map((pm) =>
        pm.medicine_id === medicineId ? { ...pm, [field]: value } : pm
      )
    );
  };

  const handleSubmit = (): void => {
    const prescriptionData: Partial<PrescriptionCreate> = {
      appointment_id: appointmentId ? Number(appointmentId) : undefined,
      patient_id: patientId ? Number(patientId) : undefined,
      notes: notes,
      medicines: prescribedMedicines.map((pm) => ({
        medicine_id: pm.medicine_id,
        dosage: pm.dosage,
        duration: pm.duration,
        instruction: pm.instruction,
      })),
    };

    if (onCreate) {
      onCreate(prescriptionData)
        .then(() => {
          setPrescribedMedicines([]);
          setNotes("");
        })
        .catch((err) => {
          console.error("Failed to create prescription from Editor:", err);
        });
    } else {
      console.log("Prescription Data:", prescriptionData);
    }
  };

  // Suggestion Input Component
  

  // Popover select component for fixed option lists (shows on input focus/click)
  const PopoverSelect = ({
    value,
    onChange,
    options,
    placeholder,
    label,
  }: {
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder: string;
    label: string;
  }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={ref}>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {open && (
          <div className="absolute z-10 mt-1 w-full rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-900"
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  // DosageButtons: three buttons for Morning/Noon/Night each with a popover of amounts
  const DosageButtons = ({
    value,
    onChange,
    label,
  }: {
    value: string;
    onChange: (value: string) => void;
    label: string;
  }) => {
    const parse = (v: string) => {
      const parts = v ? v.split("/") : [];
      return {
        m: parts[0] || "0",
        n: parts[1] || "0",
        e: parts[2] || "0",
      };
    };

    const [vals, setVals] = useState<{ m: string; n: string; e: string }>(
      parse(value)
    );
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      setVals(parse(value));
    }, [value]);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          setOpenIndex(null);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const apply = (newVals: { m: string; n: string; e: string }) => {
      setVals(newVals);
      onChange(`${newVals.m}/${newVals.n}/${newVals.e}`);
    };

    const buttons = [
      { key: "m", label: "" },
      { key: "n", label: "" },
      { key: "e", label: "" },
    ];

    return (
      <div ref={ref}>
        <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
        <div className="flex gap-2">
          {buttons.map((b, idx) => (
            <div key={b.key} className="relative">
              <button
                type="button"
                onClick={() => setOpenIndex(idx === openIndex ? null : idx)}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm w-28 text-left"
              >
                <div className="text-xs text-gray-500">{b.label}</div>
                <div className="font-medium text-gray-900">
                  {b.key === "m" ? vals.m : b.key === "n" ? vals.n : vals.e}
                </div>
              </button>

              {openIndex === idx && (
                <div className="absolute z-20 mt-1 w-36 rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5">
                  {DOSAGE_AMOUNT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        const next = { ...vals };
                        if (b.key === "m") next.m = opt;
                        if (b.key === "n") next.n = opt;
                        if (b.key === "e") next.e = opt;
                        apply(next);
                        setOpenIndex(null);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-blue-50 text-gray-900"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Rx Header Section */}
      <div className="bg-white  shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-xl font-bold text-blue-600">
            <Popover className="relative">
              {() => (
                <>
                  <Popover.Button className="inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded">
                    Rx,
                    <BiPlus className="w-5 h-5" />
                  </Popover.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute top-full left-0 mt-2 w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                      {/* Search Bar */}
                      <div className="p-3 border-b border-gray-200">
                        <div className="relative">
                          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search medicines..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            autoFocus
                          />
                        </div>
                      </div>

                      {/* Medicine List */}
                      <div className="max-h-80 overflow-y-auto">
                        {filteredMedicines.length > 0 ? (
                          filteredMedicines.map((medicine) => {
                            const isAdded = prescribedMedicines.some(
                              (pm) => pm.medicine_id === medicine.id
                            );
                            return (
                              <button
                                key={medicine.id}
                                onClick={() => handleAddMedicine(medicine)}
                                disabled={isAdded}
                                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ${
                                  isAdded
                                    ? "opacity-50 cursor-not-allowed bg-gray-50"
                                    : ""
                                }`}
                              >
                                <div className="font-medium text-gray-900">
                                  {medicine.name}
                                </div>
                                <div className="text-sm text-gray-500 flex gap-2 mt-1">
                                  <span>{medicine.strength}</span>
                                  <span>•</span>
                                  <span>{medicine.form}</span>
                                  <span>•</span>
                                  <span>{medicine.manufacturer}</span>
                                </div>
                                {isAdded && (
                                  <div className="text-xs text-green-600 mt-1">
                                    ✓ Already added
                                  </div>
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <div className="px-4 py-8 text-center text-gray-500">
                            No medicines found
                          </div>
                        )}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
        {prescribedMedicines.length > 0 && (
          <div >

            <div className="divide-y divide-gray-200">
              {prescribedMedicines.map((pm, index) => (
                <div
                  key={pm.medicine_id}
                  className="p-4 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>

                    <div className="flex-1 space-y-3">
                      {/* Medicine Info */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {pm.medicine?.name}
                          </div>
                          <div className="text-sm text-gray-500 flex gap-2 mt-1">
                            <span>{pm.medicine?.strength}</span>
                            <span>•</span>
                            <span>{pm.medicine?.form}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveMedicine(pm.medicine_id)}
                          className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors duration-150"
                        >
                          <BiTrash className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Input Fields with Suggestions */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <DosageButtons
                          value={pm.dosage}
                          onChange={(value) =>
                            handleUpdateMedicine(pm.medicine_id, "dosage", value)
                          }
                          label="Dosage"
                        />

                        <PopoverSelect
                          value={pm.duration}
                          onChange={(value) =>
                            handleUpdateMedicine(pm.medicine_id, "duration", value)
                          }
                          options={["1", "2", "3", "7", "10", "30", "continue"]}
                          placeholder="Select duration"
                          label="Duration"
                        />

                        <PopoverSelect
                          value={pm.instruction}
                          onChange={(value) =>
                            handleUpdateMedicine(pm.medicine_id, "instruction", value)
                          }
                          options={["after meal", "before meal"]}
                          placeholder="Select instruction"
                          label="Instruction"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prescribed Medicines List */}

      {/* Notes Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional instructions or notes for the patient..."
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setPrescribedMedicines([]);
            setNotes("");
          }}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-150"
        >
          Clear All
        </button>
        <button
          onClick={handleSubmit}
          disabled={prescribedMedicines.length === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Prescription
        </button>
      </div>
    </div>
  );
};
