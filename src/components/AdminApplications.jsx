// import { useEffect, useState } from "react";
// import API from "../Api/JobApi";

// export default function AdminApplications() {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Selected resume URL
//   const [selectedResume, setSelectedResume] = useState(null);

//   // Fetch applications
//   useEffect(() => {
//     fetchApplications();
//   }, []);

//   const fetchApplications = async () => {
//     try {
//       setLoading(true);

//       const { data } = await API.get("/applications/all");

//       if (data.success) {
//         setApplications(data.applications || []);
//       }
//     } catch (error) {
//       console.error("Fetch Applications Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open resume
//   const handleViewResume = (resumeUrl) => {
//     if (!resumeUrl) {
//       return;
//     }

//     setSelectedResume(resumeUrl);
//   };

//   // Close resume viewer
//   const closeResume = () => {
//     setSelectedResume(null);
//   };

//   // Open resume in new browser tab
//   const openResumeNewTab = () => {
//     if (!selectedResume) return;

//     window.open(selectedResume, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">

//         {/* ================= HEADER ================= */}

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-white">
//               Job Applications
//             </h1>

//             <p className="text-slate-500 mt-2">
//               View candidates who have applied for your jobs.
//             </p>
//           </div>

//           <div className="bg-slate-900 border border-slate-800 px-5 py-3 rounded-xl">
//             <span className="text-slate-400 text-sm">
//               Total Applications
//             </span>

//             <p className="text-emerald-400 text-xl font-bold">
//               {applications.length}
//             </p>
//           </div>

//         </div>


//         {/* ================= LOADING ================= */}

//         {loading && (
//           <div className="flex items-center justify-center py-20">

//             <div className="text-center">

//               <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin mx-auto" />

//               <p className="text-slate-400 mt-4">
//                 Loading applications...
//               </p>

//             </div>

//           </div>
//         )}


//         {/* ================= NO APPLICATIONS ================= */}

//         {!loading && applications.length === 0 && (
//           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

//             <h2 className="text-xl font-semibold text-white">
//               No Applications Yet
//             </h2>

//             <p className="text-slate-500 mt-2">
//               Applications will appear here when candidates apply for jobs.
//             </p>

//           </div>
//         )}


//         {/* ================= APPLICATION TABLE ================= */}

//         {!loading && applications.length > 0 && (
//           <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

//             <div className="overflow-x-auto">

//               <table className="w-full min-w-[1100px]">

//                 {/* TABLE HEADER */}

//                 <thead className="bg-emerald-600">

//                   <tr>

//                     <th className="p-4 text-left text-white font-semibold">
//                       Candidate
//                     </th>

//                     <th className="p-4 text-left text-white font-semibold">
//                       Email
//                     </th>

//                     <th className="p-4 text-left text-white font-semibold">
//                       Phone
//                     </th>

//                     <th className="p-4 text-left text-white font-semibold">
//                       Job
//                     </th>

//                     <th className="p-4 text-left text-white font-semibold">
//                       Company
//                     </th>

//                     <th className="p-4 text-center text-white font-semibold">
//                       Resume
//                     </th>

//                     <th className="p-4 text-center text-white font-semibold">
//                       Applied
//                     </th>

//                   </tr>

//                 </thead>


//                 {/* TABLE BODY */}

//                 <tbody>

//                   {applications.map((item) => (

//                     <tr
//                       key={item._id}
//                       className="border-b border-slate-800 hover:bg-slate-800/50 transition"
//                     >

//                       {/* Candidate */}

//                       <td className="p-4">

//                         <div className="flex flex-col">

//                           <span className="text-white font-semibold">
//                             {item.candidate?.name || "N/A"}
//                           </span>

//                           {item.candidate?.city && (
//                             <span className="text-xs text-slate-500 mt-1">
//                               {item.candidate.city}
//                               {item.candidate.state
//                                 ? `, ${item.candidate.state}`
//                                 : ""}
//                             </span>
//                           )}

//                         </div>

//                       </td>


//                       {/* Email */}

//                       <td className="p-4">

//                         <span className="text-slate-300">
//                           {item.candidate?.email || "N/A"}
//                         </span>

//                       </td>


//                       {/* Phone */}

//                       <td className="p-4">

//                         <span className="text-slate-300">
//                           {item.candidate?.phone || "N/A"}
//                         </span>

//                       </td>


//                       {/* Job */}

//                       <td className="p-4">

//                         <div className="flex flex-col">

//                           <span className="text-white font-medium">
//                             {item.job?.jobTitle || "N/A"}
//                           </span>

//                           {item.job?.city && (
//                             <span className="text-xs text-slate-500 mt-1">
//                               {item.job.city}
//                               {item.job.state
//                                 ? `, ${item.job.state}`
//                                 : ""}
//                             </span>
//                           )}

//                         </div>

//                       </td>


//                       {/* Company */}

