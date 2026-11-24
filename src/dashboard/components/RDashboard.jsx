
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Users,
  FileText,
  CalendarDays,
  ArrowUpRight,
  ArrowRight,
  Plus,
  MapPin,
  Building2,
  UserRound,
  TrendingUp,
  Clock3,
  ChevronRight,
  RefreshCw,
  AlertCircle,
  LoaderCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// --------------------------------------------------
// FIREBASE AUTH
// --------------------------------------------------

const getFirebaseUser = () => {
  return new Promise((resolve, reject) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    let unsubscribe;

    unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe?.();

        if (user) {
          resolve(user);
        } else {
          reject(
            new Error("Your session has expired. Please log in again.")
          );
        }
      },
      (error) => {
        unsubscribe?.();
        reject(error);
      }
    );
  });
};

// --------------------------------------------------
// HELPERS
// --------------------------------------------------

const getArray = (data, key) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.[key])) return data[key];
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const getSubmissionStatus = (submission) =>
  submission.status || submission.currentStatus || "Submitted";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "NA";

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getCandidateName = (submission) => {
  const candidate =
    submission.candidateId &&
    typeof submission.candidateId === "object"
      ? submission.candidateId
      : {};

  return (
    submission.candidateName ||
    candidate.name ||
    candidate.candidateName ||
    "Unknown Candidate"
  );
};

const getJobDetails = (submission) => {
  const job =
    submission.jobId && typeof submission.jobId === "object"
      ? submission.jobId
      : {};

  return {
    role:
      submission.jobTitle ||
      submission.role ||
      job.jobTitle ||
      job.title ||
      "Role not specified",

    client:
      submission.clientName ||
      submission.client ||
      job.clientName ||
      "Confidential Client",
  };
};

// --------------------------------------------------
// STATUS STYLES
// --------------------------------------------------

const statusStyles = {
  Submitted: "bg-blue-50 text-blue-700 ring-blue-600/20",
  "Under Review": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Submitted to Client": "bg-violet-50 text-violet-700 ring-violet-600/20",
  "Interview Scheduled": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Selected: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
  Backup: "bg-orange-50 text-orange-700 ring-orange-600/20",
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Urgent: "bg-rose-50 text-rose-700 ring-rose-600/20",
  "On Hold": "bg-amber-50 text-amber-700 ring-amber-600/20",
  Closed: "bg-slate-100 text-slate-600 ring-slate-200",
};

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] ||
        "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      {status || "Submitted"}
    </span>
  );
}

// --------------------------------------------------
// STAT CARD
// --------------------------------------------------

function StatCard({ item }) {
  const Icon = item.icon;

  const iconColors = {
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {item.label}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {item.value}
          </h3>
        </div>

        <div className={`rounded-xl p-3 ${iconColors[item.color]}`}>
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <TrendingUp size={14} />
        {item.change}
      </div>
    </div>
  );
}

// --------------------------------------------------
// SECTION HEADING
// --------------------------------------------------

function SectionHeading({ title, description, action, to }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-base font-bold text-slate-900">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          to={to}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
        >
          {action}
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}

// --------------------------------------------------
// MAIN DASHBOARD
// --------------------------------------------------

