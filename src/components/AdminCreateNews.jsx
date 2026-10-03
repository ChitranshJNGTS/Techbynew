
import React, { useState } from "react";
import {
  FaNewspaper,
  FaImage,
  FaTags,
  FaGlobe,
  FaSave,
  FaEye,
  FaStar,
  FaArrowLeft,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5050";

const categories = [
  "IT Jobs",
  "Government Jobs",
  "Hiring News",
  "Career Tips",
  "Internships",
  "Private Jobs",
  "Tech News",
  "Education",
  "Other",
];

function AdminCreateNews() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "IT Jobs",
    image: "",
    author: "TechBy",
    readTime: "5 min",
    tags: "",
    seoTitle: "",
    seoDescription: "",
    status: "draft",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");
  setError("");

  try {
    // Get existing admin token from localStorage
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      setError("Admin session expired. Please login again.");
      setLoading(false);
      return;
    }

    // Validation
    if (!form.title.trim()) {
      setError("Please enter a news title.");
      setLoading(false);
      return;
    }

    if (!form.excerpt.trim()) {
      setError("Please enter a news excerpt.");
      setLoading(false);
      return;
    }

    if (!form.content.trim()) {
      setError("Please write the news content.");
      setLoading(false);
      return;
    }

    // Convert comma-separated tags into array
    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      title: form.title.trim(),
      excerpt: form.excerpt.trim(),
      content: form.content,

      category: form.category,

      image: form.image.trim(),

      author: form.author.trim() || "TechBy",

      readTime: form.readTime.trim() || "5 min",

      tags,

      seoTitle:
        form.seoTitle.trim() || form.title.trim(),

      seoDescription:
        form.seoDescription.trim() ||
        form.excerpt.trim(),

      status: form.status,

      featured: form.featured,
    };

    const response = await fetch(
      `${API_URL}/news/admin/create`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          // Existing token from localStorage
          "x-admin-token": adminToken,
        },

        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Failed to create news"
      );
    }

    setMessage(
      form.status === "published"
        ? "News published successfully!"
        : "News saved as draft successfully!"
    );

    // Reset form
    setForm({
      title: "",
      excerpt: "",
      content: "",
      category: "IT Jobs",
      image: "",
      author: "TechBy",
      readTime: "5 min",
      tags: "",
      seoTitle: "",
      seoDescription: "",
      status: "draft",
      featured: false,
    });
  } catch (err) {
    console.error("Create news error:", err);

    setError(
      err.message ||
        "Something went wrong while posting news."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

    

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* SUCCESS MESSAGE */}
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

        {/* ERROR MESSAGE */}
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

        <form onSubmit={handleSubmit}>

          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

            {/* ================= LEFT ================= */}
            <div className="min-w-0 space-y-6">

              {/* NEWS INFORMATION */}
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                <div className="mb-6">
                  <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                    News Information
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Add the main information for your article.
                  </p>
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
                    placeholder="Enter news title..."
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
                    placeholder="Write a short description of the news..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                  <div className="mt-2 text-right text-xs text-slate-400">
                    {form.excerpt.length}/500
                  </div>
                </div>

                {/* CONTENT */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Article Content
                  </label>

                  <div className="rounded-t-xl border border-b-0 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-500">
                    HTML content supported
                  </div>

                  <textarea
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    rows={18}
                    placeholder={`<h2>Latest IT Jobs</h2>

<p>Write your article content here...</p>

<h3>Companies Hiring</h3>

<ul>
  <li>Company 1</li>
  <li>Company 2</li>
</ul>`}
                    className="w-full resize-y rounded-b-xl border border-slate-200 bg-white px-4 py-3 font-mono text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </section>

              {/* ================= SEO ================= */}
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
                      Improve search engine visibility.
                    </p>
                  </div>

                </div>

                {/* SEO TITLE */}
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
                      form.title || "SEO title..."
                    }
                    maxLength={250}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                {/* SEO DESCRIPTION */}
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
                      "SEO description..."
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </section>
            </div>

            {/* ================= RIGHT SIDEBAR ================= */}
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

                      Featured News
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                      Show this article as featured news.
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
                    ? "Saving..."
                    : form.status === "published"
                    ? "Publish News"
                    : "Save Draft"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowPreview(true)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <FaEye />

                  Preview
                </button>

              </section>

              {/* COVER IMAGE */}
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
                      Add article thumbnail.
                    </p>
                  </div>

                </div>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {form.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="aspect-video w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}

              </section>

              {/* CATEGORY */}
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <h2 className="mb-4 font-bold text-slate-900">
                  Category
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

              </section>

              {/* ARTICLE DETAILS */}
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

              {/* TAGS */}
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <div className="mb-4 flex items-center gap-3">

                  <FaTags className="text-emerald-600" />

                  <h2 className="font-bold text-slate-900">
                    Tags
                  </h2>

                </div>

                <input
                  type="text"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="React, Jobs, Freshers"
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

      {/* ================= PREVIEW MODAL ================= */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 backdrop-blur-sm sm:p-6">

          <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 sm:px-6">

              <div>
                <h2 className="font-bold text-slate-900">
                  News Preview
                </h2>

                <p className="text-xs text-slate-500">
                  Preview before publishing
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

            {/* MODAL CONTENT */}
            <div className="overflow-y-auto">

              {form.image && (
                <img
                  src={form.image}
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
                  {form.title || "Your News Title"}
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
                    "Your news excerpt will appear here."}
                </p>

                <div
                  className="prose mt-8 max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700"
                  dangerouslySetInnerHTML={{
                    __html:
                      form.content ||
                      "<p>Your article content will appear here.</p>",
                  }}
                />

              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCreateNews;

