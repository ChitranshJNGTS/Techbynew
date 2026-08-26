// import {
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaBriefcase,
//   FaArrowRight,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const jobs = [
//   {
//     id: 1,
//     color: "border-l-violet-500",
//     logo: "https://logo.clearbit.com/google.com",
//     company: "Google",
//     title: "Senior React Developer",
//     location: "Bangalore, India",
//     salary: "₹18 - ₹28 LPA",
//     tags: ["Full Time", "Remote"],
//   },
//   {
//     id: 2,
//     color: "border-l-red-500",
//     logo: "https://logo.clearbit.com/amazon.com",
//     company: "Amazon",
//     title: "Frontend Engineer",
//     location: "Hyderabad, India",
//     salary: "₹22 - ₹35 LPA",
//     tags: ["Full Time", "Hybrid"],
//   },
//   {
//     id: 3,
//     color: "border-l-green-500",
//     logo: "https://logo.clearbit.com/microsoft.com",
//     company: "Microsoft",
//     title: "UI/UX Designer",
//     location: "Noida, India",
//     salary: "₹12 - ₹18 LPA",
//     tags: ["Remote"],
//   },
//   {
//     id: 4,
//     color: "border-l-yellow-400",
//     logo: "https://logo.clearbit.com/adobe.com",
//     company: "Adobe",
//     title: "Node.js Developer",
//     location: "Pune, India",
//     salary: "₹15 - ₹24 LPA",
//     tags: ["Internship"],
//   },
//   {
//     id: 5,
//     color: "border-l-blue-500",
//     logo: "https://logo.clearbit.com/netflix.com",
//     company: "Netflix",
//     title: "Backend Engineer",
//     location: "Remote",
//     salary: "₹30 - ₹45 LPA",
//     tags: ["Full Time"],
//   },
// ];

// const badgeColor = (tag) => {
//   switch (tag) {
//     case "Full Time":
//       return "bg-blue-100 text-blue-600";
//     case "Remote":
//       return "bg-purple-100 text-purple-600";
//     case "Hybrid":
//       return "bg-green-100 text-green-600";
//     case "Internship":
//       return "bg-yellow-100 text-yellow-700";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// export default function RecentJobs() {
//   const featured = jobs[0];

//   return (
//     <section className="bg-slate-950 py-20">
//       <div className="max-w-7xl mx-auto px-6">

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* Recent Jobs */}

//           <div className="lg:col-span-2">

//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-4xl font-bold text-white">
//                 Recent Jobs
//               </h2>

//               <button className="text-emerald-400 hover:text-white">
//                 View All
//               </button>
//             </div>

//             <div className="space-y-5">

//               {jobs.map((job) => (
//                <Link
//   key={job.id}
//   to={`/jobs/${job.id}`}
//   className={`block bg-slate-900 rounded-2xl border-l-4 ${job.color}
//   border border-slate-800 p-6 hover:border-emerald-500
//   transition duration-300 hover:-translate-y-1`}
// >
//                   <div className="flex flex-col md:flex-row justify-between gap-6">

//                     <div className="flex gap-5">

//                       <img
//                         src={job.logo}
//                         alt={job.company}
//                         className="w-16 h-16 rounded-xl bg-white object-contain p-2"
//                       />

//                       <div>

//                         <h3 className="text-white text-xl font-semibold">
//                           {job.title}
//                         </h3>

//                         <div className="flex flex-wrap gap-5 mt-3 text-slate-400 text-sm">

//                           <span className="flex items-center gap-2">
//                             <FaBriefcase />
//                             {job.company}
//                           </span>

//                           <span className="flex items-center gap-2">
//                             <FaMapMarkerAlt />
//                             {job.location}
//                           </span>

//                           <span className="flex items-center gap-2">
//                             <FaMoneyBillWave />
//                             {job.salary}
//                           </span>

//                         </div>

//                       </div>

//                     </div>

//                     <div className="flex gap-2 flex-wrap items-start">

//                       {job.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className={`px-3 py-2 rounded-lg text-xs font-semibold ${badgeColor(
//                             tag
//                           )}`}
//                         >
//                           {tag}
//                         </span>
//                       ))}

//                     </div>

//                   </div>
//                 </Link>
//               ))}

//             </div>

//             <div className="text-center mt-10">
//               <Link to={"/all-jobs"} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition">
//                 Browse All Jobs
//               </Link>
//             </div>

//           </div>

