// import React, { useState } from "react";
// import {
//   FaNewspaper,
//   FaImage,
//   FaTags,
//   FaGlobe,
//   FaSave,
//   FaEye,
//   FaStar,
//   FaCheckCircle,
//   FaTimes,
//   FaLandmark,
//   FaUpload,
//   FaTrash,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5050";

// // ==========================================
// // GOVERNMENT NEWS CATEGORIES
// // ==========================================

// const categories = [
//   "Government Jobs",
//   "SSC",
//   "UPSC",
//   "Railway",
//   "Banking",
//   "Defence",
//   "Police",
//   "Teaching",
//   "State Government",
//   "Admit Card",
//   "Results",
//   "Answer Key",
//   "Exam Updates",
//   "Scholarship",
// ];

// // ==========================================
// // INITIAL FORM
// // ==========================================

// const initialForm = {
//   title: "",
//   excerpt: "",
//   content: "",
//   category: "Government Jobs",
//   author: "TechBy",
//   readTime: "5 min",
//   tags: "",
//   seoTitle: "",
//   seoDescription: "",
//   status: "draft",
//   featured: false,
//   applyLink: "",
// };

// function AdminCreateNews() {
//   const navigate = useNavigate();

//   const [form, setForm] = useState(initialForm);

//   // Image file selected from computer
//   const [imageFile, setImageFile] = useState(null);

//   // Local preview URL
//   const [imagePreview, setImagePreview] = useState("");

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [showPreview, setShowPreview] = useState(false);

//   // ==========================================
//   // HANDLE INPUT CHANGE
//   // ==========================================

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     setError("");
//     setMessage("");
//   };

//   // ==========================================
//   // HANDLE IMAGE
//   // ==========================================

//   const handleImageChange = (e) => {
//     const file = e.target.files?.[0];

//     if (!file) return;

//     setError("");
//     setMessage("");

//     // ==========================================
//     // IMAGE TYPE VALIDATION
//     // ==========================================

//     if (!file.type.startsWith("image/")) {
//       setError("Please select a valid image file.");
//       e.target.value = "";
//       return;
//     }

//     // ==========================================
//     // IMAGE SIZE VALIDATION
//     // Maximum 5 MB
//     // ==========================================

//     const maxSize = 5 * 1024 * 1024;

//     if (file.size > maxSize) {
//       setError("Image size must be less than 5 MB.");
//       e.target.value = "";
//       return;
//     }

//     // ==========================================
//     // REMOVE OLD PREVIEW URL
//     // ==========================================

//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview);
//     }

//     // ==========================================
//     // CREATE NEW PREVIEW
//     // ==========================================

//     const previewUrl = URL.createObjectURL(file);

//     setImageFile(file);
//     setImagePreview(previewUrl);
//   };

//   // ==========================================
//   // REMOVE IMAGE
//   // ==========================================

//   const removeImage = () => {
//     if (imagePreview) {
//       URL.revokeObjectURL(imagePreview);
//     }

//     setImageFile(null);
//     setImagePreview("");

//     // Reset file input
//     const input = document.getElementById("news-image-upload");

//     if (input) {
//       input.value = "";
//     }

//     setError("");
//     setMessage("");
//   };

//   // ==========================================
//   // SUBMIT NEWS
//   // ==========================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const adminToken = localStorage.getItem("adminToken");

//       if (!adminToken) {
//         setError("Admin session expired. Please login again.");
//         setLoading(false);
//         return;
//       }

//       // ==========================================
//       // VALIDATION
//       // ==========================================

//       if (!form.title.trim()) {
//         setError("Please enter a government job news title.");
//         setLoading(false);
//         return;
//       }

//       if (!form.excerpt.trim()) {
//         setError("Please enter a short description.");
//         setLoading(false);
//         return;
//       }

//       if (!form.content.trim()) {
//         setError("Please write the government job news content.");
//         setLoading(false);
//         return;
//       }

//       if (!imageFile) {
//         setError("Please select a cover image.");
//         setLoading(false);
//         return;
//       }

//       // ==========================================
//       // TAGS
//       // ==========================================

//       const tags = form.tags
//         .split(",")
//         .map((tag) => tag.trim())
//         .filter(Boolean);

//       // ==========================================
//       // FORM DATA
//       // ==========================================

//       const formData = new FormData();

//       formData.append("title", form.title.trim());

//       formData.append("excerpt", form.excerpt.trim());

//       formData.append("content", form.content);

//       formData.append("category", form.category);

//       formData.append(
//         "applyLink",
//         form.applyLink.trim()
//       );

//       formData.append(
//         "author",
//         form.author.trim() || "TechBy"
//       );

//       formData.append(
//         "readTime",
//         form.readTime.trim() || "5 min"
//       );

//       // Send tags as JSON string
//       formData.append(
//         "tags",
//         JSON.stringify(tags)
//       );

//       formData.append(
//         "seoTitle",
//         form.seoTitle.trim() || form.title.trim()
//       );

