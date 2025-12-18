import { useState } from "react"
import { useAppDispatch } from "../../store/hooks"
import { updateProfileCompletion } from "../../store/slices/auth-slice"
import { FaStethoscope, FaGraduationCap, FaHospital, FaIdCard, FaClock, FaDollarSign, FaPhone, FaBuilding } from "react-icons/fa"
import { useNavigate } from "react-router"
import { doctorCreate } from "../../store/API/doctorApi"

export default function DoctorProfileCompletion() {
  const [formData, setFormData] = useState({
    full_name: "",
    specialization: "",
    phone: "",
    chamber: "",
    institute: "",
    bmdcNumber: "",
    experience: "",
    qualifications: "",
    consultationFee: "",
  })
  const [error, setError] = useState("")
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.full_name || !formData.specialization || !formData.institute || !formData.bmdcNumber || !formData.experience) {
      setError("Please fill in all required fields")
      return
    }

    // Save profile
    dispatch(doctorCreate({postData: formData, router: navigate}))
    dispatch(updateProfileCompletion("pending"))

    // Navigate to doctor dashboard
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Help patients know more about you by completing your professional profile
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="full_name"
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Dr. John Doe"
                  />
                </div>
              </div>

              {/* Specialization */}
              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-foreground mb-2">
                  Specialization <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <FaStethoscope className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Cardiology"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="phone"
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., +880 1234 567890"
                  />
                </div>
              </div>

              {/* Chamber */}
              <div>
                <label htmlFor="chamber" className="block text-sm font-medium text-foreground mb-2">
                  Chamber
                </label>
                <div className="relative">
                  <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="chamber"
                    type="text"
                    value={formData.chamber}
                    onChange={(e) => setFormData({ ...formData, chamber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., Room 101, ABC Clinic"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="institute" className="block text-sm font-medium text-foreground mb-2">
                  Institute/Hospital <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <FaHospital className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="institute"
                    type="text"
                    value={formData.institute}
                    onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., City General Hospital"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bmdcNumber" className="block text-sm font-medium text-foreground mb-2">
                  BMDC Number <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="bmdcNumber"
                    type="text"
                    value={formData.bmdcNumber}
                    onChange={(e) => setFormData({ ...formData, bmdcNumber: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., A-12345"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                  Years of Experience <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <FaClock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="experience"
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., 10 years"
                  />
                </div>
              </div>

              {/* Consultation Fee */}
              <div>
                <label htmlFor="consultationFee" className="block text-sm font-medium text-foreground mb-2">
                  Consultation Fee (Optional)
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    id="consultationFee"
                    type="text"
                    value={formData.consultationFee}
                    onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="e.g., $50"
                  />
                </div>
              </div>

              {/* Qualifications */}
              <div className="md:col-span-2">
                <label htmlFor="qualifications" className="block text-sm font-medium text-foreground mb-2">
                  Qualifications (Optional)
                </label>
                <div className="relative">
                  <FaGraduationCap className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                  <textarea
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring min-h-[100px]"
                    placeholder="e.g., MBBS, MD (Cardiology), Fellow of American College of Cardiology"
                  />
                </div>
              </div>
            </div>

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
  )
}
