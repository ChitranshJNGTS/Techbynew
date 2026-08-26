
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
  FaArrowRight,
  FaBuilding,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaLaptopHouse,
  FaBolt,
  FaShareAlt,
} from "react-icons/fa";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api/JobApi";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function JobDescription() {
  const { slug } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    getJob();
  }, [slug]);

  const getJob = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/jobs/slug/${slug}`);

      if (data.success) {
        setJob(data.job);
      } else {
        setError("Job not found.");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

const applyJob = () => {
  if (job?.applyLink) {
    window.open(job.applyLink, "_blank", "noopener,noreferrer");
  } else {
    toast.error("Application link is not available.");
  }
};

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
          <div className="text-center">
            <div className="w-14 h-14 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin mx-auto"></div>

            <h1 className="text-white text-xl font-semibold mt-6">
              Loading Job...
            </h1>

            <p className="text-slate-500 mt-2">
              Please wait while we fetch the job details.
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <FaBriefcase className="text-red-400 text-3xl" />
            </div>

            <h1 className="text-white text-3xl font-bold mt-6">
              Job Not Found
            </h1>

            <p className="text-slate-400 mt-3">
              {error || "This job may have been removed or is no longer available."}
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

const shareJob = async () => {
  try {
    const shareUrl =
      `${window.location.origin}/share/job/${job._id}`;

    const shareData = {
      title: `${job.jobTitle} - ${job.companyName}`,

      text:
        `${job.jobTitle} at ${job.companyName}\n\n` +
        `${job.jobSummary || "Check out this job opportunity."}\n\n` +
        `📍 ${job.city}, ${job.state}\n` +
        `💼 ${job.experience}\n` +
        `💰 ₹${job.salaryMin?.toLocaleString()} - ₹${job.salaryMax?.toLocaleString()}`,

      url: shareUrl,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareUrl);

      toast.success("Job share link copied!");
    }

  } catch (error) {

    if (error.name !== "AbortError") {
      console.error("Share error:", error);
      toast.error("Unable to share job.");
    }

  }
};
  return (
    <>
      <Navbar />

      <main className="bg-slate-950 min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/5 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 relative">
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
              <span>Jobs</span>
              <FaArrowRight className="text-[10px]" />
              <span className="text-slate-300">{job.jobTitle}</span>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex gap-5 sm:gap-7">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white border border-slate-700 p-3 shrink-0 flex items-center justify-center">
                    <img
                      src={
                        job.companyLogo ||
                        "https://via.placeholder.com/120"
                      }
                      alt={job.companyName}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        {job.employmentType}
                      </span>

                      <span className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                        {job.workMode}
                      </span>

                      {job.featured && (
                        <span className="px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
                          Featured
                        </span>
                      )}

                      {job.urgentHiring && (
                        <span className="px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-1.5">
                          <FaBolt />
                          Urgent Hiring
                        </span>
                      )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                      {job.jobTitle}
                    </h1>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-emerald-400 font-semibold">
                        {job.companyName}
                      </span>

                      <FaCheckCircle className="text-emerald-500 text-sm" />
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-5 text-sm text-slate-400">
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-emerald-400" />
                        {job.city}, {job.state}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaBriefcase className="text-emerald-400" />
                        {job.experience}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-emerald-400" />
                        ₹{job.salaryMin?.toLocaleString()} - ₹
                        {job.salaryMax?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

             <div className="lg:min-w-[190px] space-y-3">
  <button
    onClick={applyJob}
    disabled={applying}
    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white px-7 py-4 rounded-xl font-bold transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/10"
  >
    {applying ? "Applying..." : "Apply Now"}
    {!applying && <FaArrowRight />}
  </button>

  <button
    onClick={shareJob}
    className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-7 py-3.5 rounded-xl font-semibold transition flex items-center justify-center gap-3"
  >
    <FaShareAlt />
    Share Job
  </button>

  <p className="text-center text-xs text-slate-500">
    Apply directly through TechBy
  </p>
</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Summary */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <SectionTitle title="Job Summary" />

                <p className="text-slate-400 leading-8 whitespace-pre-line">
                  {job.jobSummary ||
                    "The employer has not provided a job summary yet."}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <SectionTitle title="Responsibilities" />

                <div className="text-slate-400 leading-8 whitespace-pre-line">
                  {job.responsibilities ||
                    "Responsibilities will be discussed during the interview."}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <SectionTitle title="Requirements" />

                <div className="text-slate-400 leading-8 whitespace-pre-line">
                  {job.requirements ||
                    "Requirements will be discussed during the interview."}
                </div>
              </div>

              {/* Skills */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-7">
                  <SectionTitle title="Required Skills" />

                  <span className="text-xs font-semibold text-slate-500 bg-slate-800 px-3 py-1.5 rounded-full">
                    {job.skills?.length || 0} Skills
                  </span>
                </div>

                {job.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-emerald-500/50 hover:text-emerald-400 transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500">
                    No specific skills were provided.
                  </p>
                )}
              </div>

              {/* Benefits */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <SectionTitle title="Benefits" />

                <div className="text-slate-400 leading-8 whitespace-pre-line">
                  {job.benefits ||
                    "Benefits will be discussed during the interview."}
                </div>
              </div>

              {/* Company */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
                <SectionTitle title="About the Company" />

                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-white p-3 shrink-0 flex items-center justify-center">
                    <img
                      src={
                        job.companyLogo ||
                        "https://via.placeholder.com/100"
                      }
                      alt={job.companyName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-white">
                        {job.companyName}
                      </h3>

                      <FaCheckCircle className="text-emerald-500" />
                    </div>

                    <p className="text-slate-500 mt-2">
                      Hiring talented professionals and building great teams.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="space-y-6">
              {/* Apply Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 ">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <FaBriefcase className="text-emerald-400" />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-white">
                      Job Overview
                    </h2>

                    <p className="text-xs text-slate-500">
                      Important job details
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <OverviewItem
                    icon={<FaCalendarAlt />}
                    label="Posted"
                    value={
                      job.createdAt
                        ? new Date(job.createdAt).toLocaleDateString()
                        : "Recently"
                    }
                  />

                  <OverviewItem
                    icon={<FaClock />}
                    label="Deadline"
                    value={
                      job.applicationDeadline
                        ? new Date(
                            job.applicationDeadline
                          ).toLocaleDateString()
                        : "Not specified"
                    }
                  />

                  <OverviewItem
                    icon={<FaMapMarkerAlt />}
                    label="Location"
                    value={`${job.city}, ${job.state}`}
                  />

                  <OverviewItem
                    icon={<FaBriefcase />}
                    label="Experience"
                    value={job.experience}
                  />

                  <OverviewItem
                    icon={<FaBriefcase />}
                    label="Employment"
                    value={job.employmentType}
                  />

                  <OverviewItem
                    icon={<FaLaptopHouse />}
                    label="Work Mode"
                    value={job.workMode}
                  />

                  <div className="pt-5 border-t border-slate-800">
                    <div className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-slate-500 text-sm">
                        <FaMoneyBillWave className="text-emerald-400" />
                        Salary
                      </span>

                      <span className="text-emerald-400 font-bold text-sm text-right">
                        ₹{job.salaryMin?.toLocaleString()} - ₹
                        {job.salaryMax?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={applyJob}
                  disabled={applying}
                  className="w-full mt-7 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {applying ? "Applying..." : "Apply for this Job"}
                  {!applying && <FaArrowRight />}
                </button>
              </div>

              {/* Company Details */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Company Details
                </h2>

                <div className="space-y-5">
                  <CompanyItem
                    icon={<FaBuilding />}
                    label="Company"
                    value={job.companyName}
                  />

                  <CompanyItem
                    icon={<FaEnvelope />}
                    label="Email"
                    value={job.companyEmail}
                  />

                  {job.companyPhone && (
                    <CompanyItem
                      icon={<FaPhoneAlt />}
                      label="Phone"
                      value={job.companyPhone}
                    />
                  )}

                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <FaGlobe className="text-emerald-400 text-sm" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 mb-1">Website</p>

                      {job.companyWebsite ? (
                        <a
                          href={job.companyWebsite}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-emerald-400 hover:text-emerald-300 break-all flex items-center gap-2"
                        >
                          Visit Website
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      ) : (
                        <p className="text-sm text-slate-400">
                          Not provided
                        </p>
                      )}
                    </div>
                  </div>

                  <CompanyItem
                    icon={<FaMapMarkerAlt />}
                    label="Office Address"
                    value={`${job.officeAddress || "Not provided"}${
                      job.city ? `, ${job.city}` : ""
                    }`}
                  />
                </div>
              </div>

              {/* Quick Apply */}
              <div className="rounded-2xl p-6 bg-gradient-to-br from-emerald-500 to-emerald-600">
                <h3 className="text-xl font-bold text-white">
                  Interested in this role?
                </h3>

                <p className="text-emerald-50 text-sm leading-6 mt-2">
                  Submit your application and take the next step in your
                  career.
                </p>

                <button
                  onClick={applyJob}
                  disabled={applying}
                  className="w-full mt-5 bg-white text-emerald-600 hover:bg-emerald-50 py-3.5 rounded-xl font-bold transition disabled:opacity-50"
                >
                  {applying ? "Applying..." : "Apply Now"}
                </button>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* Section Title */

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-1 h-7 rounded-full bg-emerald-500"></div>

      <h2 className="text-xl sm:text-2xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
}

/* Overview Item */

function OverviewItem({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex items-center gap-3 text-slate-500 text-sm">
        <span className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
          {icon}
        </span>

        {label}
      </span>

      <span className="text-white text-sm font-semibold text-right">
        {value || "Not specified"}
      </span>
    </div>
  );
}

/* Company Item */

function CompanyItem({ icon, label, value }) {
  return (
    <div className="flex gap-3">
      <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
        <span className="text-emerald-400 text-sm">{icon}</span>
      </div>

      <div className="min-w-0">
        <p className="text-xs text-slate-500 mb-1">{label}</p>

        <p className="text-sm text-slate-300 break-words">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}