//                       <td className="p-4">

//                         <span className="text-emerald-400 font-medium">
//                           {item.job?.companyName || "N/A"}
//                         </span>

//                       </td>


//                       {/* Resume */}

//                       <td className="p-4 text-center">

//                         {item.candidate?.resume ? (

//                           <button
//                             onClick={() =>
//                               handleViewResume(
//                                 item.candidate.resume
//                               )
//                             }
//                             className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition"
//                           >

//                             {/* PDF Icon */}

//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="w-4 h-4"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0011.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z"
//                               />

//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d="M13 2v6h6"
//                               />
//                             </svg>

//                             View Resume

//                           </button>

//                         ) : (

//                           <span className="text-slate-500">
//                             No Resume
//                           </span>

//                         )}

//                       </td>


//                       {/* Applied Date */}

//                       <td className="p-4 text-center">

//                         <span className="text-slate-400 text-sm">

//                           {item.createdAt
//                             ? new Date(
//                                 item.createdAt
//                               ).toLocaleDateString()
//                             : "N/A"}

//                         </span>

//                       </td>

//                     </tr>

//                   ))}

//                 </tbody>

//               </table>

//             </div>

//           </div>
//         )}

//       </div>


//       {/* ================================================= */}
//       {/* PDF RESUME MODAL */}
//       {/* ================================================= */}

//       {selectedResume && (

//         <div
//           className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
//           onClick={closeResume}
//         >

//           {/* Modal */}

//           <div
//             className="relative bg-slate-900 w-full max-w-6xl h-[95vh] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col"
//             onClick={(e) => e.stopPropagation()}
//           >

//             {/* ================= MODAL HEADER ================= */}

//             <div className="h-16 shrink-0 bg-slate-950 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between">

//               <div className="flex items-center gap-3">

//                 <div className="w-9 h-9 bg-red-500/10 rounded-lg flex items-center justify-center">

//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5 text-red-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0011.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z"
//                     />

//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M13 2v6h6"
//                     />
//                   </svg>

//                 </div>

//                 <div>

//                   <h2 className="text-white font-semibold">
//                     Candidate Resume
//                   </h2>

//                   <p className="text-xs text-slate-500">
//                     PDF Document
//                   </p>

//                 </div>

//               </div>


//               {/* Header Buttons */}

//               <div className="flex items-center gap-2">

//                 {/* Open New Tab */}

//                 <button
//                   onClick={openResumeNewTab}
//                   className="hidden sm:flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm transition"
//                 >

//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-4 h-4"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
//                     />

//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M14 4h6m0 0v6m0-6L10 14"
//                     />

//                   </svg>

//                   Open New Tab

//                 </button>


//                 {/* Close */}

//                 <button
//                   onClick={closeResume}
//                   className="w-10 h-10 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition"
//                   aria-label="Close resume"
//                 >

//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="w-5 h-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>

//                 </button>

//               </div>

//             </div>


//             {/* ================= PDF VIEWER ================= */}

//             <div className="flex-1 bg-slate-800">

//               <iframe
//                 src={selectedResume}
//                 title="Candidate Resume"
//                 className="w-full h-full border-0"
//               />

//             </div>

//           </div>

//         </div>

//       )}

//     </>
//   );
// } 





