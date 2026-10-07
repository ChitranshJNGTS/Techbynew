




// import { useEffect, useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaClock,
//   FaCheckCircle,
//   FaArrowRight,
//   FaUserTie,
// } from "react-icons/fa";

// import { Link } from "react-router-dom";
// import API from "../Api/JobApi";
// import JobBanner from "./JobBanner";
// import Ads from "./Ads";

// export default function RecentJobs() {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     getRecentJobs();
//   }, []);

//   const getRecentJobs = async () => {
//     try {
//       const { data } = await API.get("/jobs");

//       if (data.success) {
//         const sortedJobs = [...(data.jobs || [])]
//           .sort(
//             (a, b) =>
//               new Date(b.createdAt || 0) -
//               new Date(a.createdAt || 0)
//           )
//           .slice(0, 6);

//         setJobs(sortedJobs);
//       }
//     } catch (error) {
//       console.log("Recent Jobs Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================
//   // EXPERIENCE BADGE
//   // ==========================

//   const getExperienceBadge = (job) => {
//     const experience =
//       job.experience?.toLowerCase() || "";

//     if (
//       experience.includes("fresher") ||
//       experience.includes("trainee") ||
//       experience.includes("0")
//     ) {
//       return "FRESHERS";
//     }

//     return "EXPERIENCED";
//   };

//   // ==========================
//   // DATE
//   // ==========================

//   const formatDate = (date) => {
//     if (!date) return "Recently";

//     return new Date(date).toLocaleDateString(
//       "en-IN",
//       {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       }
//     );
//   };

//   // ==========================
//   // LOADING
//   // ==========================

//   if (loading) {
//     return (
//       <section className="bg-slate-950 py-16">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6">

//           <div className="flex justify-center py-20">

//             <div className="w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />

//           </div>

//         </div>
//       </section>
//     );
//   }

//   // ==========================
//   // NO JOBS
//   // ==========================

//   if (jobs.length === 0) {
//     return (
//       <section className="bg-slate-950 py-16">

//         <div className="max-w-6xl mx-auto px-4 sm:px-6">

//           <div className="bg-slate-900 border border-slate-800 rounded-2xl text-center py-16">

//             <h2 className="text-2xl font-bold text-white">
//               No Jobs Available
//             </h2>

//             <p className="text-slate-400 mt-3">
//               Check back soon for new opportunities.
//             </p>

//             <Link
//               to="/all-jobs"
//               className="inline-flex items-center gap-2 mt-7 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
//             >
//               Browse Jobs
//               <FaArrowRight />
//             </Link>

//           </div>

//         </div>

//       </section>
//     );
//   }

//   return (
//     <section className="bg-slate-950 py-12 sm:py-16">
//      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
//   <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden">

//     <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider">
//       Advertisement
//     </p>

//     {/* Desktop / Tablet */}
//     <div className="hidden sm:flex w-full justify-center items-center overflow-hidden">
//       <Ads type="728x90" />
//     </div>

//     {/* Mobile */}
//     <div className="flex sm:hidden w-full justify-center items-center overflow-hidden">
//       <Ads type="320x50" />
//     </div>

//   </div>
// </div>

//       <div className="max-w-6xl mx-auto px-4 sm:px-6">

//         {/* ==========================
//             HEADER
//         ========================== */}

//         <div className="flex items-center justify-between mb-7">

//           <div>

//             <h2 className="text-2xl sm:text-3xl font-bold text-white">
//               Recent Jobs
//             </h2>

//             <p className="text-slate-500 text-sm mt-2">
//               Latest job opportunities from verified companies
//             </p>

//           </div>

//           <Link
//             to="/all-jobs"
//             className="hidden sm:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition"
//           >
//             View All
//             <FaArrowRight className="text-xs" />
//           </Link>

//         </div>

//         {/* ==========================
//             JOB LIST
//         ========================== */}

//         <div className="border-t border-slate-800">

//           {jobs.map((job) => (

//             <Link
//               key={job._id}
//               to={`/jobs/${job.slug || job._id}`}
//               className="group block border-b border-slate-800 py-6 sm:py-7 hover:bg-slate-900/40 transition"
//             >

//               <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[440px_1fr] gap-5 md:gap-8 items-center">

//   {/* ==========================
//       LEFT IMAGE
//   ========================== */}

// <div className="flex items-center gap-4 min-w-0">

//   {/* JOB BANNER */}
//   <div className="w-32 h-24 sm:w-40 sm:h-28 lg:w-104 lg:h-62 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
//     <JobBanner job={job} />
//   </div>

