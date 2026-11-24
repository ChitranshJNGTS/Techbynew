
// import { useMemo, useState } from "react";
// import {
//   Search,
//   Eye,
//   UserPlus,
//   MapPin,
//   X,
//   Users,
//   UserCheck,
//   FileCheck2,
//   Mail,
//   Phone,
//   BriefcaseBusiness,
// } from "lucide-react";

// const initialCandidates = [
//   {
//     id: 1,
//     name: "Hemanth Kesani",
//     role: "Senior Databricks Engineer",
//     experience: "9 years",
//     skills: ["Databricks", "PySpark", "AWS", "SQL"],
//     location: "Boston, MA",
//     email: "hemanth@example.com",
//     phone: "+1 555 0101",
//     vendor: "ABC Technologies",
//     status: "Available",
//   },
//   {
//     id: 2,
//     name: "Manikanta Reddy",
//     role: "Data Engineer",
//     experience: "8 years",
//     skills: ["Databricks", "Python", "Azure", "Spark"],
//     location: "New Jersey, USA",
//     email: "manikanta@example.com",
//     phone: "+1 555 0102",
//     vendor: "Global Talent",
//     status: "Submitted",
//   },
//   {
//     id: 3,
//     name: "Akhila Reddy",
//     role: "Business Analyst",
//     experience: "7 years",
//     skills: ["UAT", "SQL", "JIRA", "Agile"],
//     location: "Florida, USA",
//     email: "akhila@example.com",
//     phone: "+1 555 0103",
//     vendor: "ABC Technologies",
//     status: "Backup",
//   },
//   {
//     id: 4,
//     name: "Rahul Sharma",
//     role: "Java Full Stack Developer",
//     experience: "6 years",
//     skills: ["Java", "Spring Boot", "React", "AWS"],
//     location: "Texas, USA",
//     email: "rahul@example.com",
//     phone: "+1 555 0104",
//     vendor: "NextGen Staffing",
//     status: "Available",
//   },
//   {
//     id: 5,
//     name: "Sandeep Kumar",
//     role: "Cloud Architect",
//     experience: "11 years",
//     skills: ["Azure", "AWS", "Kubernetes", "Terraform"],
//     location: "Iowa, USA",
//     email: "sandeep@example.com",
//     phone: "+1 555 0105",
//     vendor: "Global Talent",
//     status: "Available",
//   },
// ];

// const emptyForm = {
//   name: "",
//   role: "",
//   experience: "",
//   location: "",
//   email: "",
//   phone: "",
//   vendor: "",
// };

// function StatusBadge({ status }) {
//   const styles = {
//     Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
//     Submitted: "bg-blue-50 text-blue-700 ring-blue-600/10",
//     Backup: "bg-amber-50 text-amber-700 ring-amber-600/10",
//   };

//   return (
//     <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${styles[status] || "bg-slate-100 text-slate-600 ring-slate-500/10"}`}>
//       {status}
//     </span>
//   );
// }

// function StatCard({ icon: Icon, label, value, description }) {
//   return (
//     <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
//       <div className="flex items-center justify-between">
//         <p className="text-sm font-medium text-slate-500">{label}</p>
//         <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
//           <Icon size={19} />
//         </div>
//       </div>
//       <p className="text-3xl font-bold text-slate-900 mt-4">{value}</p>
//       <p className="text-xs text-slate-400 mt-1">{description}</p>
//     </div>
//   );
// }

// export default function Candidates() {
//   const [candidates, setCandidates] = useState(initialCandidates);
//   const [search, setSearch] = useState("");
//   const [experience, setExperience] = useState("All");
//   const [selected, setSelected] = useState(null);
//   const [showAdd, setShowAdd] = useState(false);
//   const [form, setForm] = useState(emptyForm);

//   const filtered = useMemo(() => {
//     return candidates.filter((candidate) => {
//       const searchText = `${candidate.name} ${candidate.role} ${candidate.skills.join(" ")} ${candidate.vendor}`.toLowerCase();
//       const matchesSearch = searchText.includes(search.toLowerCase());
//       const years = parseInt(candidate.experience, 10) || 0;

