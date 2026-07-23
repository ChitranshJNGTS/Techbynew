import {
  FaUserPlus,
  FaFileUpload,
  FaSearch,
  FaBriefcase,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaUserPlus />,
    title: "Create Account",
    desc: "Sign up in less than a minute and build your professional profile.",
  },
  {
    icon: <FaFileUpload />,
    title: "Upload Resume",
    desc: "Upload your latest resume so recruiters can easily find you.",
  },
  {
    icon: <FaSearch />,
    title: "Find Jobs",
    desc: "Search thousands of verified jobs using filters and keywords.",
  },
  {
    icon: <FaBriefcase />,
    title: "Get Hired",
    desc: "Apply instantly and connect directly with top employers.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">
          <span className="text-emerald-400 uppercase tracking-[4px] font-semibold">
            Process
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            How It Works
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Finding your dream job has never been easier. Follow these simple
            steps and get hired faster.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group bg-slate-950 rounded-3xl p-10 border border-slate-800 hover:border-emerald-500 transition duration-300 hover:-translate-y-2"
            >
              {/* Number */}
              <div className="absolute top-6 right-6 text-6xl font-bold text-slate-800 group-hover:text-emerald-900 transition">
                0{index + 1}
              </div>

              <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-4xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mt-8">
                {step.title}
              </h3>

              <p className="text-slate-400 mt-4 leading-7">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}