//   {/* MOBILE COMPANY */}
//   <div className="md:hidden min-w-0">
//     <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
//       {job.jobTitle}
//     </h3>

//     <p className="text-emerald-400 text-sm font-medium mt-1 truncate">
//       {job.companyName}
//     </p>
//   </div>

// </div>


//   {/* ==========================
//       RIGHT CONTENT
//   ========================== */}

//   <div className="min-w-0">

//     {/* BADGES */}

//     <div className="flex flex-wrap gap-2 mb-2.5">

//       <span className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] sm:text-[11px] px-2.5 py-1 font-bold rounded-sm tracking-wide">
//         {getExperienceBadge(job)}
//       </span>

//       {job.employmentType && (
//         <span className="bg-slate-800 border border-slate-700 text-slate-200 text-[10px] sm:text-[11px] px-2.5 py-1 font-bold rounded-sm tracking-wide">
//           {job.employmentType.toUpperCase()}
//         </span>
//       )}

//     </div>

//     {/* TITLE */}

//     <h3 className="hidden md:block text-xl lg:text-2xl font-bold text-white leading-snug group-hover:text-emerald-400 transition">
//       {job.jobTitle}
//     </h3>

//     {/* DESCRIPTION */}

//     <p className="text-slate-400 text-sm sm:text-[15px] leading-6 mt-2 line-clamp-2">
//       {job.jobSummary ||
//         job.description?.replace(/<[^>]*>/g, "") ||
//         "Explore this opportunity and discover more details about the role, requirements and application process."}
//     </p>

//     {/* AUTHOR + DATE */}

//     <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-xs sm:text-sm">

//       <span className="flex items-center gap-1.5 text-slate-300 font-medium">
//         <FaCheckCircle className="text-emerald-500 text-xs" />

//         {job.recruiterName ||
//           job.postedByName ||
//           "TechBy"}
//       </span>

//       <span className="text-slate-700">
//         |
//       </span>

//       <span className="flex items-center gap-1.5 text-slate-500">
//         <FaClock />

//         {formatDate(job.createdAt)}
//       </span>

//     </div>

//     {/* EXTRA INFORMATION */}

//     <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs sm:text-sm text-slate-500">

//       {(job.city || job.state) && (
//         <span className="flex items-center gap-1.5">
//           <FaMapMarkerAlt />

//           {job.city || "Location"}

//           {job.state
//             ? `, ${job.state}`
//             : ""}
//         </span>
//       )}

 

//       {job.workMode && (
//         <span className="text-emerald-400">
//           {job.workMode}
//         </span>
//       )}

//     </div>

//   </div>

// </div>

//             </Link>

//           ))}

//         </div>
        

//         {/* ==========================
//             VIEW ALL
//         ========================== */}

//         <div className="flex justify-center mt-9">

//           <Link
//             to="/all-jobs"
//             className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-xl font-semibold transition"
//           >
//             Browse All Jobs
//             <FaArrowRight className="text-sm" />
//           </Link>

//         </div>

//       </div>

//     </section>
//   );
// }























import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import API from "../Api/JobApi";
import JobBanner from "./JobBanner";
import Ads from "./Ads";

