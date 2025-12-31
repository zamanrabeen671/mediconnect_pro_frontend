import React, { useState, useEffect } from "react";
import { BiSearch, BiPlus, BiTrash } from "react-icons/bi";
import { Popover, Transition, Combobox } from "@headlessui/react";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getPatientDetails } from "../../store/API/patientApi";
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

// Suggestion data
const DOSAGE_SUGGESTIONS = [
  "1 tablet",
  "2 tablets",
  "1 capsule",
  "2 capsules",
  "5ml",
  "10ml",
  "1 teaspoon",
  "2 teaspoons",
  "1 tablespoon",
  "As directed",
];

const DURATION_SUGGESTIONS = [
  "3 days",
  "5 days",
  "7 days",
  "10 days",
  "14 days",
  "21 days",
  "30 days",
  "Until finished",
  "As needed",
];

const INSTRUCTION_SUGGESTIONS = [
  "After meal",
  "Before meal",
  "With meal",
  "On empty stomach",
  "At bedtime",
  "Morning only",
  "Twice daily",
  "Three times daily",
  "Every 6 hours",
  "Every 8 hours",
  "As needed for pain",
];

export const Editor = () => {
  const [prescribedMedicines, setPrescribedMedicines] = useState<
    PrescriptionMedicineCreate[]
  >([]);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((s) => s.auth);
  const { patientDetails } = useAppSelector((state) => state.patient);
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
      notes: notes,
      medicines: prescribedMedicines.map((pm) => ({
        medicine_id: pm.medicine_id,
        dosage: pm.dosage,
        duration: pm.duration,
        instruction: pm.instruction,
      })),
    };
    console.log("Prescription Data:", prescriptionData);
    // Submit to your API here
  };

  // Suggestion Input Component
  const SuggestionInput = ({
    value,
    onChange,
    suggestions,
    placeholder,
    label,
  }: {
    value: string;
    onChange: (value: string) => void;
    suggestions: string[];
    placeholder: string;
    label: string;
  }) => {
    const [query, setQuery] = useState(value);

    const filteredSuggestions =
      query === ""
        ? suggestions
        : suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(query.toLowerCase())
          );

    useEffect(() => {
      setQuery(value);
    }, [value]);

    return (
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">
          {label}
        </label>
        <Combobox
          value={value}
          onChange={(val) => {
            onChange(val || "");
            setQuery(val || "");
          }}
        >
          <div className="relative">
            <Combobox.Input
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={placeholder}
              onChange={(e) => {
                setQuery(e.target.value);
                onChange(e.target.value);
              }}
              displayValue={(val: string) => val}
            />
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery(value)}
            >
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {filteredSuggestions.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                    No suggestions found. Press Enter to use "{query}"
                  </div>
                ) : (
                  filteredSuggestions.map((suggestion) => (
                    <Combobox.Option
                      key={suggestion}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 px-4 ${
                          active ? "bg-blue-50 text-blue-900" : "text-gray-900"
                        }`
                      }
                      value={suggestion}
                    >
                      {({ selected, active }) => (
                        <span
                          className={`block truncate ${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {suggestion}
                        </span>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
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
              {({ open }) => (
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
                        <SuggestionInput
                          value={pm.dosage}
                          onChange={(value) =>
                            handleUpdateMedicine(
                              pm.medicine_id,
                              "dosage",
                              value
                            )
                          }
                          suggestions={DOSAGE_SUGGESTIONS}
                          placeholder="e.g., 1 tablet"
                          label="Dosage"
                        />

                        <SuggestionInput
                          value={pm.duration}
                          onChange={(value) =>
                            handleUpdateMedicine(
                              pm.medicine_id,
                              "duration",
                              value
                            )
                          }
                          suggestions={DURATION_SUGGESTIONS}
                          placeholder="e.g., 7 days"
                          label="Duration"
                        />

                        <SuggestionInput
                          value={pm.instruction}
                          onChange={(value) =>
                            handleUpdateMedicine(
                              pm.medicine_id,
                              "instruction",
                              value
                            )
                          }
                          suggestions={INSTRUCTION_SUGGESTIONS}
                          placeholder="e.g., After meal"
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
