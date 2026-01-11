import { useState, useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { updateProfileCompletion } from "../../store/slices/auth-slice";
import {
  FaStethoscope,
  FaGraduationCap,
  FaHospital,
  FaIdCard,
  FaClock,
  FaDollarSign,
  FaPhone,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { doctorCreate } from "../../store/API/doctorApi";
import { getSpecializationList } from "../../store/API/adminApi";
import { getInstituteList } from "../../store/API/adminApi";
import { getQualificationList } from "../../store/API/adminApi";

interface Specialization {
  id: number;
  name: string;
}

interface Institute {
  id: number;
  name: string;
  address?: string;
}

interface Qualification {
  id: number;
  name: string;
}

export default function DoctorProfileCompletion() {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    bmdc_number: "",
    experience: "",
    consultation_fee: "",
    specialization_ids: [] as number[],
    institute_ids: [] as number[],
    qualification_ids: [] as number[],
    qualification_names: [] as string[],
  });

  const [specializations, setSpecializations] = useState<Specialization[]>([]);
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [newQualification, setNewQualification] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [specsResult, instsResult, qualsResult] = await Promise.all([
        dispatch(getSpecializationList(null)),
        dispatch(getInstituteList(null)),
        dispatch(getQualificationList(null)),
      ]);

      if (specsResult.payload && Array.isArray(specsResult.payload)) {
        setSpecializations(specsResult.payload);
      }
      if (instsResult.payload && Array.isArray(instsResult.payload)) {
        setInstitutes(instsResult.payload);
      }
      if (qualsResult.payload && Array.isArray(qualsResult.payload)) {
        setQualifications(qualsResult.payload);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpecializationToggle = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      specialization_ids: prev.specialization_ids.includes(id)
        ? prev.specialization_ids.filter((sid) => sid !== id)
        : [...prev.specialization_ids, id],
    }));
  };

  const handleInstituteToggle = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      institute_ids: prev.institute_ids.includes(id)
        ? prev.institute_ids.filter((iid) => iid !== id)
        : [...prev.institute_ids, id],
    }));
  };

  const handleQualificationToggle = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      qualification_ids: prev.qualification_ids.includes(id)
        ? prev.qualification_ids.filter((qid) => qid !== id)
        : [...prev.qualification_ids, id],
    }));
  };

  const handleAddQualification = () => {
    if (newQualification.trim()) {
      setFormData((prev) => ({
        ...prev,
        qualification_names: [
          ...prev.qualification_names,
          newQualification.trim(),
        ],
      }));
      setNewQualification("");
    }
  };

  const handleRemoveQualification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      qualification_names: prev.qualification_names.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.full_name ||
      !formData.phone ||
      !formData.bmdc_number ||
      !formData.experience
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.specialization_ids.length === 0) {
      setError("Please select at least one specialization");
      return;
    }

    if (formData.institute_ids.length === 0) {
      setError("Please select at least one institute");
      return;
    }

    const payload = {
      full_name: formData.full_name,
      phone: formData.phone,
      bmdc_number: formData.bmdc_number,
      experience: formData.experience,
      consultation_fee: formData.consultation_fee || null,
      specialization_ids: formData.specialization_ids,
      institute_ids: formData.institute_ids,
      qualification_ids: formData.qualification_ids,
      qualification_names: formData.qualification_names,
    };

    // Save profile
    dispatch(doctorCreate({ postData: payload, router: navigate }));
    dispatch(updateProfileCompletion("pending"));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Complete Your Profile
          </h1>
          <p className="text-muted-foreground">
            Help patients know more about you by completing your professional
            profile
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <FaIdCard className="text-accent" />
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="full_name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Dr. John Doe"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      id="phone"
                      type="text"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g., +880 1234 567890"
                    />
                  </div>
                </div>

                {/* BMDC Number */}
                <div>
                  <label
                    htmlFor="bmdc_number"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    BMDC Number <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      id="bmdc_number"
                      type="text"
                      value={formData.bmdc_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bmdc_number: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g., A-12345"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Years of Experience{" "}
                    <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      id="experience"
                      type="text"
                      value={formData.experience}
                      onChange={(e) =>
                        setFormData({ ...formData, experience: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g., 10"
                    />
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="consultation_fee"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Consultation Fee (Optional)
                  </label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      id="consultation_fee"
                      type="text"
                      value={formData.consultation_fee}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          consultation_fee: e.target.value,
                        })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="e.g., 500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Specializations Section */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FaStethoscope className="text-accent" />
                Specializations <span className="text-destructive">*</span>
              </h2>
              {specializations.length === 0 ? (
                <p className="text-muted-foreground">
                  No specializations available
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {specializations.map((spec) => (
                    <label
                      key={spec.id}
                      className="flex items-center gap-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.specialization_ids.includes(spec.id)}
                        onChange={() => handleSpecializationToggle(spec.id)}
                        className="w-4 h-4 rounded border-input bg-background text-accent focus:ring-2 focus:ring-ring"
                      />
                      <span className="text-foreground">{spec.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Institutes Section */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FaHospital className="text-accent" />
                Institutes/Hospitals <span className="text-destructive">*</span>
              </h2>
              {institutes.length === 0 ? (
                <p className="text-muted-foreground">No institutes available</p>
              ) : (
                <div className="space-y-2">
                  {institutes.map((inst) => (
                    <label
                      key={inst.id}
                      className="flex items-center gap-3 p-4 border border-input rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.institute_ids.includes(inst.id)}
                        onChange={() => handleInstituteToggle(inst.id)}
                        className="w-4 h-4 rounded border-input bg-background text-accent focus:ring-2 focus:ring-ring"
                      />
                      <div className="flex-1">
                        <p className="text-foreground font-medium">
                          {inst.name}
                        </p>
                        {inst.address && (
                          <p className="text-sm text-muted-foreground">
                            {inst.address}
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Qualifications Section */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-accent" />
                Qualifications
              </h2>

              {/* Select from existing qualifications */}
              {qualifications.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-foreground mb-3">
                    Select Existing Qualifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {qualifications.map((qual) => (
                      <label
                        key={qual.id}
                        className="flex items-center gap-3 p-3 border border-input rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.qualification_ids.includes(qual.id)}
                          onChange={() => handleQualificationToggle(qual.id)}
                          className="w-4 h-4 rounded border-input bg-background text-accent focus:ring-2 focus:ring-ring"
                        />
                        <span className="text-foreground">{qual.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add custom qualifications */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3">
                  Add Custom Qualifications
                </h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddQualification();
                      }
                    }}
                    className="flex-1 px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., MBBS, MD (Cardiology)"
                  />
                  <button
                    type="button"
                    onClick={handleAddQualification}
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-2"
                  >
                    <FaPlus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {/* Display added qualifications */}
                {formData.qualification_names.length > 0 && (
                  <div className="space-y-2">
                    {formData.qualification_names.map((qual, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-3 p-3 border border-input rounded-lg bg-muted/50"
                      >
                        <span className="text-foreground">{qual}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveQualification(index)}
                          className="text-destructive hover:text-destructive/80 transition-colors"
                        >
                          <FaTimes className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors"
            >
              Complete Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