export default function RecentJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentJobs();
  }, []);

  const getRecentJobs = async () => {
    try {
      const { data } = await API.get("/jobs");

      if (data.success) {
        const sortedJobs = [...(data.jobs || [])]
          .sort(
            (a, b) =>
              new Date(b.createdAt || 0) -
              new Date(a.createdAt || 0)
          )
          .slice(0, 6);

        setJobs(sortedJobs);
      }
    } catch (error) {
      console.log("Recent Jobs Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // EXPERIENCE BADGE
  // ==========================

  const getExperienceBadge = (job) => {
    const experience =
      job.experience?.toLowerCase() || "";

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
  // DATE
  // ==========================

  const formatDate = (date) => {
    if (!date) return "Recently";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <section className="bg-slate-50 py-16">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="flex justify-center py-20">

            <div className="w-10 h-10 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin" />

          </div>

        </div>

      </section>
    );
  }

  // ==========================
  // NO JOBS
  // ==========================

  if (jobs.length === 0) {
    return (
      <section className="bg-slate-50 py-16">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="bg-white border border-slate-200 rounded-2xl text-center py-16 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              No Jobs Available
            </h2>

            <p className="text-slate-500 mt-3">
              Check back soon for new opportunities.
            </p>

            <Link
              to="/all-jobs"
              className="inline-flex items-center gap-2 mt-7 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-sm"
            >
              Browse Jobs
              <FaArrowRight />
            </Link>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-12 sm:py-16">

      {/* ==========================
          ADVERTISEMENT
      ========================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6">

        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden shadow-sm">

          <p className="text-[10px] text-slate-400 mb-3 uppercase tracking-wider font-medium">
            Advertisement
          </p>

          {/* Desktop / Tablet */}
          <div className="hidden sm:flex w-full justify-center items-center overflow-hidden">
            <Ads type="728x90" />
          </div>

          {/* Mobile */}
          <div className="flex sm:hidden w-full justify-center items-center overflow-hidden">
            <Ads type="320x50" />
          </div>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ==========================
            HEADER
        ========================== */}

        <div className="flex items-center justify-between mb-7">

          <div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Recent Jobs
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              Latest job opportunities from verified companies
            </p>

          </div>

          <Link
            to="/all-jobs"
            className="hidden sm:flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition"
          >
            View All
            <FaArrowRight className="text-xs" />
          </Link>

        </div>

        {/* ==========================
            JOB LIST
        ========================== */}

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

          {jobs.map((job) => (

            <Link
              key={job._id}
              to={`/jobs/${job.slug || job._id}`}
              className="group block border-b last:border-b-0 border-slate-200 px-4 sm:px-6 py-6 sm:py-7 hover:bg-slate-50 transition-colors duration-200"
            >

              <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[440px_1fr] gap-5 md:gap-8 items-center">

                {/* ==========================
                    LEFT IMAGE
                ========================== */}

                <div className="flex items-center gap-4 min-w-0">

                  {/* JOB BANNER */}

                  <div className="w-32 h-24 sm:w-40 sm:h-28 lg:w-104 lg:h-62 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">

                    <JobBanner job={job} />

                  </div>

                  {/* MOBILE COMPANY */}

                  <div className="md:hidden min-w-0">

                    <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-emerald-600 transition">
                      {job.jobTitle}
                    </h3>

                    <p className="text-emerald-600 text-sm font-medium mt-1 truncate">
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

                    <span className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] sm:text-[11px] px-2.5 py-1 font-bold rounded-md tracking-wide">
                      {getExperienceBadge(job)}
                    </span>

                    {job.employmentType && (
                      <span className="bg-slate-100 border border-slate-200 text-slate-600 text-[10px] sm:text-[11px] px-2.5 py-1 font-bold rounded-md tracking-wide">
                        {job.employmentType.toUpperCase()}
                      </span>
                    )}

                  </div>

                  {/* TITLE */}

                  <h3 className="hidden md:block text-xl lg:text-2xl font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition">

                    {job.jobTitle}

                  </h3>

                  {/* DESCRIPTION */}

                  <p className="text-slate-600 text-sm sm:text-[15px] leading-6 mt-2 line-clamp-2">

                    {job.jobSummary ||
                      job.description?.replace(/<[^>]*>/g, "") ||
                      "Explore this opportunity and discover more details about the role, requirements and application process."}

                  </p>

                  {/* AUTHOR + DATE */}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-4 text-xs sm:text-sm">

                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">

                      <FaCheckCircle className="text-emerald-500 text-xs" />

                      {job.recruiterName ||
                        job.postedByName ||
                        "TechBy"}

                    </span>

                    <span className="text-slate-300">
                      |
                    </span>

                    <span className="flex items-center gap-1.5 text-slate-500">

                      <FaClock />

                      {formatDate(job.createdAt)}

                    </span>

                  </div>

                  {/* EXTRA INFORMATION */}

                  <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs sm:text-sm text-slate-500">

                    {(job.city || job.state) && (
                      <span className="flex items-center gap-1.5">

                        <FaMapMarkerAlt className="text-slate-400" />

                        {job.city || "Location"}

                        {job.state
                          ? `, ${job.state}`
                          : ""}

                      </span>
                    )}

                    {job.workMode && (
                      <span className="text-emerald-600 font-medium">
                        {job.workMode}
                      </span>
                    )}

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* ==========================
            VIEW ALL
        ========================== */}

        <div className="flex justify-center mt-9">

          <Link
            to="/all-jobs"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3 rounded-xl font-semibold transition shadow-sm"
          >
            Browse All Jobs

            <FaArrowRight className="text-sm" />

          </Link>

        </div>

      </div>

    </section>
  );
}