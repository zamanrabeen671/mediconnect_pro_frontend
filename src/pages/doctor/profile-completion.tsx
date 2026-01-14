import { useState, useEffect, useRef } from "react";
import {
  FaStethoscope,
  FaGraduationCap,
  FaHospital,
  FaIdCard,
  FaClock,
  FaDollarSign,
  FaPhone,
  FaTimes,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useNavigate } from "react-router";
import { doctorCreate } from "../../store/API/doctorApi";
import { updateProfileCompletion } from "../../store/slices/auth-slice";
import { getInstituteList, getQualificationList, getSpecializationList } from "../../store/API/adminApi";

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
    specialization_id: null as number | null,
    institute_id: null as number | null,
    qualification_ids: [] as number[],
    qualification_names: [] as string[],
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { specializationList, instituteList, qualificationList } = useAppSelector((state) => state.doctor);

  const [specializationOpen, setSpecializationOpen] = useState(false);
  const [instituteOpen, setInstituteOpen] = useState(false);
  const [qualificationOpen, setQualificationOpen] = useState(false);
  const [qualificationSearch, setQualificationSearch] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [error, setError] = useState("");

  const specializationRef = useRef<HTMLDivElement>(null);
  const instituteRef = useRef<HTMLDivElement>(null);
  const qualificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (specializationRef.current && !specializationRef.current.contains(event.target as Node)) {
        setSpecializationOpen(false);
      }
      if (instituteRef.current && !instituteRef.current.contains(event.target as Node)) {
        setInstituteOpen(false);
      }
      if (qualificationRef.current && !qualificationRef.current.contains(event.target as Node)) {
        setQualificationOpen(false);
        setQualificationSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    dispatch(getSpecializationList(null));
    dispatch(getInstituteList(null));
    dispatch(getQualificationList(null));
  }, [dispatch]);

  const handleSpecializationSelect = (id: number) => {
    setFormData((prev) => ({ ...prev, specialization_id: id }));
    setSpecializationOpen(false);
  };

  const handleInstituteSelect = (id: number) => {
    setFormData((prev) => ({ ...prev, institute_id: id }));
    setInstituteOpen(false);
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
        qualification_names: [...prev.qualification_names, newQualification.trim()],
      }));
      setNewQualification("");
    }
  };

  const handleRemoveSelectedQualification = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      qualification_ids: prev.qualification_ids.filter((qid) => qid !== id),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.full_name || !formData.phone || !formData.bmdc_number || !formData.experience) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.specialization_id) {
      setError("Please select a specialization");
      return;
    }

    if (!formData.institute_id) {
      setError("Please select an institute");
      return;
    }

    const payload = {
      full_name: formData.full_name,
      phone: formData.phone,
      bmdc_number: formData.bmdc_number,
      experience: formData.experience,
      consultation_fee: formData.consultation_fee || null,
      specialization_ids: [formData.specialization_id],
      institute_ids: [formData.institute_id],
      qualification_ids: formData.qualification_ids,
      qualification_names: formData.qualification_names,
    };

    dispatch(doctorCreate({ postData: payload, router: navigate }));
    dispatch(updateProfileCompletion("pending"));
  };

  // Derived selected items
  const selectedSpecialization = specializationList.find((s) => s.id === formData.specialization_id);
  const selectedInstitute = instituteList.find((i) => i.id === formData.institute_id);
  const selectedQualifications = qualificationList.filter((q) => formData.qualification_ids.includes(q.id));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help patients know more about you by completing your professional profile</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <FaIdCard className="text-blue-600" /> Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Full Name <span className="text-red-600">*</span></label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Dr. John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Phone <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., +880 1234 567890"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">BMDC Number <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.bmdc_number}
                      onChange={(e) => setFormData({ ...formData, bmdc_number: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., A-12345"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">Years of Experience <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Consultation Fee (Optional)</label>
                  <div className="relative">
                    <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={formData.consultation_fee}
                      onChange={(e) => setFormData({ ...formData, consultation_fee: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., 500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Specialization */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaStethoscope className="text-blue-600" /> Specialization <span className="text-red-600">*</span>
              </h2>
              <div className="relative" ref={specializationRef}>
                <button
                  type="button"
                  onClick={() => setSpecializationOpen(!specializationOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className={selectedSpecialization ? "text-gray-900" : "text-gray-400"}>
                    {selectedSpecialization?.name || "Select a specialization"}
                  </span>
                  <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${specializationOpen ? "rotate-180" : ""}`} />
                </button>

                {specializationOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {specializationList.map((spec) => (
                      <button
                        key={spec.id}
                        type="button"
                        onClick={() => handleSpecializationSelect(spec.id)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${formData.specialization_id === spec.id ? "bg-blue-50 text-blue-600" : "text-gray-900"}`}
                      >
                        {spec.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Institute */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaHospital className="text-blue-600" /> Institute/Hospital <span className="text-red-600">*</span>
              </h2>
              <div className="relative" ref={instituteRef}>
                <button
                  type="button"
                  onClick={() => setInstituteOpen(!instituteOpen)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <span className={selectedInstitute ? "text-gray-900" : "text-gray-400"}>
                    {selectedInstitute?.name || "Select an institute"}
                  </span>
                  <FaChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${instituteOpen ? "rotate-180" : ""}`} />
                </button>

                {instituteOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {instituteList.map((inst) => (
                      <button
                        key={inst.id}
                        type="button"
                        onClick={() => handleInstituteSelect(inst.id)}
                        className={`w-full px-4 py-3 text-left hover:bg-gray-50 ${formData.institute_id === inst.id ? "bg-blue-50" : ""}`}
                      >
                        <p className={`font-medium ${formData.institute_id === inst.id ? "text-blue-600" : "text-gray-900"}`}>{inst.name}</p>
                        {inst.address && <p className="text-sm text-gray-500">{inst.address}</p>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-blue-600" /> Qualifications
              </h2>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Select Existing Qualifications</h3>
                <div className="relative" ref={qualificationRef}>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={qualificationSearch}
                      onChange={(e) => setQualificationSearch(e.target.value)}
                      onFocus={() => setQualificationOpen(true)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search qualifications..."
                    />
                  </div>
                  {qualificationOpen && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {qualificationList
                        .filter((q) => q.name.toLowerCase().includes(qualificationSearch.toLowerCase()))
                        .map((qual) => (
                          <label key={qual.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.qualification_ids.includes(qual.id)}
                              onChange={() => handleQualificationToggle(qual.id)}
                              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="text-gray-900">{qual.name}</span>
                          </label>
                        ))}
                    </div>
                  )}
                </div>

                {selectedQualifications.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedQualifications.map((qual) => (
                      <div key={qual.id} className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        <span>{qual.name}</span>
                        <button type="button" onClick={() => handleRemoveSelectedQualification(qual.id)} className="hover:text-blue-900">
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Complete Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