export default function RDashboard() {
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // ------------------------------------------------
  // API REQUEST
  // ------------------------------------------------

  const apiRequest = useCallback(async (endpoint) => {
    if (!API_URL) {
      throw new Error("VITE_API_URL is not configured.");
    }

    const user = await getFirebaseUser();
    const token = await user.getIdToken();

    const response = await fetch(
      `${API_URL}/recruiter${endpoint}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const requestError = new Error(
        data.message ||
          data.error ||
          `Request failed with status ${response.status}.`
      );

      requestError.status = response.status;
      requestError.code = data.code;

      throw requestError;
    }

    return data;
  }, []);

  // ------------------------------------------------
  // LOAD DASHBOARD DATA
  // ------------------------------------------------

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [jobsData, candidatesData, submissionsData] =
        await Promise.all([
          apiRequest("/jobs?limit=100"),
          apiRequest("/candidates?limit=100"),
          apiRequest("/submissions?limit=100"),
        ]);

      setJobs(getArray(jobsData, "jobs"));
      setCandidates(getArray(candidatesData, "candidates"));
      setSubmissions(getArray(submissionsData, "submissions"));
    } catch (err) {
      console.error("Dashboard loading error:", err);

      setError(
        err.message || "Unable to load your recruitment dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  // ------------------------------------------------
  // STATISTICS
  // ------------------------------------------------

  const activeCount = jobs.filter(
    (job) => job.status === "Active"
  ).length;

  const interviewCount = submissions.filter(
    (item) =>
      getSubmissionStatus(item) === "Interview Scheduled"
  ).length;

  const stats = [
    {
      label: "Active Requirements",
      value: activeCount,
      change: `${jobs.length} total requirements`,
      icon: BriefcaseBusiness,
      color: "emerald",
    },
    {
      label: "Total Candidates",
      value: candidates.length,
      change: "Your candidate database",
      icon: Users,
      color: "blue",
    },
    {
      label: "Total Submissions",
      value: submissions.length,
      change: "Your submission records",
      icon: FileText,
      color: "violet",
    },
    {
      label: "Interviews Scheduled",
      value: interviewCount,
      change: "Current interview pipeline",
      icon: CalendarDays,
      color: "amber",
    },
  ];

  // ------------------------------------------------
  // RECENT SUBMISSIONS
  // ------------------------------------------------

  const recentSubmissions = useMemo(() => {
    return [...submissions]
      .sort(
        (a, b) =>
          new Date(b.createdAt || b.submittedAt || 0).getTime() -
          new Date(a.createdAt || a.submittedAt || 0).getTime()
      )
      .slice(0, 4)
      .map((item) => {
        const details = getJobDetails(item);
        const candidateName = getCandidateName(item);

        return {
          id: item._id || item.id,
          candidate: candidateName,
          initials: getInitials(candidateName),
          role: details.role,
          client: details.client,
          date: formatDate(
            item.submittedAt || item.createdAt || item.updatedAt
          ),
          status: getSubmissionStatus(item),
        };
      });
  }, [submissions]);

  // ------------------------------------------------
  // ACTIVE REQUIREMENTS
  // ------------------------------------------------

  const activeRequirements = useMemo(() => {
    return jobs
      .filter((job) => job.status === "Active")
      .slice(0, 3)
      .map((job) => ({
        id: job._id || job.id,
        title: job.jobTitle || job.title || "Untitled Requirement",
        client: job.clientName || "Confidential Client",
        location: job.location || "Location not specified",

        experience:
          job.experienceMin && job.experienceMax
            ? `${job.experienceMin}-${job.experienceMax} Years`
            : job.experienceMin
              ? `${job.experienceMin}+ Years`
              : "Not specified",

        submissions: job.submissionCount || 0,
        priority:
          job.priority === "Urgent" ? "Urgent" : "Active",
      }));
  }, [jobs]);

  // ------------------------------------------------
  // SUBMISSION PIPELINE
  // ------------------------------------------------

  const pipelineStatuses = [
    { label: "Submitted", color: "bg-blue-500" },
    { label: "Under Review", color: "bg-amber-500" },
    { label: "Submitted to Client", color: "bg-violet-500" },
    { label: "Interview Scheduled", color: "bg-emerald-500" },
    { label: "Backup", color: "bg-orange-500" },
    { label: "Selected", color: "bg-teal-500" },
    { label: "Rejected", color: "bg-rose-500" },
  ];

  const pipeline = pipelineStatuses.map((item) => ({
    ...item,
    value: submissions.filter(
      (submission) =>
        getSubmissionStatus(submission) === item.label
    ).length,
  }));

  const totalPipeline = submissions.length;

  // ------------------------------------------------
  // RENDER
  // ------------------------------------------------

  return (
    <div className="space-y-7">

      {/* WELCOME SECTION */}

      <section className="flex flex-col justify-between gap-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-6 text-white shadow-sm sm:flex-row sm:items-center sm:p-8">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Recruiter Workspace
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, Chitransh!
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            Here's an overview of your recruitment activity. Keep track
            of requirements, candidates and submissions from one place.
          </p>

          <p className="mt-4 flex items-center gap-2 text-xs text-slate-400">
            <CalendarDays size={14} />
            {today}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/recruiter/jobs"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-400"
          >
            <Plus size={17} />
            New Requirement
          </Link>

          <Link
            to="/recruiter/candidates"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
          >
            <Users size={17} />
            View Candidates
          </Link>
        </div>
      </section>

      {/* ERROR MESSAGE */}

      {error && (
        <div className="flex flex-col gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>

          <button
            onClick={fetchDashboard}
            disabled={loading}
            className="inline-flex items-center gap-2 font-semibold hover:underline disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Retry
          </button>
        </div>
      )}

      {/* LOADING MESSAGE */}

      {loading && (
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          <LoaderCircle size={18} className="animate-spin" />
          Loading your recruitment dashboard...
        </div>
      )}

      {/* REFRESH BUTTON */}

      <div className="flex justify-end">
        <button
          onClick={fetchDashboard}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Refresh Dashboard
        </button>
      </div>

      {/* STATISTICS */}

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} item={item} />
        ))}
      </section>

      {/* MAIN CONTENT */}

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* RECENT SUBMISSIONS */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
          <div className="p-5 sm:p-6">
            <SectionHeading
              title="Recent Submissions"
              description="Track your latest candidate submissions and progress."
              action="View all submissions"
              to="/recruiter/submissions"
            />

            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="border-y border-slate-100 text-xs uppercase tracking-wider text-slate-400">
                    <th className="py-3 pr-4 font-semibold">
                      Candidate
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Client
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Submitted
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-10 text-center text-sm text-slate-400"
                      >
                        Loading submissions...
                      </td>
                    </tr>
                  ) : recentSubmissions.length > 0 ? (
                    recentSubmissions.map((item) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="py-4 pr-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700">
                              {item.initials}
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-slate-800">
                                {item.candidate}
                              </p>

                              <p className="mt-0.5 max-w-[210px] truncate text-xs text-slate-500">
                                {item.role}
                              </p>

                              <p className="mt-1 text-[11px] text-slate-400">
                                {String(item.id || "").slice(-8).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4 text-sm font-medium text-slate-600">
                          {item.client}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-500">
                          {item.date}
                        </td>

                        <td className="px-4 py-4">
                          <StatusBadge status={item.status} />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-12 text-center text-sm text-slate-400"
                      >
                        <FileText
                          size={30}
                          className="mx-auto mb-3 text-slate-300"
                        />
                        No submissions found yet.
                        <div className="mt-2">
                          <Link
                            to="/recruiter/submissions"
                            className="font-semibold text-emerald-700 hover:underline"
                          >
                            Create your first submission
                          </Link>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SUBMISSION PIPELINE */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading
            title="Submission Pipeline"
            description="Current status of your submissions."
          />

          <div className="mb-6 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">
              Total submissions
            </p>

            <div className="mt-1 flex items-end justify-between">
              <h3 className="text-3xl font-bold text-slate-900">
                {totalPipeline}
              </h3>

              <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <TrendingUp size={13} />
                All time
              </span>
            </div>

            <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-slate-200">
              {pipeline.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  style={{
                    width:
                      totalPipeline > 0
                        ? `${(item.value / totalPipeline) * 100}%`
                        : "0%",
                  }}
                  title={`${item.label}: ${item.value}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {pipeline.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                    />
                    <span className="text-sm text-slate-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-sm font-bold text-slate-800">
                    {item.value}
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{
                      width:
                        totalPipeline > 0
                          ? `${(item.value / totalPipeline) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVE REQUIREMENTS */}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <SectionHeading
          title="Active Job Requirements"
          description="Requirements that need your attention."
          action="Manage requirements"
          to="/recruiter/jobs"
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {loading ? (
            <div className="py-8 text-sm text-slate-400">
              Loading requirements...
            </div>
          ) : activeRequirements.length > 0 ? (
            activeRequirements.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-slate-200 p-4 transition hover:border-emerald-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-xs font-semibold text-slate-400">
                      {String(job.id || "").slice(-8).toUpperCase()}
                    </span>

                    <h3 className="mt-2 text-sm font-bold leading-5 text-slate-900">
                      {job.title}
                    </h3>
                  </div>

                  <StatusBadge status={job.priority} />
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Building2 size={14} />
                    {job.client}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin size={14} />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <UserRound size={14} />
                    {job.experience}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-500">
                    <span className="font-bold text-slate-800">
                      {job.submissions}
                    </span>{" "}
                    submissions
                  </span>

                  <Link
                    to="/recruiter/jobs"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    View details
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-sm text-slate-400">
              No active requirements found.
              <Link
                to="/recruiter/jobs"
                className="ml-2 font-semibold text-emerald-700 hover:underline"
              >
                Create requirement
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* QUICK ACTIONS */}

      <section className="grid grid-cols-1 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <SectionHeading
            title="Quick Actions"
            description="Common tasks to help you work faster."
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/recruiter/jobs"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50/40"
            >
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-700 transition group-hover:bg-emerald-100">
                <Plus size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Create Requirement
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Add a new job opening
                </p>
              </div>

              <ArrowUpRight size={16} className="text-slate-400" />
            </Link>

            <Link
              to="/recruiter/candidates"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              <div className="rounded-xl bg-blue-50 p-3 text-blue-700 transition group-hover:bg-blue-100">
                <Users size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Add Candidate
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Manage your talent pool
                </p>
              </div>

              <ArrowUpRight size={16} className="text-slate-400" />
            </Link>

            <Link
              to="/recruiter/submissions"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-violet-300 hover:bg-violet-50/40"
            >
              <div className="rounded-xl bg-violet-50 p-3 text-violet-700 transition group-hover:bg-violet-100">
                <FileText size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Track Submissions
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Check candidate progress
                </p>
              </div>

              <ArrowUpRight size={16} className="text-slate-400" />
            </Link>

            <Link
              to="/recruiter/vendors"
              className="group flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-amber-300 hover:bg-amber-50/40"
            >
              <div className="rounded-xl bg-amber-50 p-3 text-amber-700 transition group-hover:bg-amber-100">
                <Building2 size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  Manage Vendors
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  View vendor directory
                </p>
              </div>

              <ArrowUpRight size={16} className="text-slate-400" />
            </Link>
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
            <div className="rounded-lg bg-white p-2 text-slate-500 shadow-sm">
              <Clock3 size={17} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Stay on top of your submissions
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Review pending profiles and follow up on client feedback
                to keep your recruitment pipeline moving.
              </p>

              <Link
                to="/recruiter/submissions"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Review submissions
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
