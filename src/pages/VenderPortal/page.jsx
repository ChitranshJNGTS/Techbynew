import React, { useState } from "react";
import Ads from "../../components/Ads";
import {
  Search,
  X,
  Clock,
  BriefcaseBusiness,
  Building2,
  ArrowRight,
  ShieldCheck,
  Users,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Menu,
  FileSearch,
  CalendarDays,
  Mail,
  Activity,
  CircleDot,
  MapPin,
  CalendarCheck,
  Send,
  LogIn,
  LoaderCircle,
  Eye,
  AlertCircle,
} from "lucide-react";

import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MobileBottomBar from "../../components/MobileBottomBar";
// ==========================================
// API CONFIGURATION
// ==========================================

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

const TRACKER_API = `${API_URL}/vendor-tracker/search`;

// ==========================================
// HELPERS
// ==========================================

const formatDate = (date) => {
  if (!date) return "N/A";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getArray = (data, key) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data?.[key])) return data.data[key];
  if (Array.isArray(data?.data)) return data.data;

  return [];
};

const getStatus = (item) =>
  item?.status || item?.currentStatus || "Submitted";

const getCandidateName = (item) =>
  item?.candidateName ||
  item?.candidate?.name ||
  item?.candidate?.fullName ||
  item?.name ||
  "Candidate";

const getPosition = (item) =>
  item?.position ||
  item?.jobTitle ||
  item?.job?.title ||
  item?.job?.jobTitle ||
  "Position not specified";

const getClient = (item) =>
  item?.client ||
  item?.clientName ||
  item?.job?.clientName ||
  item?.job?.client ||
  "Client not specified";

const getSubmissionId = (item) =>
  item?._id || item?.id || item?.submissionId;


const mapHistory = (history = []) =>
  (Array.isArray(history) ? history : []).map((item) => ({
    status: item.status || "Updated",
    previousStatus: item.previousStatus || "",
    date: formatDate(
      item.date || item.changedAt || item.createdAt || item.updatedAt
    ),
    note:
      item.note ||
      item.vendorNote ||
      "Status updated. No additional information shared.",
  }));


const mapSubmission = (item) => ({
  id: getSubmissionId(item),
  candidate: getCandidateName(item),
  position: getPosition(item),
  client: getClient(item),
  submitted: formatDate(
    item.submittedAt || item.submittedDate || item.createdAt
  ),
  updated: formatDate(
    item.updatedAt || item.lastUpdated || item.createdAt
  ),
  status: getStatus(item),
  feedback:
    item.publicFeedback ||
    item.vendorFeedback ||
    item.feedback ||
    "No feedback has been shared yet.",
  history: mapHistory(item.statusHistory || item.history || []),
});

const mapJob = (job) => ({
  id: job._id || job.id || job.jobId,
  title: job.title || job.jobTitle || "Untitled Position",
  client: job.clientName || job.client || "Client not specified",
  location: job.location || job.jobLocation || "Location not specified",
  workMode: job.workMode || job.workType || "Not specified",
  rate: job.rate || job.payRate || job.maxRate || "Contact recruiter",
  employment:
    job.employmentType ||
    job.employment ||
    job.workAuthorization ||
    "Not specified",
  posted: formatDate(job.createdAt || job.postedAt),
  description: job.description || job.jobDescription || "",
  skills: Array.isArray(job.skills)
    ? job.skills
    : Array.isArray(job.requiredSkills)
      ? job.requiredSkills
      : [],
});

// ==========================================
// STATUS CONFIGURATION
// ==========================================

