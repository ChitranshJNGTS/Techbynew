// import React, { useState } from "react";
// import {
//   FaMapMarkerAlt,
//   FaSearch,
//   FaBriefcase,
//   FaArrowRight,
//   FaCheckCircle,
//   FaUsers,
//   FaBuilding,
//   FaRocket,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Hero = () => {
//   const navigate = useNavigate();

//   const [keyword, setKeyword] = useState("");
//   const [location, setLocation] = useState("");
//   const [category, setCategory] = useState("");

//   const handleSearch = () => {
//     const params = new URLSearchParams();

//     if (keyword.trim()) {
//       params.set("keyword", keyword.trim());
//     }

//     if (location.trim()) {
//       params.set("location", location.trim());
//     }

//     if (category) {
//       params.set("category", category);
//     }

//     navigate(`/all-jobs?${params.toString()}`);
//   };

//   const handlePopularSearch = (value) => {
//     setKeyword(value);

//     navigate(
//       `/all-jobs?keyword=${encodeURIComponent(value)}`
//     );
//   };

//   return (
//     <section className="relative min-h-screen overflow-hidden bg-slate-950">
//       {/* ================= BACKGROUND ================= */}

//       <div
//         className="absolute inset-0 bg-cover bg-center scale-105"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop')",
//         }}
//       />

//       {/* Dark overlay */}
//       <div className="absolute inset-0 bg-slate-950/75" />

//       {/* Gradient overlay */}
//       <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/50" />

//       {/* Green glow */}
//       <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />

//       <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />

//       {/* ================= CONTENT ================= */}

//       <div className="relative z-10 min-h-screen flex items-center pt-28 pb-16">
//         <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">

//           <div className="max-w-6xl mx-auto">

//             {/* ================= BADGE ================= */}

//             <div className="flex justify-center mb-7">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-emerald-300 text-sm font-medium">
//                 <FaRocket className="text-emerald-400" />

//                 <span>
//                   Your next opportunity starts here
//                 </span>

//                 <FaCheckCircle className="text-emerald-400" />
//               </div>
//             </div>

//             {/* ================= HEADING ================= */}

//             <div className="text-center">

//               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">

//                 Find Your{" "}

//                 <span className="text-emerald-400">
//                   Dream Job
//                 </span>

//                 <br />

//                 Build Your{" "}

//                 <span className="text-white">
//                   Future.
//                 </span>

//               </h1>

//               <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 mt-7 leading-8">

//                 Discover exciting job opportunities, connect with leading
//                 employers, and take the next step toward a successful career.

//               </p>

//             </div>

//             {/* ================= SEARCH BOX ================= */}

//             <div className="mt-10">

//               <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-black/30 p-2 md:p-3">

//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">

//                   {/* JOB TITLE */}

//                   <div className="px-5 py-4 md:border-r border-slate-200">

//                     <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
//                       What are you looking for?
//                     </label>

//                     <div className="flex items-center gap-3">

//                       <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
//                         <FaSearch className="text-emerald-500" />
//                       </div>

//                       <input
//                         value={keyword}
//                         onChange={(e) =>
//                           setKeyword(e.target.value)
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") {
//                             handleSearch();
//                           }
//                         }}
//                         placeholder="Job title, skill or keyword"
//                         className="w-full outline-none text-slate-800 placeholder:text-slate-400 text-sm md:text-base"
//                       />

//                     </div>

//                   </div>

//                   {/* LOCATION */}

//                   <div className="px-5 py-4 lg:border-r border-slate-200">

//                     <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
//                       Location
//                     </label>

//                     <div className="flex items-center gap-3">

//                       <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
//                         <FaMapMarkerAlt className="text-emerald-500" />
//                       </div>

//                       <input
//                         value={location}
//                         onChange={(e) =>
//                           setLocation(e.target.value)
//                         }
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") {
//                             handleSearch();
//                           }
//                         }}
//                         placeholder="City or state"
//                         className="w-full outline-none text-slate-800 placeholder:text-slate-400 text-sm md:text-base"
//                       />

//                     </div>

//                   </div>

//                   {/* CATEGORY */}

//                   <div className="px-5 py-4 border-t md:border-t-0 border-slate-200 lg:border-r">

//                     <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
//                       Category
//                     </label>

