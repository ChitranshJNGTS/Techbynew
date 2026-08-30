import {
FaBriefcase,
FaBullseye,
FaRocket,
FaHandshake,
FaCheckCircle,
FaSearch,
FaBuilding,
FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import WhatWeDo from "../../components/WhatWeDo";

export default function About() {
const stats = [
{
number: "Daily",
title: "Job Updates",
},
{
number: "100+",
title: "Opportunities",
},
{
number: "Free",
title: "Job Search",
},
{
number: "24/7",
title: "Access",
},
];

const values = [
{
icon: <FaBullseye />,
title: "Our Mission",
description:
"Our mission is to make job searching simpler by bringing useful and updated job opportunities together in one easy-to-use platform.",
},
{
icon: <FaRocket />,
title: "Our Vision",
description:
"We want to become a trusted destination where job seekers can quickly discover opportunities and take the next step in their careers.",
},
{
icon: <FaHandshake />,
title: "Our Commitment",
description:
"We are committed to providing a simple, accessible, and useful platform that helps people discover employment opportunities.",
},
];

return (
<> <Navbar />


  <div className="bg-slate-950 text-white">

    {/* Hero */}

    <section className="relative overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-28 relative">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          <div>

            <span className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-2 rounded-full text-sm font-semibold">
              About TechBy
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mt-8 leading-tight">
              Find the Right
              <span className="text-emerald-400">
                {" "}Opportunity
              </span>
              <br />
              for Your Career
            </h1>

            <p className="text-slate-400 text-lg leading-8 mt-8 max-w-xl">
              TechBy is a job opportunity platform created to make
              job searching easier. We bring together updated job
              opportunities from companies, recruiters, and other
              reliable sources so job seekers can discover relevant
              opportunities in one place.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/jobs"
                className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-semibold flex items-center gap-3 transition"
              >
                Explore Jobs
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 px-8 py-4 rounded-xl font-semibold transition"
              >
                Contact Us
              </Link>

            </div>

          </div>

          {/* Stats */}

          <div className="grid grid-cols-2 gap-6">

            {stats.map((item) => (

              <div
                key={item.title}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-10 text-center hover:border-emerald-500 transition"
              >

                <h2 className="text-4xl md:text-5xl font-bold text-emerald-400">
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
              alt="People working together"
              className="rounded-3xl w-full object-cover"
            />

          </div>

          <div>

            <span className="text-emerald-400 font-semibold uppercase tracking-widest">
              Who We Are
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Making Job Searching Simple
            </h2>

            <p className="text-slate-400 mt-8 leading-8">
              TechBy was created with a simple goal: to make it easier
              for people to discover job opportunities without having
              to search across multiple platforms every day.
            </p>

            <p className="text-slate-400 mt-6 leading-8">
              We collect and publish job opportunities from companies,
              recruiters, and publicly available sources and organize
              them so users can easily browse available positions.
            </p>

            <div className="mt-10 space-y-5">

              {[
                "Updated Job Opportunities",
                "Easy Job Search",
                "Multiple Job Categories",
                "Simple and Clean Job Listings",
                "Free Access for Job Seekers",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
                    <FaCheckCircle className="text-emerald-400 text-sm" />
                  </div>

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

          <span className="text-emerald-400 font-semibold uppercase tracking-widest">
            What Drives Us
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Built to Help Job Seekers
          </h2>

          <p className="text-slate-400 mt-6 max-w-3xl mx-auto leading-8">
            We focus on making job discovery easier, faster, and more
            accessible for everyone looking for their next opportunity.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {values.map((item) => (

            <div
              key={item.title}
              className="bg-slate-950 rounded-3xl border border-slate-800 p-10 hover:border-emerald-500 transition"
            >

              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl">
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

    </section>

    {/* Why Choose Us */}

    <section className="py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <span className="text-emerald-400 font-semibold uppercase tracking-widest">
            Why Choose TechBy
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-5">
            A Simpler Way to Find Jobs
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto mt-6 leading-8">
            TechBy is designed to help you spend less time searching
            and more time discovering opportunities that match your
            career goals.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {[
            {
              icon: <FaBriefcase />,
              title: "Updated Jobs",
              desc: "Discover recently posted job opportunities from different companies and sources.",
            },
            {
              icon: <FaSearch />,
              title: "Easy Search",
              desc: "Find opportunities using job titles, keywords, categories, and other useful filters.",
            },
            {
              icon: <FaBuilding />,
              title: "Company Opportunities",
              desc: "Explore job openings from companies and recruiters looking for new talent.",
            },
            {
              icon: <FaRocket />,
              title: "Free to Browse",
              desc: "Browse available job opportunities on TechBy without needing a paid subscription.",
            },
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

    {/* What We Do */}

    <WhatWeDo />

  </div>

  <Footer />
</>


);
}
