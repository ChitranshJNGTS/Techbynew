// import {
//   FaMapMarkerAlt,
//   FaBriefcase,
//   FaClock,
//   FaMoneyBillWave,
//   FaGlobe,
//   FaEnvelope,
//   FaPhoneAlt,
//   FaCheckCircle,
//   FaArrowRight,
//   FaBuilding,
//   FaCalendarAlt,
//   FaExternalLinkAlt,
//   FaLaptopHouse,
//   FaBolt,
//   FaShareAlt,
//   FaFileAlt,
//   FaUpload,
//   FaTimes,
// } from "react-icons/fa";
// import { toast } from "react-toastify";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import API from "../Api/JobApi";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
// import Ads from "./Ads";
//   const CompanyLogo = ({
//   logo,
//   companyName,
//   className = "w-full h-full object-contain rounded-xl",
// }) => {
//   const [imageError, setImageError] = useState(false);

//   if (!logo || imageError) {
//     return (
//       <div
//         className={`${className} flex items-center justify-center text-center text-slate-900 font-bold px-2 leading-tight`}
//       >
//         {companyName || "Company"}
//       </div>
//     );
//   }

//   return (
//     <img
//       src={logo}
//       alt={companyName || "Company"}
//       className={className}
//       onError={() => setImageError(true)}
//     />
//   );
// };
// export default function JobDescription() {
//   const { slug } = useParams();

//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showApplyModal, setShowApplyModal] = useState(false);
// const [submittingApplication, setSubmittingApplication] = useState(false);

// const [applicationForm, setApplicationForm] = useState({
//   name: "",
//   email: "",
//   phone: "",
//   experience: "",
//   coverLetter: "",
// });

// const [resume, setResume] = useState(null);

//   useEffect(() => {
//     getJob();
//   }, [slug]);

//   const getJob = async () => {
//     try {
//       setLoading(true);

//       const { data } = await API.get(`/jobs/slug/${slug}`);

//       if (data.success) {
//         setJob(data.job);
//       } else {
//         setError("Job not found.");
//       }
//     } catch (err) {
//       console.log(err);
//       setError("Failed to load job.");
//     } finally {
//       setLoading(false);
//     }
//   };



// const applyJob = () => {
//   const applyLink = job?.applyLink?.trim();

//   // 1. If external apply link exists → open it
//   if (applyLink) {
//     window.open(applyLink, "_blank", "noopener,noreferrer");
//     return;
//   }

//   // 2. If no external apply link → open TechBy application form
//   setShowApplyModal(true);
// };
// const handleApplicationChange = (e) => {
//   const { name, value } = e.target;

//   setApplicationForm((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };



// const handleResumeChange = (e) => {
//   const file = e.target.files?.[0];

//   if (!file) return;

//   const allowedTypes = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   ];

//   if (!allowedTypes.includes(file.type)) {
//     toast.error("Only PDF, DOC and DOCX files are allowed.");
//     e.target.value = "";
//     return;
//   }

//   if (file.size > 5 * 1024 * 1024) {
//     toast.error("Resume must be less than 5 MB.");
//     e.target.value = "";
//     return;
//   }

//   setResume(file);
// };


// const submitApplication = async (e) => {
//   e.preventDefault();

//   if (!applicationForm.name.trim()) {
//     toast.error("Please enter your name.");
//     return;
//   }

//   if (!applicationForm.email.trim()) {
//     toast.error("Please enter your email.");
//     return;
//   }

//   if (!applicationForm.phone.trim()) {
//     toast.error("Please enter your phone number.");
//     return;
//   }

//   if (!resume) {
//     toast.error("Please upload your resume.");
//     return;
//   }

//   try {
//     setSubmittingApplication(true);

//     const formData = new FormData();

//     formData.append(
//       "name",
//       applicationForm.name
//     );

//     formData.append(
//       "email",
//       applicationForm.email
//     );

//     formData.append(
//       "phone",
//       applicationForm.phone
//     );

//     formData.append(
//       "experience",
//       applicationForm.experience
//     );

//     formData.append(
//       "coverLetter",
//       applicationForm.coverLetter
//     );

//     formData.append(
//       "resume",
//       resume
//     );

//     const { data } = await API.post(
//       `/applications/apply/${job._id}`,
//       formData
//     );

//     if (data.success) {
//       toast.success(
//         "Application submitted successfully!"
//       );

//       setShowApplyModal(false);

//       setApplicationForm({
//         name: "",
//         email: "",
//         phone: "",
//         experience: "",
//         coverLetter: "",
//       });

//       setResume(null);
//     }

//   } catch (error) {
//     console.error(
//       "Application error:",
//       error
//     );

//     toast.error(
//       error.response?.data?.message ||
//         "Failed to submit application."
//     );

//   } finally {
//     setSubmittingApplication(false);
//   }
// };


// const shareJob = async () => {
//   try {
//     const shareUrl =
//       `${window.location.origin}/jobs/${job.slug}`;

//     const shareData = {
//       title: `${job.jobTitle} - ${job.companyName}`,

//       text:
//         `${job.jobTitle} at ${job.companyName}\n\n` +
//         `${job.jobSummary || "Check out this job opportunity."}\n\n` +
//         `${job.city ? `📍 ${job.city}${job.state ? `, ${job.state}` : ""}\n` : ""}` +
//         `${job.experience ? `💼 ${job.experience}\n` : ""}` +
//         `${
//           job.salaryMin || job.salaryMax
//             ? `💰 ₹${job.salaryMin?.toLocaleString() || ""}${
//                 job.salaryMax
//                   ? ` - ₹${job.salaryMax.toLocaleString()}`
//                   : ""
//               }`
//             : ""
//         }`,

//       url: shareUrl,
//     };

//     if (navigator.share) {
//       await navigator.share(shareData);
//     } else {
//       await navigator.clipboard.writeText(shareUrl);
//       toast.success("Job share link copied!");
//     }
//   } catch (error) {
//     if (error.name !== "AbortError") {
//       console.error("Share error:", error);
//       toast.error("Unable to share job.");
//     }
//   }
// };



