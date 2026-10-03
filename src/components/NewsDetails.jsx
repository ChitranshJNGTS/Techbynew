
// import React from "react";
// import { Link, useParams } from "react-router-dom";
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaCalendarAlt,
//   FaClock,
//   FaFacebookF,
//   FaLinkedinIn,
//   FaWhatsapp,
//   FaBriefcase,
//   FaNewspaper,
// } from "react-icons/fa";
// import Navbar from "./Navbar";
// import Ads from "./Ads";

// // Keep the same data in a separate file later.
// // For now this makes the page completely frontend-only.
// const newsData = [
//   {
//     id: 1,
//     slug: "latest-it-jobs-for-freshers-in-india",
//     title: "Latest IT Jobs for Freshers in India: Companies Hiring Now",
//     excerpt:
//       "Several companies are hiring fresh graduates across software development, testing, support, and other technology roles.",
//     category: "IT Jobs",
//     author: "TechBy Team",
//     date: "September 22, 2026",
//     readTime: "4 min read",
//     image:
//       "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
//     content: [
//       "The Indian technology job market continues to offer opportunities for fresh graduates and entry-level professionals.",
//       "Companies are hiring for roles including frontend development, backend development, software testing, technical support, data operations and customer-facing technology positions.",
//       "Freshers looking for their first technology role should focus on building practical projects, maintaining an updated resume and applying consistently to relevant openings.",
//       "Candidates should also verify the company and job details before sharing personal information or paying any recruitment-related fee.",
//     ],
//   },
//   {
//     id: 2,
//     slug: "government-jobs-this-month",
//     title: "Government Jobs: Important Recruitment Opportunities to Watch",
//     excerpt:
//       "A look at government recruitment opportunities, application timelines and important things candidates should check.",
//     category: "Government Jobs",
//     author: "TechBy Team",
//     date: "September 21, 2026",
//     readTime: "5 min read",
//     image:
//       "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1400&q=80",
//     content: [
//       "Government recruitment notifications are released throughout the year across central and state departments.",
//       "Candidates should always check the official recruitment notification for eligibility, age requirements, application dates and examination details.",
//       "Before submitting an application, carefully review the required educational qualification and category-specific requirements.",
//     ],
//   },
//   {
//     id: 3,
//     slug: "react-developer-jobs-freshers",
//     title: "React Developer Jobs for Freshers: Skills You Should Know",
//     excerpt:
//       "Want to start your career as a React developer? Here are some of the skills employers commonly look for.",
//     category: "Career Tips",
//     author: "TechBy Team",
//     date: "September 20, 2026",
//     readTime: "6 min read",
//     image:
//       "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
//     content: [
//       "React remains a popular frontend technology used by startups, product companies and service organizations.",
//       "Freshers should have a good understanding of JavaScript fundamentals, React components, props, state, hooks and API integration.",
//       "Projects can make a significant difference when applying for entry-level frontend positions.",
//       "A simple portfolio containing two or three well-built projects can help demonstrate practical development skills.",
//     ],
//   },
//   {
//     id: 4,
//     slug: "internship-opportunities-for-students",
//     title: "Internship Opportunities: How Students Can Find the Right Role",
//     excerpt:
//       "Internships can help students gain practical experience and understand how professional teams work.",
//     category: "Internships",
//     author: "TechBy Team",
//     date: "September 19, 2026",
//     readTime: "4 min read",
//     image:
//       "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
//     content: [
//       "Internships can provide students with practical exposure before they enter the full-time job market.",
//       "When evaluating an internship, candidates should consider the role, responsibilities, learning opportunities and duration.",
//       "Avoid opportunities that require candidates to pay money in exchange for a guaranteed job or internship.",
//     ],
//   },
//   {
//     id: 5,
//     slug: "companies-hiring-in-indore",
//     title: "Companies Hiring in Indore: Roles Candidates Should Watch",
//     excerpt:
//       "Indore continues to see hiring across IT, BPO, sales, customer support and other professional roles.",
//     category: "Hiring News",
//     author: "TechBy Team",
//     date: "September 18, 2026",
//     readTime: "5 min read",
//     image:
//       "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80",
//     content: [
//       "Indore has a growing employment ecosystem covering technology, BPO, sales, customer support and other professional sectors.",
//       "Job seekers can improve their chances by maintaining multiple versions of their resume for different types of roles.",
//       "Candidates should also pay attention to location, work mode, experience requirements and salary details before applying.",
//     ],
//   },
//   {
//     id: 6,
//     slug: "how-to-create-job-ready-resume",
//     title: "How to Create a Job-Ready Resume in 2026",
//     excerpt:
//       "A practical guide to creating a clear and professional resume that highlights your skills and experience.",
//     category: "Career Tips",
//     author: "TechBy Team",
//     date: "September 17, 2026",
//     readTime: "7 min read",
//     image:
//       "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
//     content: [
//       "A resume should make it easy for recruiters to understand your experience, skills and achievements.",
//       "Keep your resume concise and focus on information that is relevant to the position you are applying for.",
//       "For technical positions, include relevant technologies, projects, internships and measurable accomplishments.",
//       "Always proofread your resume before submitting an application.",
//     ],
//   },
// ];

// export default function NewsDetails() {
//   const { slug } = useParams();

//   const article = newsData.find(
//     (item) => item.slug === slug
//   );

//   if (!article) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
//         <div className="text-center">
//           <FaNewspaper className="mx-auto text-5xl text-slate-700" />

//           <h1 className="mt-5 text-3xl font-bold">
//             Article Not Found
//           </h1>

//           <p className="mt-2 text-slate-500">
//             The news article you are looking for does not exist.
//           </p>

//           <Link
//             to="/job-news"
//             className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950"
//           >
//             <FaArrowLeft />
//             Back to Job News
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const relatedArticles = newsData
//     .filter(
//       (item) =>
//         item.id !== article.id &&
//         item.category === article.category
//     )
//     .slice(0, 3);

//   const shareUrl = window.location.href;

//   const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
//     `${article.title} - ${shareUrl}`
//   )}`;

//   const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
//     shareUrl
//   )}`;

//   const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
//     shareUrl
//   )}`;

//   return (
//    <>
//    <Navbar/>
//     <div className="min-h-screen mt-20 bg-slate-950 text-white">
//          {/* Back */}
//       <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
//         <Link
//           to="/job-news"
//           className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
//         >
//           <FaArrowLeft />
//           Back to Job News
//         </Link>
//       </div>
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
//     <div className="w-full flex justify-center items-center overflow-hidden">
//       <Ads type="728x90" />
//     </div>
//   </div>
   

//       <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
//         {/* Category */}
//         <div className="flex items-center gap-3">
//           <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950">
//             {article.category}
//           </span>

//           <span className="text-sm text-slate-500">
//             {article.readTime}
//           </span>
//         </div>

//         {/* Title */}
//         <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
//           {article.title}
//         </h1>

//         {/* Excerpt */}
//         <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
//           {article.excerpt}
//         </p>

//         {/* Meta */}
//         <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-slate-800 pb-6 text-sm text-slate-500">
//           <span>
//             By{" "}
//             <span className="font-medium text-slate-300">
//               {article.author}
//             </span>
//           </span>

//           <span className="flex items-center gap-2">
//             <FaCalendarAlt />
//             {article.date}
//           </span>

//           <span className="flex items-center gap-2">
//             <FaClock />
//             {article.readTime}
//           </span>
//         </div>

//         {/* Hero Image */}
//         <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
//           <img
//             src={article.image}
//             alt={article.title}
//             className="h-[260px] w-full object-cover sm:h-[400px] lg:h-[500px]"
//           />
//         </div>

//         {/* Article + Sidebar */}
//         <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
//           {/* Article */}
//           <article>
//             <div className="space-y-6 text-base leading-8 text-slate-300">
//               {article.content.map((paragraph, index) => (
//                 <p key={index}>{paragraph}</p>
//               ))}
//             </div>

//             {/* Important note */}
//             <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
//               <h3 className="font-bold text-emerald-400">
//                 Job Seeker Reminder
//               </h3>

