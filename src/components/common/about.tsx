

export const About = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About MediConnect Pro</h2>
            <p className="text-gray-700 mb-4">MediConnect Pro connects patients, doctors, and clinics with fast, secure, and simple tools to manage appointments, prescriptions, and health records — all in one place.</p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <span className="mr-3 text-green-500">✔</span>
                <span className="text-gray-700">Book and manage appointments in seconds</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-green-500">✔</span>
                <span className="text-gray-700">Secure digital prescriptions and patient records</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-green-500">✔</span>
                <span className="text-gray-700">Tools for doctors, clinics, and admins</span>
              </li>
            </ul>

            <p className="text-gray-700 mb-6">Our mission is to make healthcare more accessible, efficient, and transparent through thoughtful technology and compassionate design.</p>

            <div className="flex gap-3">
              <a href="/#contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Contact Us</a>
              <a href="/auth" className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-4 rounded">Get Started</a>
            </div>
          </div>

          <div>
            <div className="rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-white p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What we value</h3>
              <div className="space-y-3 text-gray-700">
                <p><strong>Privacy:</strong> Patient data privacy is paramount.</p>
                <p><strong>Reliability:</strong> Robust, fast systems clinicians can trust.</p>
                <p><strong>Empathy:</strong> Designed to reduce friction for patients and providers.</p>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-500">Trusted by clinics and hospitals for streamlined workflows.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
