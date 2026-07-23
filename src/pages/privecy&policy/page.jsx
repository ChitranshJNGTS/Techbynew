import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>

            <p className="text-slate-400 max-w-3xl mx-auto mt-6 text-lg leading-8">
              Your privacy is important to us. This Privacy Policy explains how
              WorkScout collects, uses, stores, and protects your personal
              information when you use our Job Portal and Mock Interview
              Platform.
            </p>

            <p className="text-slate-500 mt-6">
              Last Updated: July 2026
            </p>

          </div>

          {/* Content */}

          <div className="space-y-8">

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                1. Information We Collect
              </h2>

              <p className="text-slate-300 leading-8">
                When you use WorkScout, we may collect personal information
                including your name, email address, phone number, resume,
                profile information, account credentials, payment details, and
                interview preferences. We may also collect technical
                information such as your IP address, browser type, operating
                system, and device information.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                2. How We Use Your Information
              </h2>

              <ul className="space-y-4 text-slate-300">

                <li>• Create and manage your account.</li>

                <li>• Display personalized job opportunities.</li>

                <li>• Schedule and conduct mock interviews.</li>

                <li>• Process secure payments.</li>

                <li>• Send interview confirmations and reminders.</li>

                <li>• Improve website performance and user experience.</li>

                <li>• Prevent fraud and maintain platform security.</li>

              </ul>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                3. Job Listings
              </h2>

              <p className="text-slate-300 leading-8">
                WorkScout manually collects and publishes publicly available
                job opportunities for informational purposes. We are not the
                employer unless explicitly mentioned. Users should verify job
                details directly with the recruiting company before applying.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                4. Mock Interview Services
              </h2>

              <p className="text-slate-300 leading-8">
                When booking a mock interview, we collect scheduling
                information, selected role, experience level, payment status,
                and communication details required to conduct the interview.
                Interview feedback remains confidential and is shared only with
                the respective candidate unless required by law.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                5. Cookies
              </h2>

              <p className="text-slate-300 leading-8">
                We use cookies and similar technologies to remember your login,
                improve website performance, understand user behavior, and
                personalize your experience. You can disable cookies from your
                browser settings, although some features may not function
                properly.
              </p>

            </div>

            {/* Section */}

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

              <h2 className="text-2xl font-bold text-white mb-5">
                6. Payments
              </h2>

              <p className="text-slate-300 leading-8">
                Payments for mock interviews are processed through trusted
                third-party payment providers. WorkScout does not store your
                debit card, credit card, UPI PIN, CVV, or banking passwords on
                its servers.
              </p>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}