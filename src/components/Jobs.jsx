import { useMemo, useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaBookmark,
  FaFilter,
  FaBuilding,
} from "react-icons/fa";

const jobsData = [
  {
    id: 1,
    company: "Google",
    logo: "https://logo.clearbit.com/google.com",
    title: "Senior React Developer",
    location: "Bangalore",
    salary: "₹18 - ₹28 LPA",
    type: "Full Time",
    mode: "Remote",
    experience: "3+ Years",
    posted: "2 Days Ago",
    featured: true,
  },
  {
    id: 2,
    company: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    title: "Node.js Developer",
    location: "Hyderabad",
    salary: "₹16 - ₹25 LPA",
    type: "Full Time",
    mode: "Hybrid",
    experience: "2+ Years",
    posted: "1 Day Ago",
    featured: false,
  },
  {
    id: 3,
    company: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    title: "Frontend Engineer",
    location: "Pune",
    salary: "₹20 - ₹35 LPA",
    type: "Remote",
    mode: "Remote",
    experience: "4+ Years",
    posted: "3 Days Ago",
    featured: true,
  },
  {
    id: 4,
    company: "Adobe",
    logo: "https://logo.clearbit.com/adobe.com",
    title: "UI/UX Designer",
    location: "Noida",
    salary: "₹10 - ₹16 LPA",
    type: "Full Time",
    mode: "Office",
    experience: "1+ Year",
    posted: "Today",
    featured: false,
  },
  {
    id: 5,
    company: "Netflix",
    logo: "https://logo.clearbit.com/netflix.com",
    title: "Backend Engineer",
    location: "Remote",
    salary: "₹30 - ₹45 LPA",
    type: "Remote",
    mode: "Remote",
    experience: "5+ Years",
    posted: "5 Days Ago",
    featured: true,
  },
  {
    id: 6,
    company: "TCS",
    logo: "https://logo.clearbit.com/tcs.com",
    title: "React Developer",
    location: "Indore",
    salary: "₹5 - ₹8 LPA",
    type: "Full Time",
    mode: "Office",
    experience: "Fresher",
    posted: "Today",
    featured: false,
  },
  {
    id: 7,
    company: "Infosys",
    logo: "https://logo.clearbit.com/infosys.com",
    title: "Java Developer",
    location: "Chennai",
    salary: "₹7 - ₹12 LPA",
    type: "Full Time",
    mode: "Hybrid",
    experience: "2+ Years",
    posted: "Yesterday",
    featured: false,
  },
  {
    id: 8,
    company: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    title: "Full Stack Developer",
    location: "Mumbai",
    salary: "₹10 - ₹18 LPA",
    type: "Full Time",
    mode: "Hybrid",
    experience: "2+ Years",
    posted: "3 Days Ago",
    featured: true,
  },
];

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company.toLowerCase().includes(search.toLowerCase());

      const matchesLocation =
        location === "" ||
        job.location.toLowerCase().includes(location.toLowerCase());

      const matchesType =
        jobType === "All" || job.type === jobType;

      return matchesSearch && matchesLocation && matchesType;
    });
  }, [search, location, jobType]);

  return (
    <section className="bg-slate-950 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-5">

        {/* Header */}

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white">
            Browse Jobs
          </h1>

          <p className="text-slate-400 mt-4">
            Find your next opportunity from thousands of verified companies.
          </p>
        </div>

        {/* Search */}

        <div className="bg-slate-900 rounded-2xl p-5 mb-10 border border-slate-800">

          <div className="grid lg:grid-cols-4 gap-4">

            <div className="relative">
              <FaSearch className="absolute left-4 top-4 text-slate-400" />
              <input
                className="w-full bg-slate-950 rounded-xl py-3 pl-12 pr-4 text-white outline-none border border-slate-700 focus:border-emerald-500"
                placeholder="Job title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-400" />
              <input
                className="w-full bg-slate-950 rounded-xl py-3 pl-12 pr-4 text-white outline-none border border-slate-700 focus:border-emerald-500"
                placeholder="Location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded-xl px-4 text-white"
            >
              <option>All</option>
              <option>Full Time</option>
              <option>Remote</option>
            </select>

            <button className="bg-emerald-500 rounded-xl text-white font-semibold hover:bg-emerald-600 transition">
              Search Jobs
            </button>

          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 h-fit sticky top-24">

            <h2 className="text-white text-xl font-semibold flex items-center gap-2">
              <FaFilter />
              Filters
            </h2>

            <div className="mt-8 space-y-6">

              <div>
                <h3 className="text-white mb-3">Experience</h3>

                {["Fresher","1+ Years","2+ Years","3+ Years","5+ Years"].map((exp)=>(
                  <label key={exp} className="flex items-center gap-2 text-slate-300 mb-2">
                    <input type="checkbox"/>
                    {exp}
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-white mb-3">Work Mode</h3>

                {["Remote","Hybrid","Office"].map((mode)=>(
                  <label key={mode} className="flex items-center gap-2 text-slate-300 mb-2">
                    <input type="checkbox"/>
                    {mode}
                  </label>
                ))}
              </div>

            </div>

          </div>

          {/* Jobs */}

          <div className="lg:col-span-3">

            <div className="flex justify-between mb-6">
              <h2 className="text-white text-2xl font-bold">
                {filteredJobs.length} Jobs Found
              </h2>

              <select className="bg-slate-900 text-white rounded-xl px-4 py-2 border border-slate-700">
                <option>Newest</option>
                <option>Highest Salary</option>
                <option>Relevant</option>
              </select>
            </div>

            <div className="space-y-6">

              {filteredJobs.map((job)=>(
                <div
                  key={job.id}
                  className="bg-slate-900 rounded-2xl border border-slate-800 hover:border-emerald-500 transition p-6"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-6">

                    <div className="flex gap-5">

                      <img
                        src={job.logo}
                        className="w-20 h-20 bg-white rounded-xl p-3 object-contain"
                      />

                      <div>

                        <div className="flex items-center gap-3">

                          <h3 className="text-2xl font-bold text-white">
                            {job.title}
                          </h3>

                          {job.featured && (
                            <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                              Featured
                            </span>
                          )}                        </div>

                        <div className="flex flex-wrap gap-5 mt-4 text-slate-400">

                          <span className="flex items-center gap-2">
                            <FaBuilding />
                            {job.company}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt />
                            {job.location}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaMoneyBillWave />
                            {job.salary}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaBriefcase />
                            {job.type}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaClock />
                            {job.posted}
                          </span>

                        </div>

                        <div className="flex flex-wrap gap-3 mt-5">

                          <span className="px-3 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 text-sm">
                            {job.mode}
                          </span>

                          <span className="px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-sm">
                            {job.experience}
                          </span>

                        </div>

                      </div>

                    </div>

                    {/* Right Side */}

                    <div className="flex flex-col justify-between items-end">

                      <button className="text-slate-400 hover:text-yellow-400 text-xl">
                        <FaBookmark />
                      </button>

                      <button className="mt-10 bg-emerald-500 hover:bg-emerald-600 transition text-white px-8 py-3 rounded-xl font-semibold">
                        Apply Now
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* Pagination */}

            <div className="flex justify-center gap-3 mt-12">

              <button className="w-11 h-11 rounded-xl bg-slate-900 text-white hover:bg-emerald-500 transition">
                1
              </button>

              <button className="w-11 h-11 rounded-xl bg-slate-900 text-white hover:bg-emerald-500 transition">
                2
              </button>

              <button className="w-11 h-11 rounded-xl bg-slate-900 text-white hover:bg-emerald-500 transition">
                3
              </button>

              <button className="w-11 h-11 rounded-xl bg-slate-900 text-white hover:bg-emerald-500 transition">
                4
              </button>

              <button className="px-5 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition">
                Next
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}