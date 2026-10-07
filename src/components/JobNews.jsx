// import React, { useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaSearch,
//   FaArrowRight,
//   FaClock,
//   FaCalendarAlt,
//   FaBuilding,
//   FaGraduationCap,
//   FaNewspaper,
//   FaFire,
//   FaSpinner,
//   FaTrain,
//   FaUniversity,
//   FaShieldAlt,
//   FaLandmark,
//   FaBook,
//   FaClipboardCheck,
//   FaFileAlt,
//   FaAward,
// } from "react-icons/fa";

// import Navbar from "./Navbar";
// import Ads from "./Ads";
// import Footer from "./Footer";

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5050";

// /* =========================================================
//    GOVERNMENT NEWS CATEGORIES
// ========================================================= */

// const GOVERNMENT_CATEGORIES = [
//   "Government Jobs",
//   "Govt Jobs",
//   "Government Job",
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

// const categories = [
//   "All",
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

// /* =========================================================
//    CATEGORY ICONS
// ========================================================= */

// const categoryIcons = {
//   "Government Jobs": FaBuilding,
//   SSC: FaNewspaper,
//   UPSC: FaUniversity,
//   Railway: FaTrain,
//   Banking: FaLandmark,
//   Defence: FaShieldAlt,
//   Police: FaShieldAlt,
//   Teaching: FaGraduationCap,
//   "State Government": FaBuilding,
//   "Admit Card": FaClipboardCheck,
//   Results: FaAward,
//   "Answer Key": FaFileAlt,
//   "Exam Updates": FaBook,
//   Scholarship: FaGraduationCap,
// };

// /* =========================================================
//    HELPERS
// ========================================================= */

// function extractArticles(data) {
//   if (Array.isArray(data)) {
//     return data;
//   }

//   if (Array.isArray(data?.news)) {
//     return data.news;
//   }

//   if (Array.isArray(data?.articles)) {
//     return data.articles;
//   }

//   if (Array.isArray(data?.data)) {
//     return data.data;
//   }

//   return [];
// }

// function isGovernmentNews(article) {
//   const category = String(article?.category || "").trim();

//   const isPublished =
//     !article?.status ||
//     String(article.status).toLowerCase() === "published";

//   return (
//     isPublished &&
//     GOVERNMENT_CATEGORIES.some(
//       (governmentCategory) =>
//         governmentCategory.toLowerCase() === category.toLowerCase()
//     )
//   );
// }

// function formatDate(date) {
//   if (!date) {
//     return "Recently";
//   }

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return date;
//   }

//   return parsedDate.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });
// }

// /* =========================================================
//    NEWS CARD
// ========================================================= */

// function NewsCard({ article, featured = false }) {
//   return (
//     <Link
//       to={`/job-news/${article.slug}`}
//       className={`group block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900 ${
//         featured ? "lg:flex" : ""
//       }`}
//     >
//       {/* IMAGE */}

//       <div
//         className={`relative overflow-hidden ${
//           featured
//             ? "h-64 lg:h-auto lg:min-h-[330px] lg:w-[48%]"
//             : "h-52 w-full"
//         }`}
//       >
//         {article.image ? (
//           <img
//             src={article.image}
//             alt={article.title || "Government Job News"}
//             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//             loading={featured ? "eager" : "lazy"}
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center bg-slate-800">
//             <FaNewspaper className="text-4xl text-slate-600" />
//           </div>
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />

//         {article.category && (
//           <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-950 shadow-lg">
//             {article.category}
//           </span>
//         )}
//       </div>

//       {/* CONTENT */}

//       <div
//         className={`p-5 ${
//           featured
//             ? "lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:p-8"
//             : ""
//         }`}
//       >
//         <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
//           <span className="flex items-center gap-1.5">
//             <FaCalendarAlt />

//             {formatDate(article.updatedAt || article.createdAt)}
//           </span>

//           {article.readTime && (
//             <span className="flex items-center gap-1.5">
//               <FaClock />

//               {article.readTime}
//             </span>
//           )}
//         </div>

//         <h2
//           className={`font-bold leading-tight text-white transition group-hover:text-emerald-400 ${
//             featured ? "text-2xl lg:text-3xl" : "text-xl"
//           }`}
//         >
//           {article.title}
//         </h2>

//         {article.excerpt && (
//           <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
//             {article.excerpt}
//           </p>
//         )}

//         <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-400">
//           Read Full Update

//           <FaArrowRight className="transition group-hover:translate-x-1" />
//         </div>
//       </div>
//     </Link>
//   );
// }

// /* =========================================================
//    TRENDING CARD
// ========================================================= */

// function TrendingCard({ article, index }) {
//   return (
//     <Link
//       to={`/job-news/${article.slug}`}
//       className="group flex gap-4 border-b border-slate-800 py-4 last:border-0"
//     >
//       <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-bold text-emerald-400">
//         {String(index + 1).padStart(2, "0")}
//       </div>

//       <div className="min-w-0">
//         <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-200 transition group-hover:text-emerald-400">
//           {article.title}
//         </h3>

//         <p className="mt-1 text-xs text-slate-500">
//           {formatDate(article.updatedAt || article.createdAt)}
//         </p>
//       </div>
//     </Link>
//   );
// }

// /* =========================================================
//    SKELETON
// ========================================================= */

// function NewsSkeleton() {
//   return (
//     <div className="grid gap-6 sm:grid-cols-2">
//       {[1, 2, 3, 4].map((item) => (
//         <div
//           key={item}
//           className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
//         >
//           <div className="h-52 animate-pulse bg-slate-800" />

//           <div className="space-y-4 p-5">
//             <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />

//             <div className="h-6 w-full animate-pulse rounded bg-slate-800" />

//             <div className="h-4 w-5/6 animate-pulse rounded bg-slate-800" />

//             <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* =========================================================
//    CATEGORY BUTTON
// ========================================================= */

// function CategoryButton({
//   category,
//   active,
//   onClick,
// }) {
//   const Icon =
//     categoryIcons[category] || FaNewspaper;

//   return (
//     <button
//       type="button"
//       onClick={() => onClick(category)}
//       className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
//         active
//           ? "border-emerald-500 bg-emerald-500 text-slate-950"
//           : "border-slate-800 bg-slate-900 text-slate-300 hover:border-emerald-500/50 hover:text-emerald-400"
//       }`}
//     >
//       {category !== "All" && <Icon />}

//       {category}
//     </button>
//   );
// }

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function JobNews() {
//   const [news, setNews] = useState([]);
//   const [trendingNews, setTrendingNews] = useState([]);

//   const [activeCategory, setActiveCategory] =
//     useState("All");

//   const [search, setSearch] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [trendingLoading, setTrendingLoading] =
//     useState(true);

//   const [error, setError] = useState("");

//   /* =======================================================
//      FETCH GOVERNMENT NEWS
//   ======================================================= */

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         /*
//           Backend should support:

//           GET /news?type=government

//           If your backend doesn't support it yet,
//           the frontend filter below still protects
//           the page from showing non-government articles.
//         */

//         const response = await fetch(
//           `${API_URL}/news?type=government`
//         );

//         if (!response.ok) {
//           throw new Error(
//             `Failed to fetch government news: ${response.status}`
//           );
//         }

//         const data = await response.json();

//         let articles = extractArticles(data);

//         /* ONLY GOVERNMENT NEWS */

//         articles = articles.filter(isGovernmentNews);

//         /* NEWEST FIRST */

//         articles.sort((a, b) => {
//           const dateA = new Date(
//             a.updatedAt ||
//               a.createdAt ||
//               a.date ||
//               0
//           );

//           const dateB = new Date(
//             b.updatedAt ||
//               b.createdAt ||
//               b.date ||
//               0
//           );

//           return dateB - dateA;
//         });

//         setNews(articles);
//       } catch (err) {
//         console.error(
//           "Government news fetch error:",
//           err
//         );

//         setError(
//           err.message ||
//             "Unable to load government job news."
//         );

//         setNews([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   /* =======================================================
//      FETCH TRENDING GOVERNMENT NEWS
//   ======================================================= */

//   useEffect(() => {
//     const fetchTrendingNews = async () => {
//       try {
//         setTrendingLoading(true);

//         const response = await fetch(
//           `${API_URL}/news/trending?type=government`
//         );

//         if (!response.ok) {
//           throw new Error(
//             "Failed to fetch trending government news"
//           );
//         }

//         const data = await response.json();

//         let articles = extractArticles(data);

//         articles = articles.filter(isGovernmentNews);

//         setTrendingNews(articles.slice(0, 5));
//       } catch (err) {
//         console.error(
//           "Trending government news error:",
//           err
//         );

//         /*
//           Fallback to latest government news
//         */

//         setTrendingNews(news.slice(0, 5));
//       } finally {
//         setTrendingLoading(false);
//       }
//     };

//     fetchTrendingNews();
//   }, []);

//   /* =======================================================
//      FALLBACK TRENDING WHEN NEWS LOADS
//   ======================================================= */

//   useEffect(() => {
//     if (
//       !trendingNews.length &&
//       news.length
//     ) {
//       setTrendingNews(news.slice(0, 5));
//     }
//   }, [news, trendingNews.length]);

//   /* =======================================================
//      FILTER NEWS
//   ======================================================= */

//   const filteredNews = useMemo(() => {
//     const searchTerm =
//       search.trim().toLowerCase();

//     return news.filter((article) => {
//       const categoryMatch =
//         activeCategory === "All" ||
//         String(article.category || "").toLowerCase() ===
//           activeCategory.toLowerCase();

//       const searchMatch =
//         !searchTerm ||
//         article.title
//           ?.toLowerCase()
//           .includes(searchTerm) ||
//         article.excerpt
//           ?.toLowerCase()
//           .includes(searchTerm) ||
//         article.category
//           ?.toLowerCase()
//           .includes(searchTerm) ||
//         article.author
//           ?.toLowerCase()
//           .includes(searchTerm) ||
//         article.tags?.some?.((tag) =>
//           String(tag)
//             .toLowerCase()
//             .includes(searchTerm)
//         );

//       return categoryMatch && searchMatch;
//     });
//   }, [
//     news,
//     activeCategory,
//     search,
//   ]);

//   /* =======================================================
//      FEATURED GOVERNMENT NEWS
//   ======================================================= */

//   const featuredArticle = useMemo(() => {
//     return (
//       news.find(
//         (article) =>
//           article.featured === true
//       ) ||
//       news[0] ||
//       null
//     );
//   }, [news]);

//   /* =======================================================
//      LATEST NEWS
//   ======================================================= */

//   const latestNews = useMemo(() => {
//     return filteredNews.filter(
//       (article) =>
//         article._id !==
//         featuredArticle?._id
//     );
//   }, [
//     filteredNews,
//     featuredArticle,
//   ]);

//   /* =======================================================
//      RESET SEARCH
//   ======================================================= */

//   const handleCategoryChange = (category) => {
//     setActiveCategory(category);
//     setSearch("");
//   };

//   /* =======================================================
//      UI
//   ======================================================= */

//   return (
//     <>
//         <Navbar />
//       <div className="min-h-screen bg-slate-950 text-white">

//         {/* =================================================
//             HERO
//         ================================================= */}

//         <section className="relative overflow-hidden border-b mt-8 border-slate-800">
//           <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10" />

//           <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//             <div className="max-w-3xl">
//               <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
//                 <FaBuilding />

//                 Government Jobs & Exam Updates
//               </div>

//               <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
//                 Government Jobs
//                 <span className="block text-emerald-400">
//                   Latest Updates
//                 </span>
//               </h1>

//               <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
//                 Get the latest government job
//                 notifications, SSC, UPSC, Railway,
//                 Banking, Defence, Police, Teaching,
//                 Admit Card, Results and other
//                 government exam updates.
//               </p>
//             </div>

//             {/* SEARCH */}

//             <div className="mt-8 max-w-3xl">
//               <div className="relative">
//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) =>
//                     setSearch(e.target.value)
//                   }
//                   placeholder="Search government jobs, SSC, UPSC, Railway..."
//                   className="w-full rounded-2xl border border-slate-800 bg-slate-900 py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500"
//                 />
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* =================================================
//             CATEGORY FILTER
//         ================================================= */}

//         <section className="border-b border-slate-800 bg-slate-950">
//           <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
//             <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
//               {categories.map((category) => (
//                 <CategoryButton
//                   key={category}
//                   category={category}
//                   active={
//                     activeCategory === category
//                   }
//                   onClick={
//                     handleCategoryChange
//                   }
//                 />
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* =================================================
//             MAIN CONTENT
//         ================================================= */}

//         <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
//           {/* TOP AD */}

//           <div className="mb-10 flex justify-center">
//             <Ads type="728x90" />
//           </div>

//           {/* ERROR */}

//           {error && !loading && (
//             <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center">
//               <p className="text-sm text-red-400">
//                 {error}
//               </p>

//               <button
//                 onClick={() =>
//                   window.location.reload()
//                 }
//                 className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}

//           {/* =================================================
//               FEATURED
//           ================================================= */}

//           {!loading &&
//             !error &&
//             featuredArticle &&
//             activeCategory === "All" &&
//             !search && (
//               <section className="mb-12">
//                 <div className="mb-5 flex items-center gap-2">
//                   <FaFire className="text-emerald-400" />

//                   <h2 className="text-xl font-bold text-white">
//                     Featured Government Job Update
//                   </h2>
//                 </div>

//                 <NewsCard
//                   article={featuredArticle}
//                   featured
//                 />
//               </section>
//             )}

//           {/* =================================================
//               CONTENT GRID
//           ================================================= */}

//           <div className="grid gap-10 lg:grid-cols-12">
//             {/* LEFT */}

//             <div className="lg:col-span-8 xl:col-span-9">
//               <div className="mb-6 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-2xl font-bold text-white">
//                     {activeCategory ===
//                     "All"
//                       ? "Latest Government Jobs"
//                       : activeCategory}
//                   </h2>

//                   <p className="mt-1 text-sm text-slate-500">
//                     {filteredNews.length}{" "}
//                     updates available
//                   </p>
//                 </div>
//               </div>

//               {/* LOADING */}

//               {loading && (
//                 <NewsSkeleton />
//               )}

//               {/* NO RESULTS */}

//               {!loading &&
//                 !error &&
//                 filteredNews.length === 0 && (
//                   <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center">
//                     <FaSearch className="mx-auto mb-4 text-4xl text-slate-700" />

//                     <h3 className="text-lg font-bold text-white">
//                       No government job updates found
//                     </h3>

//                     <p className="mt-2 text-sm text-slate-500">
//                       Try another search keyword
//                       or select another category.
//                     </p>

//                     <button
//                       onClick={() => {
//                         setSearch("");
//                         setActiveCategory(
//                           "All"
//                         );
//                       }}
//                       className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950"
//                     >
//                       View All Government Jobs
//                     </button>
//                   </div>
//                 )}

//               {/* NEWS GRID */}

//               {!loading &&
//                 !error &&
//                 latestNews.length > 0 && (
//                   <div className="grid gap-6 sm:grid-cols-2">
//                     {latestNews.map(
//                       (article, index) => (
//                         <React.Fragment
//                           key={
//                             article._id ||
//                             article.slug ||
//                             index
//                           }
//                         >
//                           <NewsCard
//                             article={article}
//                           />

//                           {/* AD AFTER EVERY 4 ARTICLES */}

//                           {(index + 1) %
//                             4 ===
//                             0 && (
//                             <div className="col-span-full flex justify-center py-2">
//                               <Ads type="728x90" />
//                             </div>
//                           )}
//                         </React.Fragment>
//                       )
//                     )}
//                   </div>
//                 )}
//             </div>

//             {/* =================================================
//                 SIDEBAR
//             ================================================= */}

//             <aside className="lg:col-span-4 xl:col-span-3">
//               {/* TRENDING */}

//               <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
//                 <div className="mb-4 flex items-center gap-2">
//                   <FaFire className="text-orange-400" />

//                   <h2 className="text-lg font-bold text-white">
//                     Trending Government Jobs
//                   </h2>
//                 </div>

//                 {trendingLoading ? (
//                   <div className="space-y-4">
//                     {[1, 2, 3, 4, 5].map(
//                       (item) => (
//                         <div
//                           key={item}
//                           className="flex gap-3"
//                         >
//                           <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-800" />

//                           <div className="flex-1 space-y-2">
//                             <div className="h-3 w-full animate-pulse rounded bg-slate-800" />

//                             <div className="h-3 w-3/4 animate-pulse rounded bg-slate-800" />
//                           </div>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 ) : trendingNews.length > 0 ? (
//                   <div>
//                     {trendingNews.map(
//                       (article, index) => (
//                         <TrendingCard
//                           key={
//                             article._id ||
//                             article.slug ||
//                             index
//                           }
//                           article={article}
//                           index={index}
//                         />
//                       )
//                     )}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-slate-500">
//                     No trending updates yet.
//                   </p>
//                 )}
//               </div>

//               {/* MOBILE AD */}

//               <div className="mt-6 flex justify-center lg:hidden">
//                 <Ads type="320x50" />
//               </div>

//               {/* DESKTOP AD */}

//               <div className="mt-6 hidden justify-center lg:flex">
//                 <Ads type="300x250" />
//               </div>

//               {/* PRIVATE JOB CTA */}

//               <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6">
//                 <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
//                   <FaBuilding className="text-xl text-emerald-400" />
//                 </div>

//                 <h3 className="text-lg font-bold text-white">
//                   Looking for Private Jobs?
//                 </h3>

//                 <p className="mt-2 text-sm leading-6 text-slate-400">
//                   Find the latest IT, BPO,
//                   Fresher, Internship and
//                   private-sector job opportunities
//                   on TechBy.
//                 </p>

//                 <Link
//                   to="/jobs"
//                   className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
//                 >
//                   Explore Private Jobs

//                   <FaArrowRight />
//                 </Link>
//               </div>

//               {/* IMPORTANT */}

//               <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
//                 <h3 className="text-sm font-bold text-white">
//                   Government Job Categories
//                 </h3>

//                 <div className="mt-4 flex flex-wrap gap-2">
//                   {categories
//                     .filter(
//                       (category) =>
//                         category !== "All"
//                     )
//                     .map((category) => (
//                       <button
//                         key={category}
//                         onClick={() =>
//                           handleCategoryChange(
//                             category
//                           )
//                         }
//                         className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-400 transition hover:border-emerald-500/40 hover:text-emerald-400"
//                       >
//                         {category}
//                       </button>
//                     ))}
//                 </div>
//               </div>
//             </aside>
//           </div>

//           {/* =================================================
//               BOTTOM AD
//           ================================================= */}

//           <div className="mt-12 flex justify-center">
//             <Ads type="728x90" />
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaArrowRight,
  FaClock,
  FaCalendarAlt,
  FaBuilding,
  FaGraduationCap,
  FaNewspaper,
  FaFire,
  FaSpinner,
  FaTrain,
  FaUniversity,
  FaShieldAlt,
  FaLandmark,
  FaBook,
  FaClipboardCheck,
  FaFileAlt,
  FaAward,
} from "react-icons/fa";

import Navbar from "./Navbar";
import Ads from "./Ads";
import Footer from "./Footer";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050";

/* =========================================================
   GOVERNMENT NEWS CATEGORIES
========================================================= */

const GOVERNMENT_CATEGORIES = [
  "Government Jobs",
  "Govt Jobs",
  "Government Job",
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

const categories = [
  "All",
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

/* =========================================================
   CATEGORY ICONS
========================================================= */

const categoryIcons = {
  "Government Jobs": FaBuilding,
  SSC: FaNewspaper,
  UPSC: FaUniversity,
  Railway: FaTrain,
  Banking: FaLandmark,
  Defence: FaShieldAlt,
  Police: FaShieldAlt,
  Teaching: FaGraduationCap,
  "State Government": FaBuilding,
  "Admit Card": FaClipboardCheck,
  Results: FaAward,
  "Answer Key": FaFileAlt,
  "Exam Updates": FaBook,
  Scholarship: FaGraduationCap,
};

/* =========================================================
   HELPERS
========================================================= */

function extractArticles(data) {
  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.news)) {
    return data.news;
  }

  if (Array.isArray(data?.articles)) {
    return data.articles;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  return [];
}

function isGovernmentNews(article) {
  const category = String(article?.category || "").trim();

  const isPublished =
    !article?.status ||
    String(article.status).toLowerCase() === "published";

  return (
    isPublished &&
    GOVERNMENT_CATEGORIES.some(
      (governmentCategory) =>
        governmentCategory.toLowerCase() === category.toLowerCase()
    )
  );
}

function formatDate(date) {
  if (!date) {
    return "Recently";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   NEWS CARD
========================================================= */

function NewsCard({ article, featured = false }) {
  return (
    <Link
      to={`/job-news/${article.slug}`}
      className={`group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg ${
        featured ? "lg:flex" : ""
      }`}
    >
      {/* IMAGE */}

      <div
        className={`relative overflow-hidden ${
          featured
            ? "h-64 lg:h-auto lg:min-h-[330px] lg:w-[48%]"
            : "h-52 w-full"
        }`}
      >
        {article.image ? (
          <img
            src={article.image}
            alt={article.title || "Government Job News"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading={featured ? "eager" : "lazy"}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-emerald-50">
            <FaNewspaper className="text-4xl text-emerald-200" />
          </div>
        )}

        {/* IMAGE OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

        {/* CATEGORY */}

        {article.category && (
          <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/95 px-3 py-1 text-xs font-bold text-emerald-800 shadow-md backdrop-blur">
            {article.category}
          </span>
        )}
      </div>

      {/* CONTENT */}

      <div
        className={`p-5 ${
          featured
            ? "lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:p-8"
            : ""
        }`}
      >
        {/* META */}

        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt className="text-emerald-600" />

            {formatDate(article.updatedAt || article.createdAt)}
          </span>

          {article.readTime && (
            <span className="flex items-center gap-1.5">
              <FaClock className="text-emerald-600" />

              {article.readTime}
            </span>
          )}
        </div>

        {/* TITLE */}

        <h2
          className={`font-bold leading-tight text-slate-900 transition group-hover:text-emerald-700 ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          {article.title}
        </h2>

        {/* EXCERPT */}

        {article.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
            {article.excerpt}
          </p>
        )}

        {/* READ MORE */}

        <div className="mt-5 flex items-center gap-2 text-sm font-bold text-emerald-700">
          Read Full Update

          <FaArrowRight className="transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   TRENDING CARD
========================================================= */

function TrendingCard({ article, index }) {
  return (
    <Link
      to={`/job-news/${article.slug}`}
      className="group flex gap-4 border-b border-slate-100 py-4 last:border-0"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="min-w-0">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-700 transition group-hover:text-emerald-700">
          {article.title}
        </h3>

        <p className="mt-1 text-xs text-slate-400">
          {formatDate(article.updatedAt || article.createdAt)}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function NewsSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="h-52 animate-pulse bg-slate-200" />

          <div className="space-y-4 p-5">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />

            <div className="h-6 w-full animate-pulse rounded bg-slate-200" />

            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />

            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   CATEGORY BUTTON
========================================================= */

function CategoryButton({
  category,
  active,
  onClick,
}) {
  const Icon =
    categoryIcons[category] || FaNewspaper;

  return (
    <button
      type="button"
      onClick={() => onClick(category)}
      className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "border-emerald-700 bg-emerald-700 text-white shadow-sm"
          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
      }`}
    >
      {category !== "All" && <Icon />}

      {category}
    </button>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function JobNews() {
  const [news, setNews] = useState([]);
  const [trendingNews, setTrendingNews] = useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] =
    useState(true);

  const [error, setError] = useState("");

  /* =======================================================
     FETCH GOVERNMENT NEWS
  ======================================================= */

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/news?type=government`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch government news: ${response.status}`
          );
        }

        const data = await response.json();

        let articles = extractArticles(data);

        articles = articles.filter(isGovernmentNews);

        articles.sort((a, b) => {
          const dateA = new Date(
            a.updatedAt ||
              a.createdAt ||
              a.date ||
              0
          );

          const dateB = new Date(
            b.updatedAt ||
              b.createdAt ||
              b.date ||
              0
          );

          return dateB - dateA;
        });

        setNews(articles);
      } catch (err) {
        console.error(
          "Government news fetch error:",
          err
        );

        setError(
          err.message ||
            "Unable to load government job news."
        );

        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /* =======================================================
     FETCH TRENDING GOVERNMENT NEWS
  ======================================================= */

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        setTrendingLoading(true);

        const response = await fetch(
          `${API_URL}/news/trending?type=government`
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch trending government news"
          );
        }

        const data = await response.json();

        let articles = extractArticles(data);

        articles = articles.filter(isGovernmentNews);

        setTrendingNews(articles.slice(0, 5));
      } catch (err) {
        console.error(
          "Trending government news error:",
          err
        );

        setTrendingNews(news.slice(0, 5));
      } finally {
        setTrendingLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  /* =======================================================
     FALLBACK TRENDING WHEN NEWS LOADS
  ======================================================= */

  useEffect(() => {
    if (
      !trendingNews.length &&
      news.length
    ) {
      setTrendingNews(news.slice(0, 5));
    }
  }, [news, trendingNews.length]);

  /* =======================================================
     FILTER NEWS
  ======================================================= */

  const filteredNews = useMemo(() => {
    const searchTerm =
      search.trim().toLowerCase();

    return news.filter((article) => {
      const categoryMatch =
        activeCategory === "All" ||
        String(article.category || "").toLowerCase() ===
          activeCategory.toLowerCase();

      const searchMatch =
        !searchTerm ||
        article.title
          ?.toLowerCase()
          .includes(searchTerm) ||
        article.excerpt
          ?.toLowerCase()
          .includes(searchTerm) ||
        article.category
          ?.toLowerCase()
          .includes(searchTerm) ||
        article.author
          ?.toLowerCase()
          .includes(searchTerm) ||
        article.tags?.some?.((tag) =>
          String(tag)
            .toLowerCase()
            .includes(searchTerm)
        );

      return categoryMatch && searchMatch;
    });
  }, [
    news,
    activeCategory,
    search,
  ]);

  /* =======================================================
     FEATURED GOVERNMENT NEWS
  ======================================================= */

  const featuredArticle = useMemo(() => {
    return (
      news.find(
        (article) =>
          article.featured === true
      ) ||
      news[0] ||
      null
    );
  }, [news]);

  /* =======================================================
     LATEST NEWS
  ======================================================= */

  const latestNews = useMemo(() => {
    return filteredNews.filter(
      (article) =>
        article._id !==
        featuredArticle?._id
    );
  }, [
    filteredNews,
    featuredArticle,
  ]);

  /* =======================================================
     RESET SEARCH
  ======================================================= */

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearch("");
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 text-slate-900">

        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative mt-8 overflow-hidden border-b border-emerald-100 bg-white">

          {/* BACKGROUND */}

          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50" />

          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

            <div className="max-w-3xl">

              {/* BADGE */}

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                <FaBuilding />

                Government Jobs & Exam Updates
              </div>

              {/* TITLE */}

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Government Jobs

                <span className="block text-emerald-700">
                  Latest Updates
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Get the latest government job
                notifications, SSC, UPSC, Railway,
                Banking, Defence, Police, Teaching,
                Admit Card, Results and other
                government exam updates.
              </p>

            </div>

            {/* SEARCH */}

            <div className="mt-8 max-w-3xl">

              <div className="relative">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search government jobs, SSC, UPSC, Railway..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            CATEGORY FILTER
        ================================================= */}

        <section className="border-b border-slate-200 bg-white">

          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">

            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">

              {categories.map((category) => (
                <CategoryButton
                  key={category}
                  category={category}
                  active={
                    activeCategory === category
                  }
                  onClick={
                    handleCategoryChange
                  }
                />
              ))}

            </div>

          </div>

        </section>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* TOP AD */}

          <div className="mb-10 flex justify-center overflow-hidden">
            <Ads type="728x90" />
          </div>

          {/* ERROR */}

          {error && !loading && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 text-center">

              <p className="text-sm font-medium text-red-600">
                {error}
              </p>

              <button
                onClick={() =>
                  window.location.reload()
                }
                className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Try Again
              </button>

            </div>
          )}

          {/* =================================================
              FEATURED
          ================================================= */}

          {!loading &&
            !error &&
            featuredArticle &&
            activeCategory === "All" &&
            !search && (
              <section className="mb-12">

                <div className="mb-5 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50">
                    <FaFire className="text-emerald-600" />
                  </div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Featured Government Job Update
                  </h2>

                </div>

                <NewsCard
                  article={featuredArticle}
                  featured
                />

              </section>
            )}

          {/* =================================================
              CONTENT GRID
          ================================================= */}

          <div className="grid gap-10 lg:grid-cols-12">

            {/* =================================================
                LEFT
            ================================================= */}

            <div className="lg:col-span-8 xl:col-span-9">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    {activeCategory ===
                    "All"
                      ? "Latest Government Jobs"
                      : activeCategory}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {filteredNews.length}{" "}
                    updates available
                  </p>

                </div>

              </div>

              {/* LOADING */}

              {loading && (
                <NewsSkeleton />
              )}

              {/* NO RESULTS */}

              {!loading &&
                !error &&
                filteredNews.length === 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                      <FaSearch className="text-2xl text-emerald-500" />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      No government job updates found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Try another search keyword
                      or select another category.
                    </p>

                    <button
                      onClick={() => {
                        setSearch("");
                        setActiveCategory(
                          "All"
                        );
                      }}
                      className="mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      View All Government Jobs
                    </button>

                  </div>
                )}

              {/* NEWS GRID */}

              {!loading &&
                !error &&
                latestNews.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2">

                    {latestNews.map(
                      (article, index) => (
                        <React.Fragment
                          key={
                            article._id ||
                            article.slug ||
                            index
                          }
                        >

                          <NewsCard
                            article={article}
                          />

                          {/* AD AFTER EVERY 4 ARTICLES */}

                          {(index + 1) % 4 ===
                            0 && (
                            <div className="col-span-full flex justify-center py-2 overflow-hidden">
                              <Ads type="728x90" />
                            </div>
                          )}

                        </React.Fragment>
                      )
                    )}

                  </div>
                )}

            </div>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="lg:col-span-4 xl:col-span-3">

              {/* TRENDING */}

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="mb-4 flex items-center gap-2">

                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                    <FaFire className="text-orange-500" />
                  </div>

                  <h2 className="text-lg font-bold text-slate-900">
                    Trending Government Jobs
                  </h2>

                </div>

                {trendingLoading ? (
                  <div className="space-y-4">

                    {[1, 2, 3, 4, 5].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex gap-3"
                        >

                          <div className="h-8 w-8 animate-pulse rounded-lg bg-slate-200" />

                          <div className="flex-1 space-y-2">

                            <div className="h-3 w-full animate-pulse rounded bg-slate-200" />

                            <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />

                          </div>

                        </div>
                      )
                    )}

                  </div>
                ) : trendingNews.length > 0 ? (
                  <div>
                    {trendingNews.map(
                      (article, index) => (
                        <TrendingCard
                          key={
                            article._id ||
                            article.slug ||
                            index
                          }
                          article={article}
                          index={index}
                        />
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No trending updates yet.
                  </p>
                )}

              </div>

              {/* MOBILE AD */}

              <div className="mt-6 flex justify-center lg:hidden overflow-hidden">
                <Ads type="320x50" />
              </div>

              {/* DESKTOP AD */}

              <div className="mt-6 hidden justify-center lg:flex overflow-hidden">
                <Ads type="300x250" />
              </div>

              {/* PRIVATE JOB CTA */}

              <div className="mt-6 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 shadow-sm">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <FaBuilding className="text-xl text-emerald-700" />
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  Looking for Private Jobs?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Find the latest IT, BPO,
                  Fresher, Internship and
                  private-sector job opportunities
                  on TechBy.
                </p>

                <Link
                  to="/jobs"
                  className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
                >
                  Explore Private Jobs

                  <FaArrowRight />
                </Link>

              </div>

              {/* IMPORTANT */}

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                <h3 className="text-sm font-bold text-slate-900">
                  Government Job Categories
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">

                  {categories
                    .filter(
                      (category) =>
                        category !== "All"
                    )
                    .map((category) => (
                      <button
                        key={category}
                        onClick={() =>
                          handleCategoryChange(
                            category
                          )
                        }
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        {category}
                      </button>
                    ))}

                </div>

              </div>

            </aside>

          </div>

          {/* =================================================
              BOTTOM AD
          ================================================= */}

          <div className="mt-12 flex justify-center overflow-hidden">
            <Ads type="728x90" />
          </div>

        </main>

      </div>

      <Footer />
    </>
  );
}