//               <p className="mt-2 text-sm leading-6 text-slate-400">
//                 Always verify recruitment information through the
//                 employer's official channels. Never pay money simply
//                 because someone promises a guaranteed job.
//               </p>
//             </div>

//             {/* Share */}
//             <div className="mt-10 border-t border-slate-800 pt-6">
//               <h3 className="text-sm font-semibold text-slate-300">
//                 Share this article
//               </h3>

//               <div className="mt-3 flex gap-3">
//                 <a
//                   href={whatsappUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400 transition hover:bg-green-500 hover:text-white"
//                   aria-label="Share on WhatsApp"
//                 >
//                   <FaWhatsapp />
//                 </a>

//                 <a
//                   href={linkedinUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition hover:bg-blue-500 hover:text-white"
//                   aria-label="Share on LinkedIn"
//                 >
//                   <FaLinkedinIn />
//                 </a>

//                 <a
//                   href={facebookUrl}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition hover:bg-blue-500 hover:text-white"
//                   aria-label="Share on Facebook"
//                 >
//                   <FaFacebookF />
//                 </a>
//               </div>
//             </div>
//           </article>

//           {/* Sidebar */}
//           <aside>
//             <div className="sticky top-24 space-y-6">
//               {/* Jobs CTA */}
//               <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-5">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
//                   <FaBriefcase />
//                 </div>

//                 <h3 className="mt-4 font-bold">
//                   Find Your Next Job
//                 </h3>

//                 <p className="mt-2 text-sm leading-6 text-slate-400">
//                   Explore job openings available on TechBy.
//                 </p>

//                 <Link
//                   to="/jobs"
//                   className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950"
//                 >
//                   Browse Jobs
//                   <FaArrowRight />
//                 </Link>
//               </div>

//               {/* Related */}
//               {relatedArticles.length > 0 && (
//                 <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
//                   <h3 className="font-bold">
//                     Related News
//                   </h3>

//                   <div className="mt-3">
//                     {relatedArticles.map((item) => (
//                       <Link
//                         key={item.id}
//                         to={`/job-news/${item.slug}`}
//                         className="group block border-b border-slate-800 py-4 last:border-0"
//                       >
//                         <p className="text-xs text-emerald-400">
//                           {item.category}
//                         </p>

//                         <h4 className="mt-1 text-sm font-semibold leading-5 text-slate-300 transition group-hover:text-emerald-400">
//                           {item.title}
//                         </h4>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
            
// <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
//   <p className="text-[10px] text-slate-600 mb-3 uppercase tracking-wider">
//     Advertisement
//   </p>

//   <div className="w-[320px] h-[50px] flex items-center justify-center overflow-hidden">
//     <Ads type="320x50" />
//   </div>
// </div>
//           </aside>
//         </div>
//       </main>
//     </div>
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaBriefcase,
  FaNewspaper,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Ads from "./Ads";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050";

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(date) {
  if (!date) return "Latest";

  try {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function NewsDetails() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FETCH ARTICLE
  ======================================================= */

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError("");

        if (!slug) {
          setError("News article not found.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/news/${encodeURIComponent(slug)}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load news article."
          );
        }

        /*
          Supports:

          {
            success: true,
            news: {...}
          }

          OR

          {
            success: true,
            data: {...}
          }

          OR

          {
            success: true,
            article: {...}
          }
        */

        const fetchedArticle =
          data.news ||
          data.article ||
          data.data;

        if (!fetchedArticle) {
          throw new Error("Article not found.");
        }

        setArticle(fetchedArticle);

        /* =================================================
           RELATED NEWS
        ================================================= */

        try {
          const relatedResponse = await fetch(
            `${API_URL}/news?category=${encodeURIComponent(
              fetchedArticle.category
            )}`
          );

          const relatedData =
            await relatedResponse.json();

          if (relatedResponse.ok && relatedData.success) {
            const list =
              Array.isArray(relatedData.news)
                ? relatedData.news
                : Array.isArray(relatedData.data)
                ? relatedData.data
                : Array.isArray(relatedData.articles)
                ? relatedData.articles
                : [];

            const filtered = list
              .filter(
                (item) =>
                  item.slug !== fetchedArticle.slug &&
                  item.status !== "draft"
              )
              .slice(0, 3);

            setRelatedArticles(filtered);
          }
        } catch (relatedError) {
          console.error(
            "Related news error:",
            relatedError
          );

          setRelatedArticles([]);
        }
      } catch (err) {
        console.error("News details error:", err);

        setError(
          err.message ||
            "Unable to load this news article."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 pt-20 text-white">
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">

            <div className="h-4 w-32 animate-pulse rounded bg-slate-800" />

            <div className="mt-8 h-6 w-28 animate-pulse rounded-full bg-slate-800" />

            <div className="mt-5 space-y-3">
              <div className="h-10 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-10 w-4/5 animate-pulse rounded bg-slate-800" />
            </div>

            <div className="mt-6 h-5 w-full max-w-3xl animate-pulse rounded bg-slate-800" />
            <div className="mt-2 h-5 w-2/3 animate-pulse rounded bg-slate-800" />

            <div className="mt-8 h-[260px] w-full animate-pulse rounded-2xl bg-slate-800 sm:h-[400px]" />

            <div className="mt-10 space-y-4">
              <div className="h-5 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-5 w-full animate-pulse rounded bg-slate-800" />
              <div className="h-5 w-4/5 animate-pulse rounded bg-slate-800" />
            </div>
          </div>
        </div>
      </>
    );
  }

  /* =======================================================
     ERROR / NOT FOUND
  ======================================================= */

  if (error || !article) {
    return (
      <>
        <Navbar />

        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 pt-20 text-white">
          <div className="text-center">

            <FaNewspaper className="mx-auto text-5xl text-slate-700" />

            <h1 className="mt-5 text-3xl font-bold">
              Article Not Found
            </h1>

            <p className="mt-2 text-slate-500">
              {error ||
                "The news article you are looking for does not exist."}
            </p>

            <Link
              to="/job-news"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              <FaArrowLeft />

              Back to Job News
            </Link>

          </div>
        </div>
      </>
    );
  }

  /* =======================================================
     SHARE URL
  ======================================================= */

  const shareUrl = window.location.href;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `${article.title} - ${shareUrl}`
  )}`;

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    shareUrl
  )}`;

  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  /* =======================================================
     CONTENT
  ======================================================= */

  const articleContent =
    typeof article.content === "string"
      ? article.content
      : Array.isArray(article.content)
      ? article.content
          .map((paragraph) => `<p>${paragraph}</p>`)
          .join("")
      : "<p>No article content available.</p>";

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 pt-20 text-white">

        {/* =================================================
            BACK
        ================================================= */}

        <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <Link
            to="/job-news"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-emerald-400"
          >
            <FaArrowLeft />

            Back to Job News
          </Link>
        </div>

        {/* =================================================
            TOP AD
        ================================================= */}

        <div className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-center overflow-hidden">
            <Ads type="728x90" />
          </div>
        </div>

        {/* =================================================
            ARTICLE HEADER
        ================================================= */}

        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

          {/* Category */}

          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-slate-950">
              {article.category || "Other"}
            </span>

            <span className="text-sm text-slate-500">
              {article.readTime || "5 min read"}
            </span>
          </div>

          {/* Title */}

          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          {/* Excerpt */}

          {article.excerpt && (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}

          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-slate-800 pb-6 text-sm text-slate-500">

            <span>
              By{" "}
              <span className="font-medium text-slate-300">
                {article.author || "TechBy"}
              </span>
            </span>

            <span className="flex items-center gap-2">
              <FaCalendarAlt />

              {formatDate(
                article.date || article.createdAt
              )}
            </span>

            <span className="flex items-center gap-2">
              <FaClock />

              {article.readTime || "5 min read"}
            </span>

          </div>

          {/* =================================================
              HERO IMAGE
          ================================================= */}

          {article.image && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">
              <img
                src={article.image}
                alt={article.title}
                className="h-[260px] w-full object-cover sm:h-[400px] lg:h-[500px]"
              />
            </div>
          )}

          {/* =================================================
              ARTICLE + SIDEBAR
          ================================================= */}

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">

            {/* =================================================
                ARTICLE
            ================================================= */}

            <article className="min-w-0">

              <div
                className="
                  prose
                  prose-invert
                  max-w-none

                  prose-headings:font-black
                  prose-headings:text-white

                  prose-h2:mt-10
                  prose-h2:text-2xl

                  prose-h3:mt-8
                  prose-h3:text-xl

                  prose-p:text-slate-300
                  prose-p:leading-8

                  prose-li:text-slate-300

                  prose-a:text-emerald-400

                  prose-strong:text-white

                  prose-ul:text-slate-300
                  prose-ol:text-slate-300

                  prose-blockquote:border-emerald-500
                  prose-blockquote:text-slate-400
                "
                dangerouslySetInnerHTML={{
                  __html: articleContent,
                }}
              />

              {/* =================================================
                  JOB SEEKER REMINDER
              ================================================= */}

              <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                <h3 className="font-bold text-emerald-400">
                  Job Seeker Reminder
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Always verify recruitment information
                  through the employer's official channels.
                  Never pay money simply because someone
                  promises a guaranteed job.
                </p>
              </div>

              {/* =================================================
                  TAGS
              ================================================= */}

              {Array.isArray(article.tags) &&
                article.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={`${tag}-${index}`}
                        className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              {/* =================================================
                  SHARE
              ================================================= */}

              <div className="mt-10 border-t border-slate-800 pt-6">
                <h3 className="text-sm font-semibold text-slate-300">
                  Share this article
                </h3>

                <div className="mt-3 flex gap-3">

                  {/* WhatsApp */}

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400 transition hover:bg-green-500 hover:text-white"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>

                  {/* LinkedIn */}

                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>

                  {/* Facebook */}

                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 transition hover:bg-blue-500 hover:text-white"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF />
                  </a>

                </div>
              </div>
            </article>

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside>
              <div className="sticky top-24 space-y-6">

                {/* =================================================
                    JOB CTA
                ================================================= */}

                <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-5">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
                    <FaBriefcase />
                  </div>

                  <h3 className="mt-4 font-bold">
                    Find Your Next Job
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Explore job openings available on
                    TechBy.
                  </p>

                  <Link
                    to="/jobs"
                    className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
                  >
                    Browse Jobs

                    <FaArrowRight />
                  </Link>

                </div>

                {/* =================================================
                    RELATED NEWS
                ================================================= */}

                {relatedArticles.length > 0 && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">

                    <div className="flex items-center gap-2">
                      <FaNewspaper className="text-emerald-400" />

                      <h3 className="font-bold">
                        Related News
                      </h3>
                    </div>

                    <div className="mt-3">

                      {relatedArticles.map(
                        (item) => (
                          <Link
                            key={
                              item._id ||
                              item.slug
                            }
                            to={`/job-news/${item.slug}`}
                            className="group block border-b border-slate-800 py-4 last:border-0"
                          >
                            <p className="text-xs text-emerald-400">
                              {item.category}
                            </p>

                            <h4 className="mt-1 text-sm font-semibold leading-5 text-slate-300 transition group-hover:text-emerald-400">
                              {item.title}
                            </h4>

                            {item.date && (
                              <p className="mt-1 text-[10px] text-slate-600">
                                {formatDate(
                                  item.date
                                )}
                              </p>
                            )}
                          </Link>
                        )
                      )}

                    </div>
                  </div>
                )}

                {/* =================================================
                    SIDEBAR AD
                ================================================= */}

                <div className="flex flex-col items-center rounded-2xl border border-slate-800 bg-slate-900 p-4">

                  <p className="mb-3 text-[10px] uppercase tracking-wider text-slate-600">
                    Advertisement
                  </p>

                  <div className="flex h-[50px] w-[320px] max-w-full items-center justify-center overflow-hidden">
                    <Ads type="320x50" />
                  </div>

                </div>

              </div>
            </aside>

          </div>
        </main>
      </div>
    </>
  );
}