const statusStyles = {
  Submitted: "bg-slate-100 text-slate-700 border-slate-200",
  "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
  "Submitted to Client": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Interview Scheduled": "bg-violet-50 text-violet-700 border-violet-200",
  Selected: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
  Backup: "bg-amber-50 text-amber-700 border-amber-200",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-bold ${
        statusStyles[status] || statusStyles.Submitted
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

// ==========================================
// ADVERTISEMENT COMPONENT
// ==========================================

function AdSlot({ type = "banner", className = "" }) {
  const adConfig = {
    banner: {
      label: "728 × 90 Banner",
      wrapper: "max-w-[728px] min-h-[90px]",
      adType: "728x90",
    },
    leaderboard: {
      label: "468 × 60 Banner",
      wrapper: "max-w-[468px] min-h-[60px]",
      adType: "468x60",
    },
    square: {
      label: "300 × 250 Display",
      wrapper: "max-w-[300px] min-h-[250px]",
      adType: "300x250",
    },
    vertical: {
      label: "160 × 300 Vertical",
      wrapper: "max-w-[160px] min-h-[300px]",
      adType: "160x300",
    },
    skyscraper: {
      label: "160 × 600 Skyscraper",
      wrapper: "max-w-[160px] min-h-[600px]",
      adType: "160x600",
    },
    mobile: {
      label: "320 × 50 Mobile Banner",
      wrapper: "max-w-[320px] min-h-[50px]",
      adType: "320x50",
    },
  };

  const config = adConfig[type] || adConfig.banner;

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="h-px w-6 bg-slate-200" />
        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
          Advertisement
        </span>
        <span className="h-px w-6 bg-slate-200" />
      </div>

      <div className="flex w-full justify-center">
        <div className={`relative flex w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white ${config.wrapper}`}>
          <Ads type={config.adType} />
        </div>
      </div>

      <p className="mt-1.5 text-center text-[9px] text-slate-400">
        {config.label}
      </p>
    </div>
  );
}


// ==========================================
// SECTION HEADING
// ==========================================

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div>
      {eyebrow && (
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
          {eyebrow}
        </p>
      )}

      <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
}



// ==========================================
// MAIN COMPONENT
// ==========================================