//           {/* Featured Job */}

//           <div>

//             <h2 className="text-4xl font-bold text-white mb-8">
//               Featured Job
//             </h2>

//             <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 sticky top-24">

//               <img
//                 src={featured.logo}
//                 alt=""
//                 className="w-20 h-20 bg-white rounded-xl p-3"
//               />

//               <h3 className="text-2xl font-bold text-white mt-6">
//                 {featured.title}
//               </h3>

//               <p className="text-emerald-400 mt-2">
//                 {featured.company}
//               </p>

//               <div className="space-y-4 mt-8 text-slate-400">

//                 <p className="flex items-center gap-3">
//                   <FaMapMarkerAlt />
//                   {featured.location}
//                 </p>

//                 <p className="flex items-center gap-3">
//                   <FaMoneyBillWave />
//                   {featured.salary}
//                 </p>

//               </div>

//               <div className="flex gap-2 mt-8">

//                 {featured.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className={`px-3 py-2 rounded-lg text-xs font-semibold ${badgeColor(
//                       tag
//                     )}`}
//                   >
//                     {tag}
//                   </span>
//                 ))}

//               </div>

//               <p className="text-slate-400 mt-8 leading-7">
//                 Join one of the world's leading technology companies and work
//                 on modern web applications using React, TypeScript, and cloud
//                 technologies.
//               </p>

//              <Link
//   to={`/jobs/${featured.id}`}
//   className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition"
// >
//   Apply Now
//   <FaArrowRight />
// </Link>

//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }













import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaUserTie,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import API from "../Api/JobApi";
import JobBanner from "./JobBanner";

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
      <section className="bg-slate-950 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="flex justify-center py-20">

            <div className="w-10 h-10 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />

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
      <section className="bg-slate-950 py-16">

        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl text-center py-16">

            <h2 className="text-2xl font-bold text-white">
              No Jobs Available
            </h2>

            <p className="text-slate-400 mt-3">
              Check back soon for new opportunities.
            </p>

            <Link
              to="/all-jobs"
              className="inline-flex items-center gap-2 mt-7 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
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
    <section className="bg-slate-950 py-12 sm:py-16">

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* ==========================
            HEADER
        ========================== */}

        <div className="flex items-center justify-between mb-7">

          <div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Recent Jobs
            </h2>

            <p className="text-slate-500 text-sm mt-2">
              Latest job opportunities from verified companies
            </p>

          </div>

          <Link
            to="/all-jobs"
            className="hidden sm:flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold transition"
          >
            View All
            <FaArrowRight className="text-xs" />
          </Link>

        </div>

        {/* ==========================
            JOB LIST
        ========================== */}

        <div className="border-t border-slate-800">

          {jobs.map((job) => (

            <Link
              key={job._id}
              to={`/jobs/${job.slug || job._id}`}
              className="group block border-b border-slate-800 py-6 sm:py-7 hover:bg-slate-900/40 transition"
            >

              <div className="grid grid-cols-1 md:grid-cols-[360px_1fr] lg:grid-cols-[440px_1fr] gap-5 md:gap-8 items-center">

  {/* ==========================
      LEFT IMAGE
  ========================== */}

<div className="flex items-center gap-4 min-w-0">

  {/* JOB BANNER */}
  <div className="w-32 h-24 sm:w-40 sm:h-28 lg:w-104 lg:h-62 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden shrink-0">
    <JobBanner job={job} />
  </div>

  {/* MOBILE COMPANY */}
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

    </div>

    {/* TITLE */}

    <h3 className="hidden md:block text-xl lg:text-2xl font-bold text-white leading-snug group-hover:text-emerald-400 transition">
      {job.jobTitle}
    </h3>

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

        {formatDate(job.createdAt)}
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
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-3 rounded-xl font-semibold transition"
          >
            Browse All Jobs
            <FaArrowRight className="text-sm" />
          </Link>

        </div>

      </div>

    </section>
  );
}





























// import { useEffect, useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaArrowRight,
//   FaSearch,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import API from "../Api/JobApi";
// import JobBanner from "./JobBanner";

// const badgeColor = (tag) => {
//   switch (tag) {
//     case "Full Time":
//       return "px-2.5 py-1 rounded-md text-[10px] font-semibold bg-blue-100 text-blue-600";
//     case "Part Time":
//       return "px-2.5 py-1 rounded-md text-[10px] font-semibold bg-indigo-100 text-indigo-600";
//     case "Internship":
//       return "px-2.5 py-1 rounded-md text-[10px] font-semibold bg-yellow-100 text-yellow-700";
//     case "Remote":
//       return "px-2.5 py-1 rounded-md text-[10px] font-semibold bg-purple-100 text-purple-600";
//     case "Hybrid":
//       return "px-2.5 py-1 rounded-md text-[10px] font-semibold bg-green-100 text-green-600";
//     case "Office":
//       return "px-2.5 py-1 rounded-md text-[10px] font-semibold bg-red-100 text-red-600";
//     default:
//       return "px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-600";
//   }
// };

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
//         setJobs(data.jobs.slice(0, 5));
//       }
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <section className="py-16 bg-slate-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex justify-center py-16">
//             <div className="w-10 h-10 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin" />
//           </div>
//         </div>
//       </section>
//     );
//   }

//   if (jobs.length === 0) {
//     return (
//       <section className="py-16 bg-slate-950">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="text-center py-14 bg-slate-900 rounded-2xl border border-slate-800">
//             <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-slate-800 flex items-center justify-center">
//               <FaSearch className="text-emerald-400 text-xl" />
//             </div>

//             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
//               No Jobs Available
//             </h2>

//             <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base">
//               We don't have any job openings available right now. Check back
//               soon for new opportunities.
//             </p>

//             <Link
//               to="/all-jobs"
//               className="inline-flex mt-6 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-semibold transition"
//             >
//               Browse Jobs
//             </Link>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const featured = jobs[0];

//   return (
//     <section className="py-16 sm:py-20 bg-slate-950">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

//           {/* ================================================= */}
//           {/* RECENT JOBS */}
//           {/* ================================================= */}

//           <div className="lg:col-span-2">

//             <div className="flex justify-between items-center mb-6 sm:mb-8">
//               <h2 className="text-2xl sm:text-3xl font-bold text-white">
//                 Recent Jobs
//               </h2>

//               <Link
//                 to="/all-jobs"
//                 className="text-emerald-400 hover:text-white text-sm font-medium transition"
//               >
//                 View All
//               </Link>
//             </div>

//             <div className="space-y-4">

//               {jobs.map((job) => (
//                 <Link
//                   key={job._id}
//                   to={`/jobs/${job._id}`}
//                   className="
//                     group
//                     block
//                     bg-slate-900
//                     rounded-xl
//                     border
//                     border-slate-800
//                     hover:border-emerald-500/60
//                     transition-all
//                     duration-300
//                     hover:-translate-y-0.5
//                     overflow-hidden
//                   "
//                 >
//                   <div className="p-4 sm:p-5">

//                     <div className="flex items-center gap-4">

//                       {/* ================================= */}
//                       {/* SMALL JOB BANNER */}
//                       {/* ================================= */}

//                       <div
//                         className="
//                           w-[125px]
//                           h-[78px]
//                           sm:w-[155px]
//                           sm:h-[95px]
//                           md:w-[175px]
//                           md:h-[105px]
//                           shrink-0
//                           overflow-hidden
//                           rounded-lg
//                           bg-white
//                           border
//                           border-slate-700
//                         "
//                       >
//                         <div className="w-full h-full pointer-events-none">
//                           <JobBanner job={job} compact />
//                         </div>
//                       </div>

//                       {/* ================================= */}
//                       {/* JOB INFORMATION */}
//                       {/* ================================= */}

//                       <div className="min-w-0 flex-1">

//                         <div className="flex items-start justify-between gap-3">

//                           <div className="min-w-0">

//                             <h3
//                               className="
//                                 text-white
//                                 text-base
//                                 sm:text-lg
//                                 font-semibold
//                                 truncate
//                                 group-hover:text-emerald-400
//                                 transition
//                               "
//                             >
//                               {job.jobTitle}
//                             </h3>

//                             <p className="text-slate-400 text-sm mt-1 truncate">
//                               {job.companyName}
//                             </p>

//                           </div>

//                           <FaArrowRight
//                             className="
//                               text-slate-600
//                               group-hover:text-emerald-400
//                               transition
//                               shrink-0
//                               mt-1
//                             "
//                           />

//                         </div>

//                         {/* Details */}

//                         <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">

//                           {(job.city || job.state) && (
//                             <span className="flex items-center gap-1.5 text-slate-500 text-xs">
//                               <FaMapMarkerAlt className="text-emerald-500" />

//                               <span className="truncate max-w-[140px]">
//                                 {job.city}
//                                 {job.state ? `, ${job.state}` : ""}
//                               </span>
//                             </span>
//                           )}

//                           {(job.salaryMin || job.salaryMax) && (
//                             <span className="flex items-center gap-1.5 text-slate-500 text-xs">
//                               <FaMoneyBillWave className="text-emerald-500" />

//                               ₹{job.salaryMin?.toLocaleString() || "0"}
//                               {" - "}
//                               ₹{job.salaryMax?.toLocaleString() || "0"}
//                             </span>
//                           )}

//                         </div>

//                         {/* Badges */}

//                         <div className="flex flex-wrap gap-2 mt-3">

//                           {job.employmentType && (
//                             <span className={badgeColor(job.employmentType)}>
//                               {job.employmentType}
//                             </span>
//                           )}

//                           {job.workMode && (
//                             <span className={badgeColor(job.workMode)}>
//                               {job.workMode}
//                             </span>
//                           )}

//                         </div>

//                       </div>

//                     </div>

//                   </div>
//                 </Link>
//               ))}

//             </div>

//             {/* Browse All */}

//             <div className="text-center mt-8">

//               <Link
//                 to="/all-jobs"
//                 className="
//                   bg-emerald-500
//                   hover:bg-emerald-600
//                   text-white
//                   px-6
//                   py-3
//                   rounded-lg
//                   font-semibold
//                   transition
//                   inline-flex
//                   items-center
//                   gap-2
//                   text-sm
//                 "
//               >
//                 Browse All Jobs
//                 <FaArrowRight />
//               </Link>

//             </div>

//           </div>

//           {/* ================================================= */}
//           {/* FEATURED JOB */}
//           {/* ================================================= */}

//           <div>

//             <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
//               Featured Job
//             </h2>

//             <div
//               className="
//                 bg-slate-900
//                 rounded-2xl
//                 border
//                 border-slate-800
//                 p-5 sm:p-6
//                 lg:sticky
//                 lg:top-24
//               "
//             >

//               {/* Small Banner */}

//               <div className="w-full aspect-[16/9] overflow-hidden rounded-xl bg-white mb-5">
//                 <JobBanner job={featured} compact />
//               </div>

//               <h3 className="text-xl font-bold text-white">
//                 {featured.jobTitle}
//               </h3>

//               <p className="text-emerald-400 mt-1 text-sm">
//                 {featured.companyName}
//               </p>

//               <div className="space-y-3 mt-5 text-slate-400 text-sm">

//                 {(featured.city || featured.state) && (
//                   <p className="flex items-center gap-3">
//                     <FaMapMarkerAlt className="text-emerald-500 shrink-0" />

//                     {featured.city}
//                     {featured.state ? `, ${featured.state}` : ""}
//                   </p>
//                 )}

//                 {(featured.salaryMin || featured.salaryMax) && (
//                   <p className="flex items-center gap-3">
//                     <FaMoneyBillWave className="text-emerald-500 shrink-0" />

//                     ₹{featured.salaryMin?.toLocaleString() || "0"}
//                     {" - "}
//                     ₹{featured.salaryMax?.toLocaleString() || "0"}
//                   </p>
//                 )}

//               </div>

//               <div className="flex flex-wrap gap-2 mt-5">

//                 {featured.employmentType && (
//                   <span className={badgeColor(featured.employmentType)}>
//                     {featured.employmentType}
//                   </span>
//                 )}

//                 {featured.workMode && (
//                   <span className={badgeColor(featured.workMode)}>
//                     {featured.workMode}
//                   </span>
//                 )}

//               </div>

//               <p className="text-slate-400 text-sm mt-5 leading-6">
//                 {featured.jobSummary
//                   ? featured.jobSummary.substring(0, 120) + "..."
//                   : "Explore this opportunity and discover more details about the role."}
//               </p>

//               <Link
//                 to={`/jobs/${featured._id}`}
//                 className="
//                   w-full
//                   mt-6
//                   bg-emerald-500
//                   hover:bg-emerald-600
//                   py-3
//                   rounded-lg
//                   text-white
//                   font-semibold
//                   flex
//                   justify-center
//                   items-center
//                   gap-2
//                   transition
//                   text-sm
//                 "
//               >
//                 View Job
//                 <FaArrowRight />
//               </Link>

//             </div>

//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }