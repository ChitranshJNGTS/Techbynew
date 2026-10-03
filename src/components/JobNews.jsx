import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaArrowRight,
  FaClock,
  FaCalendarAlt,
  FaBriefcase,
  FaLaptopCode,
  FaGraduationCap,
  FaBuilding,
  FaNewspaper,
  FaFire,
  FaChevronRight,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Ads from "./Ads";
import Footer from "./Footer";

const newsData = [
  {
    id: 1,
    slug: "latest-it-jobs-for-freshers-in-india",
    title: "Latest IT Jobs for Freshers in India: Companies Hiring Now",
    excerpt:
      "Several companies are hiring fresh graduates across software development, testing, support, and other technology roles.",
    category: "IT Jobs",
    author: "TechBy Team",
    date: "September 22, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    featured: true,
    content: [
      "The Indian technology job market continues to offer opportunities for fresh graduates and entry-level professionals.",
      "Companies are hiring for roles including frontend development, backend development, software testing, technical support, data operations and customer-facing technology positions.",
      "Freshers looking for their first technology role should focus on building practical projects, maintaining an updated resume and applying consistently to relevant openings.",
      "Candidates should also verify the company and job details before sharing personal information or paying any recruitment-related fee.",
    ],
  },
  {
    id: 2,
    slug: "government-jobs-this-month",
    title: "Government Jobs: Important Recruitment Opportunities to Watch",
    excerpt:
      "A look at government recruitment opportunities, application timelines and important things candidates should check.",
    category: "Government Jobs",
    author: "TechBy Team",
    date: "September 21, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=900&q=80",
    content: [
      "Government recruitment notifications are released throughout the year across central and state departments.",
      "Candidates should always check the official recruitment notification for eligibility, age requirements, application dates and examination details.",
      "Before submitting an application, carefully review the required educational qualification and category-specific requirements.",
    ],
  },
  {
    id: 3,
    slug: "react-developer-jobs-freshers",
    title: "React Developer Jobs for Freshers: Skills You Should Know",
    excerpt:
      "Want to start your career as a React developer? Here are some of the skills employers commonly look for.",
    category: "Career Tips",
    author: "TechBy Team",
    date: "September 20, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    content: [
      "React remains a popular frontend technology used by startups, product companies and service organizations.",
      "Freshers should have a good understanding of JavaScript fundamentals, React components, props, state, hooks and API integration.",
      "Projects can make a significant difference when applying for entry-level frontend positions.",
      "A simple portfolio containing two or three well-built projects can help demonstrate practical development skills.",
    ],
  },
  {
    id: 4,
    slug: "internship-opportunities-for-students",
    title: "Internship Opportunities: How Students Can Find the Right Role",
    excerpt:
      "Internships can help students gain practical experience and understand how professional teams work.",
    category: "Internships",
    author: "TechBy Team",
    date: "September 19, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",
    content: [
      "Internships can provide students with practical exposure before they enter the full-time job market.",
      "When evaluating an internship, candidates should consider the role, responsibilities, learning opportunities and duration.",
      "Avoid opportunities that require candidates to pay money in exchange for a guaranteed job or internship.",
    ],
  },
  {
    id: 5,
    slug: "companies-hiring-in-indore",
    title: "Companies Hiring in Indore: Roles Candidates Should Watch",
    excerpt:
      "Indore continues to see hiring across IT, BPO, sales, customer support and other professional roles.",
    category: "Hiring News",
    author: "TechBy Team",
    date: "September 18, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80",
    content: [
      "Indore has a growing employment ecosystem covering technology, BPO, sales, customer support and other professional sectors.",
      "Job seekers can improve their chances by maintaining multiple versions of their resume for different types of roles.",
      "Candidates should also pay attention to location, work mode, experience requirements and salary details before applying.",
    ],
  },
  {
    id: 6,
    slug: "how-to-create-job-ready-resume",
    title: "How to Create a Job-Ready Resume in 2026",
    excerpt:
      "A practical guide to creating a clear and professional resume that highlights your skills and experience.",
    category: "Career Tips",
    author: "TechBy Team",
    date: "September 17, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
    content: [
      "A resume should make it easy for recruiters to understand your experience, skills and achievements.",
      "Keep your resume concise and focus on information that is relevant to the position you are applying for.",
      "For technical positions, include relevant technologies, projects, internships and measurable accomplishments.",
      "Always proofread your resume before submitting an application.",
    ],
  },
  {
    id: 7,
    slug: "work-from-home-jobs-india",
    title: "Work From Home Jobs in India: What Candidates Should Check",
    excerpt:
      "Remote jobs offer flexibility, but candidates should carefully verify job descriptions and employers.",
    category: "Private Jobs",
    author: "TechBy Team",
    date: "September 16, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80",
    content: [
      "Remote and hybrid jobs have become an important part of the employment market.",
      "Candidates should carefully review the employer, job description, interview process and communication channels.",
      "Be cautious when a supposed employer asks for money, sensitive financial information or unusual payments during recruitment.",
    ],
  },
  {
    id: 8,
    slug: "skills-companies-looking-for",
    title: "Top Skills Companies Are Looking for in Entry-Level Candidates",
    excerpt:
      "Technical knowledge is important, but communication, problem solving and adaptability also matter.",
    category: "Career Tips",
    author: "TechBy Team",
    date: "September 15, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    content: [
      "Employers often look for a combination of technical knowledge and workplace skills.",
      "For entry-level candidates, communication, problem solving, teamwork and willingness to learn can complement technical skills.",
      "Candidates should demonstrate these skills through projects, internships and examples during interviews.",
    ],
  },
];

