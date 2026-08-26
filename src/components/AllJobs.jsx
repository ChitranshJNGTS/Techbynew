import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import API from "../Api/JobApi";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaBookmark,
  FaBuilding,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import Navbar from "./Navbar";

export default function AllJobs() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // ==========================
  // STATE
  // ==========================

  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================
  // URL PARAMETERS
  // ==========================

  const urlKeyword = searchParams.get("keyword") || "";
  const urlLocation = searchParams.get("location") || "";
  const urlType = searchParams.get("type") || "";
  const urlCategory = searchParams.get("category") || "";

  // ==========================
  // SEARCH STATE
  // ==========================

  const [keyword, setKeyword] = useState(urlKeyword);
  const [location, setLocation] = useState(urlLocation);

  // ==========================
  // SORT
  // ==========================

  const [sortBy, setSortBy] = useState("newest");

  // ==========================
  // SYNC SEARCH INPUT
  // WITH URL
  // ==========================

  useEffect(() => {
    setKeyword(urlKeyword);
    setLocation(urlLocation);
  }, [urlKeyword, urlLocation]);

  // ==========================
  // FETCH JOBS
  // ==========================

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/jobs");

      if (data.success) {
        setJobsData(data.jobs || []);
      } else {
        setJobsData([]);
      }
    } catch (err) {
      console.error("Get Jobs Error:", err);

      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // SEARCH
  // ==========================

  const handleSearch = () => {
    const params = {};

    if (keyword.trim()) {
      params.keyword = keyword.trim();
    }

    if (location.trim()) {
      params.location = location.trim();
    }

    // Preserve type
    if (urlType) {
      params.type = urlType;
    }

    // Preserve category
    if (urlCategory) {
      params.category = urlCategory;
    }

    setSearchParams(params);
  };

  // ==========================
  // FILTER JOBS
  // ==========================

  const filteredJobs = useMemo(() => {
    let result = [...jobsData];

    // ==========================
    // KEYWORD
    // ==========================

    if (urlKeyword.trim()) {
      const search = urlKeyword.toLowerCase().trim();

      result = result.filter((job) => {
        const jobTitle =
          job.jobTitle?.toLowerCase() || "";

        const companyName =
          job.companyName?.toLowerCase() || "";

        const category =
          job.category?.toLowerCase() || "";

        const skills = Array.isArray(job.skills)
          ? job.skills
          : [];

        return (
          jobTitle.includes(search) ||
          companyName.includes(search) ||
          category.includes(search) ||
          skills.some((skill) =>
            skill?.toLowerCase().includes(search)
          )
        );
      });
    }

    // ==========================
    // LOCATION
    // ==========================

    if (urlLocation.trim()) {
      const searchLocation =
        urlLocation.toLowerCase().trim();

      result = result.filter((job) => {
        const city =
          job.city?.toLowerCase() || "";

        const state =
          job.state?.toLowerCase() || "";

        const country =
          job.country?.toLowerCase() || "";

        return (
          city.includes(searchLocation) ||
          state.includes(searchLocation) ||
          country.includes(searchLocation)
        );
      });
    }

    // ==========================
    // CATEGORY
    // ==========================

    if (urlCategory.trim()) {
      const categorySearch =
        urlCategory.toLowerCase().trim();

      result = result.filter((job) => {
        return (
          job.category?.toLowerCase() ===
          categorySearch
        );
      });
    }

    // ==========================
    // JOB TYPE
    // ==========================

    if (urlType) {
      const type = urlType.toLowerCase();

      result = result.filter((job) => {
        const employmentType =
          job.employmentType?.toLowerCase() || "";

        const experience =
          job.experience?.toLowerCase() || "";

        // ==========================
        // FRESHERS
        // ==========================

        if (type === "freshers") {
          return (
            experience.includes("fresher") ||
            experience.includes("0") ||
            experience.includes("no experience") ||
            experience.includes("0-1") ||
            experience.includes("0 - 1")
          );
        }

        // ==========================
        // EXPERIENCED
        // ==========================

        if (type === "experienced") {
          return (
            !experience.includes("fresher") &&
            !experience.includes("0") &&
            !experience.includes("no experience")
          );
        }

        // ==========================
        // INTERNSHIP
        // ==========================

        if (type === "internship") {
          return (
            employmentType.includes("intern") ||
            experience.includes("intern")
          );
        }

        // ==========================
        // NORMAL EMPLOYMENT TYPE
        // ==========================

        return employmentType.includes(type);
      });
    }

    // ==========================
    // SORTING
    // ==========================

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      );
    }

    if (sortBy === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.createdAt || 0) -
          new Date(b.createdAt || 0)
      );
    }

    if (sortBy === "salaryHigh") {
      result.sort(
        (a, b) =>
          Number(b.salaryMax || 0) -
          Number(a.salaryMax || 0)
      );
    }

    if (sortBy === "salaryLow") {
      result.sort(
        (a, b) =>
          Number(a.salaryMin || 0) -
          Number(b.salaryMin || 0)
      );
    }

    return result;
  }, [
    jobsData,
    urlKeyword,
    urlLocation,
    urlType,
    urlCategory,
    sortBy,
  ]);

  // ==========================
  // RECENT JOBS
  // ==========================

  const recentJobs = useMemo(() => {
    return [...jobsData]
      .sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
      .slice(0, 6);
  }, [jobsData]);

  // ==========================
  // CLEAR SEARCH
  // ==========================

  const clearSearch = () => {
    setKeyword("");
    setLocation("");

    setSearchParams({});
  };

  // ==========================
  // APPLY JOB
  // ==========================

  const handleApply = (e, job) => {
    e.stopPropagation();

    if (job.applyLink) {
      window.open(
        job.applyLink,
        "_blank",
        "noopener,noreferrer"
      );
    } else {
      navigate(
        `/jobs/${job.slug || job._id}`
      );
    }
  };

  // ==========================
  // OPEN JOB
  // ==========================

  const openJob = (job) => {
    navigate(
      `/jobs/${job.slug || job._id}`
    );
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

          <div className="text-center">

            <div className="w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin mx-auto" />

            <p className="text-white mt-4">
              Loading Jobs...
            </p>

          </div>

        </div>
      </>
    );
  }

  // ==========================
  // ERROR
  // ==========================

  if (error) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">

          <div className="text-center">

            <p className="text-red-500 text-xl">
              {error}
            </p>

            <button
              onClick={getJobs}
              className="mt-5 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl"
            >
              Try Again
            </button>

          </div>

        </div>
      </>
    );
  }

  // ==========================
  // PAGE
  // ==========================

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 pt-20 pb-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* =================================
                LEFT - JOBS
            ================================= */}

            <main className="lg:col-span-8 xl:col-span-9">

              {/* ==========================
                  TOP BAR
              ========================== */}

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

                <div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">

                    {filteredJobs.length} Jobs Found

                  </h2>

                  {/* ACTIVE FILTER */}

                  {urlType && (
                    <p className="text-emerald-400 text-sm mt-2 capitalize">
                      Showing {urlType} jobs
                    </p>
                  )}

                  {urlCategory && (
                    <p className="text-emerald-400 text-sm mt-2 capitalize">
                      Category: {urlCategory}
                    </p>
                  )}

                  {(urlKeyword || urlLocation) && (
                    <button
                      onClick={clearSearch}
                      className="text-sm text-emerald-400 hover:text-emerald-300 mt-2"
                    >
                      Clear Search
                    </button>
                  )}

                </div>

                {/* SORT */}

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="w-full sm:w-52 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500"
                >

                  <option value="newest">
                    Newest
                  </option>

                  <option value="oldest">
                    Oldest
                  </option>

                  <option value="salaryHigh">
                    Highest Salary
                  </option>

                  <option value="salaryLow">
                    Lowest Salary
                  </option>

                </select>

              </div>

              {/* ==========================
                  NO JOBS
              ========================== */}

              {filteredJobs.length === 0 && (

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

                  <FaBriefcase className="text-slate-600 text-5xl mx-auto" />

                  <h3 className="text-white text-xl font-semibold mt-5">
                    No Jobs Found
                  </h3>

                  <p className="text-slate-500 mt-2">
                    Try changing your search or filters.
                  </p>

                  <button
                    onClick={clearSearch}
                    className="mt-5 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl"
                  >
                    Clear Filters
                  </button>

                </div>

              )}

              {/* ==========================
                  JOB LIST
              ========================== */}

              <div className="space-y-5">

                {filteredJobs.map((job) => (

                  <div
                    key={job._id}
                    onClick={() => openJob(job)}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >

                    <div className="flex flex-col lg:flex-row justify-between gap-6">

                      {/* ==========================
                          LEFT
                      ========================== */}

                      <div className="flex gap-4 sm:gap-5 min-w-0">

                        {/* LOGO */}

                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white flex items-center justify-center p-2 shrink-0">

                          <img
                            src={
                              job.companyLogo ||
                              "https://via.placeholder.com/100"
                            }
                            alt={
                              job.companyName ||
                              "Company"
                            }
                            className="w-full h-full object-contain rounded-lg"
                          />

                        </div>

                        {/* DETAILS */}

                        <div className="min-w-0">

                          {/* TITLE */}

                          <div className="flex items-start gap-2 flex-wrap">

                            <h3 className="text-base sm:text-xl font-bold text-white leading-tight">

                              {job.jobTitle}

                            </h3>

                            {job.featured && (

                              <span className="bg-yellow-500 text-black text-[10px] sm:text-xs px-2 py-1 rounded-full font-bold">
                                Featured
                              </span>

                            )}

                            {job.urgentHiring && (

                              <span className="bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] sm:text-xs px-2 py-1 rounded-full font-semibold">
                                Urgent Hiring
                              </span>

                            )}

                          </div>

                          {/* COMPANY */}

                          <div className="flex items-center gap-2 mt-2 text-sm text-slate-300">

                            <FaBuilding className="text-xs shrink-0" />

                            <span className="truncate">
                              {job.companyName}
                            </span>

                            <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />

                          </div>

                          {/* META */}

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs sm:text-sm text-slate-400">

                            {/* LOCATION */}

                            <span className="flex items-center gap-2">

                              <FaMapMarkerAlt />

                              {job.city || "Location"}

                              {job.state
                                ? `, ${job.state}`
                                : ""}

                            </span>

                            {/* TYPE */}

                            <span className="flex items-center gap-2">

                              <FaBriefcase />

                              {job.employmentType ||
                                "Job"}

                            </span>

                            {/* SALARY */}

                            <span className="flex items-center gap-2">

                              <FaMoneyBillWave />

                              {job.salaryMin ||
                              job.salaryMax ? (
                                <>
                                  ₹
                                  {Number(
                                    job.salaryMin || 0
                                  ).toLocaleString()}

                                  {" - ₹"}

                                  {Number(
                                    job.salaryMax || 0
                                  ).toLocaleString()}
                                </>
                              ) : (
                                "Salary not disclosed"
                              )}

                            </span>

                            {/* DATE */}

                            <span className="flex items-center gap-2">

                              <FaClock />

                              {job.createdAt
                                ? new Date(
                                    job.createdAt
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : "Recently"}

                            </span>

                          </div>

                          {/* WORK MODE */}

                          {job.workMode && (

                            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">

                              {job.workMode}

                            </span>

                          )}

                          {/* SKILLS */}

                          {job.skills?.length > 0 && (

                            <div className="flex flex-wrap gap-2 mt-4">

                              {job.skills
                                .slice(0, 5)
                                .map((skill) => (

                                  <span
                                    key={skill}
                                    className="px-2 sm:px-3 py-1 sm:py-2 rounded-lg bg-slate-800 text-slate-300 text-[11px] sm:text-xs"
                                  >
                                    {skill}
                                  </span>

                                ))}

                              {job.skills.length > 5 && (

                                <span className="px-2 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs">

                                  +{job.skills.length - 5}

                                </span>

                              )}

                            </div>

                          )}

                        </div>

                      </div>

                      {/* ==========================
                          RIGHT
                      ========================== */}

                      <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-3 lg:min-w-[150px]">

                        {/* BOOKMARK */}

                        <button
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-800 hover:bg-emerald-500 transition flex items-center justify-center text-white"
                        >

                          <FaBookmark />

                        </button>

                        {/* SALARY */}

                        <div className="text-left lg:text-right">

                          <p className="text-emerald-400 font-bold text-sm sm:text-lg">

                            {job.salaryMin ||
                            job.salaryMax ? (
                              <>
                                ₹
                                {Number(
                                  job.salaryMin || 0
                                ).toLocaleString()}

                                {" - ₹"}

                                {Number(
                                  job.salaryMax || 0
                                ).toLocaleString()}
                              </>
                            ) : (
                              "Not Disclosed"
                            )}

                          </p>

                          <p className="text-slate-500 text-xs mt-1">

                            {job.experience ||
                              "Experience not specified"}

                          </p>

                        </div>

                        {/* APPLY */}

                        <button
                          onClick={(e) =>
                            handleApply(e, job)
                          }
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm transition whitespace-nowrap"
                        >
                          Apply
                        </button>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </main>

            {/* =================================
                RIGHT - RECENT JOBS
            ================================= */}

            <aside className="lg:col-span-4 xl:col-span-3">

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24">

                {/* HEADER */}

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <h2 className="text-white text-lg font-bold">
                      Recent Jobs
                    </h2>

                    <p className="text-slate-500 text-xs mt-1">
                      Latest opportunities
                    </p>

                  </div>

                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">

                    <FaBriefcase className="text-emerald-400 text-sm" />

                  </div>

                </div>

                {/* RECENT JOBS */}

                <div className="space-y-3">

                  {recentJobs.length === 0 ? (

                    <p className="text-slate-500 text-sm">
                      No recent jobs available.
                    </p>

                  ) : (

                    recentJobs.map((job) => (

                      <div
                        key={job._id}
                        onClick={() => openJob(job)}
                        className="group bg-slate-950 border border-slate-800 hover:border-emerald-500 rounded-xl p-3 cursor-pointer transition-all duration-200"
                      >

                        <div className="flex gap-3">

                          {/* LOGO */}

                          <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center p-1.5 shrink-0">

                            <img
                              src={
                                job.companyLogo ||
                                "https://via.placeholder.com/80"
                              }
                              alt={
                                job.companyName ||
                                "Company"
                              }
                              className="w-full h-full object-contain rounded"
                            />

                          </div>

                          {/* INFO */}

                          <div className="min-w-0 flex-1">

                            <h3 className="text-white text-sm font-semibold truncate group-hover:text-emerald-400 transition">

                              {job.jobTitle}

                            </h3>

                            <p className="text-slate-400 text-xs truncate mt-1">

                              {job.companyName}

                            </p>

                            <div className="flex items-center gap-1 text-slate-500 text-[11px] mt-2">

                              <FaMapMarkerAlt className="text-[10px]" />

                              <span className="truncate">

                                {job.city ||
                                  job.state ||
                                  "Location"}

                              </span>

                            </div>

                          </div>

                        </div>

                        {/* BOTTOM */}

                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">

                          <span className="text-emerald-400 text-[11px] font-medium">

                            {job.salaryMin ||
                            job.salaryMax
                              ? `₹${Number(
                                  job.salaryMin || 0
                                ).toLocaleString()} - ₹${Number(
                                  job.salaryMax || 0
                                ).toLocaleString()}`
                              : "Salary N/A"}

                          </span>

                          <span className="text-slate-500 text-[10px] flex items-center gap-1">

                            <FaClock />

                            {job.createdAt
                              ? new Date(
                                  job.createdAt
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                  }
                                )
                              : "Recent"}

                          </span>

                        </div>

                      </div>

                    ))

                  )}

                </div>

                {/* VIEW ALL */}

                <button
                  onClick={() => {
                    setKeyword("");
                    setLocation("");
                    setSearchParams({});

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="w-full mt-5 py-3 rounded-xl border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 text-sm font-semibold transition flex items-center justify-center gap-2"
                >

                  View All Jobs

                  <FaArrowRight className="text-xs" />

                </button>

              </div>

            </aside>

          </div>

        </div>

      </section>
    </>
  );
}