//                     <div className="flex items-center gap-3">

//                       <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
//                         <FaBriefcase className="text-emerald-500" />
//                       </div>

//                       <select
//                         value={category}
//                         onChange={(e) =>
//                           setCategory(e.target.value)
//                         }
//                         className="w-full outline-none bg-transparent text-slate-800 text-sm md:text-base cursor-pointer"
//                       >
//                         <option value="">
//                           All Categories
//                         </option>

//                         <option value="Software Development">
//                           Software Development
//                         </option>

//                         <option value="UI/UX Design">
//                           UI/UX Design
//                         </option>

//                         <option value="Marketing">
//                           Marketing
//                         </option>

//                         <option value="Sales">
//                           Sales
//                         </option>

//                         <option value="Finance">
//                           Finance
//                         </option>

//                         <option value="Human Resources">
//                           Human Resources
//                         </option>

//                         <option value="Customer Support">
//                           Customer Support
//                         </option>
//                       </select>

//                     </div>

//                   </div>

//                   {/* SEARCH BUTTON */}

//                   <button
//                     onClick={handleSearch}
//                     className="m-2 md:m-0 lg:m-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold px-7 py-4 lg:rounded-2xl rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-emerald-500/20"
//                   >

//                     <FaSearch />

//                     <span>
//                       Search Jobs
//                     </span>

//                   </button>

//                 </div>

//               </div>

//             </div>

//             {/* ================= POPULAR SEARCHES ================= */}

//             <div className="flex flex-wrap items-center justify-center gap-3 mt-6">

//               <span className="text-sm text-slate-400">
//                 Popular searches:
//               </span>

//               {[
//                 "React Developer",
//                 "Java Developer",
//                 "Frontend Developer",
//                 "Sales Executive",
//                 "Customer Support",
//               ].map((item) => (

//                 <button
//                   key={item}
//                   onClick={() =>
//                     handlePopularSearch(item)
//                   }
//                   className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 text-xs sm:text-sm transition"
//                 >
//                   {item}
//                 </button>

//               ))}

//             </div>

//             {/* ================= TRUST / STATS ================= */}

//             <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">

//               {/* JOBS */}

//               <div className="flex items-center gap-3">

//                 <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
//                   <FaBriefcase className="text-emerald-400" />
//                 </div>

//                 <div>

//                   <p className="text-white font-bold text-lg">
//                     1,000+
//                   </p>

//                   <p className="text-slate-400 text-xs">
//                     Job Opportunities
//                   </p>

//                 </div>

//               </div>

//               {/* EMPLOYERS */}

//               <div className="flex items-center gap-3">

//                 <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
//                   <FaBuilding className="text-emerald-400" />
//                 </div>

//                 <div>

//                   <p className="text-white font-bold text-lg">
//                     500+
//                   </p>

//                   <p className="text-slate-400 text-xs">
//                     Hiring Companies
//                   </p>

//                 </div>

//               </div>

//               {/* CANDIDATES */}

//               <div className="flex items-center gap-3">

//                 <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
//                   <FaUsers className="text-emerald-400" />
//                 </div>

//                 <div>

//                   <p className="text-white font-bold text-lg">
//                     10K+
//                   </p>

//                   <p className="text-slate-400 text-xs">
//                     Job Seekers
//                   </p>

//                 </div>

//               </div>

//             </div>

//             {/* ================= BOTTOM CTA ================= */}

//             <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">

//               <button
//                 onClick={() => navigate("/all-jobs")}
//                 className="group flex items-center gap-3 text-white hover:text-emerald-400 font-semibold transition"
//               >

//                 Explore All Jobs

//                 <FaArrowRight className="group-hover:translate-x-1 transition-transform" />

//               </button>

//               {/* <span className="hidden sm:block text-slate-700">
//                 |
//               </span> */}

//               {/* <button
//                 onClick={() =>
//                   navigate("/recruiter/post-job")
//                 }
//                 className="text-slate-400 hover:text-white transition font-medium"
//               >
//                 Looking to hire?
//               </button> */}

//             </div>

//           </div>

//         </div>
//       </div>

//     </section>
//   );
// };

// export default Hero; 