import { useEffect, useState } from "react";
import API from "../Api/JobApi";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedResume, setSelectedResume] = useState(null);

  // Fetch applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/applications/all");

      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error("Fetch Applications Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Open resume
  const handleViewResume = (resumeUrl) => {
    if (!resumeUrl) return;
    setSelectedResume(resumeUrl);
  };

  // Close resume viewer
  const closeResume = () => {
    setSelectedResume(null);
  };

  // Open resume in new browser tab
  const openResumeNewTab = () => {
    if (!selectedResume) return;

    window.open(selectedResume, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">

        {/* ================= HEADER ================= */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Job Applications
            </h1>

            <p className="text-slate-500 mt-2">
              View candidates who have applied for your jobs.
            </p>
          </div>

          {/* Total Applications */}

          <div className="bg-white border border-slate-200 px-5 py-3 rounded-xl shadow-sm">

            <span className="text-slate-500 text-sm">
              Total Applications
            </span>

            <p className="text-emerald-600 text-xl font-bold">
              {applications.length}
            </p>

          </div>

        </div>


        {/* ================= LOADING ================= */}

        {loading && (
          <div className="flex items-center justify-center py-20">

            <div className="text-center">

              <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mx-auto" />

              <p className="text-slate-500 mt-4">
                Loading applications...
              </p>

            </div>

          </div>
        )}


        {/* ================= NO APPLICATIONS ================= */}

        {!loading && applications.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">

            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-4">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                />

                <circle
                  cx="9"
                  cy="7"
                  r="4"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                />
              </svg>

            </div>

            <h2 className="text-xl font-semibold text-slate-900">
              No Applications Yet
            </h2>

            <p className="text-slate-500 mt-2">
              Applications will appear here when candidates apply for jobs.
            </p>

          </div>
        )}


        {/* ================= APPLICATION TABLE ================= */}

        {!loading && applications.length > 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[1100px]">

                {/* TABLE HEADER */}

                <thead className="bg-emerald-600">

                  <tr>

                    <th className="p-4 text-left text-white font-semibold">
                      Candidate
                    </th>

                    <th className="p-4 text-left text-white font-semibold">
                      Email
                    </th>

                    <th className="p-4 text-left text-white font-semibold">
                      Phone
                    </th>

                    <th className="p-4 text-left text-white font-semibold">
                      Job
                    </th>

                    <th className="p-4 text-left text-white font-semibold">
                      Company
                    </th>

                    <th className="p-4 text-center text-white font-semibold">
                      Resume
                    </th>

                    <th className="p-4 text-center text-white font-semibold">
                      Applied
                    </th>

                  </tr>

                </thead>


                {/* TABLE BODY */}

                <tbody>

                  {applications.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b border-slate-100 hover:bg-emerald-50/40 transition"
                    >

                      {/* Candidate */}

                      <td className="p-4">

                        <div className="flex flex-col">

                          <span className="text-slate-900 font-semibold">
                            {item.candidate?.name || "N/A"}
                          </span>

                          {item.candidate?.city && (
                            <span className="text-xs text-slate-500 mt-1">
                              {item.candidate.city}
                              {item.candidate.state
                                ? `, ${item.candidate.state}`
                                : ""}
                            </span>
                          )}

                        </div>

                      </td>


                      {/* Email */}

                      <td className="p-4">

                        <span className="text-slate-600">
                          {item.candidate?.email || "N/A"}
                        </span>

                      </td>


                      {/* Phone */}

                      <td className="p-4">

                        <span className="text-slate-600">
                          {item.candidate?.phone || "N/A"}
                        </span>

                      </td>


                      {/* Job */}

                      <td className="p-4">

                        <div className="flex flex-col">

                          <span className="text-slate-900 font-medium">
                            {item.job?.jobTitle || "N/A"}
                          </span>

                          {item.job?.city && (
                            <span className="text-xs text-slate-500 mt-1">
                              {item.job.city}
                              {item.job.state
                                ? `, ${item.job.state}`
                                : ""}
                            </span>
                          )}

                        </div>

                      </td>


                      {/* Company */}

                      <td className="p-4">

                        <span className="text-emerald-600 font-medium">
                          {item.job?.companyName || "N/A"}
                        </span>

                      </td>


                      {/* Resume */}

                      <td className="p-4 text-center">

                        {item.candidate?.resume ? (

                          <button
                            onClick={() =>
                              handleViewResume(item.candidate.resume)
                            }
                            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition shadow-sm"
                          >

                            {/* PDF Icon */}

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0011.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z"
                              />

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13 2v6h6"
                              />

                            </svg>

                            View Resume

                          </button>

                        ) : (

                          <span className="text-slate-400">
                            No Resume
                          </span>

                        )}

                      </td>


                      {/* Applied Date */}

                      <td className="p-4 text-center">

                        <span className="text-slate-500 text-sm">

                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString()
                            : "N/A"}

                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

      </div>


      {/* ================================================= */}
      {/* PDF RESUME MODAL */}
      {/* ================================================= */}

      {selectedResume && (

        <div
          className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={closeResume}
        >

          {/* Modal */}

          <div
            className="relative bg-white w-full max-w-6xl h-[95vh] rounded-2xl overflow-hidden border border-slate-200 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ================= MODAL HEADER ================= */}

            <div className="h-16 shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center">

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21h10a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0011.586 2H7a2 2 0 00-2 2v15a2 2 0 002 2z"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 2v6h6"
                    />

                  </svg>

                </div>


                <div>

                  <h2 className="text-slate-900 font-semibold">
                    Candidate Resume
                  </h2>

                  <p className="text-xs text-slate-500">
                    PDF Document
                  </p>

                </div>

              </div>


              {/* Header Buttons */}

              <div className="flex items-center gap-2">

                {/* Open New Tab */}

                <button
                  onClick={openResumeNewTab}
                  className="hidden sm:flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm transition"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 4h6m0 0v6m0-6L10 14"
                    />

                  </svg>

                  Open New Tab

                </button>


                {/* Close */}

                <button
                  onClick={closeResume}
                  className="w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition"
                  aria-label="Close resume"
                >

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />

                  </svg>

                </button>

              </div>

            </div>


            {/* ================= PDF VIEWER ================= */}

            <div className="flex-1 bg-slate-100">

              <iframe
                src={selectedResume}
                title="Candidate Resume"
                className="w-full h-full border-0"
              />

            </div>

          </div>

        </div>

      )}

    </>
  );
}

