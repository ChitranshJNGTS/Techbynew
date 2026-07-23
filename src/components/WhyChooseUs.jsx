import {
  FaCheckCircle,
  FaUsers,
  FaBuilding,
  FaRocket,
  FaShieldAlt,
  FaBell,
} from "react-icons/fa";

const features = [
  "Verified Companies",
  "50,000+ Active Jobs",
  "One Click Apply",
  "AI Resume Matching",
  "Instant Job Alerts",
  "100% Secure Platform",
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}

          <div>

            <span className="text-emerald-400 uppercase tracking-[4px] font-semibold">
              Why Choose Us
            </span>

            <h2 className="text-5xl font-bold text-white mt-4 leading-tight">
              The Smarter Way to
              <br />
              Find Your Next Job
            </h2>

            <p className="text-slate-400 mt-6 leading-8">
              We connect talented professionals with trusted companies through
              an easy, secure, and intelligent hiring platform.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-12">

              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-emerald-500 transition"
                >
                  <FaCheckCircle className="text-emerald-400 text-xl" />

                  <span className="text-white font-medium">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            <button  className="mt-12 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition">
              Explore Jobs
            </button>

          </div>

          {/* Right */}

          <div className="grid grid-cols-2 gap-6">

            <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800 hover:border-emerald-500 transition">

              <FaUsers className="mx-auto text-5xl text-emerald-400 mb-5" />

              <h3 className="text-4xl font-bold text-white">120K+</h3>

              <p className="text-slate-400 mt-2">
                Registered Candidates
              </p>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800 hover:border-emerald-500 transition">

              <FaBuilding className="mx-auto text-5xl text-emerald-400 mb-5" />

              <h3 className="text-4xl font-bold text-white">15K+</h3>

              <p className="text-slate-400 mt-2">
                Trusted Companies
              </p>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800 hover:border-emerald-500 transition">

              <FaRocket className="mx-auto text-5xl text-emerald-400 mb-5" />

              <h3 className="text-4xl font-bold text-white">95%</h3>

              <p className="text-slate-400 mt-2">
                Hiring Success
              </p>

            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800 hover:border-emerald-500 transition">

              <FaShieldAlt className="mx-auto text-5xl text-emerald-400 mb-5" />

              <h3 className="text-4xl font-bold text-white">100%</h3>

              <p className="text-slate-400 mt-2">
                Secure Platform
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}