// // const shareJob = async () => {
// //   try {
// //     // Backend share controller
// //     const shareUrl = `${API.defaults.baseURL}/jobs/share/${job._id}`;

// //     const shareData = {
// //       title: `${job.jobTitle} - ${job.companyName}`,

// //       text:
// //         `${job.jobTitle} at ${job.companyName}\n\n` +
// //         `${job.jobSummary || "Check out this job opportunity."}\n\n` +
// //         `${
// //           job.city
// //             ? `📍 ${job.city}${job.state ? `, ${job.state}` : ""}\n`
// //             : ""
// //         }` +
// //         `${job.experience ? `💼 ${job.experience}\n` : ""}` +
// //         `${
// //           job.salaryMin || job.salaryMax
// //             ? `💰 ₹${job.salaryMin?.toLocaleString() || ""}${
// //                 job.salaryMax
// //                   ? ` - ₹${job.salaryMax.toLocaleString()}`
// //                   : ""
// //               }`
// //             : ""
// //         }`,

// //       url: shareUrl,
// //     };

// //     if (navigator.share) {
// //       await navigator.share(shareData);
// //     } else {
// //       await navigator.clipboard.writeText(shareUrl);
// //       toast.success("Job share link copied!");
// //     }
// //   } catch (error) {
// //     if (error.name !== "AbortError") {
// //       console.error("Share error:", error);
// //       toast.error("Unable to share job.");
// //     }
// //   }
// // };


//   if (loading) {
//     return (
//       <>
//         <Navbar />

//         <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
//           <div className="text-center">
//             <div className="w-14 h-14 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>

//             <h1 className="text-white text-xl font-semibold mt-6">
//               Loading Job...
//             </h1>

//             <p className="text-slate-500 mt-2">
//               Please wait while we fetch the job details.
//             </p>
//           </div>
//         </div>

//         <Footer />
//       </>
//     );
//   }

//   if (error || !job) {
//     return (
//       <>
//         <Navbar />

//         <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
//           <div className="text-center max-w-md">
//             <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
//               <FaBriefcase className="text-red-400 text-3xl" />
//             </div>

//             <h1 className="text-white text-3xl font-bold mt-6">
//               Job Not Found
//             </h1>

//             <p className="text-slate-400 mt-3">
//               {error ||
//                 "This job may have been removed or is no longer available."}
//             </p>
//           </div>
//         </div>

//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <main className="bg-slate-950 min-h-screen">

//         {/* ================= HERO ================= */}

//         <section className="relative overflow-hidden border-b border-slate-800">

//           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/5 pointer-events-none"></div>
//  {/* ================= BANNER AD ================= */}
// <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
//   <div className="w-full flex justify-center items-center overflow-hidden">
    
//     {/* Desktop */}
//     <div className="hidden sm:block">
//       <Ads type="728x90" />
//     </div>

//     {/* Mobile */}
//     <div className="block sm:hidden">
//       <Ads type="320x50" />
//     </div>

//   </div>
// </div>

//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative">
//             <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
//               <span>Jobs</span>

//               <FaArrowRight className="text-[10px]" />

//               <span className="text-slate-300">
//                 {job.jobTitle}
//               </span>
//             </div>

//             <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">

//               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

//                 <div className="flex gap-5 sm:gap-7">

//                   {/* Company Logo */}

//                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-58 md:h-48 rounded-2xl bg-white border border-slate-700 p-3 shrink-0 flex items-center justify-center">
//   <CompanyLogo
//     logo={job.companyLogo}
//     companyName={job.companyName}
//   />
// </div>

//                   <div className="min-w-0">

//                     {/* Badges */}

//                     <div className="flex flex-wrap gap-2 mb-4">

//                       {job.employmentType && (
//                         <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
//                           {job.employmentType}
//                         </span>
//                       )}

//                       {job.workMode && (
//                         <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
//                           {job.workMode}
//                         </span>
//                       )}

//                       {job.featured && (
//                         <span className="px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
//                           Featured
//                         </span>
//                       )}

//                       {job.urgentHiring && (
//                         <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5">
//                           <FaBolt />
//                           Urgent Hiring
//                         </span>
//                       )}

//                     </div>

//                     {/* Job Title */}

//                     {job.jobTitle && (
//                       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
//                         {job.jobTitle}
//                       </h1>
//                     )}

//                     {/* Company */}

//                     {job.companyName && (
//                       <div className="flex items-center gap-2 mt-3">
//                         <span className="text-emerald-400 font-semibold">
//                           {job.companyName}
//                         </span>

//                         <FaCheckCircle className="text-emerald-500 text-sm" />
//                       </div>
//                     )}

//                     {/* Basic Details */}

//                     <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-sm text-slate-400">

//                       {(job.city || job.state) && (
//                         <span className="flex items-center gap-2">
//                           <FaMapMarkerAlt className="text-emerald-400" />
//                           {job.city}
//                           {job.city && job.state ? ", " : ""}
//                           {job.state}
//                         </span>
//                       )}

//                       {job.experience && (
//                         <span className="flex items-center gap-2">
//                           <FaBriefcase className="text-emerald-400" />
//                           {job.experience}
//                         </span>
//                       )}

//                       {(job.salaryMin || job.salaryMax) && (
//                         <span className="flex items-center gap-2">
//                           <FaMoneyBillWave className="text-emerald-400" />

//                           ₹{job.salaryMin?.toLocaleString() || "0"}
//                           {job.salaryMax
//                             ? ` - ₹${job.salaryMax.toLocaleString()}`
//                             : ""}
//                         </span>
//                       )}

//                     </div>

//                   </div>

//                 </div>

//                 {/* Actions */}

//                 <div className="lg:min-w-[190px] space-y-3">

//                   <button
//   onClick={applyJob}
//   className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-4 rounded-xl font-bold transition flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/10"
// >
//   Apply Now
//   <FaArrowRight />
// </button>

//                   <button
//                     onClick={shareJob}
//                     className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-7 py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-3"
//                   >
//                     <FaShareAlt />
//                     Share Job
//                   </button>

//                   <p className="text-center text-xs text-slate-500">
//                     Apply directly through TechBy
//                   </p>