export default function VendorTracker() {
  const [email, setEmail] = useState("");
  const [recruiter, setRecruiter] = useState("");

  const [results, setResults] = useState(null);
  const [activeJobs, setActiveJobs] = useState([]);

  const [selected, setSelected] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
const navigate = useNavigate();
  // ==========================================
  // SEARCH API
  // ==========================================

  const handleSearch = async (e) => {
    e.preventDefault();

    setError("");
    setSelected(null);
    setResults(null);
    setActiveJobs([]);
    setSearched(false);

    if (!email.trim() || !recruiter.trim()) {
      setError("Please enter your vendor email and recruiter name.");
      return;
    }

    if (!API_URL) {
      setError("Backend API URL is not configured.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(TRACKER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorEmail: email.trim().toLowerCase(),
          recruiterName: recruiter.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            "Unable to retrieve your submission records."
        );
      }

      const submissionRecords = getArray(data, "submissions");
      const jobRecords = getArray(data, "jobs");

      setResults(submissionRecords.map(mapSubmission));
      setActiveJobs(
        jobRecords
          .filter(
            (job) =>
              job.vendorVisible !== false &&
              ["active", "open"].includes(
                String(job.status || "Active").toLowerCase()
              )
          )
          .map(mapJob)
      );

      setSearched(true);
    } catch (err) {
      console.error("Vendor tracker search error:", err);
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetSearch = () => {
    setEmail("");
    setRecruiter("");
    setResults(null);
    setActiveJobs([]);
    setSelected(null);
    setError("");
    setSearched(false);
  };

  const closeModal = () => setSelected(null);

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-800">
      {/* NAVBAR */}

      {/* <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="/" className="flex shrink-0 items-center">
            <img
              src={logo}
              alt="TechBy Logo"
              className="h-11 w-auto max-w-[170px] object-contain"
            />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="/"
              className="text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
            >
              Home
            </a>

            <a
              href="/jobs"
              className="text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
            >
              Find Jobs
            </a>

            <a
              href="/vendor-tracker"
              className="relative text-sm font-bold text-emerald-700"
            >
              Vendor Tracker
              <span className="absolute -bottom-[25px] left-0 h-[3px] w-full rounded-full bg-emerald-600" />
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="mailto:support@techby.in"
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700"
            >
              <Mail size={16} />
              Contact
            </a>

            <a
              href="/"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              Back to TechBy
              <ArrowRight size={15} />
            </a>
          </div>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="rounded-lg border border-slate-200 p-2.5 text-slate-700 md:hidden"
            aria-label="Toggle navigation"
          >
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {mobileMenu && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 shadow-lg md:hidden">
            <nav className="flex flex-col gap-4">
              <a href="/" className="text-sm font-semibold text-slate-600">
                Home
              </a>

              <a href="/jobs" className="text-sm font-semibold text-slate-600">
                Find Jobs
              </a>

              <a
                href="/vendor-tracker"
                className="text-sm font-bold text-emerald-700"
              >
                Vendor Tracker
              </a>

              <a
                href="mailto:support@techby.in"
                className="text-sm font-semibold text-slate-600"
              >
                Contact Support
              </a>

              <a
                href="/recruiter/login"
                className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700"
              >
                <LogIn size={17} />
                US IT Recruiter Login
                <ArrowRight size={15} className="ml-auto" />
              </a>
            </nav>
          </div>
        )}
      </header> */}
<Navbar/>
      {/* RECRUITER PROMOTIONAL BANNER */}

  

<section className="relative mt-18 overflow-hidden bg-slate-950">
  <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
  <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">
        <span className="text-emerald-400">💚</span>
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
          Free Platform. Open Opportunities.
        </span>
      </div>

      <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
        Keeping TechBy
        <span className="text-emerald-400"> Free for Everyone.</span>
      </h2>

      <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
        TechBy is a free platform built to connect job seekers with
        opportunities without charging candidates. To maintain our
        website, improve our services, and keep access free, we display
        advertisements. Your support helps us continue our mission.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {[
          "Free Job Access",
          "No Candidate Registration Fee",
          "Supported by Advertisements",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium text-slate-200 sm:text-sm"
          >
            <CheckCircle2 size={15} className="text-emerald-400" />
            {item}
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs leading-6 text-slate-400">
        Thank you for supporting TechBy. Every visit helps us keep
        opportunities accessible to everyone.
      </p>
    </div>
  </div>
</section>



      {/* MAIN CONTENT */}

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-10 rounded-2xl border border-slate-200/70 bg-white/70 p-3 sm:p-4">
          <AdSlot type="banner" />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* LEFT CONTENT */}

          <div className="min-w-0">
            {/* SEARCH FORM */}

            <section
              id="vendor-search"
              className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-7 flex items-start gap-4">
                <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700">
                  <FileSearch size={25} />
                </div>

                <SectionHeading
                  eyebrow="Vendor Access"
                  title="Find Your Submissions"
                  description="Enter your registered details to access your candidate submission records."
                />
              </div>

              <form onSubmit={handleSearch}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Vendor Registered Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="vendor@company.com"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Recruiter Name
                    </label>

                    <div className="relative">
                      <Users
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        type="text"
                        required
                        value={recruiter}
                        onChange={(e) => setRecruiter(e.target.value)}
                        placeholder="e.g. Chitransh Jawre"
                        className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                    <AlertCircle size={17} className="mt-0.5 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <LoaderCircle size={18} className="animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={18} />
                        Search Submissions
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={resetSearch}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
                  >
                    <RotateCcw size={16} />
                    Reset
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <ShieldCheck size={15} className="text-emerald-600" />
                  Search using the email registered with your vendor account.
                </div>
              </form>
            </section>

            {/* SEARCH RESULTS */}
            

            {searched && results !== null && (
              <section className="mt-9">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                      Search Overview
                    </p>

                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Submission Results
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {results.length} candidate(s) found for your search.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                    <CheckCircle2 size={15} />
                    Search Completed
                  </span>
                </div>

                {results.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                      <Search size={30} className="text-slate-400" />
                    </div>

                    <h4 className="mt-5 font-bold text-slate-900">
                      No submissions found
                    </h4>

                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                      We couldn't find records matching those details. Please
                      verify your registered vendor email and recruiter name.
                    </p>

                    <button
                      onClick={resetSearch}
                      className="mt-5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                    >
                      Try another search
                    </button>
                  </div>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Activity size={18} className="text-emerald-600" />
                        <span className="text-sm font-bold text-slate-800">
                          Candidate Records
                        </span>
                      </div>

                      <span className="text-xs font-medium text-slate-400">
                        {results.length} Records
                      </span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[790px] text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                          <tr>
                            <th className="px-5 py-4">Candidate</th>
                            <th className="px-5 py-4">Position / Client</th>
                            <th className="px-5 py-4">Submitted</th>
                            <th className="px-5 py-4">Status</th>
                            <th className="px-5 py-4">Last Updated</th>
                            <th className="px-5 py-4">Action</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                          {results.map((item) => (
                            <tr
                              key={item.id}
                              className="transition-colors hover:bg-slate-50/80"
                            >
                              <td className="px-5 py-5">
                                <p className="font-bold text-slate-900">
                                  {item.candidate}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                  ID: {String(item.id).slice(-8)}
                                </p>
                              </td>

                              <td className="px-5 py-5">
                                <p className="font-semibold text-slate-800">
                                  {item.position}
                                </p>
                                <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                  <Building2 size={13} />
                                  {item.client}
                                </p>
                              </td>

                              <td className="whitespace-nowrap px-5 py-5 text-slate-600">
                                {item.submitted}
                              </td>

                              <td className="px-5 py-5">
                                <StatusBadge status={item.status} />
                              </td>

                              <td className="whitespace-nowrap px-5 py-5 text-slate-600">
                                {item.updated}
                              </td>

                              <td className="px-5 py-5">
                                <button
                                  onClick={() => setSelected(item)}
                                  className="inline-flex items-center gap-1 whitespace-nowrap font-bold text-emerald-700 transition hover:text-emerald-900"
                                >
                                  View Details
                                  <ChevronRight size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {results.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-slate-200/70 bg-white/70 p-3 sm:p-4">
                    <AdSlot type="banner" />
                  </div>
                )}
              </section>
            )}

            {/* ACTIVE HIRING */}

{/* TECHBY US IT RECRUITMENT PROMOTION */}


{!searched && (
  <section className="relative overflow-hidden bg-white px-4 py-7 sm:px-6 lg:px-8">
    <div className="absolute -left-20 top-0 h-52 w-52 rounded-full bg-emerald-100/70 blur-3xl" />
    <div className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-blue-100/60 blur-3xl" />

    <div className="relative mx-auto max-w-7xl">
      <div className="overflow-hidden rounded-2xl bg-slate-950 shadow-lg">
        <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_300px]">
            <div className="max-w-3xl">

              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
                Track Your Candidate
                <span className="block text-emerald-400">
                  Submission Status.
                </span>
              </h2>

              <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-300 sm:text-sm">
                Search using your registered vendor email and TechBy recruiter
                name to check your candidate submissions. Get transparent
                updates on where your candidates stand in the hiring process.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: Search,
                    title: "Search Submissions",
                    description: "Find your submitted candidate profiles.",
                  },
                  {
                    icon: BriefcaseBusiness,
                    title: "Check Job Details",
                    description: "View the job title and client information.",
                  },
                  {
                    icon: Activity,
                    title: "Track Live Status",
                    description: "See whether a profile is under review, submitted to client, or selected.",
                  },
                  {
                    icon: Clock,
                    title: "View Latest Updates",
                    description: "Check the last updated date and status history.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-3"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                      <item.icon size={17} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-5 text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white">
                  What You'll See
                </h3>
                <CheckCircle2 size={18} className="text-emerald-400" />
              </div>

              <div className="mt-5 space-y-4">
                {[
                  ["Candidate Name", "Submitted profile"],
                  ["Job Position", "Target opportunity"],
                  ["Client Name", "Hiring company"],
                  ["Submission Status", "Current progress"],
                  ["Last Updated", "Latest status update"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                  >
                    <span className="text-xs text-slate-400">{label}</span>
                    <span className="text-right text-xs font-semibold text-slate-200">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3">
                <p className="text-xs font-bold text-emerald-300">
                  <ShieldCheck size={14} className="mr-1 inline" />
                  Private & Secure Tracking
                </p>
                <p className="mt-1 text-[11px] leading-5 text-slate-400">
                  Only submissions linked to your vendor email and recruiter
                  will be displayed.
                </p>
              </div>
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
            <p className="text-xs font-medium text-slate-400">
              Enter your registered details above to get started.
            </p>

        
          </div>
        </div>
      </div>
    </div>
  </section>
)}


            {searched && (
              <section className="mt-10">
                <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-widest text-emerald-600">
                      Opportunities from your recruiter
                    </p>

                    <h3 className="text-2xl font-extrabold text-slate-900">
                      Active Hiring
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Open positions currently shared by {recruiter.trim()}.
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
                    <BriefcaseBusiness size={15} />
                    {activeJobs.length} Open Position
                    {activeJobs.length === 1 ? "" : "s"}
                  </span>
                </div>

                {activeJobs.length === 0 ? (
                  <div className="rounded-2xl border border-slate-200 bg-white px-5 py-10 text-center shadow-sm">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                      <BriefcaseBusiness
                        size={25}
                        className="text-slate-400"
                      />
                    </div>

                    <h4 className="mt-4 font-bold text-slate-900">
                      No active hiring at the moment
                    </h4>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                      There are currently no vendor-visible open positions
                      assigned to this recruiter. Please check again later.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {activeJobs.map((job) => (
                    
<article
  key={job.id}
  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl"
>
  {/* TOP ACCENT */}
  <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500" />

  <div className="p-5 sm:p-6">

    {/* HEADER */}
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

      <div className="min-w-0 flex-1">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Actively Hiring
          </span>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
            JOB ID: {String(job.id).slice(-8).toUpperCase()}
          </span>
        </div>

        <h4 className="text-lg font-extrabold leading-snug text-slate-900 transition group-hover:text-emerald-700 sm:text-xl">
          {job.title}
        </h4>

        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Building2 size={16} className="shrink-0 text-slate-400" />
          {job.client}
        </p>
      </div>

      {/* RATE PANEL */}
      <div className="flex shrink-0 items-center gap-3 rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 sm:min-w-[145px] sm:justify-center">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
          <BriefcaseBusiness size={17} />
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/70">
            Pay Rate
          </p>
          <p className="mt-0.5 text-base font-extrabold text-emerald-800">
            {job.rate}
          </p>
        </div>
      </div>
    </div>

    {/* JOB DESCRIPTION */}
    {job.description && (
      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
        <div className="mb-2 flex items-center gap-2">
          <FileSearch size={15} className="text-emerald-600" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Job Overview
          </span>
        </div>

        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
          {job.description}
        </p>
      </div>
    )}

    {/* REQUIRED SKILLS */}
    {job.skills.length > 0 && (
      <div className="mt-5">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
          Required Skills
        </p>

        <div className="flex flex-wrap gap-2">
          {job.skills.slice(0, 8).map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              {skill}
            </span>
          ))}

          {job.skills.length > 8 && (
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
              +{job.skills.length - 8} more
            </span>
          )}
        </div>
      </div>
    )}

    {/* JOB INFORMATION */}
    <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-slate-100 bg-white p-4 sm:grid-cols-4">
      <div className="flex items-start gap-2.5">
        <MapPin size={16} className="mt-0.5 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Location
          </p>
          <p className="mt-1 break-words text-xs font-bold text-slate-700">
            {job.location}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <BriefcaseBusiness size={16} className="mt-0.5 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Work Mode
          </p>
          <p className="mt-1 break-words text-xs font-bold text-slate-700">
            {job.workMode}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <Send size={16} className="mt-0.5 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Employment
          </p>
          <p className="mt-1 break-words text-xs font-bold text-slate-700">
            {job.employment}
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <CalendarCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" />
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Posted On
          </p>
          <p className="mt-1 text-xs font-bold text-slate-700">
            {job.posted}
          </p>
        </div>
      </div>
    </div>

    {/* FOOTER ACTION */}
    <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
        Contact the recruiter to share a suitable profile.
      </div>

      <button
        onClick={() =>
          navigate(`/vendor-tracker/job/${job.id}`, {
            state: { job },
          })
        }
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-emerald-600 hover:shadow-md"
      >
        View Full Details
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  </div>
</article>

                    ))}
                  </div>
                )}
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="space-y-6 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-slate-200/70 bg-white p-3 shadow-sm">
              <AdSlot type="square" />
            </div>

            {/* HOW IT WORKS */}

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <SectionHeading
                eyebrow="Quick Guide"
                title="How It Works"
                description="Find your candidate submissions in three simple steps."
              />

              <div className="mt-7 space-y-6">
                {[
                  [
                    "01",
                    "Enter vendor email",
                    "Use the email address registered with your recruiter.",
                  ],
                  [
                    "02",
                    "Enter recruiter name",
                    "Type the name of the TechBy recruiter.",
                  ],
                  [
                    "03",
                    "View your submissions",
                    "Check candidate status and available feedback.",
                  ],
                ].map(([number, title, description]) => (
                  <div key={number} className="flex gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xs font-extrabold text-emerald-700">
                      {number}
                    </span>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {title}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PARTNER CARD */}

            <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative">
                <div className="mb-5 inline-flex rounded-xl bg-emerald-500/15 p-3 text-emerald-400">
                  <BriefcaseBusiness size={24} />
                </div>

                <h3 className="text-lg font-extrabold">
                  Partner with TechBy
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Stay connected with our recruitment network and track your
                  candidate submissions with ease.
                </p>

                <a
                  href="mailto:support@techby.in"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 transition hover:text-emerald-300"
                >
                  Contact Our Team
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* SUPPORT CARD */}

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={22}
                  className="shrink-0 text-emerald-700"
                />

                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Vendor Support
                  </h4>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Need help with a submission? Reach out to our support team.
                  </p>

                  <a
                    href="mailto:support@techby.in"
                    className="mt-3 inline-block text-xs font-bold text-emerald-700 hover:underline"
                  >
                    support@techby.in
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* TRUST SECTION */}

        <section className="mt-14 border-t border-slate-200 pt-10">
          <div className="mb-7 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-600">
              Why TechBy
            </p>

            <h3 className="mt-2 text-2xl font-extrabold text-slate-900">
              A Better Way to Track Recruitment
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Vendor Friendly",
                description:
                  "A simple and accessible submission tracking experience.",
              },
              {
                icon: Clock,
                title: "Status Updates",
                description:
                  "Stay informed about the latest recruitment progress.",
              },
              {
                icon: ShieldCheck,
                title: "Clear Feedback",
                description:
                  "View available feedback and submission history.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Icon size={22} />
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {title}
                  </h4>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM AD */}

        <div className="mt-10 rounded-2xl border border-slate-200/70 bg-white/70 p-3 sm:p-4">
          <AdSlot type="leaderboard" />
        </div>
      </main>

      <Footer />

      {/* SUBMISSION DETAILS MODAL */}

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-5"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-modal-title"
            className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden bg-slate-950 p-6 text-white sm:p-7">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/20 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-400">
                    Submission Details
                  </span>

                  <h3
                    id="submission-modal-title"
                    className="mt-2 text-2xl font-extrabold"
                  >
                    {selected.candidate}
                  </h3>

                  <p className="mt-2 text-sm text-slate-300">
                    {selected.position} · {selected.client}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  aria-label="Close details"
                  className="rounded-xl border border-white/10 bg-white/10 p-2.5 text-white transition hover:bg-white/20"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative mt-5 flex flex-wrap items-center gap-3">
                <StatusBadge status={selected.status} />
                <span className="text-xs text-slate-400">
                  Submission ID: {String(selected.id).slice(-8)}
                </span>
              </div>
            </div>

            <div className="space-y-7 p-6 sm:p-7">
              {/* SUBMISSION INFORMATION */}

              <div>
                <h4 className="mb-4 text-sm font-extrabold text-slate-900">
                  Submission Information
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarDays size={15} />
                      <span className="text-xs font-medium">
                        Submitted On
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {selected.submitted}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Clock size={15} />
                      <span className="text-xs font-medium">
                        Last Updated
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-bold text-slate-800">
                      {selected.updated}
                    </p>
                  </div>
                </div>
              </div>

              {/* FEEDBACK */}

              <div>
                <h4 className="mb-3 text-sm font-extrabold text-slate-900">
                  Latest Feedback
                </h4>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />

                    <p className="text-sm leading-6 text-slate-700">
                      {selected.feedback}
                    </p>
                  </div>
                </div>
              </div>

              {/* TIMELINE */}

              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Submission Timeline
                  </h4>

                  <span className="text-xs font-medium text-slate-400">
                    {selected.history.length} Updates
                  </span>
                </div>

                {selected.history.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No status history available.
                  </p>
                ) : (
                  <div className="space-y-0">
                    {selected.history.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <span
                            className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                              index === selected.history.length - 1
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            <CircleDot size={15} />
                          </span>

                          {index !== selected.history.length - 1 && (
                            <span className="my-1 min-h-10 w-px flex-1 bg-slate-200" />
                          )}
                        </div>

                        <div className="flex-1 pb-6">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-bold text-slate-800">
                              {item.status}
                            </p>

                            <p className="text-xs text-slate-400">
                              {item.date}
                            </p>
                          </div>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {item.note}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-slate-100 p-6 sm:px-7">
              <button
                onClick={closeModal}
                className="w-full rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
      <MobileBottomBar/>
    </div>
    
  );
}