//       const matchesExperience =
//         experience === "All" ||
//         (experience === "0–5 years" && years <= 5) ||
//         (experience === "6–10 years" && years >= 6 && years <= 10) ||
//         (experience === "10+ years" && years > 10);

//       return matchesSearch && matchesExperience;
//     });
//   }, [candidates, search, experience]);

//   const addCandidate = (e) => {
//     e.preventDefault();

//     const newCandidate = {
//       ...form,
//       id: Date.now(),
//       skills: [],
//       status: "Available",
//     };

//     setCandidates((prev) => [newCandidate, ...prev]);
//     setForm(emptyForm);
//     setShowAdd(false);
//   };

//   return (
//     <div className="space-y-7">
//       {/* PAGE HEADING */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <p className="text-sm font-medium text-emerald-700 mb-1">Recruitment workspace</p>
//           <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Candidates</h1>
//           <p className="text-sm text-slate-500 mt-1">
//             Manage candidate profiles, review experience and track availability.
//           </p>
//         </div>

//         <button
//           onClick={() => setShowAdd(true)}
//           className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition"
//         >
//           <UserPlus size={17} />
//           Add Candidate
//         </button>
//       </div>

//       {/* SUMMARY CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//         <StatCard
//           icon={Users}
//           label="Total Candidates"
//           value={candidates.length}
//           description="Profiles in your directory"
//         />
//         <StatCard
//           icon={UserCheck}
//           label="Available"
//           value={candidates.filter((c) => c.status === "Available").length}
//           description="Ready for consideration"
//         />
//         <StatCard
//           icon={FileCheck2}
//           label="Submitted"
//           value={candidates.filter((c) => c.status === "Submitted").length}
//           description="Already submitted to a client"
//         />
//       </div>

//       {/* DIRECTORY */}
//       <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
//         <div className="p-5 sm:p-6 border-b border-slate-200">
//           <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
//             <div>
//               <h2 className="font-bold text-slate-900">Candidate Directory</h2>
//               <p className="text-xs text-slate-500 mt-1">
//                 Search and review candidate profiles.
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <div className="relative">
//                 <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search name, role or skill..."
//                   className="w-full sm:w-72 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
//                 />
//               </div>

//               <select
//                 value={experience}
//                 onChange={(e) => setExperience(e.target.value)}
//                 className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-emerald-500"
//               >
//                 {["All", "0–5 years", "6–10 years", "10+ years"].map((value) => (
//                   <option key={value}>{value}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 sm:p-5">
//           {filtered.map((candidate) => (
//             <article
//               key={candidate.id}
//               className="border border-slate-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-sm transition"
//             >
//               <div className="flex items-start justify-between gap-3">
//                 <div className="flex items-center gap-3 min-w-0">
//                   <div className="w-11 h-11 shrink-0 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
//                     {candidate.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
//                   </div>
//                   <div className="min-w-0">
//                     <h3 className="font-bold text-slate-900 truncate">{candidate.name}</h3>
//                     <p className="text-sm text-slate-500 mt-0.5">{candidate.role}</p>
//                   </div>
//                 </div>
//                 <StatusBadge status={candidate.status} />
//               </div>

//               <div className="flex flex-wrap gap-4 text-xs text-slate-500 mt-5">
//                 <span className="flex items-center gap-1.5">
//                   <BriefcaseBusiness size={14} />
//                   {candidate.experience}
//                 </span>
//                 <span className="flex items-center gap-1.5">
//                   <MapPin size={14} />
//                   {candidate.location}
//                 </span>
//               </div>

//               <div className="flex flex-wrap gap-1.5 mt-4">
//                 {candidate.skills.map((skill) => (
//                   <span key={skill} className="bg-slate-100 text-slate-600 rounded-md px-2.5 py-1 text-xs">
//                     {skill}
//                   </span>
//                 ))}
//                 {!candidate.skills.length && (
//                   <span className="text-xs text-slate-400">No skills added</span>
//                 )}
//               </div>

