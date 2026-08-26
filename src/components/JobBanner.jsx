// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../Api/JobApi";

// export default function JobBanner({ job: jobProp }) {
//   const { id } = useParams();

//   const [job, setJob] = useState(jobProp || null);
//   const [loading, setLoading] = useState(!jobProp);

//   useEffect(() => {
//     if (jobProp) {
//       setJob(jobProp);
//       setLoading(false);
//       return;
//     }

//     if (!id) return;

//     const getJob = async () => {
//       try {
//         const { data } = await API.get(`/jobs/${id}`);

//         if (data.success) {
//           setJob(data.job);
//         }
//       } catch (error) {
//         console.error("Job Banner Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getJob();
//   }, [id, jobProp]);

//   if (loading) {
//     return (
//       <div className="w-full h-full flex items-center justify-center bg-white">
//         <div className="w-5 h-5 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!job) return null;

//   const getCompanyLogo = () => {
//     if (!job.companyLogo) return null;

//     if (
//       job.companyLogo.startsWith("http://") ||
//       job.companyLogo.startsWith("https://")
//     ) {
//       return job.companyLogo;
//     }

//     const baseURL = API.defaults?.baseURL || "";

//     return `${baseURL.replace(/\/api\/?$/, "")}${
//       job.companyLogo.startsWith("/") ? "" : "/"
//     }${job.companyLogo}`;
//   };

//   const companyLogo = getCompanyLogo();

//   return (
//     <div className="relative w-full h-full bg-white overflow-hidden">

//       {/* =========================
//           WEBSITE LOGO - TOP LEFT
//       ========================= */}
//       <div className="absolute top-2 left-3 z-10 flex items-center gap-1.5">

//         <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center">
//           <span className="text-[6px] sm:text-[7px] font-bold text-emerald-500">
//             TB
//           </span>
//         </div>

//         <span className="text-[9px] sm:text-[11px] font-bold text-slate-800">
//           Tech<span className="font-normal">By</span>
//         </span>

//       </div>

//       {/* GREEN TOP BORDER */}
//       <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500" />

//       {/* =========================
//           MAIN CONTENT
//       ========================= */}
//       <div className="w-full h-full flex items-center px-4 sm:px-7 pt-5">

//         {/* =========================
//             LEFT - COMPANY LOGO
//         ========================= */}
//         <div className="w-[35%] flex items-center justify-center">

//           <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex items-center justify-center">

//             {companyLogo ? (
//               <img
//                 src={companyLogo}
//                 alt={job.companyName || "Company"}
//                 className="w-full h-full object-contain"
//                 onError={(e) => {
//                   e.currentTarget.style.display = "none";
//                 }}
//               />
//             ) : (
//               <span className="text-emerald-600 font-bold text-xs text-center">
//                 {job.companyName || "Company"}
//               </span>
//             )}

//           </div>

//         </div>

//         {/* VERTICAL DIVIDER */}
//         <div className="w-px h-16 sm:h-20 bg-slate-200 mx-3 sm:mx-5" />

//         {/* =========================
//             RIGHT - JOB TITLE
//         ========================= */}
//         <div className="flex-1 min-w-0">

//           <p className="text-[9px] sm:text-xs text-emerald-600 font-semibold mb-1">
//             {job.companyName || "Company"}
//           </p>

//           <h1 className="text-sm sm:text-lg md:text-xl font-bold text-slate-900 leading-tight line-clamp-3">
//             {job.jobTitle || "Job Opportunity"}
//           </h1>

//         </div>

//       </div>

//     </div>
//   );
// }












import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "../Api/JobApi";

export default function JobBanner({ job: jobProp }) {
  const { id } = useParams();

  const [job, setJob] = useState(jobProp || null);
  const [loading, setLoading] = useState(!jobProp);

  useEffect(() => {
    if (jobProp) {
      setJob(jobProp);
      setLoading(false);
      return;
    }

    if (!id) return;

    const getJob = async () => {
      try {
        const { data } = await API.get(`/jobs/${id}`);

        if (data.success) {
          setJob(data.job);
        }
      } catch (error) {
        console.error("Job Banner Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getJob();
  }, [id, jobProp]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="w-5 h-5 border-2 border-slate-300 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) return null;

  const getCompanyLogo = () => {
    if (!job.companyLogo) return null;

    if (
      job.companyLogo.startsWith("http://") ||
      job.companyLogo.startsWith("https://")
    ) {
      return job.companyLogo;
    }

    const baseURL = API.defaults?.baseURL || "";

    return `${baseURL.replace(/\/api\/?$/, "")}${
      job.companyLogo.startsWith("/") ? "" : "/"
    }${job.companyLogo}`;
  };

  const companyLogo = getCompanyLogo();

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">

      {/* =========================
          TECHBY LOGO - TOP LEFT
      ========================= */}

      <div className="absolute top-2 left-3 z-10 flex items-center gap-1.5">

        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center">
          <span className="text-[6px] sm:text-[7px] font-bold text-emerald-500">
            TB
          </span>
        </div>

        <span className="text-[9px] sm:text-[11px] font-bold text-slate-800">
          Tech<span className="font-normal">By</span>
        </span>

      </div>

      {/* =========================
          GREEN TOP BORDER
      ========================= */}

      <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500" />

      {/* =========================
          COMPANY LOGO ONLY
      ========================= */}

      <div className="w-full h-full flex items-center justify-center px-6 pt-4">

        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-72 md:h-42 flex items-center justify-center">

          {companyLogo ? (
            <img
              src={companyLogo}
              alt={job.companyName || "Company"}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <span className="text-emerald-600 font-bold text-sm text-center">
              {job.companyName || "Company"}
            </span>
          )}

        </div>

      </div>

    </div>
  );
}