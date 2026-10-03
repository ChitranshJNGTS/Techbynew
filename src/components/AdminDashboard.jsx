
import React, { useEffect, useMemo, useState } from "react";
import {
  FaNewspaper,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaStar,
  FaFileAlt,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050";

function AdminDashboard() {
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================================================
  // GET ADMIN NEWS
  // =========================================================

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError("");

      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        navigate("/admin/login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/news/admin/all`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": adminToken,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to fetch news"
        );
      }

      // Supports both:
      // { success: true, data: [...] }
      // and
      // { success: true, data: { items: [...] } }

      let items = [];

      if (Array.isArray(data.data)) {
        items = data.data;
      } else if (Array.isArray(data.data?.items)) {
        items = data.data.items;
      } else if (Array.isArray(data.items)) {
        items = data.items;
      }

      setNews(items);
    } catch (err) {
      console.error("Dashboard news error:", err);

      setError(
        err.message || "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // =========================================================
  // STATISTICS
  // =========================================================

  const stats = useMemo(() => {
    const total = news.length;

    const published = news.filter(
      (item) => item.status === "published"
    ).length;

    const drafts = news.filter(
      (item) => item.status === "draft"
    ).length;

    const featured = news.filter(
      (item) => item.featured === true
    ).length;

    const totalViews = news.reduce(
      (sum, item) => sum + Number(item.views || 0),
      0
    );

    return {
      total,
      published,
      drafts,
      featured,
      totalViews,
    };
  }, [news]);

  // =========================================================
  // RECENT NEWS
  // =========================================================

  const recentNews = useMemo(() => {
    return [...news]
      .sort((a, b) => {
        const dateA = new Date(
          a.createdAt || a.publishedAt || 0
        );

        const dateB = new Date(
          b.createdAt || b.publishedAt || 0
        );

        return dateB - dateA;
      })
      .slice(0, 6);
  }, [news]);

  // =========================================================
  // DELETE NEWS
  // =========================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news article?"
    );

    if (!confirmDelete) return;

    try {
      const adminToken = localStorage.getItem("adminToken");

      const response = await fetch(
        `${API_URL}/api/news/admin/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": adminToken,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to delete news"
        );
      }

      setNews((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (err) {
      console.error(err);
      alert(
        err.message || "Failed to delete news."
      );
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >

        {/* LOGO */}

        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FaNewspaper />
            </div>

            <div>
              <h1 className="font-black text-slate-900">
                TechBy
              </h1>

              <p className="text-[11px] text-slate-400">
                Admin Panel
              </p>
            </div>

          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <FaTimes />
          </button>

        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 space-y-1 px-3 py-5">

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Dashboard
          </p>

          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 rounded-xl bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700"
          >
            <FaChartLine />
            Dashboard
          </Link>

          <Link
            to="/admin/news/create"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FaPlus />
            Create News
          </Link>

          <Link
            to="/admin/news"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FaNewspaper />
            Manage News
          </Link>

          <div className="my-5 border-t border-slate-100" />

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Quick Actions
          </p>

          <Link
            to="/admin/news/create"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FaFileAlt />
            New Article
          </Link>

          <Link
            to="/job-news"
            target="_blank"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <FaExternalLinkAlt />
            View Website
          </Link>

        </nav>

        {/* LOGOUT */}

        <div className="border-t border-slate-200 p-3">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <div className="lg:pl-64">

        {/* HEADER */}

        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">

          <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

            <div className="flex items-center gap-3">

              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-600 shadow-sm lg:hidden"
              >
                <FaBars />
              </button>

              <div>
                <h2 className="text-xl font-black text-slate-900">
                  Dashboard
                </h2>

                <p className="hidden text-xs text-slate-500 sm:block">
                  Welcome back to your TechBy admin panel.
                </p>
              </div>

            </div>

            <Link
              to="/admin/news/create"
              className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600"
            >
              <FaPlus />

              <span className="hidden sm:inline">
                Create News
              </span>
            </Link>

          </div>

        </header>

        {/* CONTENT */}

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* ERROR */}

          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <FaTimes />

              <span>{error}</span>

              <button
                onClick={fetchNews}
                className="ml-auto font-semibold underline"
              >
                Retry
              </button>
            </div>
          )}

          {/* =================================================
              STAT CARDS
          ================================================= */}

          <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">

            {/* TOTAL */}

            <StatCard
              title="Total News"
              value={stats.total}
              icon={<FaNewspaper />}
              iconClass="bg-emerald-50 text-emerald-600"
            />

            {/* PUBLISHED */}

            <StatCard
              title="Published"
              value={stats.published}
              icon={<FaCheckCircle />}
              iconClass="bg-blue-50 text-blue-600"
            />

            {/* DRAFTS */}

            <StatCard
              title="Drafts"
              value={stats.drafts}
              icon={<FaClock />}
              iconClass="bg-orange-50 text-orange-600"
            />

            {/* FEATURED */}

            <StatCard
              title="Featured"
              value={stats.featured}
              icon={<FaStar />}
              iconClass="bg-yellow-50 text-yellow-600"
            />

            {/* VIEWS */}

            <StatCard
              title="Total Views"
              value={stats.totalViews.toLocaleString("en-IN")}
              icon={<FaEye />}
              iconClass="bg-purple-50 text-purple-600"
            />

          </div>

          {/* =================================================
              QUICK ACTIONS
          ================================================= */}

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <Link
              to="/admin/news/create"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <FaPlus />
                </div>

                <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-500" />

              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Create News
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Publish a new job or career article.
              </p>

            </Link>

            <Link
              to="/admin/news"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaEdit />
                </div>

                <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-500" />

              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                Manage News
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Edit, publish or delete articles.
              </p>

            </Link>

            <Link
              to="/job-news"
              target="_blank"
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md"
            >

              <div className="flex items-center justify-between">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <FaExternalLinkAlt />
                </div>

                <FaArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-purple-500" />

              </div>

              <h3 className="mt-4 font-bold text-slate-900">
                View Website
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Open the public TechBy news section.
              </p>

            </Link>

          </div>

          {/* =================================================
              RECENT NEWS
          ================================================= */}

          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* SECTION HEADER */}

            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 sm:px-6">

              <div>
                <h2 className="font-bold text-slate-900">
                  Recent News
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest articles added to TechBy.
                </p>
              </div>

              <Link
                to="/admin/news"
                className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                View All

                <FaArrowRight className="text-xs" />
              </Link>

            </div>

            {/* MOBILE CARDS */}

            <div className="divide-y divide-slate-100 md:hidden">

              {recentNews.length === 0 ? (
                <EmptyState />
              ) : (
                recentNews.map((item) => (
                  <div
                    key={item._id}
                    className="p-4"
                  >

                    <div className="flex gap-3">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-20 w-24 flex-shrink-0 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-24 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                          <FaNewspaper />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">

                        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.category}
                        </p>

                        <div className="mt-2 flex items-center gap-3 text-xs text-slate-400">
                          <span>
                            {formatDate(
                              item.createdAt
                            )}
                          </span>

                          <span className="flex items-center gap-1">
                            <FaEye />
                            {Number(
                              item.views || 0
                            ).toLocaleString("en-IN")}
                          </span>
                        </div>

                      </div>

                    </div>

                    <div className="mt-3 flex items-center justify-between">

                      <StatusBadge
                        status={item.status}
                      />

                      <div className="flex items-center gap-2">

                        <Link
                          to={`/admin/news/edit/${item._id}`}
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-50 hover:text-blue-600"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </div>

                  </div>
                ))
              )}

            </div>

            {/* DESKTOP TABLE */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[750px]">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50">

                    <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                      Article
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                      Category
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                      Status
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                      Views
                    </th>

                    <th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                      Date
                    </th>

                    <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wide text-slate-400">
                      Actions
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {recentNews.length === 0 ? (
                    <tr>
                      <td colSpan="6">
                        <EmptyState />
                      </td>
                    </tr>
                  ) : (
                    recentNews.map((item) => (
                      <tr
                        key={item._id}
                        className="transition hover:bg-slate-50/70"
                      >

                        {/* ARTICLE */}

                        <td className="px-6 py-4">

                          <div className="flex max-w-md items-center gap-3">

                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-12 w-16 flex-shrink-0 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                <FaNewspaper />
                              </div>
                            )}

                            <div className="min-w-0">

                              <p className="truncate text-sm font-semibold text-slate-900">
                                {item.title}
                              </p>

                              <p className="mt-1 truncate text-xs text-slate-400">
                                By {item.author || "TechBy"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* CATEGORY */}

                        <td className="px-4 py-4">

                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                            {item.category}
                          </span>

                        </td>

                        {/* STATUS */}

                        <td className="px-4 py-4">
                          <StatusBadge
                            status={item.status}
                          />
                        </td>

                        {/* VIEWS */}

                        <td className="px-4 py-4">

                          <div className="flex items-center gap-2 text-sm text-slate-600">

                            <FaEye className="text-slate-400" />

                            {Number(
                              item.views || 0
                            ).toLocaleString("en-IN")}

                          </div>

                        </td>

                        {/* DATE */}

                        <td className="px-4 py-4 text-sm text-slate-500">
                          {formatDate(
                            item.createdAt
                          )}
                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4">

                          <div className="flex justify-end gap-2">

                            <Link
                              to={`/admin/news/edit/${item._id}`}
                              title="Edit"
                              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                            >
                              <FaEdit />
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(
                                  item._id
                                )
                              }
                              title="Delete"
                              className="rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                            >
                              <FaTrash />
                            </button>

                          </div>

                        </td>

                      </tr>
                    ))
                  )}

                </tbody>

              </table>

            </div>

          </section>

          {/* =================================================
              FOOTER INFO
          ================================================= */}

          <div className="mt-6 flex flex-col items-center justify-between gap-2 text-xs text-slate-400 sm:flex-row">

            <p>
              TechBy Admin Panel
            </p>

            <p>
              Total {stats.total} news articles
            </p>

          </div>

        </main>
      </div>
    </div>
  );
}

// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  icon,
  iconClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5">

      <div className="flex items-center justify-between">

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black text-slate-900">
        {value}
      </p>

    </div>
  );
}

// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({ status }) {
  if (status === "published") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
      <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
      Draft
    </span>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
        <FaNewspaper />
      </div>

      <h3 className="mt-4 font-bold text-slate-800">
        No news articles yet
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        Create your first article to see it here.
      </p>

    </div>
  );
}

export default AdminDashboard;

