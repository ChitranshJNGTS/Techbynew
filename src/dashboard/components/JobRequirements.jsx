
import { useEffect, useMemo, useState, useCallback } from "react";
import {
  Search,
  Plus,
  Eye,
  MapPin,
  X,
  BriefcaseBusiness,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LoaderCircle,
  Trash2,
} from "lucide-react";

import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

const emptyForm = {
  jobTitle: "",
  clientName: "",
  location: "",
  experienceMin: "",
  experienceMax: "",
  workMode: "Remote",
  employmentType: "Contract",
  jobType: "Contract",
  industry: "",
  category: "",
  requiredSkills: "",
  responsibilities: "",
  qualifications: "",
  requirements: "",
  benefits: "",
  jobDescription: "",
  payRate: "",
  rateType: "Hourly",
  currency: "USD",
  openings: 1,
  status: "Active",
  priority: "Medium",
};

const inputClass =
  "mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

function StatusBadge({ value }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Urgent: "bg-rose-50 text-rose-700",
    "On Hold": "bg-amber-50 text-amber-700",
    Closed: "bg-slate-100 text-slate-600",
    High: "bg-orange-50 text-orange-700",
    Medium: "bg-blue-50 text-blue-700",
    Low: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
        styles[value] || "bg-slate-100 text-slate-600"
      }`}
    >
      {value || "Active"}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Icon size={19} />
        </div>
      </div>

      <p className="text-3xl font-bold text-slate-900 mt-4">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    </div>
  );
}

function Field({ label, children, required = false }) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      {label}
      {required && <span className="text-rose-500 ml-1">*</span>}
      {children}
    </label>
  );
}

function getExperience(job) {
  const min = Number(job.experienceMin || 0);
  const max = Number(job.experienceMax || 0);

  if (min && max) return `${min}-${max} years`;
  if (min) return `${min}+ years`;
  if (max) return `Up to ${max} years`;

  return "Not specified";
}

function getDisplayStatus(job) {
  if (job.priority === "Urgent" && job.status === "Active") {
    return "Urgent";
  }

  return job.status;
}

export default function JobRequirements() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState("");
  const [deleting, setDeleting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -----------------------------------------
  // FIREBASE USER
  // -----------------------------------------

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
        (authError) => {
          unsubscribe();
          reject(authError);
        }
      );
    });
  };

  // -----------------------------------------
  // API HELPER
  // -----------------------------------------

  const apiRequest = useCallback(async (endpoint, options = {}) => {
    if (!API_URL) {
      throw new Error("VITE_API_URL is not configured.");
    }

    const user = await getFirebaseUser();
    const token = await user.getIdToken();

    const response = await fetch(`${API_URL}/recruiter${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const requestError = new Error(
        data.message || data.error || "Something went wrong."
      );

      requestError.status = response.status;
      requestError.code = data.code;

      throw requestError;
    }

    return data;
  }, []);

  // -----------------------------------------
  // FETCH JOBS
  // -----------------------------------------

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await apiRequest("/jobs?limit=100");

      setJobs(data.jobs || []);
    } catch (err) {
      console.error("Fetch jobs error:", err);
      setError(err.message || "Unable to load job requirements.");
    } finally {
      setLoading(false);
    }
  }, [apiRequest]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // -----------------------------------------
  // SEARCH AND FILTER
  // -----------------------------------------

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const searchableText = [
        job.jobTitle,
        job.clientName,
        job.location,
        job._id,
        ...(job.requiredSkills || []),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase().trim()
      );

      let matchesFilter = true;

      if (filter === "Urgent") {
        matchesFilter = job.priority === "Urgent";
      } else if (filter !== "All") {
        matchesFilter = job.status === filter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [jobs, search, filter]);

  // -----------------------------------------
  // STATS
  // -----------------------------------------

  const activeCount = jobs.filter(
    (job) => job.status === "Active"
  ).length;

  const urgentCount = jobs.filter(
    (job) => job.priority === "Urgent"
  ).length;

  // -----------------------------------------
  // FORM HANDLING
  // -----------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const closeCreateModal = () => {
    if (creating) return;

    setShowModal(false);
    setForm(emptyForm);
  };

  // -----------------------------------------
  // CREATE REQUIREMENT
  // -----------------------------------------

  const createJob = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      const minExperience = Number(form.experienceMin || 0);
      const maxExperience = Number(form.experienceMax || 0);

      if (
        minExperience < 0 ||
        maxExperience < 0 ||
        maxExperience < minExperience
      ) {
        setError("Please enter a valid experience range.");
        return;
      }

      const jobData = {
        jobTitle: form.jobTitle.trim(),
        clientName: form.clientName.trim(),
        location: form.location.trim(),
        experienceMin: minExperience,
        experienceMax: maxExperience,
        workMode: form.workMode,
        employmentType: form.employmentType,
        requiredSkills: form.requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        jobDescription: form.jobDescription.trim(),
        payRate: form.payRate ? Number(form.payRate) : null,
        rateType: form.rateType,
        currency: form.currency,
        openings: Number(form.openings || 1),
        status: form.status,
        priority: form.priority,
      };

      const data = await apiRequest("/jobs", {
        method: "POST",
        body: JSON.stringify(jobData),
      });

      setJobs((previous) => [
        { ...data.job, submissionCount: 0 },
        ...previous,
      ]);

      setSuccess("Requirement created successfully.");
      setForm(emptyForm);
      setShowModal(false);
    } catch (err) {
      console.error("Create job error:", err);
      setError(err.message || "Unable to create requirement.");
    } finally {
      setCreating(false);
    }
  };

  // -----------------------------------------
  // UPDATE REQUIREMENT STATUS
  // -----------------------------------------

  const handleStatusChange = async (job, newStatus) => {
    if (!newStatus || newStatus === job.status) return;

    try {
      setUpdatingStatus(job._id);
      setError("");
      setSuccess("");

      const data = await apiRequest(`/jobs/${job._id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });

      setJobs((previous) =>
        previous.map((item) =>
          item._id === job._id
            ? { ...data.job, submissionCount: item.submissionCount || 0 }
            : item
        )
      );

      setSelectedJob((previous) =>
        previous?._id === job._id
          ? {
              ...data.job,
              submissionCount: previous.submissionCount || 0,
            }
          : previous
      );

      setSuccess(`Requirement status changed to ${newStatus}.`);
    } catch (err) {
      console.error("Update status error:", err);
      setError(err.message || "Unable to update requirement status.");
    } finally {
      setUpdatingStatus("");
    }
  };

  // -----------------------------------------
  // DELETE REQUIREMENT
  // -----------------------------------------

  const handleDeleteJob = async () => {
    if (!selectedJob || deleting) return;

    if ((selectedJob.submissionCount || 0) > 0) {
      setError(
        "This requirement has candidate submissions. Close it instead of deleting it."
      );
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedJob.jobTitle}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      await apiRequest(`/jobs/${selectedJob._id}`, {
        method: "DELETE",
      });

      setJobs((previous) =>
        previous.filter((job) => job._id !== selectedJob._id)
      );

      setSelectedJob(null);
      setSuccess("Requirement deleted successfully.");
    } catch (err) {
      console.error("Delete job error:", err);
      setError(err.message || "Unable to delete requirement.");
    } finally {
      setDeleting(false);
    }
  };

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <div className="space-y-7">

      {/* PAGE HEADING */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-700 mb-1">
            Recruitment workspace
          </p>

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Job Requirements
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Create, organize and manage your active hiring requirements.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={fetchJobs}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={() => {
              setError("");
              setSuccess("");
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm"
          >
            <Plus size={17} />
            Create Requirement
          </button>
        </div>
      </div>

      {/* ALERTS */}

      {error && (
        <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-sm">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <span>{error}</span>

          <button
            onClick={() => setError("")}
            className="ml-auto shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 p-4 rounded-xl text-sm">
          <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
          <span>{success}</span>

          <button
            onClick={() => setSuccess("")}
            className="ml-auto shrink-0"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          icon={BriefcaseBusiness}
          label="Total Requirements"
          value={jobs.length}
          description="All listed requirements"
        />

        <StatCard
          icon={CheckCircle2}
          label="Active Requirements"
          value={activeCount}
          description="Open for candidate submissions"
        />

        <StatCard
          icon={AlertCircle}
          label="Urgent Requirements"
          value={urgentCount}
          description="Priority hiring requirements"
        />
      </div>

      {/* REQUIREMENTS TABLE */}

      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col lg:flex-row justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-900">
              All Requirements
            </h2>

            <p className="text-xs text-slate-500 mt-1">
              Review job details, update status and manage requirements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search requirements..."
                className="w-full sm:w-64 pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-emerald-500"
            >
              {["All", "Active", "Urgent", "On Hold", "Closed"].map(
                (status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {[
                  "Requirement",
                  "Client",
                  "Location",
                  "Experience",
                  "Submissions",
                  "Status",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-left px-5 py-4 font-semibold"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-14">
                    <div className="flex justify-center items-center gap-2 text-slate-500">
                      <LoaderCircle className="animate-spin" size={19} />
                      Loading requirements...
                    </div>
                  </td>
                </tr>
              ) : filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="hover:bg-slate-50/80 transition"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {job.jobTitle}
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        {job._id?.slice(-8).toUpperCase()} · {job.workMode}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {job.clientName || "Confidential Client"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {getExperience(job)}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {job.submissionCount || 0}
                    </td>

                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        <StatusBadge value={getDisplayStatus(job)} />

                        <select
                          value={job.status || "Active"}
                          disabled={updatingStatus === job._id}
                          onChange={(e) =>
                            handleStatusChange(job, e.target.value)
                          }
                          className="block w-28 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500 disabled:opacity-50"
                        >
                          <option value="Active">Active</option>
                          <option value="On Hold">On Hold</option>
                          <option value="Closed">Closed</option>
                        </select>

                        {updatingStatus === job._id && (
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <LoaderCircle
                              size={12}
                              className="animate-spin"
                            />
                            Updating...
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => {
                          setError("");
                          setSelectedJob(job);
                        }}
                        className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5"
                      >
                        <Eye size={15} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-14 text-slate-500"
                  >
                    <BriefcaseBusiness
                      size={32}
                      className="mx-auto mb-3 text-slate-300"
                    />

                    <p className="font-semibold text-slate-700">
                      No requirements found
                    </p>

                    <p className="text-xs mt-1">
                      Create your first requirement to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filteredJobs.length} of {jobs.length} requirements
        </div>
      </section>

      {/* CREATE REQUIREMENT MODAL */}

      {showModal && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4">
          <form
            onSubmit={createJob}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 z-10 bg-white p-5 sm:p-6 border-b border-slate-200 flex justify-between">
              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  Create Requirement
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Add a new job opening to your workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCreateModal}
                disabled={creating}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Job Title" required>
                  <input
                    required
                    name="jobTitle"
                    value={form.jobTitle}
                    onChange={handleChange}
                    placeholder="Senior Databricks Engineer"
                    className={inputClass}
                  />
                </Field>

                <Field label="Client Name">
                  <input
                    name="clientName"
                    value={form.clientName}
                    onChange={handleChange}
                    placeholder="State Street"
                    className={inputClass}
                  />
                </Field>

                <Field label="Location" required>
                  <input
                    required
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Boston, MA"
                    className={inputClass}
                  />
                </Field>

                <Field label="Work Mode">
                  <select
                    name="workMode"
                    value={form.workMode}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Onsite">On-site</option>
                  </select>
                </Field>

                <Field label="Minimum Experience (Years)">
                  <input
                    type="number"
                    min="0"
                    name="experienceMin"
                    value={form.experienceMin}
                    onChange={handleChange}
                    placeholder="5"
                    className={inputClass}
                  />
                </Field>

                <Field label="Maximum Experience (Years)">
                  <input
                    type="number"
                    min="0"
                    name="experienceMax"
                    value={form.experienceMax}
                    onChange={handleChange}
                    placeholder="10"
                    className={inputClass}
                  />
                </Field>

                <Field label="Employment Type">
                  <select
                    name="employmentType"
                    value={form.employmentType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Contract">Contract</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract-to-Hire">
                      Contract-to-Hire
                    </option>
                  </select>
                </Field>

                <Field label="Number of Openings">
                  <input
                    type="number"
                    min="1"
                    name="openings"
                    value={form.openings}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </Field>

                <Field label="Pay Rate">
                  <input
                    type="number"
                    min="0"
                    name="payRate"
                    value={form.payRate}
                    onChange={handleChange}
                    placeholder="52"
                    className={inputClass}
                  />
                </Field>

                <Field label="Rate Type">
                  <select
                    name="rateType"
                    value={form.rateType}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Hourly">Hourly</option>
                    <option value="Annual">Annual</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </Field>

                <Field label="Requirement Status">
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Active">Active</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Closed">Closed</option>
                  </select>
                </Field>

                <Field label="Hiring Priority">
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </Field>
              </div>

              <Field label="Required Skills">
                <input
                  name="requiredSkills"
                  value={form.requiredSkills}
                  onChange={handleChange}
                  placeholder="Databricks, PySpark, Python, SQL, Azure"
                  className={inputClass}
                />
                <p className="text-xs text-slate-400 mt-1">
                  Separate skills with commas.
                </p>
              </Field>

              <Field label="Job Description" required>
                <textarea
                  required
                  name="jobDescription"
                  value={form.jobDescription}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the job responsibilities, technical requirements and candidate expectations..."
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            {error && (
              <div className="mx-5 sm:mx-6 mb-3 text-sm text-rose-600 bg-rose-50 border border-rose-200 p-3 rounded-xl">
                {error}
              </div>
            )}

            <div className="sticky bottom-0 bg-white p-5 sm:p-6 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={closeCreateModal}
                disabled={creating}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={creating}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold disabled:opacity-60"
              >
                {creating && (
                  <LoaderCircle size={16} className="animate-spin" />
                )}

                {creating ? "Creating..." : "Create Requirement"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* REQUIREMENT DETAILS MODAL */}

      {selectedJob && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-5 border-b border-slate-200 flex justify-between">
              <div>
                <p className="text-xs text-emerald-700 font-semibold">
                  REQUIREMENT #{selectedJob._id?.slice(-8).toUpperCase()}
                </p>

                <h2 className="font-bold text-lg text-slate-900 mt-1">
                  {selectedJob.jobTitle}
                </h2>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm">
              {[
                ["Client", selectedJob.clientName || "Confidential Client"],
                ["Location", selectedJob.location],
                ["Experience", getExperience(selectedJob)],
                ["Work Mode", selectedJob.workMode],
                ["Employment Type", selectedJob.employmentType],
                ["Openings", selectedJob.openings],
                [
                  "Pay Rate",
                  selectedJob.payRate
                    ? `${selectedJob.currency || "USD"} ${selectedJob.payRate} / ${selectedJob.rateType || "Hourly"}`
                    : "Not specified",
                ],
                ["Submissions", selectedJob.submissionCount || 0],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-4"
                >
                  <span className="text-slate-500">{label}</span>

                  <span className="font-semibold text-slate-800 text-right">
                    {value}
                  </span>
                </div>
              ))}

              <div className="border-t border-slate-100 pt-4">
                <p className="text-slate-500 mb-2">Required Skills</p>

                <div className="flex flex-wrap gap-2">
                  {(selectedJob.requiredSkills || []).length > 0 ? (
                    selectedJob.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400">
                      No skills specified
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-slate-500 mb-2">Job Description</p>

                <p className="text-slate-700 whitespace-pre-wrap leading-6">
                  {selectedJob.jobDescription || "No description provided."}
                </p>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 pt-4">
                <span className="text-slate-500">Status</span>
                <StatusBadge value={getDisplayStatus(selectedJob)} />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleDeleteJob}
                  disabled={
                    deleting ||
                    (selectedJob.submissionCount || 0) > 0
                  }
                  title={
                    (selectedJob.submissionCount || 0) > 0
                      ? "Cannot delete a requirement with candidate submissions"
                      : "Delete requirement"
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 font-semibold text-rose-600 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {deleting ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <Trash2 size={17} />
                  )}

                  {deleting ? "Deleting..." : "Delete Requirement"}
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  disabled={deleting}
                  className="flex-1 rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  Close Details
                </button>
              </div>

              {(selectedJob.submissionCount || 0) > 0 && (
                <p className="text-xs text-amber-600">
                  This requirement has candidate submissions and cannot be
                  deleted. You can change its status to Closed instead.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
