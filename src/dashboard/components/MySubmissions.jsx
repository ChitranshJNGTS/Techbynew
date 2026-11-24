
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Download,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  BriefcaseBusiness,
  Users,
  Clock3,
  CheckCircle2,
  Eye,
  X,
  FileText,
  MapPin,
  Building2,
  UserRound,
  RefreshCw,
  SlidersHorizontal,
  Mail,
  Phone,
  CircleAlert,
} from "lucide-react";

import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL;

// TEMPORARY: verify this route when we review your recruiter routes file.
const JOBS_API_PATH = "/recruiter/jobs";

const statuses = [
  "Submitted",
  "Under Review",
  "Submitted to Client",
  "Interview Scheduled",
  "Selected",
  "Rejected",
  "Backup",
];

const statusStyles = {
  Submitted: "bg-blue-50 text-blue-700 ring-blue-200",
  "Under Review": "bg-amber-50 text-amber-700 ring-amber-200",
  "Submitted to Client": "bg-indigo-50 text-indigo-700 ring-indigo-200",
  "Interview Scheduled": "bg-violet-50 text-violet-700 ring-violet-200",
  Selected: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Rejected: "bg-red-50 text-red-700 ring-red-200",
  Backup: "bg-orange-50 text-orange-700 ring-orange-200",
};

const candidateSources = [
  "Self Sourced",
  "Vendor",
  "Referral",
  "Other",
];

const visaStatuses = [
  "Not Specified",
  "US Citizen",
  "Green Card",
  "H1B",
  "H4 EAD",
  "L2 EAD",
  "OPT",
  "CPT",
  "Other",
];

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getId = (value) => {
  if (!value) return "";

  if (typeof value === "object") {
    return value._id || value.id || "";
  }

  return value;
};

const getCandidate = (item) => {
  return typeof item.candidateId === "object" && item.candidateId
    ? item.candidateId
    : {};
};

const getJob = (item) => {
  return typeof item.jobId === "object" && item.jobId
    ? item.jobId
    : {};
};

const mapSubmission = (item) => {
  const candidate = getCandidate(item);
  const job = getJob(item);

  const experience =
    candidate.experience !== undefined &&
    candidate.experience !== null &&
    candidate.experience !== ""
      ? `${candidate.experience} Years`
      : "—";

  return {
    id: item._id || item.id || "",
    candidate: candidate.name || "—",
    email: candidate.email || "—",
    phone: candidate.phone || "—",
    currentRole: candidate.currentRole || "—",
    currentCompany: candidate.currentCompany || "—",
    visaStatus: candidate.visaStatus || "Not Specified",

    position: job.jobTitle || "—",
    jobId: getId(item.jobId) || "—",
    client: job.clientName || "—",
    location: job.location || candidate.location || "—",
    experience,

    skills: Array.isArray(candidate.skills) ? candidate.skills : [],

    rate:
      job.payRate !== undefined && job.payRate !== null
        ? `${job.currency || ""} ${job.payRate} ${job.rateType || ""}`.trim()
        : "—",

    workMode: job.workMode || "—",
    employment: job.employmentType || "—",

    status: item.status || "Submitted",
    source: candidate.source || "Self Sourced",
    vendor: item.vendorName || candidate.vendorName || "—",
    vendorEmail: item.vendorEmail || candidate.vendorEmail || "",

    submittedOn: item.submittedAt || item.createdAt || "",
    updatedOn: item.updatedAt || "",

    resumeUrl: candidate.resumeUrl || "",
    resume: candidate.resumeUrl ? "Open resume" : "Resume not attached",
    linkedinUrl: candidate.linkedinUrl || "",

    notes: item.recruiterNotes || "",
    feedback: item.feedback || "",

    history: (item.statusHistory || []).map((entry) => ({
      status: entry.status,
      date: entry.changedAt || "",
      note: entry.note || "",
    })),
  };
};

