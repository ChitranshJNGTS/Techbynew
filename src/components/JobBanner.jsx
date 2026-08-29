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

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white">
        <div className="w-4 h-4 border-2 border-slate-300 border-t-green-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) return null;

  // =========================
  // COMPANY LOGO
  // =========================
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

  // =========================
  // JOB TITLE
  // =========================
  const jobTitle =
    job.jobTitle ||
    job.title ||
    job.position ||
    job.role ||
    "Job Opening";

  // =========================
  // COMPANY NAME
  // =========================
  const companyName =
    job.companyName ||
    job.company ||
    "Company";

  return (
    <div className="relative w-full h-full bg-white overflow-hidden">

      {/* =====================================
          TOP LEFT - TECHBY BRANDING
      ===================================== */}
      <div className="absolute top-2 left-3 sm:top-3 sm:left-4 z-20 leading-none">

        {/* Small Tagline */}
        <div className="flex items-end gap-0.5">
          <span className="text-[5px] sm:text-[6px] font-semibold text-black">
            build your
          </span>

          <span
            className="text-[8px] sm:text-[10px] font-semibold italic"
            style={{
              fontFamily: "cursive",
              color: "#16a34a",
            }}
          >
            career
          </span>
        </div>

        {/* Techby */}
        <div
          className="text-[13px] sm:text-[16px] font-extrabold tracking-tight"
          style={{
            color: "#16a34a",
          }}
        >
          Techby
        </div>

      </div>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}
      <div className="w-full h-full flex items-center px-3 sm:px-5 pt-4 pb-6">

        {/* =====================================
            LEFT - COMPANY LOGO
        ===================================== */}
        <div className="w-[45%] h-full flex items-center justify-center">

          <div
            className="
              w-[75px] h-[55px]
              sm:w-[105px] sm:h-[70px]
              md:w-[140px] md:h-[90px]
              flex items-center justify-center
            "
          >
            {companyLogo ? (
              <img
                src={companyLogo}
                alt={companyName}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="text-center">
                <div className="text-xs sm:text-sm md:text-base font-bold text-slate-900 leading-tight">
                  {companyName}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* =====================================
            RIGHT - JOB INFORMATION
        ===================================== */}
        <div
          className="
            w-[55%]
            h-full
            flex
            flex-col
            justify-center
            pl-2
            sm:pl-4
            md:pl-6
          "
        >

          {/* Company Name */}
          <div
            className="
              text-[7px]
              sm:text-[9px]
              md:text-[11px]
              font-semibold
              text-black
              mb-0.5
              truncate
              max-w-full
            "
          >
            {companyName}
          </div>

          {/* Off Campus */}
          <div
            className="
              text-[15px]
              sm:text-[20px]
              md:text-[28px]
              font-extrabold
              leading-[0.9]
              text-black
            "
          >
            Off Campus
          </div>

          {/* Drive */}
          <div
            className="
              text-[15px]
              sm:text-[20px]
              md:text-[28px]
              font-extrabold
              leading-[0.9]
            "
            style={{
              color: "#16a34a",
            }}
          >
            Drive
          </div>

          {/* Job Title */}
          <div className="mt-1.5 sm:mt-2 max-w-[180px] sm:max-w-[220px] md:max-w-[260px]">

            <div
              className="
                text-[8px]
                sm:text-[10px]
                md:text-[13px]
                font-bold
                text-slate-900
                leading-tight
                line-clamp-2
              "
            >
              {jobTitle}
            </div>

          </div>

          {/* Apply Now */}
          <div className="mt-2 sm:mt-3">

            <div
              className="
                inline-flex
                items-center
                justify-center
                bg-black
                text-white
                px-2.5
                sm:px-4
                md:px-5
                py-1
                sm:py-1.5
                text-[7px]
                sm:text-[9px]
                md:text-[11px]
                font-bold
                rounded-sm
              "
            >
              Apply Now
            </div>

          </div>

        </div>
      </div>

      {/* =====================================
          BOTTOM LEFT TEXT
      ===================================== */}
      <div
        className="
          absolute
          bottom-2
          left-3
          sm:bottom-2.5
          sm:left-5
          text-[5px]
          sm:text-[6px]
          md:text-[8px]
          font-semibold
          text-black
        "
      >
        Visit{" "}

        <span
          className="font-bold"
          style={{
            color: "#16a34a",
          }}
        >
          techby.in
        </span>{" "}

        to find more genuine openings.
      </div>

      {/* =====================================
          BOTTOM GREEN LINE
      ===================================== */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-[1px]
          sm:h-[2px]
        "
        style={{
          backgroundColor: "#16a34a",
        }}
      />

    </div>
  );
}