//               <div className="border-t border-slate-100 mt-5 pt-4 flex items-center justify-between gap-3">
//                 <span className="text-xs text-slate-400 truncate">
//                   Vendor: {candidate.vendor}
//                 </span>
//                 <button
//                   onClick={() => setSelected(candidate)}
//                   className="shrink-0 text-sm text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5"
//                 >
//                   <Eye size={15} />
//                   View Profile
//                 </button>
//               </div>
//             </article>
//           ))}

//           {!filtered.length && (
//             <div className="col-span-full text-center py-14">
//               <Users size={32} className="mx-auto text-slate-300" />
//               <p className="font-semibold text-slate-700 mt-3">No candidates found</p>
//               <p className="text-sm text-slate-400 mt-1">Try changing your search or experience filter.</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* PROFILE MODAL */}
//       {selected && (
//         <div className="fixed inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
//             <div className="p-5 sm:p-6 border-b border-slate-200 flex items-start justify-between">
//               <div>
//                 <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Candidate profile</p>
//                 <h2 className="font-bold text-xl text-slate-900 mt-1">{selected.name}</h2>
//                 <p className="text-sm text-slate-500 mt-1">{selected.role}</p>
//               </div>
//               <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-5 sm:p-6 space-y-5">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 {[
//                   ["Experience", selected.experience],
//                   ["Location", selected.location],
//                   ["Email", selected.email],
//                   ["Phone", selected.phone],
//                   ["Vendor", selected.vendor],
//                   ["Status", selected.status],
//                 ].map(([label, value]) => (
//                   <div key={label} className="min-w-0">
//                     <p className="text-xs text-slate-400">{label}</p>
//                     <p className="text-sm font-semibold text-slate-800 mt-1 break-words">{value || "Not provided"}</p>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t border-slate-100 pt-4">
//                 <p className="text-xs text-slate-400 mb-2">Technical skills</p>
//                 <div className="flex flex-wrap gap-2">
//                   {selected.skills.length ? selected.skills.map((skill) => (
//                     <span key={skill} className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium">{skill}</span>
//                   )) : <span className="text-sm text-slate-400">No skills added</span>}
//                 </div>
//               </div>

//               <button onClick={() => setSelected(null)} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-sm font-semibold">
//                 Close Profile
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ADD CANDIDATE MODAL */}
//       {showAdd && (
//         <div className="fixed inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4">
//           <form onSubmit={addCandidate} className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
//             <div className="p-5 sm:p-6 border-b border-slate-200 flex justify-between items-start">
//               <div>
//                 <h2 className="font-bold text-lg text-slate-900">Add Candidate</h2>
//                 <p className="text-xs text-slate-500 mt-1">Enter the candidate's basic details.</p>
//               </div>
//               <button type="button" onClick={() => setShowAdd(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="p-5 sm:p-6 grid sm:grid-cols-2 gap-4">
//               {[
//                 ["name", "Candidate Name", "text"],
//                 ["role", "Job Title", "text"],
//                 ["experience", "Experience", "text"],
//                 ["location", "Location", "text"],
//                 ["email", "Email Address", "email"],
//                 ["phone", "Phone Number", "text"],
//                 ["vendor", "Vendor", "text"],
//               ].map(([key, label, type]) => (
//                 <label key={key} className="text-sm font-medium text-slate-700">
//                   {label}
//                   <input
//                     required
//                     type={type}
//                     value={form[key]}
//                     onChange={(e) => setForm({ ...form, [key]: e.target.value })}
//                     className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
//                   />
//                 </label>
//               ))}
//             </div>

//             <div className="p-5 sm:p-6 border-t border-slate-200 flex justify-end gap-3">
//               <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50">
//                 Cancel
//               </button>
//               <button className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold">
//                 Save Candidate
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Search,
  Eye,
  UserPlus,
  MapPin,
  X,
  Users,
  UserCheck,
  FileCheck2,
  Mail,
  Phone,
  BriefcaseBusiness,
  RefreshCw,
  CircleAlert,
} from "lucide-react";

import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const API_URL = import.meta.env.VITE_API_URL;

const emptyForm = {
  name: "",
  role: "",
  experience: "",
  location: "",
  email: "",
  phone: "",
  vendor: "",
  skills: "",
};

const candidateStatuses = ["Available", "Submitted", "Backup"];

