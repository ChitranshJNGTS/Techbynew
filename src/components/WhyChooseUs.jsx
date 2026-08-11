
import {
  FaCheckCircle,
  FaUsers,
  FaBuilding,
  FaRocket,
  FaShieldAlt,
  FaBell,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const features = [
  "Verified Job Opportunities",
  "Easy & Fast Applications",
  "Direct Recruiter Connection",
  "Mock Interview Preparation",
  "Personalized Job Alerts",
  "Secure Candidate Profiles",
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left */}
          <div>

            <span className="text-emerald-400 uppercase tracking-[4px] font-semibold">
              Why Choose Workscout
            </span>

            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
              Start Your Career
              <br />
              With the Right Opportunity
            </h2>

            <p className="text-slate-400 mt-6 leading-8 max-w-xl">
              Workscout is built to make job searching simpler and more
              effective. Discover relevant opportunities, connect with
              recruiters, and prepare yourself for your next interview.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">

              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-emerald-500 transition"
                >
                  <FaCheckCircle className="text-emerald-400 text-xl shrink-0" />

                  <span className="text-white font-medium">
                    {item}
                  </span>
                </div>
              ))}

            </div>

            <Link
              to="/all-jobs"
              className="inline-flex mt-10 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition"
            >
              Explore Jobs
            </Link>

          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-5">

            {/* Card 1 */}
            <div className="bg-slate-900 rounded-3xl p-7 text-center border border-slate-800 hover:border-emerald-500 transition">
              <FaUsers className="mx-auto text-4xl text-emerald-400 mb-5" />

              <h3 className="text-2xl font-bold text-white">
                Candidates
              </h3>

              <p className="text-slate-400 mt-2">
                Build your profile and discover suitable opportunities
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900 rounded-3xl p-7 text-center border border-slate-800 hover:border-emerald-500 transition">
              <FaBuilding className="mx-auto text-4xl text-emerald-400 mb-5" />

              <h3 className="text-2xl font-bold text-white">
                Recruiters
              </h3>

              <p className="text-slate-400 mt-2">
                Connect with companies and hiring professionals
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-900 rounded-3xl p-7 text-center border border-slate-800 hover:border-emerald-500 transition">
              <FaRocket className="mx-auto text-4xl text-emerald-400 mb-5" />

              <h3 className="text-2xl font-bold text-white">
                Career Growth
              </h3>

              <p className="text-slate-400 mt-2">
                Improve your skills and prepare for upcoming interviews
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-900 rounded-3xl p-7 text-center border border-slate-800 hover:border-emerald-500 transition">
              <FaShieldAlt className="mx-auto text-4xl text-emerald-400 mb-5" />

              <h3 className="text-2xl font-bold text-white">
                Secure Platform
              </h3>

              <p className="text-slate-400 mt-2">
                Your profile and application details stay protected
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

