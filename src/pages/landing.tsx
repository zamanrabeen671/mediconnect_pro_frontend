import { FaUserMd, FaUser, FaShieldAlt, FaCalendarCheck, FaHeartbeat } from "react-icons/fa"
import { Link } from "react-router"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            Modern Healthcare Management Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty leading-relaxed">
            Connecting patients with healthcare professionals seamlessly. Manage appointments, consultations, and
            medical records all in one place.
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg text-lg font-medium hover:bg-accent/90 transition-colors"
          >
            Start Your Journey
            <FaHeartbeat className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Built for Everyone in Healthcare</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* For Patients */}
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <FaUser className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">For Patients</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li>• Book appointments instantly</li>
                <li>• Access medical history</li>
                <li>• Connect with verified doctors</li>
                <li>• Manage prescriptions</li>
              </ul>
            </div>

            {/* For Doctors */}
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <FaUserMd className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">For Doctors</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li>• Manage appointments efficiently</li>
                <li>• Access patient records</li>
                <li>• Virtual consultation support</li>
                <li>• Professional verification</li>
              </ul>
            </div>

            {/* For Admins */}
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <FaShieldAlt className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">For Admins</h3>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li>• Approve doctor registrations</li>
                <li>• Monitor platform activity</li>
                <li>• Manage user accounts</li>
                <li>• Generate reports</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto bg-primary text-primary-foreground rounded-2xl p-12">
          <FaCalendarCheck className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Healthcare?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90 leading-relaxed">
            Join thousands of healthcare professionals and patients already using MediConnect Pro
          </p>
          <Link
            to="/sign-up"
            className="inline-block px-8 py-4 bg-card text-foreground rounded-lg text-lg font-medium hover:bg-card/90 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </section>
    </div>
  )
}
