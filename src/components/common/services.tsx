


const services = [
	{
		title: 'Easy Appointments',
		desc: 'Search, book, and manage appointments with doctors and clinics in a few clicks.',
		icon: (
			<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
		),
	},
	{
		title: 'Digital Prescriptions',
		desc: 'Issue and receive secure prescriptions that integrate with patient records.',
		icon: (
			<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 7h10M7 17h10"></path></svg>
		),
	},
	{
		title: 'Patient Records',
		desc: 'Securely store and share patient records with role-based access controls.',
		icon: (
			<svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c2.21 0 4-1.79 4-4S14.21 3 12 3 8 4.79 8 7s1.79 4 4 4z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"></path></svg>
		),
	},
	{
		title: 'Clinic Scheduling',
		desc: 'Optimized schedules for clinics and doctors to reduce waiting times.',
		icon: (
			<svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
		),
	},
	{
		title: 'Teleconsultation',
		desc: 'Secure video consultations for remote patient care.',
		icon: (
			<svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l5-5H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2h-1l-5 5z"></path></svg>
		),
	},
	{
		title: 'Secure Data',
		desc: 'Encryption and secure hosting to maintain patient confidentiality.',
		icon: (
			<svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c1.657 0 3-1.343 3-3V6a3 3 0 10-6 0v2c0 1.657 1.343 3 3 3z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11v6a4 4 0 004 4h6a4 4 0 004-4v-6"></path></svg>
		),
	},
]

export const Services = () => {
	return (
		<section className="py-12 bg-gray-50">
			<div className="max-w-6xl mx-auto px-6">
				<div className="text-center mb-10">
					<h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
					<p className="text-gray-600 mt-2">Comprehensive tools to streamline healthcare for patients, doctors, and clinics.</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{services.map((s) => (
						<div key={s.title} className="bg-white rounded-lg p-6 shadow hover:shadow-md transition">
							<div className="flex items-center mb-4">
								<div className="mr-4">{s.icon}</div>
								<h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
							</div>
							<p className="text-gray-600">{s.desc}</p>
						</div>
					))}
				</div>

				<div className="mt-10 flex justify-center gap-4">
					<a href="/features" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded">Explore Features</a>
					<a href="/auth" className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-5 rounded">Get Started</a>
				</div>
			</div>
		</section>
	)
}

export default Services

