
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
  FaFilePdf,
  FaTrash,
  FaUpload,
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
  image: "",
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

  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");

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
  // HANDLE PDF
  // ==========================================

  const handlePdfChange = (e) => {
    const file = e.target.files?.[0];

    setPdfError("");
    setError("");
    setMessage("");

    if (!file) {
      setPdfFile(null);
      return;
    }

    // Check PDF type
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setPdfError("Only PDF files are allowed.");
      e.target.value = "";
      setPdfFile(null);
      return;
    }

    // 10 MB limit
    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      setPdfError("PDF size must be less than 10 MB.");
      e.target.value = "";
      setPdfFile(null);
      return;
    }

    setPdfFile(file);
  };

  // ==========================================
  // REMOVE PDF
  // ==========================================

  const removePdf = () => {
    setPdfFile(null);

    const input = document.getElementById("government-pdf");

    if (input) {
      input.value = "";
    }

    setPdfError("");
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
      // ==========================================
      // ADMIN TOKEN
      // ==========================================

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
        "image",
        form.image.trim()
      );
      formData.append(
  "applyLink",
  form.applyLink.trim()
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
        "tags",
        JSON.stringify(tags)
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

      // ==========================================
      // PDF
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
      setPdfFile(null);

      const pdfInput =
        document.getElementById(
          "government-pdf"
        );

      if (pdfInput) {
        pdfInput.value = "";
      }

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
                LEFT SIDE
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

<p>Eligible candidates can apply through the official website.</p>

<h2>Important Links</h2>

<p>Official Website: ...</p>`}
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

              {/* ==========================================
                  PUBLISH
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <h2 className="mb-4 font-bold text-slate-900">
                  Publish
                </h2>

                {/* STATUS */}

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

                {/* FEATURED */}

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

                {/* SAVE */}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  <FaSave />

                  {loading
                    ? "Saving..."
                    : form.status === "published"
                    ? "Publish Government News"
                    : "Save Draft"}

                </button>

                {/* PREVIEW */}

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
                  PDF UPLOAD
              ========================================== */}

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">

                <div className="mb-4 flex items-center gap-3">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                    <FaFilePdf />
                  </div>

                  <div>

                    <h2 className="font-bold text-slate-900">
                      Official Notification PDF
                    </h2>

                    <p className="text-xs text-slate-500">
                      Upload the official government notification.
                    </p>

                  </div>

                </div>

                {!pdfFile ? (
                  <label
                    htmlFor="government-pdf"
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-7 text-center transition hover:border-emerald-300 hover:bg-emerald-50/40"
                  >

                    <FaUpload className="mb-3 text-2xl text-slate-400" />

                    <span className="text-sm font-semibold text-slate-700">
                      Click to upload PDF
                    </span>

                    <span className="mt-1 text-xs text-slate-400">
                      PDF only • Maximum 10 MB
                    </span>

                    <input
                      id="government-pdf"
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={handlePdfChange}
                      className="hidden"
                    />

                  </label>
                ) : (
                  <div className="rounded-xl border border-red-100 bg-red-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <FaFilePdf />
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-sm font-semibold text-slate-800">
                          {pdfFile.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={removePdf}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-100 hover:text-red-600"
                        title="Remove PDF"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </div>
                )}

                {pdfError && (
                  <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                    {pdfError}
                  </p>
                )}

                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Recommended: Upload the original official
                  notification PDF from the government department,
                  commission or organization.
                </p>

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
                      Add article thumbnail or featured image.
                    </p>

                  </div>

                </div>

                <input
                  type="url"
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://example.com/ssc-cgl-2026.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                {form.image && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                    <img
                      src={form.image}
                      alt="Government news preview"
                      className="aspect-video w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

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

                  {/* AUTHOR */}

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

                  {/* READ TIME */}

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

            {/* MODAL HEADER */}

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

            {/* MODAL CONTENT */}

            <div className="overflow-y-auto">

              {/* COVER IMAGE */}

              {form.image && (
                <img
                  src={form.image}
                  alt={form.title}
                  className="aspect-[2/1] w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}

              <article className="mx-auto max-w-3xl px-5 py-7 sm:px-8 sm:py-10">

                {/* CATEGORY */}

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

                {/* TITLE */}

                <h1 className="text-2xl font-black leading-tight text-slate-900 sm:text-4xl">
                  {form.title || "Government Job News Title"}
                </h1>

                {/* META */}

                <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">

                  <span>
                    By {form.author || "TechBy"}
                  </span>

                  <span>•</span>

                  <span>
                    {form.readTime || "5 min"}
                  </span>

                </div>

                {/* EXCERPT */}

                <p className="mt-6 text-base leading-7 text-slate-600">
                  {form.excerpt ||
                    "Your government job news description will appear here."}
                </p>

                {/* CONTENT */}

                <div
                  className="prose mt-8 max-w-none prose-headings:text-slate-900 prose-p:text-slate-700 prose-li:text-slate-700 prose-a:text-emerald-600"
                  dangerouslySetInnerHTML={{
                    __html:
                      form.content ||
                      "<p>Your government news content will appear here.</p>",
                  }}
                />

                {/* PDF PREVIEW */}

                {pdfFile && (
                  <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                        <FaFilePdf />
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

                {/* ADMIN REMINDER */}

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