// Wait until Firebase restores the authentication session.
const getFirebaseUser = () => {
  return new Promise((resolve, reject) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    let unsubscribe = () => {};

    unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        unsubscribe();

        if (user) {
          resolve(user);
        } else {
          reject(
            new Error("Your session has expired. Please log in again.")
          );
        }
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};

// General authenticated API request.
async function authenticatedApi(path, options = {}) {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured.");
  }

  const user = await getFirebaseUser();
  const token = await user.getIdToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message ||
        result.error ||
        `Request failed with status ${response.status}.`
    );
  }

  return result;
}

// Keep submissions requests on the existing endpoint.
async function recruiterApi(endpoint = "", options = {}) {
  return authenticatedApi(`/recruiter/submissions${endpoint}`, options);
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        statusStyles[status] ||
        "bg-slate-100 text-slate-600 ring-slate-200"
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>

        <div className={`rounded-xl p-3 ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}

// SUBMISSION DETAILS MODAL
function SubmissionModal({
  submission,
  onClose,
  onStatusChange,
  saving,
}) {
  const [newStatus, setNewStatus] = useState(submission.status);
  const [note, setNote] = useState("");

  const updateStatus = async () => {
    await onStatusChange(submission.id, newStatus, note);
    setNote("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Submission Details
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {submission.id}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                {submission.candidate}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {submission.position}
              </p>

              <div className="mt-3">
                <StatusBadge status={submission.status} />
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 px-4 py-3">
              <p className="text-xs text-slate-500">Submitted on</p>
              <p className="mt-1 text-sm font-semibold text-slate-800">
                {formatDate(submission.submittedOn)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Mail, label: "Email", value: submission.email },
              { icon: Phone, label: "Phone", value: submission.phone },
              { icon: Building2, label: "Client", value: submission.client },
              {
                icon: BriefcaseBusiness,
                label: "Job ID",
                value: submission.jobId,
              },
              { icon: MapPin, label: "Location", value: submission.location },
              {
                icon: UserRound,
                label: "Experience",
                value: submission.experience,
              },
              {
                icon: BriefcaseBusiness,
                label: "Current Role",
                value: submission.currentRole,
              },
              {
                icon: Building2,
                label: "Current Company",
                value: submission.currentCompany,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-200 p-3"
              >
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <item.icon size={14} />
                  {item.label}
                </div>

                <p className="mt-1.5 break-words text-sm font-semibold text-slate-800">
                  {item.value || "—"}
                </p>
              </div>
            ))}
          </div>

          <div>
            <h4 className="mb-3 text-sm font-bold text-slate-900">
              Job & submission information
            </h4>

            <div className="grid gap-4 rounded-xl border border-slate-200 p-4 sm:grid-cols-2">
              {[
                ["Expected rate", submission.rate],
                ["Work arrangement", submission.workMode],
                ["Employment type", submission.employment],
                ["Submission source", submission.source],
                ["Vendor", submission.vendor],
                ["Vendor Email", submission.vendorEmail || "—"],
                ["Visa Status", submission.visaStatus],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                    {value || "—"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-bold text-slate-900">
              Skills
            </h4>

            <div className="flex flex-wrap gap-2">
              {submission.skills.length ? (
                submission.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-xs text-slate-400">
                  No skills available.
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-bold text-slate-900">
              Resume
            </h4>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <div className="rounded-lg bg-red-50 p-2 text-red-600">
                <FileText size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                  {submission.resume}
                </p>
                <p className="text-xs text-slate-500">Resume attachment</p>
              </div>

              {submission.resumeUrl && (
                <a
                  href={submission.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-emerald-700"
                >
                  Open
                </a>
              )}
            </div>
          </div>

          {submission.linkedinUrl && (
            <div>
              <a
                href={submission.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                Open LinkedIn Profile
              </a>
            </div>
          )}

          {submission.notes && (
            <div>
              <h4 className="mb-2 text-sm font-bold text-slate-900">
                Recruiter Notes
              </h4>
              <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                {submission.notes}
              </p>
            </div>
          )}

          {submission.feedback && (
            <div>
              <h4 className="mb-2 text-sm font-bold text-slate-900">
                Feedback
              </h4>
              <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
                {submission.feedback}
              </p>
            </div>
          )}

          <div>
            <h4 className="mb-2 text-sm font-bold text-slate-900">
              Status History
            </h4>

            <div className="space-y-4 border-l-2 border-slate-200 pl-4">
              {submission.history.map((item, index) => (
                <div key={index} className="relative">
                  <span className="absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 ring-1 ring-emerald-200" />

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-800">
                      {item.status}
                    </p>

                    <span className="text-xs text-slate-400">
                      {formatDate(item.date)}
                    </span>
                  </div>

                  {item.note && (
                    <p className="mt-1 text-xs text-slate-500">
                      {item.note}
                    </p>
                  )}
                </div>
              ))}

              {!submission.history.length && (
                <p className="text-xs text-slate-400">
                  No status history available.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="text-sm font-bold text-slate-900">
              Update Submission Status
            </h4>

            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
              >
                {statuses.map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>

              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add an update note (optional)"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="button"
              onClick={updateStatus}
              disabled={
                saving ||
                (newStatus === submission.status && !note.trim())
              }
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RefreshCw
                size={15}
                className={saving ? "animate-spin" : ""}
              />
              {saving ? "Saving..." : "Save Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ADD SUBMISSION MODAL
function AddSubmissionModal({
  jobs,
  jobsLoading,
  jobsError,
  onReloadJobs,
  onClose,
  onAdd,
  saving,
}) {
  const [form, setForm] = useState({
    jobId: "",
    name: "",
    email: "",
    phone: "",
    currentRole: "",
    currentCompany: "",
    experience: "",
    skills: "",
    location: "",
    visaStatus: "Not Specified",
    linkedinUrl: "",
    resumeUrl: "",
    source: "Self Sourced",
    vendorName: "",
    vendorEmail: "",
    recruiterNotes: "",
  });

  const [formError, setFormError] = useState("");

  const activeJobs = useMemo(
    () => jobs.filter((job) => job.status === "Active"),
    [jobs]
  );

  const selectedJob = activeJobs.find(
    (job) => String(job._id) === String(form.jobId)
  );

  const update = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!form.jobId) {
      setFormError("Please select an active job requirement.");
      return;
    }

    if (!form.name.trim()) {
      setFormError("Candidate name is required.");
      return;
    }

    if (!form.email.trim() && !form.phone.trim()) {
      setFormError("Please provide candidate email or phone number.");
      return;
    }

    const experience = Number(form.experience || 0);

    if (!Number.isFinite(experience) || experience < 0) {
      setFormError("Please enter valid candidate experience.");
      return;
    }

    if (form.source === "Vendor" && !form.vendorName.trim()) {
      setFormError("Please enter the vendor name.");
      return;
    }

    try {
      await onAdd({
        jobId: form.jobId,

        candidate: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          currentRole: form.currentRole.trim(),
          currentCompany: form.currentCompany.trim(),
          experience,
          skills: form.skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
          location: form.location.trim(),
          visaStatus: form.visaStatus,
          linkedinUrl: form.linkedinUrl.trim(),
          resumeUrl: form.resumeUrl.trim(),
          source: form.source,
          vendorName: form.vendorName.trim(),
          vendorEmail: form.vendorEmail.trim(),
        },

        vendorName:
          form.source === "Vendor" ? form.vendorName.trim() : "",
        vendorEmail:
          form.source === "Vendor" ? form.vendorEmail.trim() : "",
        recruiterNotes: form.recruiterNotes.trim(),
      });
    } catch (error) {
      setFormError(error.message || "Unable to submit candidate.");
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  const labelClass =
    "mb-1.5 block text-xs font-semibold text-slate-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Add Candidate Submission
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Select one of your existing jobs and add candidate details.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 overflow-y-auto p-6"
        >
          {/* JOB SELECTION */}
          <section>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-900">
                Select Existing Job
              </h3>

              <button
                type="button"
                onClick={onReloadJobs}
                disabled={jobsLoading}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 disabled:opacity-50"
              >
                <RefreshCw
                  size={13}
                  className={jobsLoading ? "animate-spin" : ""}
                />
                Refresh Jobs
              </button>
            </div>

            {jobsError && (
              <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {jobsError}
              </div>
            )}

            <label className={labelClass}>Job Requirement *</label>

            <select
              required
              value={form.jobId}
              onChange={(e) => update("jobId", e.target.value)}
              className={fieldClass}
              disabled={jobsLoading}
            >
              <option value="">
                {jobsLoading ? "Loading jobs..." : "Select an active job"}
              </option>

              {activeJobs.map((job) => (
                <option key={job._id} value={job._id}>
                  {job.jobTitle || "Untitled Job"} —{" "}
                  {job.clientName || "No Client"}
                  {job.location ? ` — ${job.location}` : ""}
                </option>
              ))}
            </select>

            {!jobsLoading && !activeJobs.length && (
              <p className="mt-2 text-xs text-amber-700">
                No active jobs found. Create or activate a job in Job
                Requirements first.
              </p>
            )}

            {selectedJob && (
              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-white p-2 text-emerald-700">
                    <BriefcaseBusiness size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-900">
                      {selectedJob.jobTitle}
                    </p>

                    <div className="mt-2 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                      <p>
                        <strong>Client:</strong>{" "}
                        {selectedJob.clientName || "—"}
                      </p>
                      <p>
                        <strong>Location:</strong>{" "}
                        {selectedJob.location || "—"}
                      </p>
                      <p>
                        <strong>Work Mode:</strong>{" "}
                        {selectedJob.workMode || "—"}
                      </p>
                      <p>
                        <strong>Employment:</strong>{" "}
                        {selectedJob.employmentType || "—"}
                      </p>
                      <p>
                        <strong>Rate:</strong>{" "}
                        {selectedJob.payRate
                          ? `${selectedJob.currency || ""} ${selectedJob.payRate} ${selectedJob.rateType || ""}`
                          : "—"}
                      </p>
                    </div>

                    {Array.isArray(selectedJob.requiredSkills) &&
                      selectedJob.requiredSkills.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {selectedJob.requiredSkills.map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                              className="rounded-md bg-white px-2 py-1 text-xs text-slate-600"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* CANDIDATE DETAILS */}
          <section>
            <h3 className="mb-3 text-sm font-bold text-slate-900">
              Candidate Information
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Candidate Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Full name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="candidate@email.com"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Phone</label>
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="Phone number"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Experience (Years)</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  placeholder="e.g. 7"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Current Role</label>
                <input
                  value={form.currentRole}
                  onChange={(e) => update("currentRole", e.target.value)}
                  placeholder="e.g. Senior Java Developer"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Current Company</label>
                <input
                  value={form.currentCompany}
                  onChange={(e) => update("currentCompany", e.target.value)}
                  placeholder="Company name"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="City, State"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Visa Status</label>
                <select
                  value={form.visaStatus}
                  onChange={(e) => update("visaStatus", e.target.value)}
                  className={fieldClass}
                >
                  {visaStatuses.map((visa) => (
                    <option key={visa} value={visa}>
                      {visa}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>
                  Skills (comma separated)
                </label>
                <input
                  value={form.skills}
                  onChange={(e) => update("skills", e.target.value)}
                  placeholder="React, Node.js, MongoDB, AWS"
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={form.linkedinUrl}
                  onChange={(e) => update("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className={fieldClass}
                />
              </div>

              <div>
                <label className={labelClass}>Resume URL</label>
                <input
                  type="url"
                  value={form.resumeUrl}
                  onChange={(e) => update("resumeUrl", e.target.value)}
                  placeholder="Paste resume link"
                  className={fieldClass}
                />
              </div>
            </div>
          </section>

          {/* SOURCE AND VENDOR */}
          <section>
            <h3 className="mb-3 text-sm font-bold text-slate-900">
              Submission Details
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>Candidate Source</label>
                <select
                  value={form.source}
                  onChange={(e) => update("source", e.target.value)}
                  className={fieldClass}
                >
                  {candidateSources.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              {form.source === "Vendor" && (
                <>
                  <div>
                    <label className={labelClass}>Vendor Name *</label>
                    <input
                      required
                      value={form.vendorName}
                      onChange={(e) => update("vendorName", e.target.value)}
                      placeholder="Vendor/company name"
                      className={fieldClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className={labelClass}>Vendor Email</label>
                    <input
                      type="email"
                      value={form.vendorEmail}
                      onChange={(e) => update("vendorEmail", e.target.value)}
                      placeholder="vendor@company.com"
                      className={fieldClass}
                    />
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label className={labelClass}>Recruiter Notes</label>
                <textarea
                  rows={3}
                  value={form.recruiterNotes}
                  onChange={(e) =>
                    update("recruiterNotes", e.target.value)
                  }
                  placeholder="Add internal notes about this submission..."
                  className={fieldClass}
                />
              </div>
            </div>
          </section>

          {formError && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {formError}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || jobsLoading || !activeJobs.length}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={16} />
              {saving ? "Submitting..." : "Submit Candidate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// MAIN PAGE
export default function MySubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [dateFilter, setDateFilter] = useState("All Time");

  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const [loading, setLoading] = useState(true);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [apiError, setApiError] = useState("");
  const [jobsError, setJobsError] = useState("");

  // LOAD SUBMISSIONS
  const loadSubmissions = async () => {
    try {
      setLoading(true);
      setApiError("");

      const result = await recruiterApi("");

      const records = Array.isArray(result)
        ? result
        : result.submissions || result.data || [];

      setSubmissions(records.map(mapSubmission));
    } catch (error) {
      console.error("Load submissions error:", error);
      setApiError(error.message || "Unable to load submissions.");
    } finally {
      setLoading(false);
    }
  };

  // LOAD EXISTING JOB REQUIREMENTS
  const loadJobs = async () => {
    try {
      setJobsLoading(true);
      setJobsError("");

      const result = await authenticatedApi(JOBS_API_PATH);

      const records = Array.isArray(result)
        ? result
        : result.jobs || result.data || [];

      setJobs(records);
    } catch (error) {
      console.error("Load jobs error:", error);
      setJobsError(error.message || "Unable to load your job requirements.");
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  // OPEN ADD SUBMISSION MODAL
  const openAddSubmission = async () => {
    setShowAdd(true);
    await loadJobs();
  };

  // FILTERS
  const filteredSubmissions = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return submissions.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch = [
        item.candidate,
        item.position,
        item.client,
        item.id,
        item.jobId,
        item.vendor,
        item.email,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        item.status === statusFilter;

      const matchesSource =
        sourceFilter === "All Sources" ||
        item.source === sourceFilter;

      let matchesDate = true;

      if (dateFilter !== "All Time") {
        const submitted = new Date(item.submittedOn);

        if (Number.isNaN(submitted.getTime())) {
          matchesDate = false;
        } else {
          const days = dateFilter === "Last 7 Days" ? 7 : 30;
          const diff = (now - submitted) / (1000 * 60 * 60 * 24);

          matchesDate = diff >= 0 && diff <= days;
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesDate
      );
    });
  }, [submissions, search, statusFilter, sourceFilter, dateFilter]);

  // STATISTICS
  const stats = useMemo(
    () => ({
      total: submissions.length,

      review: submissions.filter((item) =>
        ["Under Review", "Submitted to Client"].includes(item.status)
      ).length,

      interviews: submissions.filter(
        (item) => item.status === "Interview Scheduled"
      ).length,

      selected: submissions.filter(
        (item) => item.status === "Selected"
      ).length,
    }),
    [submissions]
  );

  // UPDATE STATUS
  const updateStatus = async (id, status, note = "") => {
    try {
      setSaving(true);
      setApiError("");

      await recruiterApi(`/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status, note }),
      });

      await loadSubmissions();

      setSelected((previous) => {
        if (!previous) return null;

        return {
          ...previous,
          status,
        };
      });
    } catch (error) {
      console.error("Update status error:", error);
      setApiError(error.message || "Unable to update submission.");
    } finally {
      setSaving(false);
    }
  };

  // CREATE SUBMISSION
  const addSubmission = async (payload) => {
    try {
      setSaving(true);
      setApiError("");

      await recruiterApi("", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setShowAdd(false);
      await loadSubmissions();
    } catch (error) {
      console.error("Create submission error:", error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  // EXPORT CSV
  const exportCSV = () => {
    const headers = [
      "Submission ID",
      "Candidate",
      "Email",
      "Phone",
      "Position",
      "Job ID",
      "Client",
      "Location",
      "Experience",
      "Status",
      "Source",
      "Vendor",
      "Submitted On",
      "Last Updated",
    ];

    const rows = filteredSubmissions.map((item) => [
      item.id,
      item.candidate,
      item.email,
      item.phone,
      item.position,
      item.jobId,
      item.client,
      item.location,
      item.experience,
      item.status,
      item.source,
      item.vendor,
      item.submittedOn,
      item.updatedOn,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "techby-my-submissions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All Statuses");
    setSourceFilter("All Sources");
    setDateFilter("All Time");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* PAGE HEADING */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
              <span>Recruiter Workspace</span>
              <ChevronRight size={13} />
              <span className="text-slate-600">My Submissions</span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Submissions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage candidate submissions and track their progress with clients.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={exportCSV}
              disabled={!filteredSubmissions.length}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-40"
            >
              <Download size={16} />
              Export
            </button>

            <button
              type="button"
              onClick={openAddSubmission}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Plus size={17} />
              Add Submission
            </button>
          </div>
        </div>

        {/* ERROR */}
        {apiError && (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{apiError}</span>

            <button
              type="button"
              onClick={loadSubmissions}
              className="shrink-0 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <RefreshCw className="mx-auto h-7 w-7 animate-spin text-emerald-600" />
            <p className="mt-3 text-sm font-medium text-slate-600">
              Loading your submissions...
            </p>
          </div>
        )}

        {!loading && (
          <>
            {/* STATS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                title="Total Submissions"
                value={stats.total}
                subtitle="All candidate submissions"
                icon={Users}
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
              />

              <StatCard
                title="Under Review"
                value={stats.review}
                subtitle="Waiting for client feedback"
                icon={Clock3}
                iconBg="bg-amber-50"
                iconColor="text-amber-600"
              />

              <StatCard
                title="Interviews"
                value={stats.interviews}
                subtitle="Interview stage candidates"
                icon={CalendarDays}
                iconBg="bg-violet-50"
                iconColor="text-violet-600"
              />

              <StatCard
                title="Selected"
                value={stats.selected}
                subtitle="Candidates selected by clients"
                icon={CheckCircle2}
                iconBg="bg-emerald-50"
                iconColor="text-emerald-600"
              />
            </div>

            {/* PIPELINE */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Submission Pipeline
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Current status of your candidate submissions
                  </p>
                </div>

                <span className="text-xs font-medium text-slate-500">
                  {submissions.length} total records
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
                {statuses.map((status) => {
                  const count = submissions.filter(
                    (item) => item.status === status
                  ).length;

                  return (
                    <button
                      type="button"
                      key={status}
                      onClick={() =>
                        setStatusFilter(
                          statusFilter === status ? "All Statuses" : status
                        )
                      }
                      className={`rounded-xl border p-3 text-left transition ${
                        statusFilter === status
                          ? "border-emerald-400 bg-emerald-50"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-2xl font-bold text-slate-900">
                        {count}
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {status}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">
                <div>
                  <h2 className="font-bold text-slate-900">
                    All Submissions
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    View and manage your candidate submission records.
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative min-w-0 sm:w-72">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search candidate, job, client..."
                      className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFilters(!showFilters)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-semibold ${
                      showFilters
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : "border-slate-300 text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* FILTERS */}
              {showFilters && (
                <div className="grid gap-3 border-b border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Submission status
                    </label>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
                    >
                      <option>All Statuses</option>
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Submission source
                    </label>

                    <select
                      value={sourceFilter}
                      onChange={(e) => setSourceFilter(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
                    >
                      <option>All Sources</option>
                      {candidateSources.map((source) => (
                        <option key={source}>{source}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                      Submission date
                    </label>

                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
                    >
                      <option>All Time</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3">
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      Clear all filters
                    </button>
                  </div>
                </div>
              )}

              {/* SUBMISSION ROWS */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left">
                  <thead className="bg-slate-50">
                    <tr className="border-b border-slate-200">
                      {[
                        "Candidate",
                        "Job / Client",
                        "Source",
                        "Submitted On",
                        "Last Updated",
                        "Status",
                        "Action",
                      ].map((heading) => (
                        <th
                          key={heading}
                          className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredSubmissions.map((item) => (
                      <tr
                        key={item.id}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-700">
                              {item.candidate
                                .split(" ")
                                .map((part) => part[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {item.candidate}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-500">
                                {item.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <p className="max-w-[260px] truncate text-sm font-semibold text-slate-800">
                            {item.position}
                          </p>

                          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                            <Building2 size={12} />
                            {item.client}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                              item.source === "Vendor"
                                ? "bg-indigo-50 text-indigo-700"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.source}
                          </span>

                          {item.source === "Vendor" && (
                            <p className="mt-1.5 text-xs text-slate-500">
                              {item.vendor}
                            </p>
                          )}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(item.submittedOn)}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {formatDate(item.updatedOn)}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={item.status} />
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelected(item)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                          >
                            <Eye size={14} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {!filteredSubmissions.length && (
                  <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                    <div className="rounded-2xl bg-slate-100 p-4 text-slate-400">
                      <FileText size={28} />
                    </div>

                    <h3 className="mt-4 text-base font-bold text-slate-900">
                      No submissions found
                    </h3>

                    <p className="mt-1 max-w-sm text-sm text-slate-500">
                      Try changing your search or filters, or add a new submission.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-4 text-sm font-semibold text-emerald-700"
                    >
                      Reset filters
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between gap-2 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:items-center">
                <p className="text-xs text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-800">
                    {filteredSubmissions.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-800">
                    {submissions.length}
                  </span>{" "}
                  submissions
                </p>

                <button
                  type="button"
                  onClick={loadSubmissions}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700"
                >
                  <RefreshCw size={13} />
                  Refresh records
                </button>
              </div>
            </div>

            {/* INFO */}
            <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
              <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Submission tracking
                </p>

                <p className="mt-1 text-xs leading-5 text-blue-800">
                  Candidate details and submission status are saved under your
                  recruiter account. You can track each candidate's progress
                  from this page.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* DETAILS MODAL */}
      {selected && (
        <SubmissionModal
          submission={
            submissions.find((item) => item.id === selected.id) || selected
          }
          onClose={() => setSelected(null)}
          onStatusChange={updateStatus}
          saving={saving}
        />
      )}

      {/* ADD SUBMISSION MODAL */}
      {showAdd && (
        <AddSubmissionModal
          jobs={jobs}
          jobsLoading={jobsLoading}
          jobsError={jobsError}
          onReloadJobs={loadJobs}
          onClose={() => setShowAdd(false)}
          onAdd={addSubmission}
          saving={saving}
        />
      )}
    </div>
  );
}