// ==========================================
// AUTHENTICATED API HELPERS
// ==========================================

const getAuthHeaders = async (user) => {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not configured.");
  }

  if (!user) {
    throw new Error("No authenticated user found. Please log in again.");
  }

  const token = await user.getIdToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

const recruiterApi = async (user, endpoint = "", options = {}) => {
  const headers = await getAuthHeaders(user);

  const response = await fetch(
    `${API_URL}/recruiter/candidates${endpoint}`,
    {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    }
  );

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      result.message ||
      result.error ||
      `Request failed with status ${response.status}`
    );
  }

  return result;
};

// ==========================================
// MAP API DATA
// ==========================================

const mapCandidate = (item) => {
  const skills = Array.isArray(item.skills)
    ? item.skills
    : typeof item.skills === "string"
      ? item.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      : [];

  return {
    id: item._id || item.id,
    name: item.name || item.candidateName || "Unnamed Candidate",
    role: item.role || item.jobTitle || item.position || "—",
    experience:
  item.experience !== null && item.experience !== undefined
    ? String(item.experience)
    : "—",
    skills,
    location: item.location || "—",
    email: item.email || "—",
    phone: item.phone || "—",
    vendor: item.vendor || item.vendorName || "Direct",
    status: item.status || "Available",
    resumeUrl: item.resumeUrl || "",
    createdAt: item.createdAt || item.createdOn || "",
    updatedAt: item.updatedAt || "",
  };
};

// ==========================================
// STATUS BADGE
// ==========================================

