
import { FaHourglassHalf, FaEnvelope } from "react-icons/fa";

export const PendingDoctor = () => {
  return (
    <section className="w-full mx-auto my-12 px-6">
      <div className="bg-gray-200 text-black-200 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0 bg-white/10 rounded-full p-4">
            <FaHourglassHalf className="text-black-400" size={36} />
          </div>

          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight">Profile Under Review</h3>
            <p className="mt-2 text-sm md:text-base text-black/90">Thank you for registering. Our team is reviewing your profile and will approve it shortly. You will receive an email when your account is activated.</p>

            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
              <a
                href="mailto:support@example.com"
                className="inline-flex items-center gap-2 bg-white text-cyan-700 font-medium px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <FaEnvelope /> Contact Support
              </a>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center border border-white/30 text-black-400 px-4 py-2 rounded-lg hover:bg-white/5 transition"
              >
                Refresh Status
              </button>
            </div>
          </div>

          <div className="hidden md:block pl-6">
            <div className="w-36 h-36 bg-white/5 rounded-lg flex items-center justify-center">
              <svg className="w-20 h-20 text-black/90" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3v9l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PendingDoctor;
