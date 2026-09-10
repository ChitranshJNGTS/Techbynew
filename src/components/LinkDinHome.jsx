import React, { useState } from "react";
import {
  Search,
  MapPin,
  BriefcaseBusiness,
  Bell,
  User,
  Plus,
  Bookmark,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Building2,
  ChevronDown,
  Users,
  Clock3,
} from "lucide-react";

const jobs = [
  {
    id: 1,
    company: "ABC BPO Services",
    logo: "A",
    title: "Customer Support Executive",
    location: "Indore, Madhya Pradesh",
    salary: "₹15,000 – ₹22,000/month",
    experience: "Fresher",
    type: "Full Time",
    posted: "2h ago",
    openings: 20,
    description:
      "We are hiring Customer Support Executives for our Indore office. Freshers with good communication skills can apply.",
  },
  {
    id: 2,
    company: "XYZ Enterprises",
    logo: "X",
    title: "Sales Executive",
    location: "Vijay Nagar, Indore",
    salary: "₹18,000 – ₹25,000/month",
    experience: "0–2 years",
    type: "Full Time",
    posted: "5h ago",
    openings: 8,
    description:
      "Looking for energetic candidates to join our sales team. Immediate joining preferred.",
  },
  {
    id: 3,
    company: "Tech Solutions Pvt. Ltd.",
    logo: "T",
    title: "Back Office Executive",
    location: "Bhopal, Madhya Pradesh",
    salary: "₹14,000 – ₹20,000/month",
    experience: "0–1 year",
    type: "Full Time",
    posted: "1d ago",
    openings: 5,
    description:
      "Hiring back office executives for our growing operations team. Basic computer knowledge required.",
  },
];

const categories = [
  "BPO & Customer Support",
  "Sales & Marketing",
  "Back Office",
  "Retail",
  "HR & Recruitment",
  "Banking & Finance",
  "Hospitality",
  "IT & Software",
];

function JobCard({ job }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <article className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex gap-3">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
              {job.logo}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">{job.company}</h3>

              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <Clock3 size={13} />
                Posted {job.posted}
              </p>
            </div>
          </div>

          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreHorizontal size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Job content */}
      <div className="px-5 pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {job.title}
        </h2>

        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <MapPin size={16} />
            {job.location}
          </p>

          <p className="flex items-center gap-2">
            <BriefcaseBusiness size={16} />
            {job.type} · {job.experience}
          </p>

          <p className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">₹</span>
            {job.salary}
          </p>

          <p className="flex items-center gap-2">
            <Users size={16} />
            {job.openings} openings
          </p>
        </div>

        <p className="mt-4 text-gray-700 leading-6">
          {job.description}
        </p>

        <button className="text-green-700 font-medium text-sm mt-2 hover:underline">
          ...see more
        </button>
      </div>

      {/* Actions */}
      <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            liked
              ? "text-green-700 bg-green-50"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Heart size={18} fill={liked ? "currentColor" : "none"} />
          Interested
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
          <MessageCircle size={18} />
          Discuss
        </button>

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
          <Send size={18} />
          Share
        </button>

        <button
          onClick={() => setSaved(!saved)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
            saved
              ? "text-green-700 bg-green-50"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          Save
        </button>
      </div>

      {/* Apply */}
      <div className="px-5 pb-5">
        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
          Apply Now
        </button>
      </div>
    </article>
  );
}

export default function LinkedInHome() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("Indore");

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center font-bold text-xl">
                T
              </div>

              <span className="text-2xl font-bold text-green-700 hidden sm:block">
                TechBy
              </span>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 px-3 flex-1">
                  <Search size={19} className="text-gray-500" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search jobs, companies or skills"
                    className="w-full bg-transparent outline-none py-2.5 text-sm"
                  />
                </div>

                <div className="hidden md:flex items-center border-l border-gray-200 px-3 gap-2">
                  <MapPin size={17} className="text-gray-500" />

                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-28 bg-transparent outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-700">
                Jobs
              </button>

              <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-green-700">
                Companies
              </button>

              <button className="p-2.5 rounded-full hover:bg-gray-100">
                <Bell size={20} />
              </button>

              <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User size={17} />
                </div>
                <ChevronDown size={15} />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-20 bg-green-700" />

              <div className="px-5 pb-5">
                <div className="-mt-8">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow flex items-center justify-center">
                    <User size={28} className="text-gray-500" />
                  </div>
                </div>

                <h2 className="font-semibold text-lg mt-3">
                  Welcome to TechBy
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Find jobs directly from employers.
                </p>

                <button className="w-full mt-4 border border-green-600 text-green-700 hover:bg-green-50 font-semibold py-2 rounded-lg">
                  Complete Your Profile
                </button>
              </div>

              <div className="border-t border-gray-100 p-4">
                <p className="text-xs uppercase font-semibold text-gray-400 mb-3">
                  Quick Links
                </p>

                <div className="space-y-1">
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                    My Applications
                  </button>

                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                    Saved Jobs
                  </button>

                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 text-sm">
                    Recommended Jobs
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Feed */}
          <section className="lg:col-span-6 space-y-5">
            {/* Hero */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h1 className="text-2xl sm:text-3xl font-bold">
                Find your next opportunity
              </h1>

              <p className="text-gray-500 mt-1">
                Discover jobs posted directly by HRs and employers.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button className="px-4 py-2 rounded-full bg-green-600 text-white text-sm font-medium">
                  Latest Jobs
                </button>

                <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                  Near Me
                </button>

                <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                  Freshers
                </button>

                <button className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm font-medium">
                  Work From Home
                </button>
              </div>
            </div>

            {/* Feed heading */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Latest Opportunities</h2>
                <p className="text-sm text-gray-500">
                  Jobs posted by verified employers
                </p>
              </div>

              <button className="flex items-center gap-1 text-sm font-medium text-gray-600">
                Sort by
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Jobs */}
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </section>

          {/* Right sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-5">
            {/* Recruiter CTA */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="w-11 h-11 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                <Building2 size={22} />
              </div>

              <h3 className="font-bold text-lg mt-4">
                Are you hiring?
              </h3>

              <p className="text-sm text-gray-500 mt-1 leading-5">
                Post your vacancy and connect directly with job seekers.
              </p>

              <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2">
                <Plus size={18} />
                Post a Job
              </button>
            </div>

            {/* Categories */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-4">
                Explore Job Categories
              </h3>

              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="w-full flex items-center justify-between text-left px-2 py-2.5 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                  >
                    <span>{category}</span>
                    <span className="text-gray-400">→</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2">
                <MapPin size={19} className="text-green-600" />
                <h3 className="font-bold">Popular Locations</h3>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {["Indore", "Bhopal", "Ujjain", "Pune", "Mumbai"].map(
                  (city) => (
                    <button
                      key={city}
                      className="px-3 py-1.5 rounded-full bg-gray-100 hover:bg-green-50 hover:text-green-700 text-sm"
                    >
                      {city}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-3 text-xs text-gray-400 leading-6">
              About · Contact · Privacy · Terms · Help
              <br />
              © 2026 TechBy
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}