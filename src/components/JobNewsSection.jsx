import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
  FaNewspaper,
  FaFire,
  FaChevronRight,
} from "react-icons/fa";
import Ads from "./Ads";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050";

/* =========================================================
   NEWS META
========================================================= */

function NewsMeta({ article }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-slate-500 sm:text-xs">
      <span className="flex items-center gap-1.5">
        <FaCalendarAlt className="shrink-0 text-slate-600" />

        <span>
          {article.date
            ? new Date(article.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Latest"}
        </span>
      </span>

      <span className="h-1 w-1 shrink-0 rounded-full bg-slate-700" />

      <span className="flex items-center gap-1.5">
        <FaClock className="shrink-0 text-slate-600" />

        <span>{article.readTime || "5 min"}</span>
      </span>
    </div>
  );
}

/* =========================================================
   CATEGORY BADGE
========================================================= */

function CategoryBadge({ children }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-md bg-emerald-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400 ring-1 ring-inset ring-emerald-500/20 sm:px-2.5 sm:text-[10px]">
      <span className="truncate">
        {children || "Other"}
      </span>
    </span>
  );
}

/* =========================================================
   FEATURED NEWS
========================================================= */

function FeaturedNews({ article }) {
  if (!article) return null;

  return (
    <Link
      to={`/job-news/${article.slug}`}
      className="group relative block min-h-[360px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 sm:min-h-[420px] lg:min-h-[430px]"
    >
      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <FaNewspaper className="text-5xl text-slate-700" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/5" />

      {/* Top badges */}
      <div className="absolute left-3 right-3 top-3 flex flex-wrap items-center gap-2 sm:left-5 sm:right-5 sm:top-5">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-950 sm:px-3 sm:text-[10px]">
          <FaFire />
          Featured
        </span>

        <CategoryBadge>
          {article.category}
        </CategoryBadge>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-7">
        <NewsMeta article={article} />

        <h2 className="mt-2 max-w-3xl text-xl font-black leading-tight text-white sm:mt-3 sm:text-2xl md:text-3xl lg:text-4xl">
          {article.title}
        </h2>

        <p className="mt-2 max-w-2xl line-clamp-2 text-xs leading-5 text-slate-300 sm:mt-3 sm:text-sm sm:leading-6 md:text-base">
          {article.excerpt}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-400 sm:mt-5 sm:text-sm">
          Read Full Story

          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   SMALL TOP STORY
========================================================= */

function TopStory({ article }) {
  return (
    <Link
      to={`/job-news/${article.slug}`}
      className="group flex min-w-0 gap-3 border-b border-slate-800 pb-4 last:border-0 last:pb-0 sm:gap-4"
    >
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-32 sm:rounded-xl">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800">
            <FaNewspaper className="text-slate-600" />
          </div>
        )}

        <div className="absolute inset-0 bg-slate-950/10" />
      </div>

      <div className="min-w-0 flex-1">
        <CategoryBadge>
          {article.category}
        </CategoryBadge>

        <h3 className="mt-1.5 line-clamp-3 text-xs font-bold leading-4 text-white transition group-hover:text-emerald-400 sm:mt-2 sm:text-sm sm:leading-5">
          {article.title}
        </h3>

        <p className="mt-1 text-[10px] text-slate-500">
          {article.date
            ? new Date(article.date).toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }
              )
            : ""}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   ARTICLE CARD
========================================================= */

function ArticleCard({ article }) {
  return (
    <Link
      to={`/job-news/${article.slug}`}
      className="group min-w-0 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70 transition duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:bg-slate-900 hover:shadow-2xl hover:shadow-emerald-500/5"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {article.image ? (
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-800">
            <FaNewspaper className="text-4xl text-slate-600" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />

        <div className="absolute left-3 right-3 top-3">
          <CategoryBadge>
            {article.category}
          </CategoryBadge>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <NewsMeta article={article} />

        <h3 className="mt-2 line-clamp-2 text-base font-extrabold leading-5 text-white transition group-hover:text-emerald-400 sm:mt-3 sm:text-lg sm:leading-6">
          {article.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
          {article.excerpt}
        </p>

        <div className="mt-3 flex items-center gap-2 text-[11px] font-bold text-emerald-400 sm:mt-4 sm:text-xs">
          Continue Reading

          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   TRENDING ITEM
========================================================= */

function TrendingItem({ article, number }) {
  return (
    <Link
      to={`/job-news/${article.slug}`}
      className="group flex min-w-[250px] items-center gap-3 sm:min-w-[280px]"
    >
      <span className="shrink-0 text-2xl font-black text-slate-700 transition group-hover:text-emerald-500">
        {String(number).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <p className="line-clamp-2 text-xs font-bold leading-5 text-slate-200 transition group-hover:text-emerald-400 sm:text-sm">
          {article.title}
        </p>

        <p className="mt-1 text-[9px] uppercase tracking-wider text-slate-600 sm:text-[10px]">
          {article.category}
        </p>
      </div>
    </Link>
  );
}

/* =========================================================
   AD SLOT
========================================================= */

function AdSlot() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 639px)"
    );

    const handleChange = () => {
      setIsMobile(mediaQuery.matches);
    };

    handleChange();

    mediaQuery.addEventListener(
      "change",
      handleChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange
      );
    };
  }, []);

  return (
    <div className="flex min-h-[70px] w-full items-center justify-center overflow-hidden rounded-xl border border-slate-800/70 bg-slate-900/30 px-1 py-2 sm:min-h-[110px] sm:rounded-2xl sm:px-2 sm:py-3">
      <div className="flex w-full items-center justify-center overflow-hidden">
        {isMobile ? (
          <Ads type="320x50" />
        ) : (
          <Ads type="728x90" />
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LOADING SKELETON
========================================================= */

function NewsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70"
        >
          <div className="aspect-[16/9] animate-pulse bg-slate-800" />

          <div className="space-y-3 p-5">
            <div className="h-3 w-24 animate-pulse rounded bg-slate-800" />

            <div className="h-5 w-full animate-pulse rounded bg-slate-800" />

            <div className="h-5 w-4/5 animate-pulse rounded bg-slate-800" />

            <div className="h-4 w-full animate-pulse rounded bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function JobNewsSection() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     FETCH NEWS
  ======================================================= */

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/news`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to fetch news"
          );
        }

        /*
          Supports these backend response formats:

          {
            success: true,
            news: [...]
          }

          OR

          {
            success: true,
            data: [...]
          }
        */

        const articles =
          Array.isArray(data.news)
            ? data.news
            : Array.isArray(data.data)
            ? data.data
            : Array.isArray(data.articles)
            ? data.articles
            : [];

        // Only show published articles
        const publishedNews = articles.filter(
          (article) =>
            !article.status ||
            article.status === "published"
        );

        // Newest first
        publishedNews.sort(
          (a, b) =>
            new Date(b.date || b.createdAt) -
            new Date(a.date || a.createdAt)
        );

        setNewsData(publishedNews);
      } catch (err) {
        console.error("News API error:", err);

        setError(
          err.message ||
            "Unable to load news right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <section className="min-h-screen w-full overflow-x-hidden bg-slate-950 py-7 sm:py-10 md:py-14">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 md:px-6 lg:px-8">
          <div className="border-b border-slate-800 pb-5 sm:pb-7">
            <div className="mb-3 h-4 w-28 animate-pulse rounded bg-slate-800" />

            <div className="h-10 w-72 animate-pulse rounded bg-slate-800 sm:h-12 sm:w-96" />

            <div className="mt-3 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-800" />
          </div>

          <div className="mt-6">
            <NewsSkeleton />
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <section className="min-h-screen w-full bg-slate-950 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
            <FaNewspaper className="mx-auto mb-4 text-4xl text-red-400" />

            <h2 className="text-xl font-black text-white">
              Unable to Load News
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     NO NEWS
  ======================================================= */

  if (!newsData.length) {
    return (
      <section className="min-h-screen w-full bg-slate-950 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-10 text-center">
            <FaNewspaper className="mx-auto mb-4 text-4xl text-slate-700" />

            <h2 className="text-xl font-black text-white">
              No News Available
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              New job and career updates will appear here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =======================================================
     DATA SPLIT
  ======================================================= */

  const featured =
    newsData.find((article) => article.featured) ||
    newsData[0];

  const remainingNews = newsData.filter(
    (article) => article._id !== featured._id
  );

  const topStories = remainingNews.slice(0, 3);

  const articles = remainingNews.slice(3);

  return (
    <section className="min-h-screen w-full overflow-x-hidden bg-slate-950 py-7 sm:py-10 md:py-14">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 md:px-6 lg:px-8">

        {/* =================================================
            NEWS HEADER
        ================================================= */}

        <div className="border-b border-slate-800 pb-5 sm:pb-7">
          <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-400 sm:mb-3 sm:text-xs sm:tracking-[0.18em]">
                <FaNewspaper />

                TechBy News
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
                Job & Career News
              </h1>

              <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400 sm:mt-3 sm:text-sm sm:leading-6 md:text-base">
                The latest hiring news, career updates,
                government recruitment, internships and
                workplace trends.
              </p>
            </div>

            <Link
              to="/job-news"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 transition hover:border-emerald-500 hover:text-emerald-400 sm:w-fit sm:text-sm"
            >
              All News

              <FaArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* =================================================
            CATEGORY NAVIGATION
        ================================================= */}

        <div className="-mx-3 overflow-x-auto border-b border-slate-800 px-3 py-3 scrollbar-hide sm:-mx-5 sm:px-5 md:mx-0 md:px-0 md:py-4">
          <div className="flex w-max gap-2">
            {[
              "All News",
              "IT Jobs",
              "Government Jobs",
              "Hiring News",
              "Career Tips",
              "Internships",
              "Private Jobs",
            ].map((category, index) => (
              <Link
                key={category}
                to="/job-news"
                className={`whitespace-nowrap rounded-full px-3.5 py-2 text-[10px] font-bold transition sm:px-4 sm:text-xs ${
                  index === 0
                    ? "bg-emerald-500 text-slate-950"
                    : "border border-slate-800 bg-slate-900 text-slate-400 hover:border-emerald-500/40 hover:text-emerald-400"
                }`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* =================================================
            TRENDING
        ================================================= */}

        <div className="border-b border-slate-800 py-4 sm:py-5">
          <div className="mb-3 flex items-center gap-2 sm:mb-4">
            <FaFire className="text-sm text-emerald-400 sm:text-base" />

            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white sm:text-xs sm:tracking-[0.18em]">
              Trending Now
            </span>
          </div>

          <div className="-mx-3 flex gap-5 overflow-x-auto px-3 pb-1 scrollbar-hide sm:-mx-5 sm:gap-8 sm:px-5 md:mx-0 md:px-0">
            {newsData
              .slice(0, 5)
              .map((article, index) => (
                <TrendingItem
                  key={article._id || article.id}
                  article={article}
                  number={index + 1}
                />
              ))}
          </div>
        </div>

        {/* =================================================
            FEATURED NEWS
        ================================================= */}

        <div className="mt-6 sm:mt-8">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <h2 className="text-lg font-black text-white sm:text-xl">
              Top Story
            </h2>

            <span className="text-[10px] text-slate-600 sm:text-xs">
              Latest Update
            </span>
          </div>

          <div className="grid min-w-0 gap-4 md:gap-5 lg:grid-cols-[1.55fr_0.85fr]">

            {/* Featured */}
            <FeaturedNews article={featured} />

            {/* Latest Stories */}
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900/50 p-4 sm:p-5">
              <div className="mb-4 flex items-center justify-between sm:mb-5">
                <h3 className="text-base font-black text-white sm:text-lg">
                  Latest Stories
                </h3>

                <FaNewspaper className="text-sm text-slate-700 sm:text-base" />
              </div>

              <div className="space-y-4">
                {topStories.map((article) => (
                  <TopStory
                    key={article._id}
                    article={article}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            TOP AD
        ================================================= */}

        <div className="my-6 sm:my-8">
          <AdSlot />
        </div>

        {/* =================================================
            MAIN CONTENT
        ================================================= */}

        <div className="grid min-w-0 gap-7 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-8">

          {/* ARTICLES */}

          <main className="min-w-0">
            <div className="mb-4 flex items-end justify-between border-b border-slate-800 pb-3 sm:mb-5 sm:pb-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400 sm:text-xs">
                  Latest
                </p>

                <h2 className="mt-1 text-xl font-black text-white sm:text-2xl">
                  More Job & Career News
                </h2>
              </div>

              <span className="hidden shrink-0 text-xs text-slate-600 sm:block">
                {articles.length} stories
              </span>
            </div>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

              {articles.map((article, index) => (
                <React.Fragment
                  key={article._id}
                >
                  <ArticleCard article={article} />

                  {/* Ad after every 3 news articles */}
                  {(index + 1) % 3 === 0 && (
                    <div className="min-w-0 sm:col-span-2 xl:col-span-3">
                      <AdSlot />
                    </div>
                  )}
                </React.Fragment>
              ))}

            </div>
          </main>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="min-w-0 space-y-5 sm:space-y-6">

            {/* Popular */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5">
              <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-3 sm:mb-5 sm:pb-4">
                <FaFire className="text-emerald-400" />

                <h3 className="text-base font-black text-white sm:text-lg">
                  Popular News
                </h3>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {newsData
                  .slice(0, 5)
                  .map((article, index) => (
                    <Link
                      key={article._id}
                      to={`/job-news/${article.slug}`}
                      className="group flex min-w-0 gap-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-black text-slate-400 transition group-hover:bg-emerald-500 group-hover:text-slate-950">
                        {index + 1}
                      </span>

                      <div className="min-w-0">
                        <h4 className="line-clamp-2 text-xs font-bold leading-5 text-slate-300 transition group-hover:text-emerald-400 sm:text-sm">
                          {article.title}
                        </h4>

                        <p className="mt-1 text-[10px] text-slate-600">
                          {article.date
                            ? new Date(
                                article.date
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>

            {/* Newsletter */}

            <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-4 sm:p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-sm text-slate-950 sm:h-10 sm:w-10">
                <FaNewspaper />
              </div>

              <h3 className="text-base font-black text-white sm:text-lg">
                Never Miss an Update
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
                Get the latest job news, hiring updates
                and career opportunities from TechBy.
              </p>

              <Link
                to="/jobs"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-[11px] font-black text-slate-950 transition hover:bg-emerald-400 sm:mt-5 sm:text-xs"
              >
                Explore Latest Jobs

                <FaChevronRight />
              </Link>
            </div>

            {/* Sidebar Ad */}

            <div className="flex min-h-[70px] w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30 p-2 sm:p-3">
              <div className="w-full overflow-hidden">
                <Ads type="320x50" />
              </div>
            </div>

          </aside>
        </div>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <div className="mt-8 border-t border-slate-800 pt-6 sm:mt-12 sm:pt-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center sm:p-8">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-sm text-slate-950 sm:h-11 sm:w-11">
              <FaNewspaper />
            </div>

            <h2 className="text-xl font-black text-white sm:text-2xl">
              Looking for your next opportunity?
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6">
              Browse the latest jobs posted by companies
              and recruiters on TechBy.
            </p>

            <Link
              to="/jobs"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-black text-slate-950 transition hover:bg-emerald-400 sm:mt-5 sm:px-6 sm:py-3 sm:text-sm"
            >
              Browse Jobs

              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}