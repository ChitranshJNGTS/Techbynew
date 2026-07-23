import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsAndConditions() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-950 min-h-screen pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">

          {/* Hero */}

          <div className="text-center mb-16">

            <span className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              Legal Information
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-white">
              Terms & Conditions
            </h1>

            <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg leading-8">
              Please read these Terms & Conditions carefully before using
              WorkScout. By accessing our website, creating an account,
              applying for jobs, or booking mock interview services, you
              agree to be bound by these terms.
            </p>

            <p className="text-slate-500 mt-6">
              Last Updated: July 2026
            </p>

          </div>

          <div className="space-y-8">

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                1. Acceptance of Terms
              </h2>

              <p className="text-slate-300 leading-8">
                By accessing or using WorkScout, you acknowledge that you
                have read, understood, and agreed to these Terms &
                Conditions. If you do not agree with any part of these
                terms, you must discontinue using our platform.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                2. Eligibility
              </h2>

              <p className="text-slate-300 leading-8">
                You must be at least 18 years old or have legal authority
                to enter into binding agreements in your jurisdiction. By
                using WorkScout, you confirm that all information provided
                by you is accurate and truthful.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                3. User Accounts
              </h2>

              <p className="text-slate-300 leading-8">
                Users are responsible for maintaining the confidentiality
                of their login credentials and all activities performed
                using their account. WorkScout reserves the right to
                suspend or terminate accounts involved in suspicious,
                fraudulent, or abusive activities.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                4. Job Listings
              </h2>

              <p className="text-slate-300 leading-8">
                WorkScout manually publishes publicly available job
                opportunities from various sources for informational
                purposes. We are not the employer unless explicitly stated.
                Users are advised to verify all job information directly
                with the respective employer before applying.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                5. Mock Interview Services
              </h2>

              <p className="text-slate-300 leading-8">
                WorkScout offers paid mock interview sessions conducted by
                experienced interviewers. These sessions are intended only
                for interview preparation and educational purposes. Booking
                a mock interview does not guarantee employment, interview
                selection, or job placement.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                6. Booking & Scheduling
              </h2>

              <ul className="space-y-4 text-slate-300">

                <li>• Users must select an available interview slot.</li>

                <li>• Booking is confirmed only after successful payment.</li>

                <li>• Meeting details will be shared through registered email.</li>

                <li>• Users should join the interview on time.</li>

                <li>• Late arrival may reduce the interview duration.</li>

              </ul>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                7. Payments
              </h2>

              <p className="text-slate-300 leading-8">
                All payments must be completed before the interview is
                scheduled. Payment processing is handled through trusted
                third-party payment gateways. WorkScout does not store
                sensitive banking information such as debit card PIN,
                credit card CVV, or UPI PIN.
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}