
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobBanner from "./JobBanner";

import API from "../Api/JobApi";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaBookmark,
  FaBuilding,
  FaCheckCircle,
  FaArrowRight,
  FaMoneyBillWave,
} from "react-icons/fa";

import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomBar from "./MobileBottomBar";

export default function AllJobs() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // ==========================
  // STATE
  // ==========================
  const urlWorkMode = searchParams.get("workMode") || "";

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
        const jobTitle = job.jobTitle?.toLowerCase() || "";

        const companyName = job.companyName?.toLowerCase() || "";

        const category = job.category?.toLowerCase() || "";

        const skills = Array.isArray(job.skills) ? job.skills : [];

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
// WORK MODE
// ==========================

if (urlWorkMode.trim()) {
  const workModeSearch = urlWorkMode.toLowerCase().trim();

  result = result.filter((job) => {
    const workMode = job.workMode?.toLowerCase().trim() || "";

    return workMode === workModeSearch;
  });
}

    // ==========================
    // LOCATION
    // ==========================

    if (urlLocation.trim()) {
      const searchLocation = urlLocation.toLowerCase().trim();

      result = result.filter((job) => {
        const city = job.city?.toLowerCase() || "";

        const state = job.state?.toLowerCase() || "";

        const country = job.country?.toLowerCase() || "";

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
  const categorySearch = urlCategory.toLowerCase().trim();

  result = result.filter((job) => {
    const category = job.category?.toLowerCase().trim() || "";

    return (
      category.includes(categorySearch) ||
      categorySearch.includes(category)
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

    return result;
  }, [
   jobsData,
  urlKeyword,
  urlLocation,
  urlType,
  urlCategory,
  urlWorkMode,
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
      navigate(`/jobs/${job.slug || job._id}`);
    }
  };

  // ==========================
  // OPEN JOB
  // ==========================

  const openJob = (job) => {
    navigate(`/jobs/${job.slug || job._id}`);
  };



  const getExperienceBadge = (job) => {
  const experience = job.experience?.toLowerCase() || "";

  if (
    experience.includes("fresher") ||
    experience.includes("trainee") ||
    experience.includes("0")
  ) {
    return "FRESHERS";
  }

  return "EXPERIENCED";
};
  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <>
        <Navbar />
        <MobileBottomBar/>

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
        <MobileBottomBar/>
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
      <MobileBottomBar/>
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
                  {urlWorkMode && (
  <p className="text-emerald-400 text-sm mt-2 capitalize">
    Showing {urlWorkMode} jobs
  </p>
)}

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

             {/* ==========================
    JOB LIST
========================== */}

<div className="border-t border-slate-800">

  {filteredJobs.map((job) => (
    <div
      key={job._id}
      onClick={() => openJob(job)}
      className="group block border-b border-slate-800 py-6 sm:py-7 hover:bg-slate-900/40 transition cursor-pointer"
    >

      <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[440px_1fr] gap-5 md:gap-8 items-center">

        {/* ==========================
            LEFT - JOB BANNER
        ========================== */}

        <div className="flex items-center gap-4 min-w-0">

          <div
            className="
              w-32 h-24
              sm:w-40 sm:h-28
              lg:w-[440px] lg:h-[260px]
              rounded-xl
              bg-white
              border border-slate-800
              flex items-center justify-center
              overflow-hidden
              shrink-0
            "
          >
            <JobBanner job={job} />
          </div>

          {/* MOBILE INFO */}

          <div className="md:hidden min-w-0">

            <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
              {job.jobTitle}
            </h3>

            <p className="text-emerald-400 text-sm font-medium mt-1 truncate">
              {job.companyName}
            </p>

          </div>

        </div>


        {/* ==========================
            RIGHT CONTENT
        ========================== */}

        <div className="min-w-0">

          {/* BADGES */}

          <div className="flex flex-wrap gap-2 mb-2.5">

            <span className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] sm:text-[11px] px-2.5 py-1 font-bold rounded-sm tracking-wide">
              {getExperienceBadge(job)}
            </span>

            {job.employmentType && (
              <span className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] sm:text-[11px] px-2.5 py-1 font-bold rounded-sm tracking-wide">
                {job.employmentType.toUpperCase()}
              </span>
            )}

            {job.workMode && (
              <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-[11px] px-2.5 py-1 font-bold rounded-sm tracking-wide">
                {job.workMode.toUpperCase()}
              </span>
            )}

          </div>


          {/* TITLE */}

          <h3 className="hidden md:block text-xl lg:text-2xl font-bold text-white leading-snug group-hover:text-emerald-400 transition">
            {job.jobTitle}
          </h3>


          {/* COMPANY */}

          <div className="flex items-center gap-2 mt-2">

            <span className="text-emerald-400 text-sm font-semibold truncate">
              {job.companyName}
            </span>

            <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />

          </div>


          {/* DESCRIPTION */}

          <p className="text-slate-400 text-sm sm:text-[15px] leading-6 mt-2 line-clamp-2">
            {job.jobSummary ||
              job.description?.replace(/<[^>]*>/g, "") ||
              "Explore this opportunity and discover more details about the role, requirements and application process."}
          </p>


          {/* AUTHOR + DATE */}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-xs sm:text-sm">

            <span className="flex items-center gap-1.5 text-slate-300 font-medium">

              <FaCheckCircle className="text-emerald-500 text-xs" />

              {job.recruiterName ||
                job.postedByName ||
                "TechBy"}

            </span>

            <span className="text-slate-700">
              |
            </span>

            <span className="flex items-center gap-1.5 text-slate-500">

              <FaClock />

              {job.createdAt
                ? new Date(
                    job.createdAt
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Recently"}

            </span>

          </div>


          {/* EXTRA INFORMATION */}

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs sm:text-sm text-slate-500">

            {(job.city || job.state) && (
              <span className="flex items-center gap-1.5">

                <FaMapMarkerAlt />

                {job.city || "Location"}

                {job.state
                  ? `, ${job.state}`
                  : ""}

              </span>
            )}

            {job.workMode && (
              <span className="text-emerald-400">
                {job.workMode}
              </span>
            )}

            {job.salaryMin || job.salaryMax ? (
              <span className="flex items-center gap-1.5 text-slate-400">

                <FaMoneyBillWave className="text-emerald-400" />

                ₹{job.salaryMin?.toLocaleString() || "0"}

                {job.salaryMax
                  ? ` - ₹${job.salaryMax.toLocaleString()}`
                  : ""}

              </span>
            ) : null}

          </div>


          {/* SKILLS */}

          {job.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">

              {job.skills.slice(0, 5).map((skill) => (
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


          {/* APPLY BUTTON */}

          <div className="flex justify-end mt-4">

            <button
              onClick={(e) =>
                handleApply(e, job)
              }
              className="
                bg-emerald-500
                hover:bg-emerald-600
                text-white
                font-semibold
                px-5
                py-2.5
                rounded-xl
                text-sm
                transition
                flex
                items-center
                gap-2
              "
            >
              Apply

              <FaArrowRight className="text-xs" />

            </button>

          </div>

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

                  ) :
(
  recentJobs.map((job) => (

    <div
      key={job._id}
      onClick={() => openJob(job)}
      className="
        group
        bg-slate-950
        border border-slate-800
        hover:border-emerald-500/60
        hover:bg-slate-900
        rounded-xl
        p-3.5
        cursor-pointer
        transition-all
        duration-200
      "
    >

      {/* ==========================
          TOP
      ========================== */}

      <div className="flex gap-3">

        {/* LOGO */}

        <div
          className="
            w-12 h-12
            rounded-lg
            bg-white
            border border-slate-700
            flex items-center
            justify-center
            p-1.5
            shrink-0
            overflow-hidden
          "
        >

          {job.companyLogo ? (

            <img
              src={job.companyLogo}
              alt={job.companyName || "Company"}
              className="w-full h-full object-contain rounded"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />

          ) : (

            <FaBuilding className="text-slate-400 text-lg" />

          )}

        </div>


        {/* INFO */}

        <div className="min-w-0 flex-1">

          {/* JOB TITLE */}

          <h3
            className="
              text-white
              text-sm
              font-bold
              leading-tight
              line-clamp-2
              group-hover:text-emerald-400
              transition
            "
          >
            {job.jobTitle || "Job Opening"}
          </h3>


          {/* COMPANY */}

          <div className="flex items-center gap-1.5 mt-1.5 min-w-0">

            <p className="text-slate-400 text-xs truncate">
              {job.companyName || "Company"}
            </p>

            <FaCheckCircle
              className="
                text-emerald-500
                text-[10px]
                shrink-0
              "
            />

          </div>

        </div>

      </div>


      {/* ==========================
          JOB META
      ========================== */}

      <div className="flex items-center gap-3 mt-3 text-[11px]">

        {/* LOCATION */}

        {(job.city || job.state) && (

          <div
            className="
              flex
              items-center
              gap-1
              min-w-0
              text-slate-500
            "
          >

            <FaMapMarkerAlt
              className="
                text-emerald-500
                text-[10px]
                shrink-0
              "
            />

            <span className="truncate">
              {job.city || job.state}
            </span>

          </div>

        )}


        {/* WORK MODE */}

        {job.workMode && (

          <>
            <span className="text-slate-700">
              •
            </span>

            <span className="text-emerald-400 truncate">
              {job.workMode}
            </span>
          </>

        )}

      </div>


      {/* ==========================
          BOTTOM
      ========================== */}

      <div
        className="
          flex
          items-center
          justify-between
          mt-3
          pt-3
          border-t
          border-slate-800
        "
      >

        {/* DATE */}

        <span
          className="
            text-slate-600
            text-[10px]
            flex
            items-center
            gap-1
          "
        >

          <FaClock />

          {job.createdAt
            ? new Date(job.createdAt).toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                }
              )
            : "Recent"}

        </span>


        {/* VIEW */}

        <span
          className="
            text-emerald-500
            text-[10px]
            font-semibold
            flex
            items-center
            gap-1
            opacity-0
            group-hover:opacity-100
            transition
          "
        >
          View
          <FaArrowRight className="text-[9px]" />
        </span>

      </div>

    </div>

  ))
)

}

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

      <Footer />
    </>
  );
}