//                 </div>

//               </div>

//             </div>
//           </div>
//         </section>


//         {/* ================= MAIN CONTENT ================= */}

//         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

//           <div className="grid lg:grid-cols-3 gap-8">

//             {/* ================= LEFT ================= */}

//             <div className="lg:col-span-2 space-y-6">

//               {/* Job Summary */}

//               {job.jobSummary && (
//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

//                   <SectionTitle title="Job Summary" />

//                   <p className="text-slate-400 leading-8 whitespace-pre-line">
//                     {job.jobSummary}
//                   </p>

//                 </div>
//               )}


//               {/* Responsibilities */}

//               {job.responsibilities && (
//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

//                   <SectionTitle title="Responsibilities" />

//                   <div className="text-slate-400 leading-8 whitespace-pre-line">
//                     {job.responsibilities}
//                   </div>

//                 </div>
//               )}


//               {/* Requirements */}

//               {job.requirements && (
//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

//                   <SectionTitle title="Requirements" />

//                   <div className="text-slate-400 leading-8 whitespace-pre-line">
//                     {job.requirements}
//                   </div>

//                 </div>
//               )}


//               {/* Skills */}

//               {Array.isArray(job.skills) && job.skills.length > 0 && (
//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

//                     <SectionTitle title="Required Skills" />

//                     <span className="text-xs font-semibold text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full">
//                       {job.skills.length} Skills
//                     </span>

//                   </div>

//                   <div className="flex flex-wrap gap-3">

//                     {job.skills.map((skill) => (
//                       <span
//                         key={skill}
//                         className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition"
//                       >
//                         {skill}
//                       </span>
//                     ))}

//                   </div>

//                 </div>
//               )}


//               {/* Benefits */}

//               {job.benefits && (
//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

//                   <SectionTitle title="Benefits" />

//                   <div className="text-slate-400 leading-8 whitespace-pre-line">
//                     {job.benefits}
//                   </div>

//                 </div>
//               )}


//               {/* About Company */}

//               {job.companyName && (
//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">

//                   <SectionTitle title="About the Company" />

//                   <div className="flex flex-col sm:flex-row gap-5">

//                    <div className="w-20 h-20 rounded-2xl bg-white p-3 shrink-0 flex items-center justify-center">
//   <CompanyLogo
//     logo={job.companyLogo}
//     companyName={job.companyName}
//     className="w-full h-full object-contain"
//   />
// </div>

//                     <div>

//                       <div className="flex items-center gap-2">

//                         <h3 className="text-xl font-bold text-white">
//                           {job.companyName}
//                         </h3>

//                         <FaCheckCircle className="text-emerald-500" />

//                       </div>

//                       {job.companyDescription && (
//                         <p className="text-slate-500 mt-2">
//                           {job.companyDescription}
//                         </p>
//                       )}

//                     </div>

//                   </div>

//                 </div>
//               )}

//             </div>


//             {/* ================= RIGHT SIDEBAR ================= */}

//             <aside className="space-y-6">

//               {/* Job Overview */}

//               {(job.createdAt ||
//                 job.applicationDeadline ||
//                 job.city ||
//                 job.state ||
//                 job.experience ||
//                 job.employmentType ||
//                 job.workMode ||
//                 job.salaryMin ||
//                 job.salaryMax) && (

//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

//                   <div className="flex items-center gap-3 mb-6">

//                     <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">

//                       <FaBriefcase className="text-emerald-400" />

//                     </div>

//                     <div>

//                       <h2 className="text-lg font-bold text-white">
//                         Job Overview
//                       </h2>

//                       <p className="text-xs text-slate-500">
//                         Important job details
//                       </p>

//                     </div>

//                   </div>


//                   <div className="space-y-5">

//                     {job.createdAt && (
//                       <OverviewItem
//                         icon={<FaCalendarAlt />}
//                         label="Posted"
//                         value={new Date(
//                           job.createdAt
//                         ).toLocaleDateString()}
//                       />
//                     )}

//                     {job.applicationDeadline && (
//                       <OverviewItem
//                         icon={<FaClock />}
//                         label="Deadline"
//                         value={new Date(
//                           job.applicationDeadline
//                         ).toLocaleDateString()}
//                       />
//                     )}

//                     {(job.city || job.state) && (
//                       <OverviewItem
//                         icon={<FaMapMarkerAlt />}
//                         label="Location"
//                         value={`${job.city || ""}${
//                           job.city && job.state ? ", " : ""
//                         }${job.state || ""}`}
//                       />
//                     )}

//                     {job.experience && (
//                       <OverviewItem
//                         icon={<FaBriefcase />}
//                         label="Experience"
//                         value={job.experience}
//                       />
//                     )}

//                     {job.employmentType && (
//                       <OverviewItem
//                         icon={<FaBriefcase />}
//                         label="Employment"
//                         value={job.employmentType}
//                       />
//                     )}

//                     {job.workMode && (
//                       <OverviewItem
//                         icon={<FaLaptopHouse />}
//                         label="Work Mode"
//                         value={job.workMode}
//                       />
//                     )}

//                     {(job.salaryMin || job.salaryMax) && (
//                       <div className="pt-5 border-t border-slate-800">

//                         <div className="flex items-center justify-between gap-4">

//                           <span className="flex items-center gap-2 text-slate-500 text-sm">

//                             <FaMoneyBillWave className="text-emerald-400" />

//                             Salary

//                           </span>

//                           <span className="text-emerald-400 font-bold text-sm text-right">

//                             ₹{job.salaryMin?.toLocaleString() || "0"}

//                             {job.salaryMax
//                               ? ` - ₹${job.salaryMax.toLocaleString()}`
//                               : ""}

//                           </span>

//                         </div>

//                       </div>
//                     )}

//                   </div>


//                   <button
//                     onClick={applyJob}
//                     disabled={submittingApplication}
//                     className="w-full mt-7 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
//                   >
//                     {submittingApplication ? "Submitting..." : "Apply for this Job"}

//                     {!submittingApplication && <FaArrowRight />}
//                   </button>

//                 </div>
//               )}


//               {/* Company Details */}