import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaBriefcase,
  FaArrowRight,
  FaCheckCircle,
  FaUsers,
  FaBuilding,
  FaRocket,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("keyword", keyword.trim());
    }

    navigate(`/all-jobs?${params.toString()}`);
  };

  const handlePopularSearch = (value) => {
    setKeyword(value);

    navigate(
      `/all-jobs?keyword=${encodeURIComponent(value)}`
    );
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">

      {/* ================= BACKGROUND ================= */}

      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-950/75" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/50" />

      {/* Green glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl" />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 min-h-screen flex items-center pt-28 pb-16">

        <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8">

          <div className="max-w-6xl mx-auto">

            {/* ================= BADGE ================= */}

            <div className="flex justify-center mb-7">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-emerald-300 text-sm font-medium">

                <FaRocket className="text-emerald-400" />

                <span>
                  Your next opportunity starts here
                </span>

                <FaCheckCircle className="text-emerald-400" />

              </div>

            </div>

            {/* ================= HEADING ================= */}

            <div className="text-center">

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">

                Find Your{" "}

                <span className="text-emerald-400">
                  Dream Job
                </span>

                <br />

                Build Your{" "}

                <span className="text-white">
                  Future.
                </span>

              </h1>

              <p className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 mt-7 leading-8">

                Discover exciting job opportunities, connect with leading
                employers, and take the next step toward a successful career.

              </p>

            </div>

            {/* ================= SEARCH BOX ================= */}

            <div className="mt-10">

              <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-black/30 p-2 md:p-3">

                <div className="flex flex-col md:flex-row items-stretch">

                  {/* JOB TITLE */}

                  <div className="flex-1 px-5 py-4">

                    <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                      What are you looking for?
                    </label>

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">

                        <FaSearch className="text-emerald-500" />

                      </div>

                      <input
                        value={keyword}
                        onChange={(e) =>
                          setKeyword(e.target.value)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch();
                          }
                        }}
                        placeholder="Job title, skill or keyword"
                        className="w-full outline-none text-slate-800 placeholder:text-slate-400 text-sm md:text-base"
                      />

                    </div>

                  </div>

                  {/* SEARCH BUTTON */}

                  <button
                    onClick={handleSearch}
                    className="m-2 md:m-0 lg:m-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold px-7 py-4 lg:rounded-2xl rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-lg shadow-emerald-500/20"
                  >

                    <FaSearch />

                    <span>
                      Search Jobs
                    </span>

                  </button>

                </div>

              </div>

            </div>

            {/* ================= POPULAR SEARCHES ================= */}

            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">

              <span className="text-sm text-slate-400">
                Popular searches:
              </span>

              {[
                "React Developer",
                "Java Developer",
                "Frontend Developer",
                "Sales Executive",
                "Customer Support",
              ].map((item) => (

                <button
                  key={item}
                  onClick={() =>
                    handlePopularSearch(item)
                  }
                  className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/30 text-slate-300 hover:text-emerald-400 text-xs sm:text-sm transition"
                >
                  {item}
                </button>

              ))}

            </div>

            {/* ================= TRUST / STATS ================= */}

            <div className="mt-12 flex flex-wrap justify-center gap-8 sm:gap-12">

              {/* JOBS */}

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">

                  <FaBriefcase className="text-emerald-400" />

                </div>

                <div>

                  <p className="text-white font-bold text-lg">
                    1,000+
                  </p>

                  <p className="text-slate-400 text-xs">
                    Job Opportunities
                  </p>

                </div>

              </div>

              {/* EMPLOYERS */}

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">

                  <FaBuilding className="text-emerald-400" />

                </div>

                <div>

                  <p className="text-white font-bold text-lg">
                    500+
                  </p>

                  <p className="text-slate-400 text-xs">
                    Hiring Companies
                  </p>

                </div>

              </div>

              {/* CANDIDATES */}

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">

                  <FaUsers className="text-emerald-400" />

                </div>

                <div>

                  <p className="text-white font-bold text-lg">
                    10K+
                  </p>

                  <p className="text-slate-400 text-xs">
                    Job Seekers
                  </p>

                </div>

              </div>

            </div>

            {/* ================= BOTTOM CTA ================= */}

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">

              <button
                onClick={() => navigate("/all-jobs")}
                className="group flex items-center gap-3 text-white hover:text-emerald-400 font-semibold transition"
              >

                Explore All Jobs

                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />

              </button>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;