
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  MapPin,
  BriefcaseBusiness,
  CalendarDays,
  DollarSign,
  Clock,
  CheckCircle2,
  Mail,
  Send,
  Users,
  ShieldCheck,
  FileText,
  Target,
  Sparkles,
  ExternalLink,
  Globe,
  BadgeCheck,
  CircleDollarSign,
  CalendarCheck,
  FileSearch,
} from "lucide-react";

import Ads from "../../components/Ads";
import Footer from "../../components/Footer";
import logo from "../../assets/logo.png";
import MobileBottomBar from "../../components/MobileBottomBar";
import Navbar from "../../components/Navbar";

// ==========================================
// CONSTANTS
// ==========================================

const SUPPORT_EMAIL = "support@techby.in";

// ==========================================
// HELPERS
// ==========================================

const displayValue = (value, fallback = "Not specified") => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : fallback;
  }

  return String(value);
};

const getSkills = (job) => {
  const skills = job?.skills || job?.requiredSkills || [];

  if (Array.isArray(skills)) {
    return skills.filter(Boolean);
  }

  if (typeof skills === "string") {
    return skills
      .split(/[,;\n]/)
      .map((skill) => skill.trim())
      .filter(Boolean);
  }

  return [];
};

const formatContent = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item;
        return item?.description || item?.title || "";
      })
      .filter(Boolean)
      .join("\n");
  }

  return typeof value === "string" ? value : "";
};

// ==========================================
// ADVERTISEMENT COMPONENT
// ==========================================

function AdSlot({ type = "banner", className = "" }) {
  const configs = {
    banner: {
      label: "Advertisement",
      adType: "728x90",
      wrapper: "min-h-[90px] max-w-[728px]",
    },
    leaderboard: {
      label: "Advertisement",
      adType: "970x90",
      wrapper: "min-h-[90px] max-w-[970px]",
    },
    square: {
      label: "Advertisement",
      adType: "300x250",
      wrapper: "min-h-[250px] max-w-[300px]",
    },
  };

  const config = configs[type] || configs.banner;

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-2 flex items-center justify-center gap-2">
        <span className="h-px w-6 bg-slate-200" />
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
          Advertisement
        </span>
        <span className="h-px w-6 bg-slate-200" />
      </div>

      <div className="flex w-full justify-center">
        <div
          className={`flex w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white ${config.wrapper}`}
        >
          <Ads type={config.adType} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// REUSABLE COMPONENTS
// ==========================================

const SectionCard = ({ icon: Icon, title, subtitle, children }) => (
  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">
    <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 sm:px-6 sm:py-5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
        <Icon size={19} />
      </div>

      <div className="min-w-0">
        <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-xs leading-5 text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    <div className="p-5 sm:p-6">{children}</div>
  </section>
);

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-emerald-100 hover:bg-emerald-50/40">
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
      <Icon size={16} />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold leading-5 text-slate-800">
        {displayValue(value)}
      </p>
    </div>
  </div>
);

const TextContent = ({ children }) => {
  const content = formatContent(children);

  if (!content.trim()) return null;

  return (
    <div className="whitespace-pre-line break-words text-sm leading-7 text-slate-600">
      {content}
    </div>
  );
};

const HighlightCard = ({ icon: Icon, label, value }) => (
  <div className="group flex min-w-0 items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
      <Icon size={20} />
    </div>

    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold text-slate-800">
        {displayValue(value)}
      </p>
    </div>
  </div>
);

// ==========================================
// MAIN PAGE
// ==========================================