//               {(job.companyName ||
//                 job.companyEmail ||
//                 job.companyPhone ||
//                 job.companyWebsite ||
//                 job.officeAddress) && (

//                 <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

//                   <h2 className="text-xl font-bold text-white mb-6">
//                     Company Details
//                   </h2>

//                   <div className="space-y-5">

//                     {job.companyName && (
//                       <CompanyItem
//                         icon={<FaBuilding />}
//                         label="Company"
//                         value={job.companyName}
//                       />
//                     )}

//                     {job.companyEmail && (
//                       <CompanyItem
//                         icon={<FaEnvelope />}
//                         label="Email"
//                         value={job.companyEmail}
//                       />
//                     )}

//                     {job.companyPhone && (
//                       <CompanyItem
//                         icon={<FaPhoneAlt />}
//                         label="Phone"
//                         value={job.companyPhone}
//                       />
//                     )}

//                     {job.companyWebsite && (
//                       <div className="flex gap-3">

//                         <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">

//                           <FaGlobe className="text-emerald-400 text-sm" />

//                         </div>

//                         <div className="min-w-0">

//                           <p className="text-xs text-slate-500 mb-1">
//                             Website
//                           </p>

//                           <a
//                             href={job.companyWebsite}
//                             target="_blank"
//                             rel="noreferrer"
//                             className="text-sm text-emerald-400 hover:text-emerald-300 break-all flex items-center gap-2"
//                           >
//                             Visit Website

//                             <FaExternalLinkAlt className="text-[10px]" />

//                           </a>

//                         </div>

//                       </div>
//                     )}

//                     {job.officeAddress && (
//                       <CompanyItem
//                         icon={<FaMapMarkerAlt />}
//                         label="Office Address"
//                         value={`${job.officeAddress}${
//                           job.city ? `, ${job.city}` : ""
//                         }`}
//                       />
//                     )}

//                   </div>

//                 </div>
//               )}


//               {/* Quick Apply */}

//               {job.applyLink && (
//                 <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-emerald-600">

//                   <h3 className="text-xl font-bold text-white">
//                     Interested in this role?
//                   </h3>

//                   <p className="text-emerald-50 text-sm leading-6 mt-2">
//                     Submit your application and take the next step in your
//                     career.
//                   </p>

//                   <button
//                     onClick={applyJob}
//                    disabled={submittingApplication}
//                     className="w-full mt-5 bg-white text-emerald-600 hover:bg-emerald-50 py-3.5 rounded-xl font-bold transition disabled:opacity-50"
//                   >
//                     Apply
//                   </button>

//                 </div>
//               )}
// {/* ================= BOTTOM SIDEBAR AD ================= */}

// <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
//   <p className="text-[10px] text-slate-600 mb-3 uppercase tracking-wider">
//     Advertisement
//   </p>

//   <div className="w-[320px] h-[50px] flex items-center justify-center overflow-hidden">
//     <Ads type="320x50" />
//   </div>
// </div>
//             </aside>

//           </div>

//         </section>

//       </main>
// {showApplyModal && (
//   <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

//     <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">

//       {/* Header */}

//       <div className="sticky top-0 z-10 bg-slate-900 border-b border-slate-800 px-6 py-5 flex items-center justify-between">

//         <div>
//           <h2 className="text-xl sm:text-2xl font-bold text-white">
//             Apply for this Job
//           </h2>

//           <p className="text-sm text-slate-500 mt-1">
//             {job.jobTitle} at {job.companyName}
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => setShowApplyModal(false)}
//           className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
//         >
//           <FaTimes />
//         </button>

//       </div>


//       {/* Form */}

//       <form
//         onSubmit={submitApplication}
//         className="p-6 space-y-5"
//       >

//         {/* Name */}

//         <div>
//           <label className="block text-sm font-medium text-slate-300 mb-2">
//             Full Name *
//           </label>

//           <input
//             type="text"
//             name="name"
//             value={applicationForm.name}
//             onChange={handleApplicationChange}
//             placeholder="Enter your full name"
//             className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
//             required
//           />
//         </div>


//         {/* Email */}

//         <div>
//           <label className="block text-sm font-medium text-slate-300 mb-2">
//             Email Address *
//           </label>

//           <input
//             type="email"
//             name="email"
//             value={applicationForm.email}
//             onChange={handleApplicationChange}
//             placeholder="Enter your email"
//             className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
//             required
//           />
//         </div>


//         {/* Phone */}

//         <div>
//           <label className="block text-sm font-medium text-slate-300 mb-2">
//             Phone Number *
//           </label>

//           <input
//             type="tel"
//             name="phone"
//             value={applicationForm.phone}
//             onChange={handleApplicationChange}
//             placeholder="Enter your phone number"
//             maxLength={15}
//             className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
//             required
//           />
//         </div>


//         {/* Experience */}

//         <div>
//           <label className="block text-sm font-medium text-slate-300 mb-2">
//             Experience
//           </label>

//           <input
//             type="text"
//             name="experience"
//             value={applicationForm.experience}
//             onChange={handleApplicationChange}
//             placeholder="e.g. Fresher, 1 year, 2 years"
//             className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
//           />
//         </div>


//         {/* Resume */}

//         <div>
//           <label className="block text-sm font-medium text-slate-300 mb-2">
//             Resume *
//           </label>

//           <label className="block cursor-pointer">

//             <div className="border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-xl p-6 text-center transition">

//               {resume ? (
//                 <>
//                   <FaFileAlt className="text-emerald-400 text-3xl mx-auto mb-3" />

//                   <p className="text-white font-medium break-all">
//                     {resume.name}
//                   </p>

//                   <p className="text-xs text-slate-500 mt-1">
//                     {(resume.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </>
//               ) : (
//                 <>
//                   <FaUpload className="text-emerald-400 text-3xl mx-auto mb-3" />

//                   <p className="text-white font-medium">
//                     Upload your resume
//                   </p>

//                   <p className="text-xs text-slate-500 mt-1">
//                     PDF, DOC or DOCX • Maximum 5 MB
//                   </p>
//                 </>
//               )}

//             </div>

