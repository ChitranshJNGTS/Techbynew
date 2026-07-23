import {
  FaUsers,
  FaBriefcase,
  FaBullseye,
  FaRocket,
  FaAward,
  FaHandshake,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import WhatWeDo from "../../components/WhatWeDo";

export default function About() {
  const stats = [
    {
      number: "15K+",
      title: "Active Jobs",
    },
    {
      number: "5K+",
      title: "Companies",
    },
    {
      number: "120K+",
      title: "Candidates",
    },
    {
      number: "98%",
      title: "Success Rate",
    },
  ];

  const values = [
    {
      icon: <FaBullseye />,
      title: "Our Mission",
      description:
        "Our mission is to connect talented professionals with the best companies while simplifying the hiring process for everyone.",
    },
    {
      icon: <FaRocket />,
      title: "Our Vision",
      description:
        "To become India's most trusted career platform where every job seeker finds the right opportunity and every employer finds the right talent.",
    },
    {
      icon: <FaHandshake />,
      title: "Our Commitment",
      description:
        "We believe every candidate deserves equal opportunities and every company deserves skilled professionals.",
    },
  ];

  return (
  <>
  <Navbar/>
    <div className="bg-slate-950 text-white">

      {/* Hero */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 py-28 relative">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <span className="bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-full">
                About Our Platform
              </span>

              <h1 className="text-6xl font-bold mt-8 leading-tight">
                Connecting
                <span className="text-emerald-400">
                  {" "}Talent
                </span>
                <br />
                With Opportunities
              </h1>

              <p className="text-slate-400 text-lg leading-8 mt-8">
                We are building a next-generation job portal where
                candidates can discover amazing careers, employers can
                hire quality talent, and professionals can prepare for
                interviews through our Mock Interview Program.
              </p>

              <div className="flex flex-wrap gap-5 mt-10">

                <Link
                  to="/jobs"
                  className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-semibold flex items-center gap-3"
                >
                  Browse Jobs
                  <FaArrowRight />
                </Link>

                <Link
                  to="/schedule-demo"
                  className="border border-slate-700 hover:border-emerald-500 px-8 py-4 rounded-xl"
                >
                  Mock Interview
                </Link>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-6">

              {stats.map((item) => (

                <div
                  key={item.title}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center hover:border-emerald-500 transition"
                >

                  <h2 className="text-5xl font-bold text-emerald-400">
                    {item.number}
                  </h2>

                  <p className="text-slate-400 mt-4">
                    {item.title}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Who We Are */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>

              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200"
                alt=""
                className="rounded-3xl"
              />

            </div>

            <div>

              <h2 className="text-5xl font-bold">
                Who We Are
              </h2>

              <p className="text-slate-400 mt-8 leading-8">
                Our platform was created with a simple vision—to make job
                searching and hiring easier, faster, and smarter.
              </p>

              <p className="text-slate-400 mt-6 leading-8">
                Whether you are a fresher looking for your first job,
                an experienced professional planning your next career move,
                or a company searching for skilled employees,
                we provide the tools to help you succeed.
              </p>

              <div className="mt-10 space-y-5">

                {[
                  "Verified Companies",
                  "Daily Job Updates",
                  "Free Resume Builder",
                  "Mock Interviews",
                  "Career Guidance",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >

                    <FaCheckCircle className="text-emerald-400" />

                    <span className="text-slate-300">
                      {item}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Our Values */}

      <section className="py-24 bg-slate-900">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold">
              What Drives Us
            </h2>

            <p className="text-slate-400 mt-6 max-w-3xl mx-auto">
              We believe in innovation, transparency, and creating
              opportunities for everyone.
            </p>

          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-20">

            {values.map((item) => (

              <div
                key={item.title}
                className="bg-slate-950 rounded-3xl border border-slate-800 p-10 hover:border-emerald-500 transition"
              >

                <div className="w-16 h-16 rounded-xl bg-emerald-500 flex items-center justify-center text-2xl">

                  {item.icon}

                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {item.title}
                </h3>

                <p className="text-slate-400 leading-8 mt-5">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>      {/* Why Choose Us */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="text-emerald-400 font-semibold uppercase tracking-widest">
              Why Choose Us
            </span>

            <h2 className="text-5xl font-bold mt-5">
              Everything You Need to Build Your Career
            </h2>

            <p className="text-slate-400 max-w-3xl mx-auto mt-6 leading-8">
              Our platform is designed to help candidates prepare, apply,
              learn, and grow while helping recruiters hire the best talent
              quickly.
            </p>

          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

            {[
              {
                icon: <FaBriefcase />,
                title: "Verified Jobs",
                desc: "Thousands of verified opportunities from trusted companies."
              },
              {
                icon: <FaUsers />,
                title: "Expert Mentors",
                desc: "Learn from professionals with years of industry experience."
              },
              {
                icon: <FaAward />,
                title: "Mock Interviews",
                desc: "Practice real interviews and receive detailed feedback."
              },
              {
                icon: <FaRocket />,
                title: "Career Growth",
                desc: "Upskill yourself and prepare for better opportunities."
              }
            ].map((item) => (

              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-emerald-500 hover:-translate-y-2 transition duration-300"
              >

                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 flex items-center justify-center text-3xl">

                  {item.icon}

                </div>

                <h3 className="text-2xl font-semibold mt-8">
                  {item.title}
                </h3>

                <p className="text-slate-400 mt-5 leading-7">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

  
{/* {what we do} */}
<WhatWeDo/>

    </div>
    <Footer />
    </>
  );
}