//       formData.append(
//         "seoDescription",
//         form.seoDescription.trim() ||
//           form.excerpt.trim()
//       );

//       formData.append("status", form.status);

//       formData.append(
//         "featured",
//         String(form.featured)
//       );

//       // ==========================================
//       // IMAGE FILE
//       // IMPORTANT:
//       // Backend Multer field name should be "image"
//       // ==========================================

//       formData.append("image", imageFile);

//       // ==========================================
//       // API REQUEST
//       // ==========================================

//       const response = await fetch(
//         `${API_URL}/news/admin/create`,
//         {
//           method: "POST",

//           headers: {
//             "x-admin-token": adminToken,
//           },

//           // DO NOT add Content-Type here.
//           // Browser automatically sets multipart/form-data
//           // with the correct boundary.
//           body: formData,
//         }
//       );

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(
//           data.message ||
//             "Failed to create government news."
//         );
//       }

//       // ==========================================
//       // SUCCESS
//       // ==========================================

//       setMessage(
//         form.status === "published"
//           ? "Government news published successfully!"
//           : "Government news saved as draft successfully!"
//       );

//       // ==========================================
//       // RESET
//       // ==========================================

//       if (imagePreview) {
//         URL.revokeObjectURL(imagePreview);
//       }

//       setForm(initialForm);
//       setImageFile(null);
//       setImagePreview("");

//       const input = document.getElementById(
//         "news-image-upload"
//       );

//       if (input) {
//         input.value = "";
//       }

//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } catch (err) {
//       console.error(
//         "Create government news error:",
//         err
//       );

//       setError(
//         err.message ||
//           "Something went wrong while posting government news."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // PREVIEW
//   // ==========================================

//   const openPreview = () => {
//     setError("");
//     setMessage("");
//     setShowPreview(true);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900">

//       {/* ==========================================
//           MAIN
//       ========================================== */}

//       <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

//         {/* ==========================================
//             HEADER
//         ========================================== */}

//         <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">

//           <div className="flex items-start gap-4">

//             <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
//               <FaLandmark />
//             </div>

//             <div>

//               <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
//                 Government News
//               </h1>

//               <p className="mt-1 text-sm text-slate-500">
//                 Create and publish government job,
//                 recruitment and exam updates.
//               </p>

//             </div>

//           </div>

//           <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">

//             <FaNewspaper />

//             Government Jobs & Exams

//           </div>

//         </div>

//         {/* ==========================================
//             SUCCESS
//         ========================================== */}

//         {message && (
//           <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

//             <FaCheckCircle />

//             <span>{message}</span>

//             <button
//               type="button"
//               onClick={() => setMessage("")}
//               className="ml-auto rounded-lg p-1 transition hover:bg-emerald-100"
//             >
//               <FaTimes />
//             </button>

//           </div>
//         )}

//         {/* ==========================================
//             ERROR
//         ========================================== */}

//         {error && (
//           <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

//             <FaTimes />

//             <span>{error}</span>

//             <button
//               type="button"
//               onClick={() => setError("")}
//               className="ml-auto rounded-lg p-1 transition hover:bg-red-100"
//             >
//               <FaTimes />
//             </button>

//           </div>
//         )}

//         {/* ==========================================
//             FORM
//         ========================================== */}

//         <form onSubmit={handleSubmit}>

//           <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

//             {/* ==========================================
//                 LEFT SIDE
//             ========================================== */}

//             <div className="min-w-0 space-y-6">

//               {/* ==========================================
//                   NEWS INFORMATION
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

//                 <div className="mb-6">

//                   <div className="flex items-center gap-3">

//                     <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
//                       <FaNewspaper />
//                     </div>

//                     <div>

//                       <h2 className="text-base font-bold text-slate-900 sm:text-lg">
//                         Government News Information
//                       </h2>

//                       <p className="mt-1 text-sm text-slate-500">
//                         Add recruitment, examination or government job information.
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//                 {/* TITLE */}

//                 <div className="mb-5">

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     News Title
//                   </label>

//                   <input
//                     type="text"
//                     name="title"
//                     value={form.title}
//                     onChange={handleChange}
//                     placeholder="SSC CGL Recruitment 2026: Apply Online, Eligibility, Vacancy & Dates"
//                     maxLength={250}
//                     className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                   />

//                   <div className="mt-2 text-right text-xs text-slate-400">
//                     {form.title.length}/250
//                   </div>

//                 </div>

//                 {/* EXCERPT */}

//                 <div className="mb-5">

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Short Description
//                   </label>

//                   <textarea
//                     name="excerpt"
//                     value={form.excerpt}
//                     onChange={handleChange}
//                     rows={4}
//                     maxLength={500}
//                     placeholder="SSC CGL 2026 recruitment notification details including vacancies, eligibility, important dates, application process and official website information."
//                     className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                   />

//                   <div className="mt-2 text-right text-xs text-slate-400">
//                     {form.excerpt.length}/500
//                   </div>

//                 </div>

//                 {/* CONTENT */}

//                 <div>

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     Government News Content
//                   </label>

//                   <div className="rounded-t-xl border border-b-0 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
//                     HTML content supported
//                   </div>

//                   <textarea
//                     name="content"
//                     value={form.content}
//                     onChange={handleChange}
//                     rows={22}
//                     placeholder={`<h2>SSC CGL Recruitment 2026</h2>

// <p>The Staff Selection Commission has announced...</p>

// <h2>Important Dates</h2>

// <table>
//   <tr>
//     <th>Event</th>
//     <th>Date</th>
//   </tr>
//   <tr>
//     <td>Application Start</td>
//     <td>To be announced</td>
//   </tr>
//   <tr>
//     <td>Last Date</td>
//     <td>To be announced</td>
//   </tr>
// </table>

// <h2>Eligibility</h2>

// <ul>
//   <li>Educational Qualification</li>
//   <li>Age Limit</li>
//   <li>Other Requirements</li>
// </ul>

// <h2>Application Process</h2>

// <p>Eligible candidates can apply through the official website.</p>

// <h2>Important Links</h2>

// <p>Official Website: ...</p>`}
//                     className="w-full resize-y rounded-b-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                   />

//                   <p className="mt-2 text-xs text-slate-400">
//                     Include important dates, vacancies,
//                     eligibility, selection process,
//                     application steps and official links.
//                   </p>

//                 </div>

//               </section>

//               {/* ==========================================
//                   SEO
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

//                 <div className="mb-6 flex items-center gap-3">

//                   <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
//                     <FaGlobe />
//                   </div>

//                   <div>

//                     <h2 className="font-bold text-slate-900">
//                       SEO Settings
//                     </h2>

//                     <p className="text-xs text-slate-500">
//                       Optimize your government job article for search engines.
//                     </p>

//                   </div>

//                 </div>

//                 {/* SEO TITLE */}

//                 <div className="mb-5">

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     SEO Title
//                   </label>

//                   <input
//                     type="text"
//                     name="seoTitle"
//                     value={form.seoTitle}
//                     onChange={handleChange}
//                     placeholder={
//                       form.title ||
//                       "SSC CGL Recruitment 2026 - Apply Online"
//                     }
//                     maxLength={250}
//                     className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                   />

//                   <div className="mt-2 flex justify-between text-xs text-slate-400">

//                     <span>
//                       Keep it clear and search-friendly.
//                     </span>

//                     <span>
//                       {form.seoTitle.length}/250
//                     </span>

//                   </div>

//                 </div>

//                 {/* SEO DESCRIPTION */}

//                 <div>

//                   <label className="mb-2 block text-sm font-semibold text-slate-700">
//                     SEO Description
//                   </label>

//                   <textarea
//                     name="seoDescription"
//                     value={form.seoDescription}
//                     onChange={handleChange}
//                     rows={4}
//                     maxLength={500}
//                     placeholder={
//                       form.excerpt ||
//                       "Get the latest government job recruitment details, eligibility, important dates, vacancies and application process."
//                     }
//                     className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                   />

//                   <div className="mt-2 text-right text-xs text-slate-400">
//                     {form.seoDescription.length}/500
//                   </div>

//                 </div>

//               </section>

//             </div>

//             {/* ==========================================
//                 RIGHT SIDEBAR
//             ========================================== */}

//             <aside className="min-w-0 space-y-6">

//               {/* ==========================================
//                   PUBLISH
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//                 <h2 className="mb-4 font-bold text-slate-900">
//                   Publish
//                 </h2>

//                 {/* STATUS */}

//                 <div className="mb-4">

//                   <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
//                     Status
//                   </label>

//                   <select
//                     name="status"
//                     value={form.status}
//                     onChange={handleChange}
//                     className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                   >

//                     <option value="draft">
//                       Draft
//                     </option>

//                     <option value="published">
//                       Published
//                     </option>

//                   </select>

//                 </div>

//                 {/* FEATURED */}

//                 <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100">

//                   <input
//                     type="checkbox"
//                     name="featured"
//                     checked={form.featured}
//                     onChange={handleChange}
//                     className="h-4 w-4 accent-emerald-500"
//                   />

//                   <div>

//                     <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

//                       <FaStar className="text-yellow-500" />

//                       Featured Government Update

//                     </div>

//                     <p className="mt-1 text-xs text-slate-500">
//                       Show this article in the featured government news section.
//                     </p>

//                   </div>

//                 </label>

//                 {/* SAVE */}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
//                 >

//                   <FaSave />

//                   {loading
//                     ? "Uploading & Saving..."
//                     : form.status === "published"
//                     ? "Publish Government News"
//                     : "Save Draft"}

//                 </button>

//                 {/* PREVIEW */}

//                 <button
//                   type="button"
//                   onClick={openPreview}
//                   className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
//                 >

//                   <FaEye />

//                   Preview

//                 </button>

//               </section>

//               {/* ==========================================
//                   OFFICIAL APPLY LINK
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//                 <div className="mb-4 flex items-center gap-3">

//                   <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
//                     <FaGlobe />
//                   </div>

//                   <div>

//                     <h2 className="font-bold text-slate-900">
//                       Official Apply Link
//                     </h2>

//                     <p className="text-xs text-slate-500">
//                       Add the official application website.
//                     </p>

//                   </div>

//                 </div>

//                 <input
//                   type="url"
//                   name="applyLink"
//                   value={form.applyLink}
//                   onChange={handleChange}
//                   placeholder="https://ssc.gov.in/..."
//                   className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                 />

//                 <p className="mt-2 text-xs leading-5 text-slate-400">
//                   Use the official government application URL only.
//                 </p>

//                 {form.applyLink && (
//                   <a
//                     href={form.applyLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
//                   >
//                     Check Apply Link
//                     <span>↗</span>
//                   </a>
//                 )}

//               </section>

//               {/* ==========================================
//                   COVER IMAGE
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//                 <div className="mb-4 flex items-center gap-3">

//                   <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
//                     <FaImage />
//                   </div>

//                   <div>

//                     <h2 className="font-bold text-slate-900">
//                       Cover Image
//                     </h2>

//                     <p className="text-xs text-slate-500">
//                       Upload article thumbnail or featured image.
//                     </p>

//                   </div>

//                 </div>

//                 {/* IMAGE UPLOAD */}

//                 {!imagePreview ? (
//                   <label
//                     htmlFor="news-image-upload"
//                     className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-emerald-400 hover:bg-emerald-50"
//                   >

//                     <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl text-emerald-500 shadow-sm transition group-hover:bg-emerald-100">
//                       <FaUpload />
//                     </div>

//                     <p className="text-sm font-semibold text-slate-700">
//                       Click to upload image
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       JPG, JPEG, PNG or WEBP
//                     </p>

//                     <p className="mt-1 text-xs text-slate-400">
//                       Maximum 5 MB
//                     </p>

//                     <input
//                       id="news-image-upload"
//                       type="file"
//                       accept="image/jpeg,image/jpg,image/png,image/webp"
//                       onChange={handleImageChange}
//                       className="hidden"
//                     />

//                   </label>
//                 ) : (
//                   <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

//                     {/* IMAGE */}

//                     <div className="relative">

//                       <img
//                         src={imagePreview}
//                         alt="Government news preview"
//                         className="aspect-video w-full object-cover"
//                       />

//                       {/* REMOVE */}

//                       <button
//                         type="button"
//                         onClick={removeImage}
//                         className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white shadow-lg transition hover:bg-red-600"
//                         title="Remove image"
//                       >
//                         <FaTrash />
//                       </button>

//                     </div>

//                     {/* FILE INFO */}

//                     <div className="p-3">

//                       <p className="truncate text-sm font-semibold text-slate-700">
//                         {imageFile?.name}
//                       </p>

//                       {imageFile && (
//                         <p className="mt-1 text-xs text-slate-400">
//                           {(imageFile.size / 1024 / 1024).toFixed(2)} MB
//                         </p>
//                       )}

//                     </div>

//                   </div>
//                 )}

//               </section>

//               {/* ==========================================
//                   CATEGORY
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//                 <h2 className="mb-4 font-bold text-slate-900">
//                   Government Category
//                 </h2>

//                 <select
//                   name="category"
//                   value={form.category}
//                   onChange={handleChange}
//                   className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                 >

//                   {categories.map((category) => (
//                     <option
//                       key={category}
//                       value={category}
//                     >
//                       {category}
//                     </option>
//                   ))}

//                 </select>

//                 <p className="mt-2 text-xs leading-5 text-slate-400">
//                   Select the government recruitment or exam
//                   category that best matches this article.
//                 </p>

//               </section>

//               {/* ==========================================
//                   ARTICLE DETAILS
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//                 <h2 className="mb-4 font-bold text-slate-900">
//                   Article Details
//                 </h2>

//                 <div className="space-y-4">

//                   {/* AUTHOR */}

//                   <div>

//                     <label className="mb-2 block text-xs font-semibold text-slate-500">
//                       Author
//                     </label>

//                     <input
//                       type="text"
//                       name="author"
//                       value={form.author}
//                       onChange={handleChange}
//                       className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                     />

//                   </div>

//                   {/* READ TIME */}

//                   <div>

//                     <label className="mb-2 block text-xs font-semibold text-slate-500">
//                       Read Time
//                     </label>

//                     <input
//                       type="text"
//                       name="readTime"
//                       value={form.readTime}
//                       onChange={handleChange}
//                       placeholder="5 min"
//                       className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                     />

//                   </div>

//                 </div>

//               </section>

//               {/* ==========================================
//                   TAGS
//               ========================================== */}

//               <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

//                 <div className="mb-4 flex items-center gap-3">

//                   <FaTags className="text-emerald-600" />

//                   <h2 className="font-bold text-slate-900">
//                     Government Job Tags
//                   </h2>

//                 </div>

//                 <input
//                   type="text"
//                   name="tags"
//                   value={form.tags}
//                   onChange={handleChange}
//                   placeholder="SSC CGL, SSC Recruitment, Government Jobs, SSC Exam"
//                   className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
//                 />

//                 <p className="mt-2 text-xs text-slate-400">
//                   Separate tags with commas.
//                 </p>

//               </section>

//             </aside>

//           </div>

//         </form>

//       </main>

//       {/* ==========================================
//           PREVIEW MODAL
//       ========================================== */}

//       {showPreview && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-6">

//           <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

//             {/* MODAL HEADER */}

//             <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

//               <div>

//                 <h2 className="font-bold text-slate-900">
//                   Government News Preview
//                 </h2>

//                 <p className="text-xs text-slate-500">
//                   Preview the article before publishing.
//                 </p>

//               </div>

//               <button
//                 type="button"
//                 onClick={() => setShowPreview(false)}
//                 className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
//               >
//                 <FaTimes />
//               </button>

//             </div>

//             {/* MODAL CONTENT */}

//             <div className="overflow-y-auto">

//               {/* COVER IMAGE */}

//               {imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt={form.title}
//                   className="aspect-[2/1] w-full object-cover"
//                 />
//               )}

//               <article className="mx-auto max-w-3xl px-5 py-7 sm:px-8 sm:py-10">

//                 {/* CATEGORY */}

//                 <div className="mb-4 flex flex-wrap items-center gap-2">

//                   <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
//                     {form.category}
//                   </span>

//                   {form.featured && (
//                     <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">

//                       <FaStar />

//                       Featured

//                     </span>
//                   )}

//                 </div>

//                 {/* TITLE */}

//                 <h1 className="text-2xl font-black leading-tight text-slate-900 sm:text-4xl">
//                   {form.title || "Government Job News Title"}
//                 </h1>

//                 {/* META */}

//                 <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">

//                   <span>
//                     By {form.author || "TechBy"}
//                   </span>

//                   <span>•</span>

//                   <span>
//                     {form.readTime || "5 min"}
//                   </span>

//                 </div>

//                 {/* EXCERPT */}

//                 <p className="mt-6 text-base leading-7 text-slate-600">
//                   {form.excerpt ||
//                     "Your government job news description will appear here."}
//                 </p>

//                 {/* CONTENT */}

//                 <div
//                   className="prose mt-8 max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-a:text-emerald-600"
//                   dangerouslySetInnerHTML={{
//                     __html:
//                       form.content ||
//                       "<p>Your government news content will appear here.</p>",
//                   }}
//                 />

//                 {/* APPLY LINK */}

//                 {form.applyLink && (
//                   <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4">

//                     <h3 className="text-sm font-bold text-emerald-900">
//                       Official Application
//                     </h3>

//                     <a
//                       href={form.applyLink}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
//                     >
//                       Apply on Official Website
//                       <span>↗</span>
//                     </a>

//                   </div>
//                 )}

//                 {/* ADMIN REMINDER */}

//                 <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4">

//                   <div className="flex gap-3">

//                     <FaGlobe className="mt-1 shrink-0 text-blue-600" />

//                     <div>

//                       <h3 className="text-sm font-bold text-blue-900">
//                         Admin Reminder
//                       </h3>

//                       <p className="mt-1 text-xs leading-5 text-blue-700">
//                         Always verify recruitment details from the official
//                         government department, commission or organization
//                         website before publishing.
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//               </article>

//             </div>

//           </div>

//         </div>
//       )}

//     </div>
//   );
// }

// export default AdminCreateNews;



import React, { useState } from "react";
import {
  FaNewspaper,
  FaImage,
  FaTags,
  FaGlobe,
  FaSave,
  FaEye,
  FaStar,
  FaCheckCircle,
  FaTimes,
  FaLandmark,
  FaUpload,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050";

// ==========================================
// GOVERNMENT NEWS CATEGORIES
// ==========================================

const categories = [
  "Government Jobs",
  "SSC",
  "UPSC",
  "Railway",
  "Banking",
  "Defence",
  "Police",
  "Teaching",
  "State Government",
  "Admit Card",
  "Results",
  "Answer Key",
  "Exam Updates",
  "Scholarship",
];

// ==========================================
// INITIAL FORM
// ==========================================

const initialForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Government Jobs",
  author: "TechBy",
  readTime: "5 min",
  tags: "",
  seoTitle: "",
  seoDescription: "",
  status: "draft",
  featured: false,
  applyLink: "",
};

function AdminCreateNews() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  // ==========================================
  // IMAGE
  // ==========================================

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // ==========================================
  // PDF
  // ==========================================

  const [pdfFile, setPdfFile] = useState(null);

  // ==========================================
  // UI
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setMessage("");
  };

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    // 5 MB frontend limit
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      e.target.value = "";
      return;
    }

    setImageFile(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  // ==========================================
  // HANDLE PDF
  // ==========================================

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setMessage("");

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("PDF size must be less than 10 MB.");
      e.target.value = "";
      return;
    }

    setPdfFile(file);
  };

  // ==========================================
  // REMOVE PDF
  // ==========================================

  const removePdf = () => {
    setPdfFile(null);
  };

  // ==========================================
  // SUBMIT NEWS
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        setError("Admin session expired. Please login again.");
        setLoading(false);
        return;
      }

      // ==========================================
      // VALIDATION
      // ==========================================

      if (!form.title.trim()) {
        setError("Please enter a government job news title.");
        setLoading(false);
        return;
      }

      if (!form.excerpt.trim()) {
        setError("Please enter a short description.");
        setLoading(false);
        return;
      }

      if (!form.content.trim()) {
        setError("Please write the government job news content.");
        setLoading(false);
        return;
      }

      if (!imageFile) {
        setError("Please select a cover image.");
        setLoading(false);
        return;
      }

      // ==========================================
      // TAGS
      // ==========================================

      const tags = form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      // ==========================================
      // FORM DATA
      // ==========================================

      const formData = new FormData();

      formData.append("title", form.title.trim());

      formData.append(
        "excerpt",
        form.excerpt.trim()
      );

      formData.append(
        "content",
        form.content
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "author",
        form.author.trim() || "TechBy"
      );

      formData.append(
        "readTime",
        form.readTime.trim() || "5 min"
      );

      formData.append(
        "seoTitle",
        form.seoTitle.trim() || form.title.trim()
      );

      formData.append(
        "seoDescription",
        form.seoDescription.trim() ||
          form.excerpt.trim()
      );

      formData.append(
        "status",
        form.status
      );

      formData.append(
        "featured",
        String(form.featured)
      );

      formData.append(
        "applyLink",
        form.applyLink.trim()
      );

      // Send tags as JSON string
      formData.append(
        "tags",
        JSON.stringify(tags)
      );

      // ==========================================
      // IMAGE FILE
      // ==========================================

      formData.append(
        "image",
        imageFile
      );

      // ==========================================
      // PDF FILE
      // ==========================================

      if (pdfFile) {
        formData.append(
          "pdf",
          pdfFile
        );
      }

      // ==========================================
      // API REQUEST
      // ==========================================

      const response = await fetch(
        `${API_URL}/news/admin/create`,
        {
          method: "POST",

          headers: {
            "x-admin-token": adminToken,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to create government news."
        );
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      setMessage(
        form.status === "published"
          ? "Government news published successfully!"
          : "Government news saved as draft successfully!"
      );

      // ==========================================
      // RESET
      // ==========================================

      setForm(initialForm);

      setImageFile(null);
      setImagePreview("");

      setPdfFile(null);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    } catch (err) {
      console.error(
        "Create government news error:",
        err
      );

      setError(
        err.message ||
          "Something went wrong while posting government news."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // PREVIEW
  // ==========================================

  const openPreview = () => {
    setError("");
    setMessage("");
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ==========================================
          MAIN
      ========================================== */}

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xl text-emerald-600">
              <FaLandmark />
            </div>

            <div>

              <h1 className="text-xl font-black text-slate-900 sm:text-2xl">
                Government News
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create and publish government job,
                recruitment and exam updates.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">

            <FaNewspaper />

            Government Jobs & Exams

          </div>

        </div>

        {/* ==========================================
            SUCCESS
        ========================================== */}

        {message && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">

            <FaCheckCircle />

            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage("")}
              className="ml-auto rounded-lg p-1 transition hover:bg-emerald-100"
            >
              <FaTimes />
            </button>

          </div>
        )}

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div className="mb-5 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">

            <FaTimes />

            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto rounded-lg p-1 transition hover:bg-red-100"
            >
              <FaTimes />
            </button>

          </div>
        )}

        {/* ==========================================
            FORM
        ========================================== */}

        <form onSubmit={handleSubmit}>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* ==========================================
                LEFT
            ========================================== */}

            <div className="min-w-0 space-y-6">

              {/* ==========================================
                  NEWS INFORMATION
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-6">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <FaNewspaper />
                    </div>

                    <div>

                      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                        Government News Information
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        Add recruitment, examination or government job information.
                      </p>

                    </div>

                  </div>

                </div>

                {/* TITLE */}

                <div className="mb-5">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    News Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="SSC CGL Recruitment 2026: Apply Online, Eligibility, Vacancy & Dates"
                    maxLength={250}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                  <div className="mt-2 text-right text-xs text-slate-400">
                    {form.title.length}/250
                  </div>

                </div>

                {/* EXCERPT */}

                <div className="mb-5">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Short Description
                  </label>

                  <textarea
                    name="excerpt"
                    value={form.excerpt}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    placeholder="SSC CGL 2026 recruitment notification details including vacancies, eligibility, important dates, application process and official website information."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                  <div className="mt-2 text-right text-xs text-slate-400">
                    {form.excerpt.length}/500
                  </div>

                </div>

                {/* CONTENT */}

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Government News Content
                  </label>

                  <div className="rounded-t-xl border border-b-0 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                    HTML content supported
                  </div>

                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows={22}
                    placeholder={`<h2>SSC CGL Recruitment 2026</h2>

<p>The Staff Selection Commission has announced...</p>

<h2>Important Dates</h2>

<table>
  <tr>
    <th>Event</th>
    <th>Date</th>
  </tr>
  <tr>
    <td>Application Start</td>
    <td>To be announced</td>
  </tr>
  <tr>
    <td>Last Date</td>
    <td>To be announced</td>
  </tr>
</table>

<h2>Eligibility</h2>

<ul>
  <li>Educational Qualification</li>
  <li>Age Limit</li>
  <li>Other Requirements</li>
</ul>

<h2>Application Process</h2>

<p>Eligible candidates can apply through the official website.</p>`}
                    className="w-full resize-y rounded-b-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                  <p className="mt-2 text-xs text-slate-400">
                    Include important dates, vacancies,
                    eligibility, selection process,
                    application steps and official links.
                  </p>

                </div>

              </section>

              {/* ==========================================
                  SEO
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-6 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FaGlobe />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      SEO Settings
                    </h2>

                    <p className="text-xs text-slate-500">
                      Optimize your government job article for search engines.
                    </p>

                  </div>

                </div>

                <div className="mb-5">

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    SEO Title
                  </label>

                  <input
                    type="text"
                    name="seoTitle"
                    value={form.seoTitle}
                    onChange={handleChange}
                    placeholder={
                      form.title ||
                      "SSC CGL Recruitment 2026 - Apply Online"
                    }
                    maxLength={250}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                  <div className="mt-2 flex justify-between text-xs text-slate-400">

                    <span>
                      Keep it clear and search-friendly.
                    </span>

                    <span>
                      {form.seoTitle.length}/250
                    </span>

                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    SEO Description
                  </label>

                  <textarea
                    name="seoDescription"
                    value={form.seoDescription}
                    onChange={handleChange}
                    rows={4}
                    maxLength={500}
                    placeholder={
                      form.excerpt ||
                      "Get the latest government job recruitment details, eligibility, important dates, vacancies and application process."
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                  <div className="mt-2 text-right text-xs text-slate-400">
                    {form.seoDescription.length}/500
                  </div>

                </div>

              </section>

            </div>

            {/* ==========================================
                RIGHT SIDEBAR
            ========================================== */}

            <aside className="min-w-0 space-y-6">

              {/* PUBLISH */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <h2 className="mb-4 font-bold text-slate-900">
                  Publish
                </h2>

                <div className="mb-4">

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >

                    <option value="draft">
                      Draft
                    </option>

                    <option value="published">
                      Published
                    </option>

                  </select>

                </div>

                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:bg-slate-100">

                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="h-4 w-4 accent-emerald-500"
                  />

                  <div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                      <FaStar className="text-yellow-500" />

                      Featured Government Update

                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Show this article in the featured government news section.
                    </p>

                  </div>

                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <FaSave />

                  {loading
                    ? "Uploading & Saving..."
                    : form.status === "published"
                    ? "Publish Government News"
                    : "Save Draft"}

                </button>

                <button
                  type="button"
                  onClick={openPreview}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >

                  <FaEye />

                  Preview

                </button>

              </section>

              {/* ==========================================
                  OFFICIAL APPLY LINK
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    <FaGlobe />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Official Apply Link
                    </h2>

                    <p className="text-xs text-slate-500">
                      Add the official application website.
                    </p>

                  </div>

                </div>

                <input
                  type="url"
                  name="applyLink"
                  value={form.applyLink}
                  onChange={handleChange}
                  placeholder="https://ssc.gov.in/..."
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Use the official government application URL only.
                </p>

                {form.applyLink && (
                  <a
                    href={form.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Check Apply Link
                    <span>↗</span>
                  </a>
                )}

              </section>

              {/* ==========================================
                  COVER IMAGE
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <FaImage />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Cover Image
                    </h2>

                    <p className="text-xs text-slate-500">
                      Upload article thumbnail or featured image.
                    </p>

                  </div>

                </div>

                {!imagePreview ? (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center transition hover:border-emerald-400 hover:bg-emerald-50">

                    <FaUpload className="mb-3 text-2xl text-emerald-500" />

                    <span className="text-sm font-semibold text-slate-700">
                      Click to upload image
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      JPG, PNG or WEBP • Max 5 MB
                    </span>

                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                  </label>
                ) : (
                  <div className="overflow-hidden rounded-xl border border-slate-200">

                    <img
                      src={imagePreview}
                      alt="Cover preview"
                      className="aspect-video w-full object-cover"
                    />

                    <div className="flex items-center justify-between bg-white p-3">

                      <div className="min-w-0">

                        <p className="truncate text-xs font-semibold text-slate-700">
                          {imageFile?.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {imageFile
                            ? `${(
                                imageFile.size /
                                1024 /
                                1024
                              ).toFixed(2)} MB`
                            : ""}
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="ml-3 rounded-lg bg-red-50 p-2 text-red-500 transition hover:bg-red-100"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>
                )}

              </section>

              {/* ==========================================
                  OFFICIAL PDF
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <div className="mb-4">

                  <h2 className="font-bold text-slate-900">
                    Official Notification PDF
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Optional. Upload the official recruitment notification.
                  </p>

                </div>

                {!pdfFile ? (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center transition hover:border-red-300 hover:bg-red-50">

                    <FaUpload className="mb-3 text-xl text-red-500" />

                    <span className="text-sm font-semibold text-slate-700">
                      Upload PDF
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      PDF only • Max 10 MB
                    </span>

                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                    />

                  </label>
                ) : (
                  <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 p-3">

                    <div className="min-w-0">

                      <p className="truncate text-sm font-semibold text-slate-700">
                        {pdfFile.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {(
                          pdfFile.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>

                    </div>

                    <button
                      type="button"
                      onClick={removePdf}
                      className="ml-3 rounded-lg bg-white p-2 text-red-500 shadow-sm hover:bg-red-100"
                    >
                      <FaTrash />
                    </button>

                  </div>
                )}

              </section>

              {/* ==========================================
                  CATEGORY
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <h2 className="mb-4 font-bold text-slate-900">
                  Government Category
                </h2>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                >

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}

                </select>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Select the government recruitment or exam
                  category that best matches this article.
                </p>

              </section>

              {/* ==========================================
                  ARTICLE DETAILS
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <h2 className="mb-4 font-bold text-slate-900">
                  Article Details
                </h2>

                <div className="space-y-4">

                  <div>

                    <label className="mb-2 block text-xs font-semibold text-slate-500">
                      Author
                    </label>

                    <input
                      type="text"
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-xs font-semibold text-slate-500">
                      Read Time
                    </label>

                    <input
                      type="text"
                      name="readTime"
                      value={form.readTime}
                      onChange={handleChange}
                      placeholder="5 min"
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                  </div>

                </div>

              </section>

              {/* ==========================================
                  TAGS
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <div className="mb-4 flex items-center gap-3">

                  <FaTags className="text-emerald-600" />

                  <h2 className="font-bold text-slate-900">
                    Government Job Tags
                  </h2>

                </div>

                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="SSC CGL, SSC Recruitment, Government Jobs, SSC Exam"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Separate tags with commas.
                </p>

              </section>

            </aside>

          </div>

        </form>

      </main>

      {/* ==========================================
          PREVIEW MODAL
      ========================================== */}

      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-6">

          <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

              <div>

                <h2 className="font-bold text-slate-900">
                  Government News Preview
                </h2>

                <p className="text-xs text-slate-500">
                  Preview the article before publishing.
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <FaTimes />
              </button>

            </div>

            {/* CONTENT */}

            <div className="overflow-y-auto">

              {/* IMAGE */}

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt={form.title}
                  className="aspect-[2/1] w-full object-cover"
                />
              )}

              <article className="mx-auto max-w-3xl px-5 py-7 sm:px-8 sm:py-10">

                <div className="mb-4 flex flex-wrap items-center gap-2">

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {form.category}
                  </span>

                  {form.featured && (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-700">

                      <FaStar />

                      Featured

                    </span>
                  )}

                </div>

                <h1 className="text-2xl font-black leading-tight text-slate-900 sm:text-4xl">
                  {form.title || "Government Job News Title"}
                </h1>

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">

                  <span>
                    By {form.author || "TechBy"}
                  </span>

                  <span>•</span>

                  <span>
                    {form.readTime || "5 min"}
                  </span>

                </div>

                <p className="mt-6 text-base leading-7 text-slate-600">
                  {form.excerpt ||
                    "Your government job news description will appear here."}
                </p>

                <div
                  className="prose mt-8 max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-a:text-emerald-600"
                  dangerouslySetInnerHTML={{
                    __html:
                      form.content ||
                      "<p>Your government news content will appear here.</p>",
                  }}
                />

                {pdfFile && (
                  <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        PDF
                      </div>

                      <div>

                        <h3 className="text-sm font-bold text-slate-900">
                          Official Notification PDF
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {pdfFile.name}
                        </p>

                      </div>

                    </div>

                  </div>
                )}

                <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-4">

                  <div className="flex gap-3">

                    <FaGlobe className="mt-1 shrink-0 text-blue-600" />

                    <div>

                      <h3 className="text-sm font-bold text-blue-900">
                        Admin Reminder
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-blue-700">
                        Always verify recruitment details from the official
                        government department, commission or organization
                        website before publishing.
                      </p>

                    </div>

                  </div>

                </div>

              </article>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default AdminCreateNews;