"use client"

import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { createMedicine, getMedicineList } from "../../store/API/adminApi";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaSave, FaTimes } from "react-icons/fa";

interface FormData {
  name: string;
  strength: string;
  form: string;
  manufacturer: string;
}

interface FormErrors {
  name?: string;
  strength?: string;
  form?: string;
  manufacturer?: string;
}

export const CreateMedicine = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    strength: "",
    form: "",
    manufacturer: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Form field metadata for consistent styling
  const formFields = [
    { label: "Medicine Name", name: "name", placeholder: "e.g., Aspirin", required: true },
    { label: "Strength", name: "strength", placeholder: "e.g., 500mg", required: false },
    { label: "Form", name: "form", placeholder: "e.g., Tablet, Capsule, Syrup", required: false },
    { label: "Manufacturer", name: "manufacturer", placeholder: "e.g., ABC Pharma", required: false },
  ];

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Medicine name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        strength: formData.strength.trim() || null,
        form: formData.form.trim() || null,
        manufacturer: formData.manufacturer.trim() || null,
      };

      await dispatch(createMedicine(payload));
      // Refresh the medicines list
      await dispatch(getMedicineList({ skip: 0, limit: 100 }));
      
      // Show success message and redirect
      alert("Medicine created successfully!");
      navigate("/admin/settings?tab=medicine");
    } catch (err: any) {
      setError(err.message || "Failed to create medicine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/admin/settings?tab=medicine");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleCancel}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Medicine List
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create New Medicine</h1>
          <p className="text-muted-foreground">Add a new medicine to the system database</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <FaTimes className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-800">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              {formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {field.label}
                    {field.required && <span className="text-red-600 ml-1">*</span>}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name as keyof FormData]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    disabled={loading}
                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-foreground placeholder-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors[field.name as keyof FormErrors]
                        ? "border-red-500 focus:ring-red-500"
                        : "border-border"
                    }`}
                  />
                  {errors[field.name as keyof FormErrors] && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <span>•</span> {errors[field.name as keyof FormErrors]}
                    </p>
                  )}
                </div>
              ))}

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-medium mb-1">Information</p>
                <p>Only the medicine name is required. Other fields can be filled later if needed.</p>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave className="w-4 h-4" />
                  {loading ? "Creating..." : "Create Medicine"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional Help Text */}
        <div className="mt-8 bg-muted p-4 rounded-lg text-sm text-muted-foreground">
          <p className="font-medium mb-2">Medicine Details:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li><strong>Strength:</strong> The dosage amount (e.g., 500mg, 10mg/ml)</li>
            <li><strong>Form:</strong> The type of medicine (e.g., Tablet, Capsule, Syrup, Injection)</li>
            <li><strong>Manufacturer:</strong> The company that produces the medicine</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
