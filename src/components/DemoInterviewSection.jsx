import {
  FaLaptopCode,
  FaUserTie,
  FaClipboardCheck,
  FaChartLine,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function DemoInterviewSection() {
  const features = [
    {
      icon: <FaLaptopCode />,
      title: "Real Technical Interview",
      description:
        "Experience a live technical interview just like top product and service-based companies.",
    },
    {
      icon: <FaUserTie />,
      title: "Expert Interviewers",
      description:
        "Practice with experienced developers and recruiters who conduct real industry interviews.",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Detailed Feedback",
      description:
        "Receive personalized feedback on your communication, coding, and problem-solving skills.",
    },
    {
      icon: <FaChartLine />,
      title: "Boost Confidence",
      description:
        "Identify your weak areas, improve your performance, and attend real interviews with confidence.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <span className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full font-medium">
              <FaCalendarAlt />
              Mock Interview Program
            </span>

            <h2 className="text-5xl font-bold text-white mt-6 leading-tight">
              Practice Before Your
              <span className="text-emerald-400"> Real Interview</span>
            </h2>

            <p className="text-slate-400 text-lg mt-6 leading-8">
              Improve your interview skills by scheduling a one-on-one mock
              interview with experienced professionals. Get real interview
              experience, personalized feedback, resume suggestions, and
              practical tips to increase your chances of getting hired.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-10">

              <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
                <h3 className="text-3xl font-bold text-emerald-400">
                  30 Min
                </h3>
                <p className="text-slate-400 mt-2">
                  Live Mock Interview
                </p>
              </div>

              <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
                <h3 className="text-3xl font-bold text-emerald-400">
                  100%
                </h3>
                <p className="text-slate-400 mt-2">
                  Personalized Feedback
                </p>
              </div>

            </div>

            <div className="mt-10">

              <Link
                to="/book-interview"
                className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Schedule Demo Interview
                <FaArrowRight />
              </Link>

            </div>

          </div>

          {/* Right */}

          <div className="grid sm:grid-cols-2 gap-6">

            {features.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500 transition duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-2xl">
                  {item.icon}
                </div>

                <h3 className="text-white text-xl font-semibold mt-6">
                  {item.title}
                </h3>

                <p className="text-slate-400 mt-4 leading-7">
                  {item.description}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
} 