//             <input
//               type="file"
//               accept=".pdf,.doc,.docx"
//               onChange={handleResumeChange}
//               className="hidden"
//             />

//           </label>
//         </div>


//         {/* Cover Letter */}

//         <div>
//           <label className="block text-sm font-medium text-slate-300 mb-2">
//             Message / Cover Letter
//             <span className="text-slate-600 ml-1">
//               (Optional)
//             </span>
//           </label>

//           <textarea
//             name="coverLetter"
//             value={applicationForm.coverLetter}
//             onChange={handleApplicationChange}
//             rows={5}
//             placeholder="Tell the employer why you are interested in this job..."
//             className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
//           />
//         </div>


//         {/* Privacy text */}

//         <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">

//           <p className="text-xs text-slate-500 leading-5">
//             By submitting this application, you agree that TechBy may
//             share your application details and resume with the employer
//             for recruitment purposes.
//           </p>

//         </div>


//         {/* Submit */}

//         <button
//           type="submit"
//           disabled={submittingApplication}
//           className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
//         >

//           {submittingApplication ? (
//             <>
//               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>

//               Submitting...
//             </>
//           ) : (
//             <>
//               Submit Application
//               <FaArrowRight />
//             </>
//           )}

//         </button>

//       </form>

//     </div>

//   </div>
// )}
//       <Footer />
//     </>
//   );
// }


// /* ================= SECTION TITLE ================= */

// function SectionTitle({ title }) {
//   return (
//     <div className="flex items-center gap-3 mb-6">

//       <div className="w-1 h-7 rounded-full bg-emerald-500"></div>

//       <h2 className="text-xl sm:text-2xl font-bold text-white">
//         {title}
//       </h2>

//     </div>
//   );
// }


// /* ================= OVERVIEW ITEM ================= */

// function OverviewItem({ icon, label, value }) {
//   if (!value) return null;

//   return (
//     <div className="flex items-center justify-between gap-4">

//       <span className="flex items-center gap-3 text-slate-500 text-sm">

//         <span className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
//           {icon}
//         </span>

//         {label}

//       </span>

//       <span className="text-white text-sm font-semibold text-right">
//         {value}
//       </span>

//     </div>
//   );
// }


// /* ================= COMPANY ITEM ================= */

// function CompanyItem({ icon, label, value }) {
//   if (!value) return null;

//   return (
//     <div className="flex gap-3">

//       <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">

//         <span className="text-emerald-400 text-sm">
//           {icon}
//         </span>

//       </div>

//       <div className="min-w-0">

//         <p className="text-xs text-slate-500 mb-1">
//           {label}
//         </p>

//         <p className="text-sm text-slate-300 break-words">
//           {value}
//         </p>

//       </div>

//     </div>
//   );
// }



import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaLaptopHouse,
  FaBolt,
  FaShareAlt,
  FaFileAlt,
  FaUpload,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api/JobApi";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Ads from "./Ads";
  const CompanyLogo = ({
  logo,
  companyName,
  className = "w-full h-full object-contain rounded-xl",
}) => {
  const [imageError, setImageError] = useState(false);

  if (!logo || imageError) {
    return (
      <div
        className={`${className} flex items-center justify-center text-center text-slate-900 font-bold px-2 leading-tight`}
      >
        {companyName || "Company"}
      </div>
    );
  }

  return (
    <img
      src={logo}
      alt={companyName || "Company"}
      className={className}
      onError={() => setImageError(true)}
    />
  );
};
export default function JobDescription() {
  const { slug } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);
const [submittingApplication, setSubmittingApplication] = useState(false);

const [applicationForm, setApplicationForm] = useState({
  name: "",
  email: "",
  phone: "",
  experience: "",
  coverLetter: "",
});

