import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaFire,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";
import API from "../Api/JobApi";

const badgeColor = (tag) => {
  switch (tag) {
    case "Full Time":
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";

    case "Part Time":
      return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

    case "Internship":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";

    case "Remote":
      return "bg-purple-500/10 text-purple-400 border-purple-500/20";

    case "Hybrid":
      return "bg-green-500/10 text-green-400 border-green-500/20";

    case "Office":
      return "bg-red-500/10 text-red-400 border-red-500/20";

    default:
      return "bg-slate-700 text-slate-300 border-slate-600";
  }
};

export default function HotJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchHotJobs();
  }, []);

  const fetchHotJobs = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/jobs");

      console.log("HOT JOBS RESPONSE:", data);

      if (data.success && Array.isArray(data.jobs)) {
        /*
         * First try to find jobs that have salary information.
         */
        const highSalaryJobs = [...data.jobs]
          .filter(
            (job) =>
              job.salaryMax !== undefined &&
              job.salaryMax !== null &&
              Number(job.salaryMax) > 0
          )
          .sort(
            (a, b) =>
              Number(b.salaryMax) - Number(a.salaryMax)
          )
          .slice(0, 10);

        /*
         * If there are no jobs with salary,
         * show the latest available jobs instead.
         */
        if (highSalaryJobs.length > 0) {
          setJobs(highSalaryJobs);
        } else {
          setJobs(data.jobs.slice(0, 10));
        }
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error(
        "Hot Jobs Error:",
        error.response?.data || error.message
      );

      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    if (jobs.length === 0) return;

    setCurrentIndex((prev) =>
      prev >= jobs.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (jobs.length === 0) return;

    setCurrentIndex((prev) =>
      prev <= 0 ? jobs.length - 1 : prev - 1
    );
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="h-10 w-64 bg-slate-800 rounded-lg animate-pulse mb-10" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-80 bg-slate-900 border border-slate-800 rounded-3xl animate-pulse"
              />
            ))}
          </div>

        </div>
      </section>
    );
  }

  // ==========================================
  // NO JOBS
  // ==========================================

  if (!jobs.length) {
    return (
      <section className="bg-slate-950 py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-10 md:p-16 text-center">

            {/* Icon */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
              <FaBriefcase className="text-emerald-400 text-3xl" />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              No Jobs Available Right Now
            </h2>

            {/* Description */}
            <p className="text-slate-400 max-w-2xl mx-auto mt-4 leading-7">
              We couldn't find any job openings at the moment.
              Don't worry — new opportunities are added regularly.
              Check back soon or explore all available jobs.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

              <Link
                to="/all-jobs"
                className="inline-flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                <FaSearch />
                Browse All Jobs
              </Link>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-7 py-3 rounded-xl font-semibold transition"
              >
                Back to Home
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </div>
      </section>
    );
  }

  const job = jobs[currentIndex];

  return (
    <section className="bg-slate-950 py-10 md:py-0">

      <div className="max-w-7xl mx-auto px-6">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          <div>

            <div className="flex items-center gap-3">

              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <FaFire className="text-red-500 text-xl" />
              </div>

              <div>

                <h2 className="text-4xl font-bold text-white">
                  Hot Jobs
                </h2>

                <p className="text-slate-400 mt-1">
                  Top-paying opportunities available right now
                </p>

              </div>

            </div>

          </div>

          {/* Navigation */}

          {jobs.length > 1 && (
            <div className="flex items-center gap-3">

              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-xl border border-slate-700 bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-xl border border-slate-700 bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-500 hover:border-emerald-500 transition"
              >
                <FaChevronRight />
              </button>

            </div>
          )}

        </div>

        {/* ==========================================
            JOB CARD
        ========================================== */}

        <div className="relative">

          <div
            key={job._id}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-emerald-500 rounded-3xl overflow-hidden transition duration-500"
          >

            <div className="p-8">

              {/* Top */}

              <div className="flex flex-col md:flex-row justify-between gap-6">

                <div className="flex gap-5">

                  <img
                    src={
                      job.companyLogo ||
                      "https://via.placeholder.com/100"
                    }
                    alt={job.companyName || "Company"}
                    className="w-20 h-20 rounded-2xl bg-white object-contain p-3"
                  />

                  <div>

                    <div className="flex items-center gap-3 flex-wrap">

                      <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-1">
                        <FaFire />
                        HOT JOB
                      </span>

                      {job.urgentHiring && (
                        <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold">
                          Urgent Hiring
                        </span>
                      )}

                    </div>

                    <h3 className="text-3xl font-bold text-white mt-4">
                      {job.jobTitle}
                    </h3>

                    <p className="text-emerald-400 text-lg mt-2 font-medium">
                      {job.companyName}
                    </p>

                  </div>

                </div>

                {/* Salary */}

                <div className="md:text-right">

                  <p className="text-slate-500 text-sm">
                    Salary Up To
                  </p>

                  <p className="text-emerald-400 text-3xl font-extrabold mt-1">
                    {job.salaryMax
                      ? `₹${Number(
                          job.salaryMax
                        ).toLocaleString()}`
                      : "Not specified"}
                  </p>

                  {job.salaryMax && (
                    <p className="text-slate-500 text-sm">
                      per year
                    </p>
                  )}

                </div>

              </div>

              {/* Details */}

              <div className="grid md:grid-cols-3 gap-4 mt-8">

                {/* Location */}

                <div className="bg-slate-800/60 rounded-xl p-4">

                  <div className="flex items-center gap-3 text-slate-400">

                    <FaMapMarkerAlt className="text-emerald-400" />

                    <span>
                      Location
                    </span>

                  </div>

                  <p className="text-white font-semibold mt-2">

                    {job.city || "Remote"}

                    {job.state
                      ? `, ${job.state}`
                      : ""}

                  </p>

                </div>

                {/* Experience */}

                <div className="bg-slate-800/60 rounded-xl p-4">

                  <div className="flex items-center gap-3 text-slate-400">

                    <FaBriefcase className="text-emerald-400" />

                    <span>
                      Experience
                    </span>

                  </div>

                  <p className="text-white font-semibold mt-2">
                    {job.experience || "Not specified"}
                  </p>

                </div>

                {/* Salary Range */}

                <div className="bg-slate-800/60 rounded-xl p-4">

                  <div className="flex items-center gap-3 text-slate-400">

                    <FaMoneyBillWave className="text-emerald-400" />

                    <span>
                      Salary Range
                    </span>

                  </div>

                  <p className="text-white font-semibold mt-2">

                    {job.salaryMin && job.salaryMax
                      ? `₹${Number(
                          job.salaryMin
                        ).toLocaleString()} - ₹${Number(
                          job.salaryMax
                        ).toLocaleString()}`
                      : "Not specified"}

                  </p>

                </div>

              </div>

              {/* Tags */}

              <div className="flex flex-wrap gap-3 mt-7">

                {job.employmentType && (
                  <span
                    className={`px-4 py-2 rounded-lg border text-sm font-medium ${badgeColor(
                      job.employmentType
                    )}`}
                  >
                    {job.employmentType}
                  </span>
                )}

                {job.workMode && (
                  <span
                    className={`px-4 py-2 rounded-lg border text-sm font-medium ${badgeColor(
                      job.workMode
                    )}`}
                  >
                    {job.workMode}
                  </span>
                )}

                {job.category && (
                  <span className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm">
                    {job.category}
                  </span>
                )}

              </div>

              {/* Bottom */}

              <div className="flex flex-col md:flex-row justify-between md:items-center gap-5 mt-8 pt-7 border-t border-slate-800">

                <div>

                  <p className="text-slate-400 text-sm">
                    Maximum salary
                  </p>

                  <p className="text-white font-bold text-xl">

                    {job.salaryMax
                      ? `₹${Number(
                          job.salaryMax
                        ).toLocaleString()}`
                      : "Not specified"}

                  </p>

                </div>

                <Link
                  to={`/jobs/${job._id}`}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition"
                >
                  View Job
                  <FaArrowRight />
                </Link>

              </div>

            </div>

          </div>

        </div>

        {/* ==========================================
            DOTS
        ========================================== */}

        {jobs.length > 1 && (
          <div className="flex justify-center gap-2 mt-7">

            {jobs.map((_, index) => (
              <button
                key={index}
                onClick={() =>
                  setCurrentIndex(index)
                }
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-emerald-500"
                    : "w-2 bg-slate-700"
                }`}
              />
            ))}

          </div>
        )}

        {/* ==========================================
            VIEW ALL
        ========================================== */}

        <div className="text-center mt-8">

          <Link
            to="/all-jobs"
            className="text-emerald-400 hover:text-white font-semibold transition"
          >
            View All Jobs →
          </Link>

        </div>

      </div>

    </section>
  );
}