export default function VendorJobDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = useParams();

  const job = location.state?.job;

  // ==========================================
  // JOB NOT FOUND
  // ==========================================

  if (!job || String(job.id) !== String(jobId)) {
    return (
      <div className="flex min-h-screen flex-col bg-[#f5f7fb]">
        {/* <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <a href="/">
              <img
                src={logo}
                alt="TechBy"
                className="h-10 w-auto object-contain"
              />
            </a>

            <button
              onClick={() => navigate("/vendor-tracker")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 sm:text-sm"
            >
              <ArrowLeft size={16} />
              Vendor Tracker
            </button>
          </div>
        </header> */}

        <Navbar/>

        <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
            <BriefcaseBusiness size={38} className="text-slate-400" />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Job Details Unavailable
          </h1>

          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            This job information is not available in the current session.
            Please return to Vendor Tracker and select the position again.
          </p>

          <button
            onClick={() => navigate("/vendor-tracker")}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <ArrowLeft size={17} />
            Back to Vendor Tracker
          </button>
        </main>

        <Footer />
      </div>
    );
  }

  // ==========================================
  // JOB DATA
  // ==========================================

  const skills = getSkills(job);

  const description =
    job.description || "No job description has been provided.";

  const responsibilities = formatContent(job.responsibilities);
  const requirements = formatContent(
    job.requirements || job.requiredQualifications
  );
  const qualifications = formatContent(job.qualifications);
  const benefits = formatContent(job.benefits);

  const experience =
    job.experience ||
    job.experienceRequired ||
    job.experienceLevel;

  const openings = job.openings || job.vacancies;

  const emailSubject = encodeURIComponent(
    `Candidate Submission - ${job.title}`
  );

  const emailBody = encodeURIComponent(
    `Hello TechBy Team,

I have a suitable candidate for the following requirement:

Position: ${job.title}
Client: ${job.client}
Location: ${job.location}
Job ID: ${job.id}

Please share the submission process and next steps.

Thank you.`
  );

  const contactLink =
    `mailto:${SUPPORT_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-800">

      {/* =====================================
          NAVIGATION
      ===================================== */}

      {/* <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">

          <a href="/" className="flex shrink-0 items-center">
            <img
              src={logo}
              alt="TechBy Logo"
              className="h-10 w-auto max-w-[150px] object-contain sm:h-11"
            />
          </a>

          <div className="flex items-center gap-2">
            <a
              href="/jobs"
              className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-emerald-700 sm:inline-flex"
            >
              Find Jobs
            </a>

            <button
              onClick={() => navigate("/vendor-tracker")}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 sm:px-4 sm:text-sm"
            >
              <ArrowLeft size={16} />
              <span>Vendor Tracker</span>
            </button>
          </div>
        </div>
      </header> */}

<Navbar/>
      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="relative mt-[66px] overflow-hidden bg-slate-950 sm:mt-[70px]">

        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-12 lg:px-8 lg:py-14">

          <button
            onClick={() => navigate(-1)}
            className="mb-7 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 transition hover:text-white sm:text-sm"
          >
            <ArrowLeft size={17} />
            Back to Active Hiring
          </button>

          <div className="grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_290px]">

            {/* JOB TITLE */}

            <div className="min-w-0">

              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[11px] font-bold text-emerald-300">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Actively Hiring
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-slate-300">
                  JOB ID: {String(job.id).slice(-8).toUpperCase()}
                </span>
              </div>

              <h1 className="max-w-4xl break-words text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {job.title || "Untitled Position"}
              </h1>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 text-sm text-slate-300">

                <span className="flex min-w-0 items-center gap-2">
                  <Building2 size={17} className="shrink-0 text-emerald-400" />
                  <span className="break-words">
                    {displayValue(job.client)}
                  </span>
                </span>

                <span className="flex min-w-0 items-center gap-2">
                  <MapPin size={17} className="shrink-0 text-emerald-400" />
                  <span className="break-words">
                    {displayValue(job.location)}
                  </span>
                </span>

                <span className="flex min-w-0 items-center gap-2">
                  <BriefcaseBusiness size={17} className="shrink-0 text-emerald-400" />
                  <span className="break-words">
                    {displayValue(job.workMode)}
                  </span>
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <BadgeCheck size={16} className="text-emerald-400" />
                <span>Recruitment opportunity powered by TechBy</span>
              </div>
            </div>

            {/* RATE AND CONTACT */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-xl backdrop-blur-md sm:p-6">

              <div className="flex items-center gap-2 text-slate-400">
                <CircleDollarSign size={17} className="text-emerald-400" />
                <p className="text-[11px] font-bold uppercase tracking-[0.15em]">
                  Pay Rate
                </p>
              </div>

              <p className="mt-3 break-words text-2xl font-extrabold text-emerald-400 sm:text-3xl">
                {displayValue(job.rate, "Contact Recruiter")}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-400">
                Compensation details for this position.
              </p>

              <a
                href={contactLink}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition hover:bg-emerald-400"
              >
                Contact Recruiter
                <Send size={16} />
              </a>

              <p className="mt-3 text-center text-[10px] leading-5 text-slate-500">
                Contact the TechBy team for candidate submission details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">

        {/* JOB HIGHLIGHTS */}

        <section className="mb-8">
          <div className="mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600">
              Position Overview
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
              Job Highlights
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <HighlightCard
              icon={MapPin}
              label="Location"
              value={job.location}
            />

            <HighlightCard
              icon={BriefcaseBusiness}
              label="Work Mode"
              value={job.workMode}
            />

            <HighlightCard
              icon={Clock}
              label="Experience"
              value={experience}
            />

            <HighlightCard
              icon={CalendarDays}
              label="Posted On"
              value={job.posted}
            />
          </div>
        </section>

        {/* ADVERTISEMENT */}

        <div className="mb-8 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm sm:p-4">
          <AdSlot type="banner" />
        </div>

        {/* MAIN GRID */}

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">

          {/* LEFT COLUMN */}

          <div className="min-w-0 space-y-6">

            {/* JOB DESCRIPTION */}

            <SectionCard
              icon={FileText}
              title="Job Description"
              subtitle="Overview of the position and its responsibilities"
            >
              <TextContent>{description}</TextContent>
            </SectionCard>

            {/* RESPONSIBILITIES */}

            {responsibilities && (
              <SectionCard
                icon={Target}
                title="Key Responsibilities"
                subtitle="Primary duties associated with this role"
              >
                <TextContent>{responsibilities}</TextContent>
              </SectionCard>
            )}

            {/* REQUIREMENTS */}

            {requirements && (
              <SectionCard
                icon={CheckCircle2}
                title="Required Skills & Requirements"
                subtitle="Technical and role-specific requirements"
              >
                <TextContent>{requirements}</TextContent>
              </SectionCard>
            )}

            {/* QUALIFICATIONS */}

            {qualifications && (
              <SectionCard
                icon={ShieldCheck}
                title="Qualifications"
                subtitle="Expected background and qualifications"
              >
                <TextContent>{qualifications}</TextContent>
              </SectionCard>
            )}

            {/* SKILLS */}

            {skills.length > 0 && (
              <SectionCard
                icon={Sparkles}
                title="Required Skills"
                subtitle={`${skills.length} skill${skills.length === 1 ? "" : "s"} listed for this position`}
              >
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100"
                    >
                      <CheckCircle2 size={13} />
                      {skill}
                    </span>
                  ))}
                </div>
              </SectionCard>
            )}

            {/* BENEFITS */}

            {benefits && (
              <SectionCard
                icon={CheckCircle2}
                title="Benefits"
                subtitle="Additional information about the opportunity"
              >
                <TextContent>{benefits}</TextContent>
              </SectionCard>
            )}

            {/* MOBILE CONTACT CARD */}

            <div className="overflow-hidden rounded-2xl bg-slate-950 p-5 text-white shadow-lg sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                    <Users size={13} />
                    Vendor Opportunity
                  </div>

                  <h2 className="text-xl font-extrabold sm:text-2xl">
                    Have a suitable candidate?
                  </h2>

                  <p className="mt-2 max-w-lg text-xs leading-6 text-slate-400 sm:text-sm">
                    Connect with the TechBy team to discuss candidate
                    submissions and the next steps for this requirement.
                  </p>
                </div>

                <a
                  href={contactLink}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-400"
                >
                  <Mail size={17} />
                  Contact Team
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}

          <aside className="min-w-0 space-y-6 lg:sticky lg:top-24">

            {/* JOB OVERVIEW */}

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              <div className="border-b border-slate-100 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <BriefcaseBusiness size={19} />
                  </div>

                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">
                      Job Overview
                    </h2>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                      Requirement information
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4 sm:p-5">

                <DetailRow
                  icon={DollarSign}
                  label="Pay Rate"
                  value={job.rate}
                />

                <DetailRow
                  icon={Building2}
                  label="Client"
                  value={job.client}
                />

                <DetailRow
                  icon={MapPin}
                  label="Location"
                  value={job.location}
                />

                <DetailRow
                  icon={BriefcaseBusiness}
                  label="Work Mode"
                  value={job.workMode}
                />

                <DetailRow
                  icon={ShieldCheck}
                  label="Employment / Authorization"
                  value={job.employment}
                />

                <DetailRow
                  icon={Clock}
                  label="Experience"
                  value={experience}
                />

                <DetailRow
                  icon={Users}
                  label="Openings"
                  value={openings}
                />

                <DetailRow
                  icon={CalendarCheck}
                  label="Posted Date"
                  value={job.posted}
                />
              </div>
            </div>

            {/* SIDEBAR ADVERTISEMENT */}

            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <AdSlot type="square" />
            </div>

            {/* QUICK CONTACT */}

            <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-emerald-50/70 p-5">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-200/40 blur-3xl" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-sm">
                  <Mail size={21} />
                </div>

                <h3 className="mt-4 text-base font-extrabold text-slate-900">
                  Need More Information?
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Have questions about this requirement or candidate
                  submissions? Contact the TechBy team.
                </p>

                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition hover:text-emerald-900"
                >
                  {SUPPORT_EMAIL}
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* TRUST CARD */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Vendor-Friendly Platform
                  </h3>

                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Powered by TechBy
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                TechBy helps recruitment professionals coordinate
                requirements, candidate submissions and recruitment
                opportunities.
              </p>
            </div>
          </aside>
        </div>

        {/* BOTTOM ADVERTISEMENT */}

        <div className="mt-9 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
          <AdSlot type="leaderboard" />
        </div>

      </main>

      {/* =====================================
          FOOTER
      ===================================== */}
<MobileBottomBar/>
      <Footer />
    </div>
  );
}