const [resume, setResume] = useState(null);

  useEffect(() => {
    getJob();
  }, [slug]);

  const getJob = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/jobs/slug/${slug}`);

      if (data.success) {
        setJob(data.job);
      } else {
        setError("Job not found.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load job.");
    } finally {
      setLoading(false);
    }
  };



const applyJob = () => {
  const applyLink = job?.applyLink?.trim();

  // 1. If external apply link exists → open it
  if (applyLink) {
    window.open(applyLink, "_blank", "noopener,noreferrer");
    return;
  }

  // 2. If no external apply link → open TechBy application form
  setShowApplyModal(true);
};
const handleApplicationChange = (e) => {
  const { name, value } = e.target;

  setApplicationForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};



const handleResumeChange = (e) => {
  const file = e.target.files?.[0];

  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    toast.error("Only PDF, DOC and DOCX files are allowed.");
    e.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Resume must be less than 5 MB.");
    e.target.value = "";
    return;
  }

  setResume(file);
};


const submitApplication = async (e) => {
  e.preventDefault();

  if (!applicationForm.name.trim()) {
    toast.error("Please enter your name.");
    return;
  }

  if (!applicationForm.email.trim()) {
    toast.error("Please enter your email.");
    return;
  }

  if (!applicationForm.phone.trim()) {
    toast.error("Please enter your phone number.");
    return;
  }

  if (!resume) {
    toast.error("Please upload your resume.");
    return;
  }

  try {
    setSubmittingApplication(true);

    const formData = new FormData();

    formData.append(
      "name",
      applicationForm.name
    );

    formData.append(
      "email",
      applicationForm.email
    );

    formData.append(
      "phone",
      applicationForm.phone
    );

    formData.append(
      "experience",
      applicationForm.experience
    );

    formData.append(
      "coverLetter",
      applicationForm.coverLetter
    );

    formData.append(
      "resume",
      resume
    );

    const { data } = await API.post(
      `/applications/apply/${job._id}`,
      formData
    );

    if (data.success) {
      toast.success(
        "Application submitted successfully!"
      );

      setShowApplyModal(false);

      setApplicationForm({
        name: "",
        email: "",
        phone: "",
        experience: "",
        coverLetter: "",
      });

      setResume(null);
    }

  } catch (error) {
    console.error(
      "Application error:",
      error
    );

    toast.error(
      error.response?.data?.message ||
        "Failed to submit application."
    );

  } finally {
    setSubmittingApplication(false);
  }
};


const shareJob = async () => {
  try {
    const shareUrl =
      `${window.location.origin}/jobs/${job.slug}`;

    const shareData = {
      title: `${job.jobTitle} - ${job.companyName}`,

      text:
        `${job.jobTitle} at ${job.companyName}\n\n` +
        `${job.jobSummary || "Check out this job opportunity."}\n\n` +
        `${job.city ? `📍 ${job.city}${job.state ? `, ${job.state}` : ""}\n` : ""}` +
        `${job.experience ? `💼 ${job.experience}\n` : ""}` +
        `${
          job.salaryMin || job.salaryMax
            ? `💰 ₹${job.salaryMin?.toLocaleString() || ""}${
                job.salaryMax
                  ? ` - ₹${job.salaryMax.toLocaleString()}`
                  : ""
              }`
            : ""
        }`,

      url: shareUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Job share link copied!");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Share error:", error);
      toast.error("Unable to share job.");
    }
  }
};



// const shareJob = async () => {
//   try {
//     // Backend share controller
//     const shareUrl = `${API.defaults.baseURL}/jobs/share/${job._id}`;

//     const shareData = {
//       title: `${job.jobTitle} - ${job.companyName}`,

//       text:
//         `${job.jobTitle} at ${job.companyName}\n\n` +
//         `${job.jobSummary || "Check out this job opportunity."}\n\n` +
//         `${
//           job.city
//             ? `📍 ${job.city}${job.state ? `, ${job.state}` : ""}\n`
//             : ""
//         }` +
//         `${job.experience ? `💼 ${job.experience}\n` : ""}` +
//         `${
//           job.salaryMin || job.salaryMax
//             ? `💰 ₹${job.salaryMin?.toLocaleString() || ""}${
//                 job.salaryMax
//                   ? ` - ₹${job.salaryMax.toLocaleString()}`
//                   : ""
//               }`
//             : ""
//         }`,

//       url: shareUrl,
//     };

//     if (navigator.share) {
//       await navigator.share(shareData);
//     } else {
//       await navigator.clipboard.writeText(shareUrl);
//       toast.success("Job share link copied!");
//     }
//   } catch (error) {
//     if (error.name !== "AbortError") {
//       console.error("Share error:", error);
//       toast.error("Unable to share job.");
//     }
//   }
// };


  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-14 h-14 border-4 border-slate-200 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>

            <h1 className="text-slate-900 text-xl font-semibold mt-6">
              Loading Job...
            </h1>

            <p className="text-slate-500 mt-2">
              Please wait while we fetch the job details.
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <FaBriefcase className="text-red-600 text-3xl" />
            </div>

            <h1 className="text-slate-900 text-3xl font-bold mt-6">
              Job Not Found
            </h1>

            <p className="text-slate-600 mt-3">
              {error ||
                "This job may have been removed or is no longer available."}
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 min-h-screen">

        {/* ================= HERO ================= */}

        <section className="relative overflow-hidden border-b border-slate-200">

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-transparent to-blue-50 pointer-events-none"></div>
 {/* ================= BANNER AD ================= */}
<div className="relative max-w-7xl mx-auto px-4 lg:mt-4 sm:px-6 lg:px-8 pt-24">
  <div className="w-full flex justify-center items-center overflow-hidden">
    
    {/* Desktop */}
    <div className="hidden sm:block">
      <Ads type="728x90" />
    </div>

    {/* Mobile */}
    <div className="block sm:hidden">
      <Ads type="320x50" />
    </div>

  </div>
</div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 relative">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
              <span>Jobs</span>

              <FaArrowRight className="text-[10px]" />

              <span className="text-slate-700">
                {job.jobTitle}
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

                <div className="flex gap-5 sm:gap-7">

                  {/* Company Logo */}

                 <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-58 md:h-48 rounded-2xl bg-white border border-slate-200 p-3 shrink-0 flex items-center justify-center">
  <CompanyLogo
    logo={job.companyLogo}
    companyName={job.companyName}
  />
</div>

                  <div className="min-w-0">

                    {/* Badges */}

                    <div className="flex flex-wrap gap-2 mb-4">

                      {job.employmentType && (
                        <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold">
                          {job.employmentType}
                        </span>
                      )}

                      {job.workMode && (
                        <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold">
                          {job.workMode}
                        </span>
                      )}

                      {job.featured && (
                        <span className="px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-xs font-semibold">
                          Featured
                        </span>
                      )}

                      {job.urgentHiring && (
                        <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold flex items-center gap-1.5">
                          <FaBolt />
                          Urgent Hiring
                        </span>
                      )}

                    </div>

                    {/* Job Title */}

                    {job.jobTitle && (
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                        {job.jobTitle}
                      </h1>
                    )}

                    {/* Company */}

                    {job.companyName && (
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-emerald-600 font-semibold">
                          {job.companyName}
                        </span>

                        <FaCheckCircle className="text-emerald-500 text-sm" />
                      </div>
                    )}

                    {/* Basic Details */}

                    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-sm text-slate-600">

                      {(job.city || job.state) && (
                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-emerald-600" />
                          {job.city}
                          {job.city && job.state ? ", " : ""}
                          {job.state}
                        </span>
                      )}

                      {job.experience && (
                        <span className="flex items-center gap-2">
                          <FaBriefcase className="text-emerald-600" />
                          {job.experience}
                        </span>
                      )}

                      {(job.salaryMin || job.salaryMax) && (
                        <span className="flex items-center gap-2">
                          <FaMoneyBillWave className="text-emerald-600" />

                          ₹{job.salaryMin?.toLocaleString() || "0"}
                          {job.salaryMax
                            ? ` - ₹${job.salaryMax.toLocaleString()}`
                            : ""}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                {/* Actions */}

                <div className="lg:min-w-[190px] space-y-3">

                  <button
  onClick={applyJob}
  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 px-7 py-4 rounded-xl font-bold transition flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/10"
>
  Apply Now
  <FaArrowRight />
</button>

                  <button
                    onClick={shareJob}
                    className="w-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 px-7 py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-3"
                  >
                    <FaShareAlt />
                    Share Job
                  </button>

                  <p className="text-center text-xs text-slate-500">
                    Apply directly through TechBy
                  </p>

                </div>

              </div>

            </div>
          </div>
        </section>


        {/* ================= MAIN CONTENT ================= */}

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* ================= LEFT ================= */}

            <div className="lg:col-span-2 space-y-6">

              {/* Job Summary */}

              {job.jobSummary && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

                  <SectionTitle title="Job Summary" />

                  <p className="text-slate-600 leading-8 whitespace-pre-line">
                    {job.jobSummary}
                  </p>

                </div>
              )}


              {/* Responsibilities */}

              {job.responsibilities && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

                  <SectionTitle title="Responsibilities" />

                  <div className="text-slate-600 leading-8 whitespace-pre-line">
                    {job.responsibilities}
                  </div>

                </div>
              )}


              {/* Requirements */}

              {job.requirements && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

                  <SectionTitle title="Requirements" />

                  <div className="text-slate-600 leading-8 whitespace-pre-line">
                    {job.requirements}
                  </div>

                </div>
              )}


              {/* Skills */}

              {Array.isArray(job.skills) && job.skills.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">

                    <SectionTitle title="Required Skills" />

                    <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                      {job.skills.length} Skills
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium hover:border-emerald-500/50 hover:text-emerald-600 transition"
                      >
                        {skill}
                      </span>
                    ))}

                  </div>

                </div>
              )}


              {/* Benefits */}

              {job.benefits && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

                  <SectionTitle title="Benefits" />

                  <div className="text-slate-600 leading-8 whitespace-pre-line">
                    {job.benefits}
                  </div>

                </div>
              )}


              {/* About Company */}

              {job.companyName && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">

                  <SectionTitle title="About the Company" />

                  <div className="flex flex-col sm:flex-row gap-5">

                   <div className="w-20 h-20 rounded-2xl bg-white p-3 shrink-0 flex items-center justify-center">
  <CompanyLogo
    logo={job.companyLogo}
    companyName={job.companyName}
    className="w-full h-full object-contain"
  />
</div>

                    <div>

                      <div className="flex items-center gap-2">

                        <h3 className="text-xl font-bold text-slate-900">
                          {job.companyName}
                        </h3>

                        <FaCheckCircle className="text-emerald-500" />

                      </div>

                      {job.companyDescription && (
                        <p className="text-slate-500 mt-2">
                          {job.companyDescription}
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              )}

            </div>


            {/* ================= RIGHT SIDEBAR ================= */}

            <aside className="space-y-6">

              {/* Job Overview */}

              {(job.createdAt ||
                job.applicationDeadline ||
                job.city ||
                job.state ||
                job.experience ||
                job.employmentType ||
                job.workMode ||
                job.salaryMin ||
                job.salaryMax) && (

                <div className="bg-white border border-slate-200 rounded-2xl p-6">

                  <div className="flex items-center gap-3 mb-6">

                    <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">

                      <FaBriefcase className="text-emerald-600" />

                    </div>

                    <div>

                      <h2 className="text-lg font-bold text-slate-900">
                        Job Overview
                      </h2>

                      <p className="text-xs text-slate-500">
                        Important job details
                      </p>

                    </div>

                  </div>


                  <div className="space-y-5">

                    {job.createdAt && (
                      <OverviewItem
                        icon={<FaCalendarAlt />}
                        label="Posted"
                        value={new Date(
                          job.createdAt
                        ).toLocaleDateString()}
                      />
                    )}

                    {job.applicationDeadline && (
                      <OverviewItem
                        icon={<FaClock />}
                        label="Deadline"
                        value={new Date(
                          job.applicationDeadline
                        ).toLocaleDateString()}
                      />
                    )}

                    {(job.city || job.state) && (
                      <OverviewItem
                        icon={<FaMapMarkerAlt />}
                        label="Location"
                        value={`${job.city || ""}${
                          job.city && job.state ? ", " : ""
                        }${job.state || ""}`}
                      />
                    )}

                    {job.experience && (
                      <OverviewItem
                        icon={<FaBriefcase />}
                        label="Experience"
                        value={job.experience}
                      />
                    )}

                    {job.employmentType && (
                      <OverviewItem
                        icon={<FaBriefcase />}
                        label="Employment"
                        value={job.employmentType}
                      />
                    )}

                    {job.workMode && (
                      <OverviewItem
                        icon={<FaLaptopHouse />}
                        label="Work Mode"
                        value={job.workMode}
                      />
                    )}

                    {(job.salaryMin || job.salaryMax) && (
                      <div className="pt-5 border-t border-slate-200">

                        <div className="flex items-center justify-between gap-4">

                          <span className="flex items-center gap-2 text-slate-500 text-sm">

                            <FaMoneyBillWave className="text-emerald-600" />

                            Salary

                          </span>

                          <span className="text-emerald-600 font-bold text-sm text-right">

                            ₹{job.salaryMin?.toLocaleString() || "0"}

                            {job.salaryMax
                              ? ` - ₹${job.salaryMax.toLocaleString()}`
                              : ""}

                          </span>

                        </div>

                      </div>
                    )}

                  </div>


                  <button
                    onClick={applyJob}
                    disabled={submittingApplication}
                    className="w-full mt-7 bg-emerald-500 hover:bg-emerald-600 text-slate-900 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submittingApplication ? "Submitting..." : "Apply for this Job"}

                    {!submittingApplication && <FaArrowRight />}
                  </button>

                </div>
              )}


              {/* Company Details */}

              {(job.companyName ||
                job.companyEmail ||
                job.companyPhone ||
                job.companyWebsite ||
                job.officeAddress) && (

                <div className="bg-white border border-slate-200 rounded-2xl p-6">

                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Company Details
                  </h2>

                  <div className="space-y-5">

                    {job.companyName && (
                      <CompanyItem
                        icon={<FaBuilding />}
                        label="Company"
                        value={job.companyName}
                      />
                    )}

                    {job.companyEmail && (
                      <CompanyItem
                        icon={<FaEnvelope />}
                        label="Email"
                        value={job.companyEmail}
                      />
                    )}

                    {job.companyPhone && (
                      <CompanyItem
                        icon={<FaPhoneAlt />}
                        label="Phone"
                        value={job.companyPhone}
                      />
                    )}

                    {job.companyWebsite && (
                      <div className="flex gap-3">

                        <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">

                          <FaGlobe className="text-emerald-600 text-sm" />

                        </div>

                        <div className="min-w-0">

                          <p className="text-xs text-slate-500 mb-1">
                            Website
                          </p>

                          <a
                            href={job.companyWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-emerald-600 hover:text-emerald-300 break-all flex items-center gap-2"
                          >
                            Visit Website

                            <FaExternalLinkAlt className="text-[10px]" />

                          </a>

                        </div>

                      </div>
                    )}

                    {job.officeAddress && (
                      <CompanyItem
                        icon={<FaMapMarkerAlt />}
                        label="Office Address"
                        value={`${job.officeAddress}${
                          job.city ? `, ${job.city}` : ""
                        }`}
                      />
                    )}

                  </div>

                </div>
              )}


              {/* Quick Apply */}

              {job.applyLink && (
                <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-emerald-600">

                  <h3 className="text-xl font-bold text-slate-900">
                    Interested in this role?
                  </h3>

                  <p className="text-emerald-50 text-sm leading-6 mt-2">
                    Submit your application and take the next step in your
                    career.
                  </p>

                  <button
                    onClick={applyJob}
                   disabled={submittingApplication}
                    className="w-full mt-5 bg-white text-emerald-600 hover:bg-emerald-50 py-3.5 rounded-xl font-bold transition disabled:opacity-50"
                  >
                    Apply
                  </button>

                </div>
              )}
{/* ================= BOTTOM SIDEBAR AD ================= */}

<div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col items-center">
  <p className="text-[10px] text-slate-600 mb-3 uppercase tracking-wider">
    Advertisement
  </p>

  <div className="w-[320px] h-[50px] flex items-center justify-center overflow-hidden">
    <Ads type="320x50" />
  </div>
</div>
            </aside>

          </div>

        </section>

      </main>
{showApplyModal && (
  <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">

    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-2xl shadow-2xl">

      {/* Header */}

      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">

        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Apply for this Job
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            {job.jobTitle} at {job.companyName}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowApplyModal(false)}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition"
        >
          <FaTimes />
        </button>

      </div>


      {/* Form */}

      <form
        onSubmit={submitApplication}
        className="p-6 space-y-5"
      >

        {/* Name */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name *
          </label>

          <input
            type="text"
            name="name"
            value={applicationForm.name}
            onChange={handleApplicationChange}
            placeholder="Enter your full name"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            required
          />
        </div>


        {/* Email */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address *
          </label>

          <input
            type="email"
            name="email"
            value={applicationForm.email}
            onChange={handleApplicationChange}
            placeholder="Enter your email"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            required
          />
        </div>


        {/* Phone */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Phone Number *
          </label>

          <input
            type="tel"
            name="phone"
            value={applicationForm.phone}
            onChange={handleApplicationChange}
            placeholder="Enter your phone number"
            maxLength={15}
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            required
          />
        </div>


        {/* Experience */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Experience
          </label>

          <input
            type="text"
            name="experience"
            value={applicationForm.experience}
            onChange={handleApplicationChange}
            placeholder="e.g. Fresher, 1 year, 2 years"
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
          />
        </div>


        {/* Resume */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Resume *
          </label>

          <label className="block cursor-pointer">

            <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl p-6 text-center transition bg-slate-50/50">

              {resume ? (
                <>
                  <FaFileAlt className="text-emerald-600 text-3xl mx-auto mb-3" />

                  <p className="text-slate-900 font-medium break-all">
                    {resume.name}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <FaUpload className="text-emerald-600 text-3xl mx-auto mb-3" />

                  <p className="text-slate-900 font-medium">
                    Upload your resume
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    PDF, DOC or DOCX • Maximum 5 MB
                  </p>
                </>
              )}

            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              className="hidden"
            />

          </label>
        </div>


        {/* Cover Letter */}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Message / Cover Letter
            <span className="text-slate-600 ml-1">
              (Optional)
            </span>
          </label>

          <textarea
            name="coverLetter"
            value={applicationForm.coverLetter}
            onChange={handleApplicationChange}
            rows={5}
            placeholder="Tell the employer why you are interested in this job..."
            className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 resize-none"
          />
        </div>


        {/* Privacy text */}

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">

          <p className="text-xs text-slate-500 leading-5">
            By submitting this application, you agree that TechBy may
            share your application details and resume with the employer
            for recruitment purposes.
          </p>

        </div>


        {/* Submit */}

        <button
          type="submit"
          disabled={submittingApplication}
          className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 py-4 rounded-xl font-bold transition flex items-center justify-center gap-2"
        >

          {submittingApplication ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>

              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <FaArrowRight />
            </>
          )}

        </button>

      </form>

    </div>

  </div>
)}
      <Footer />
    </>
  );
}


/* ================= SECTION TITLE ================= */

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-3 mb-6">

      <div className="w-1 h-7 rounded-full bg-emerald-500"></div>

      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
        {title}
      </h2>

    </div>
  );
}


/* ================= OVERVIEW ITEM ================= */

function OverviewItem({ icon, label, value }) {
  if (!value) return null;

  return (
    <div className="flex items-center justify-between gap-4">

      <span className="flex items-center gap-3 text-slate-500 text-sm">

        <span className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
          {icon}
        </span>

        {label}

      </span>

      <span className="text-slate-900 text-sm font-semibold text-right">
        {value}
      </span>

    </div>
  );
}


/* ================= COMPANY ITEM ================= */

function CompanyItem({ icon, label, value }) {
  if (!value) return null;

  return (
    <div className="flex gap-3">

      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">

        <span className="text-emerald-600 text-sm">
          {icon}
        </span>

      </div>

      <div className="min-w-0">

        <p className="text-xs text-slate-500 mb-1">
          {label}
        </p>

        <p className="text-sm text-slate-700 break-words">
          {value}
        </p>

      </div>

    </div>
  );
}