function StatusBadge({ status }) {
  const styles = {
    Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/10",
    Submitted: "bg-blue-50 text-blue-700 ring-blue-600/10",
    Backup: "bg-amber-50 text-amber-700 ring-amber-600/10",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
        styles[status] ||
        "bg-slate-100 text-slate-600 ring-slate-500/10"
      }`}
    >
      {status}
    </span>
  );
}

// ==========================================
// STAT CARD
// ==========================================

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

// ==========================================
// CANDIDATE PROFILE MODAL
// ==========================================

function CandidateProfileModal({ candidate, onClose }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Candidate profile
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {candidate.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {candidate.role}
            </p>

            <div className="mt-3">
              <StatusBadge status={candidate.status} />
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {[
              ["Experience", candidate.experience, BriefcaseBusiness],
              ["Location", candidate.location, MapPin],
              ["Email", candidate.email, Mail],
              ["Phone", candidate.phone, Phone],
              ["Vendor", candidate.vendor, Users],
            ].map(([label, value, Icon]) => (
              <div key={label} className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Icon size={14} />
                  {label}
                </div>

                <p className="mt-1 break-words text-sm font-semibold text-slate-800">
                  {value || "Not provided"}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="mb-2 text-xs text-slate-400">
              Technical skills
            </p>

            <div className="flex flex-wrap gap-2">
              {candidate.skills.length ? (
                candidate.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-400">
                  No skills added
                </span>
              )}
            </div>
          </div>

          {candidate.resumeUrl && (
            <div className="border-t border-slate-100 pt-4">
              <p className="mb-2 text-xs text-slate-400">Resume</p>

              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View candidate resume
              </a>
            </div>
          )}

          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-400">Candidate ID</p>
            <p className="mt-1 break-all text-xs font-medium text-slate-600">
              {candidate.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// ADD CANDIDATE MODAL
// ==========================================

function AddCandidateModal({ onClose, onAdd, saving }) {
  const [form, setForm] = useState(emptyForm);

  const updateField = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      ...form,
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    });
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";

  const fields = [
    ["name", "Candidate Name", "text", true],
    ["role", "Job Title / Role", "text", true],
    ["experience", "Experience (e.g. 8 years)", "text", true],
    ["location", "Location", "text", true],
    ["email", "Email Address", "email", true],
    ["phone", "Phone Number", "text", false],
    ["vendor", "Vendor / Source Company", "text", false],
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Add Candidate
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Enter candidate information to add them to your directory.
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

        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          {fields.map(([key, label, type, required]) => (
            <label
              key={key}
              className="text-sm font-medium text-slate-700"
            >
              {label}

              <input
                required={required}
                type={type}
                value={form[key]}
                onChange={(e) => updateField(key, e.target.value)}
                className={inputClass}
                placeholder={label}
              />
            </label>
          ))}

          <label className="text-sm font-medium text-slate-700 sm:col-span-2">
            Technical Skills

            <input
              value={form.skills}
              onChange={(e) => updateField("skills", e.target.value)}
              className={inputClass}
              placeholder="Databricks, Python, SQL, AWS"
            />

            <span className="mt-1 block text-xs font-normal text-slate-400">
              Separate skills with commas.
            </span>
          </label>
        </div>

        <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-200 p-5 sm:flex-row sm:p-6">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <>
                <RefreshCw size={15} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <UserPlus size={16} />
                Save Candidate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// ==========================================
// MAIN CANDIDATES PAGE
// ==========================================

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [experience, setExperience] = useState("All");
  const [selected, setSelected] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");

  // undefined = Firebase has not initialized yet
  // null = Firebase initialized but user is logged out
  // object = authenticated Firebase user
  const [authUser, setAuthUser] = useState(undefined);
  const [authReady, setAuthReady] = useState(false);

  // ========================================
  // WAIT FOR FIREBASE AUTH INITIALIZATION
  // ========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setAuthUser(user || null);
        setAuthReady(true);
      },
      (error) => {
        console.error("Firebase auth initialization error:", error);
        setAuthUser(null);
        setAuthReady(true);
        setApiError("Unable to initialize authentication. Please log in again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ========================================
  // LOAD CANDIDATES
  // ========================================

  const loadCandidates = useCallback(async (user) => {
    if (!user) {
      setLoading(false);
      setApiError("You are not logged in. Please log in again.");
      return;
    }

    try {
      setLoading(true);
      setApiError("");

      const result = await recruiterApi(user);

      const records = Array.isArray(result)
        ? result
        : result.candidates || result.data || [];

      setCandidates(records.map(mapCandidate));
    } catch (error) {
      console.error("Load candidates error:", error);
      setApiError(error.message || "Unable to load candidates.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ========================================
  // LOAD ONLY AFTER FIREBASE IS READY
  // ========================================

  useEffect(() => {
    if (!authReady) return;

    if (!authUser) {
      setLoading(false);
      setApiError("You are not logged in. Please log in again.");
      return;
    }

    loadCandidates(authUser);
  }, [authReady, authUser, loadCandidates]);

  // ========================================
  // ADD CANDIDATE
  // ========================================

  const addCandidate = async (form) => {
    if (!authUser) {
      setApiError("Your login session is unavailable. Please log in again.");
      return;
    }

    try {
      setSaving(true);
      setApiError("");

      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        experience: form.experience.trim(),
        location: form.location.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        vendor: form.vendor.trim(),
        skills: form.skills,
        status: "Available",
      };

      await recruiterApi(authUser, "", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      await loadCandidates(authUser);
      setShowAdd(false);
    } catch (error) {
      console.error("Add candidate error:", error);
      setApiError(error.message || "Unable to add candidate.");
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // SEARCH AND FILTER
  // ========================================

  const filtered = useMemo(() => {
    return candidates.filter((candidate) => {
      const searchText = [
        candidate.name,
        candidate.role,
        candidate.skills.join(" "),
        candidate.vendor,
        candidate.location,
        candidate.email,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchText.includes(search.toLowerCase());

    const yearsMatch = String(candidate.experience || "").match(/\d+(\.\d+)?/);
const years = yearsMatch ? Number(yearsMatch[0]) : 0;

      const matchesExperience =
        experience === "All" ||
        (experience === "0–5 years" && years <= 5) ||
        (experience === "6–10 years" && years >= 6 && years <= 10) ||
        (experience === "10+ years" && years > 10);

      return matchesSearch && matchesExperience;
    });
  }, [candidates, search, experience]);

  // ========================================
  // STATISTICS
  // ========================================

  const stats = useMemo(
    () => ({
      total: candidates.length,
      available: candidates.filter(
        (candidate) => candidate.status === "Available"
      ).length,
      submitted: candidates.filter(
        (candidate) => candidate.status === "Submitted"
      ).length,
    }),
    [candidates]
  );

  // ========================================
  // UI
  // ========================================

  return (
    <div className="space-y-7">

      {/* PAGE HEADING */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-emerald-700">
            Recruitment workspace
          </p>

          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Candidates
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage candidate profiles, review experience and track availability.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => loadCandidates(authUser)}
            disabled={loading || !authReady || !authUser}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh
          </button>

          <button
            onClick={() => setShowAdd(true)}
            disabled={!authReady || !authUser}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-50"
          >
            <UserPlus size={17} />
            Add Candidate
          </button>
        </div>
      </div>

      {/* ERROR MESSAGE */}

      {apiError && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <div className="flex items-center gap-2">
            <CircleAlert size={17} />
            <span>{apiError}</span>
          </div>

          <button
            onClick={() => loadCandidates(authUser)}
            disabled={!authUser}
            className="shrink-0 font-semibold underline disabled:opacity-50"
          >
            Retry
          </button>
        </div>
      )}

      {/* WAITING FOR FIREBASE */}

      {!authReady && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <RefreshCw className="mx-auto h-7 w-7 animate-spin text-emerald-600" />

          <p className="mt-3 text-sm font-medium text-slate-600">
            Initializing secure session...
          </p>
        </div>
      )}

      {/* LOADING CANDIDATES */}

      {authReady && loading && (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <RefreshCw className="mx-auto h-7 w-7 animate-spin text-emerald-600" />

          <p className="mt-3 text-sm font-medium text-slate-600">
            Loading candidates...
          </p>
        </div>
      )}

      {/* CANDIDATE DIRECTORY */}

      {authReady && !loading && authUser && (
        <>
          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              icon={Users}
              label="Total Candidates"
              value={stats.total}
              description="Profiles in your directory"
            />

            <StatCard
              icon={UserCheck}
              label="Available"
              value={stats.available}
              description="Ready for consideration"
            />

            <StatCard
              icon={FileCheck2}
              label="Submitted"
              value={stats.submitted}
              description="Already submitted to a client"
            />
          </div>

          {/* DIRECTORY */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Candidate Directory
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Search and review candidate profiles.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <Search
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name, role or skill..."
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 sm:w-72"
                    />
                  </div>

                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-emerald-500"
                  >
                    {[
                      "All",
                      "0–5 years",
                      "6–10 years",
                      "10+ years",
                    ].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 sm:p-5 xl:grid-cols-2">
              {filtered.map((candidate) => (
                <article
                  key={candidate.id}
                  className="rounded-xl border border-slate-200 p-5 transition hover:border-emerald-300 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-700">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-slate-900">
                          {candidate.name}
                        </h3>

                        <p className="mt-0.5 text-sm text-slate-500">
                          {candidate.role}
                        </p>
                      </div>
                    </div>

                    <StatusBadge status={candidate.status} />
                  </div>

                  <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <BriefcaseBusiness size={14} />
                      {candidate.experience}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {candidate.location}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {candidate.skills.length ? (
                      candidate.skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">
                        No skills added
                      </span>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <span className="truncate text-xs text-slate-400">
                      Vendor: {candidate.vendor}
                    </span>

                    <button
                      onClick={() => setSelected(candidate)}
                      className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <Eye size={15} />
                      View Profile
                    </button>
                  </div>
                </article>
              ))}

              {!filtered.length && (
                <div className="col-span-full py-14 text-center">
                  <Users size={32} className="mx-auto text-slate-300" />

                  <p className="mt-3 font-semibold text-slate-700">
                    No candidates found
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Try changing your search or experience filter.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
              <p className="text-xs text-slate-500">
                Showing {filtered.length} of {candidates.length} candidates
              </p>
            </div>
          </section>
        </>
      )}

      {/* PROFILE MODAL */}

      {selected && (
        <CandidateProfileModal
          candidate={selected}
          onClose={() => setSelected(null)}
        />
      )}

      {/* ADD CANDIDATE MODAL */}

      {showAdd && (
        <AddCandidateModal
          onClose={() => setShowAdd(false)}
          onAdd={addCandidate}
          saving={saving}
        />
      )}
    </div>
  );
}