const categories = [
  "All",
  "IT Jobs",
  "Government Jobs",
  "Private Jobs",
  "Hiring News",
  "Internships",
  "Career Tips",
];

const categoryIcons = {
  "IT Jobs": FaLaptopCode,
  "Government Jobs": FaBuilding,
  "Private Jobs": FaBriefcase,
  "Hiring News": FaNewspaper,
  Internships: FaGraduationCap,
  "Career Tips": FaGraduationCap,
};

function NewsCard({ article, featured = false }) {
  return (
   <>
    <Link
      to={`/job-news/${article.slug}`}
      className={`group block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:bg-slate-900 ${
        featured ? "lg:flex" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured
            ? "h-64 lg:h-auto lg:min-h-[320px] lg:w-[48%]"
            : "h-52 w-full"
        }`}
      >
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-slate-950">
          {article.category}
        </span>
      </div>

      <div className={`p-5 ${featured ? "lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:p-8" : ""}`}>
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <FaCalendarAlt />
            {article.date}
          </span>

          <span className="flex items-center gap-1.5">
            <FaClock />
            {article.readTime}
          </span>
        </div>

        <h2
          className={`font-bold leading-tight text-white transition group-hover:text-emerald-400 ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          {article.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">
          {article.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-400">
          Read Article
          <FaArrowRight className="transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link></>
  );
}

function TrendingCard({ article, index }) {
  return (
    <Link
      to={`/job-news/${article.slug}`}
      className="group flex gap-4 border-b border-slate-800 py-4 last:border-0"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-sm font-bold text-emerald-400">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div>
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-slate-200 transition group-hover:text-emerald-400">
          {article.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500">
          {article.date}
        </p>
      </div>
    </Link>
  );
}

export default function JobNews() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredNews = useMemo(() => {
    return newsData.filter((article) => {
      const categoryMatch =
        activeCategory === "All" || article.category === activeCategory;

      const searchMatch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        article.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const featuredArticle = newsData.find((article) => article.featured);

  const latestNews = filteredNews.filter(
    (article) => article.id !== featuredArticle?.id
  );

  return (
    <>
    <div className="min-h-screen bg-slate-950 text-white">
        <Navbar/>   
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800">
      
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
              <FaNewspaper />
              TechBy Job News
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Latest{" "}
              <span className="text-emerald-400">Job & Career</span> News
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Stay updated with hiring trends, government job notifications,
              private-sector hiring, internships and career advice.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 max-w-2xl">
            <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 shadow-lg focus-within:border-emerald-500">
              <FaSearch className="mr-3 text-slate-500" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job news, careers, hiring..."
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <div className="w-full flex justify-center items-center overflow-hidden">
      <Ads type="728x90" />
    </div>
  </div>
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-max gap-2 py-3">
            {categories.map((category) => {
              const Icon =
                categoryIcons[category] || FaNewspaper;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
                    activeCategory === category
                      ? "bg-emerald-500 text-slate-950"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {category !== "All" && <Icon />}
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Featured */}
        {featuredArticle &&
          activeCategory === "All" &&
          !search && (
            <section>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-400">
                    FEATURED
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white">
                    Featured News
                  </h2>
                </div>
              </div>

              <NewsCard article={featuredArticle} featured />
            </section>
          )}

        {/* Content + Sidebar */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Latest */}
          <div>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-400">
                  LATEST UPDATES
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Latest Job News
                </h2>
              </div>

              <span className="hidden text-sm text-slate-500 sm:block">
                {latestNews.length} articles
              </span>
            </div>

            {latestNews.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {latestNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
                <FaSearch className="mx-auto text-3xl text-slate-600" />

                <h3 className="mt-4 text-lg font-semibold">
                  No news found
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try a different search term or category.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Trending */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <div className="mb-3 flex items-center gap-2">
                <FaFire className="text-orange-400" />

                <h2 className="text-lg font-bold">
                  Trending News
                </h2>
              </div>

              <div>
                {newsData.slice(0, 5).map((article, index) => (
                  <TrendingCard
                    key={article.id}
                    article={article}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {/* Jobs CTA */}
            <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-slate-950">
                <FaBriefcase />
              </div>

              <h2 className="mt-5 text-xl font-bold">
                Looking for a Job?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Explore the latest job openings from companies hiring
                candidates across India.
              </p>

              <Link
                to="/jobs"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
              >
                Explore Jobs
                <FaArrowRight />
              </Link>
            </div>

           {/* ================= BOTTOM SIDEBAR AD ================= */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
  <p className="text-[10px] text-slate-600 mb-3 uppercase tracking-wider">
    Advertisement
  </p>

  <div className="w-[320px] h-[50px] flex items-center justify-center overflow-hidden">
    <Ads type="320x50" />
  </div>
</div>
          </aside>
        </section>
      </main>
    </div>
    <Footer />
    </>
  );
}

