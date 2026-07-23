import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import API from "../Api/JobApi";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaBookmark,
  FaFilter,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "./Navbar";

export default function AllJobs() {
  //   const [keyword, setKeyword] = useState("");
  //   const [location, setLocation] = useState("");
  //   const [jobType, setJobType] = useState("All");
  const [jobsData, setJobsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const [location, setLocation] = useState(searchParams.get("location") || "");

  const [category, setCategory] = useState(searchParams.get("category") || "");

  const [jobType, setJobType] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      setLoading(true);

      const { data } = await API.get("/jobs");

      if (data.success) {
        setJobsData(data.jobs);
      }
    } catch (err) {
      console.log(err);

      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobsData.filter((job) => {
      const search =
        job.jobTitle?.toLowerCase().includes(keyword.toLowerCase()) ||
        job.companyName?.toLowerCase().includes(keyword.toLowerCase());

      const city =
        location === "" ||
        job.city?.toLowerCase().includes(location.toLowerCase());

      const type = jobType === "All" || job.employmentType === jobType;

      const categoryMatch =
        category === "" ||
        job.category?.toLowerCase() === category.toLowerCase();

      return search && city && type && categoryMatch;
    });
  }, [jobsData, keyword, location, jobType, category]);
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-950 flex justify-center items-center">
          <h1 className="text-white text-2xl">Loading Jobs...</h1>
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-slate-950 flex justify-center items-center">
          <h1 className="text-red-500 text-2xl">{error}</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-slate-950 pt-20 pb-24 lg:pb-0 min-h-screen">
        {/* Hero */}

        <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-20 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Browse Jobs
            </h1>

            <p className="text-slate-400 mt-4 text-sm sm:text-base">
              Discover thousands of verified jobs from top companies.
            </p>

            <div
              className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-4 
    gap-4 
    bg-slate-900 
    mt-8 
    sm:mt-10 
    rounded-2xl 
    p-4 
    sm:p-5
  "
            >
              {/* Job Search */}

              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  placeholder="Job title..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="
          w-full 
          h-12
          bg-slate-950 
          border 
          border-slate-700 
          rounded-xl 
          pl-12 
          pr-4
          text-white 
          outline-none 
          focus:border-emerald-500
        "
                />
              </div>

              {/* Location */}

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="
          w-full
          h-12
          bg-slate-950 
          border 
          border-slate-700 
          rounded-xl 
          pl-12
          pr-4
          text-white 
          outline-none 
          focus:border-emerald-500
        "
                />
              </div>

              {/* Job Type */}

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="
        w-full
        h-12
        bg-slate-950 
        border 
        border-slate-700 
        rounded-xl 
        px-4 
        text-white
        outline-none
        focus:border-emerald-500
      "
              >
                <option>All</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>

              {/* Search Button */}

              <button
                className="
        w-full
        h-12
        bg-emerald-500 
        hover:bg-emerald-600 
        rounded-xl 
        text-white 
        font-semibold
        transition
      "
              >
                Search Jobs
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}

          <aside className="hidden lg:block bg-slate-900 rounded-2xl border border-slate-800 p-5 lg:p-6 h-fit lg:sticky lg:top-24">
            <h2 className="text-white text-xl font-semibold flex items-center gap-2">
              <FaFilter />
              Filters
            </h2>

            <div className="mt-8">
              <h3 className="text-white mb-3">Experience</h3>

              {["Fresher", "1+ Years", "2+ Years", "3+ Years", "5+ Years"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 text-slate-300 mb-3"
                  >
                    <input type="checkbox" />
                    {item}
                  </label>
                ),
              )}

              <h3 className="text-white mt-8 mb-3">Work Mode</h3>

              {["Remote", "Hybrid", "Office"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-slate-300 mb-3"
                >
                  <input type="checkbox" />
                  {item}
                </label>
              ))}
            </div>
          </aside>

          {/* Job List */}

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                {filteredJobs.length} Jobs Found
              </h2>

              <select className="w-full sm:w-56 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white">
                <option>Newest</option>
                <option>Highest Salary</option>
                <option>Relevant</option>
              </select>
            </div>{" "}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className="
    bg-slate-900 
    border 
    border-slate-800 
    rounded-xl 
    p-4 
    sm:p-6
    hover:border-emerald-500 
    hover:-translate-y-1 
    transition-all 
    duration-300 
    cursor-pointer
  "
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-5">
                    {/* LEFT SECTION */}

                    <div className="flex gap-3 sm:gap-5">
                      <img
                        src={
                          job.companyLogo || "https://via.placeholder.com/100"
                        }
                        alt={job.companyName}
                        className="
    w-12 h-12
    sm:w-16 sm:h-16
    rounded-lg
    bg-white
    p-2
    object-contain
    shrink-0
  "
                      />

                      <div className="min-w-0">
                        <div className="flex items-start gap-2 flex-wrap">
                          <h3
                            className="
text-base
sm:text-xl
font-bold
text-white
leading-tight
"
                          >
                            {job.jobTitle}
                          </h3>

                          {job.featured && (
                            <span
                              className="
bg-yellow-500 
text-black 
text-[10px]
sm:text-xs
px-2
py-1
rounded-full
font-bold
"
                            >
                              Featured
                            </span>
                          )}
                        </div>

                        <div
                          className="
flex 
items-center 
gap-2 
mt-2 
text-sm
text-slate-300
"
                        >
                          <FaBuilding className="text-xs" />

                          <span className="truncate">{job.companyName}</span>

                          <FaCheckCircle className="text-emerald-500 text-xs" />
                        </div>

                        <div
                          className="
grid
grid-cols-1
sm:grid-cols-2
gap-2
mt-4
text-xs
sm:text-sm
text-slate-400
"
                        >
                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt />
                            {job.city}, {job.state}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaBriefcase />
                            {job.employmentType}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaMoneyBillWave />₹
                            {job.salaryMin?.toLocaleString()} - ₹
                            {job.salaryMax?.toLocaleString()}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaClock />
                            {job.posted || "Recently"}
                          </span>
                        </div>

                        <div
                          className="
flex 
flex-wrap 
gap-2
mt-4
"
                        >
                          {job.skills?.slice(0, 4).map((skill) => (
                            <span
                              key={skill}
                              className="
px-2
py-1
sm:px-3
sm:py-2
rounded-lg
bg-slate-800
text-slate-300
text-[11px]
sm:text-xs
"
                            >
                              {skill}
                            </span>
                          ))}

                          {job.skills?.length > 4 && (
                            <span
                              className="
px-2
py-1
rounded-lg
bg-slate-800
text-slate-400
text-xs
"
                            >
                              +{job.skills.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT SECTION */}

                    <div
                      className="
flex
flex-row
lg:flex-col
justify-between
items-center
lg:items-end
gap-3
"
                    >
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="
w-9
h-9
sm:w-12
sm:h-12
rounded-lg
bg-slate-800
hover:bg-emerald-500
transition
flex
items-center
justify-center
text-white
"
                      >
                        <FaBookmark className="text-sm" />
                      </button>

                      <div
                        className="
text-left
lg:text-right
"
                      >
                        <p
                          className="
text-emerald-400
font-bold
text-sm
sm:text-xl
"
                        >
                          {job.salary ||
                            `₹${job.salaryMin?.toLocaleString()} - ₹${job.salaryMax?.toLocaleString()}`}
                        </p>

                        <p
                          className="
text-slate-500
text-xs
sm:text-sm
mt-1
"
                        >
                          {job.experience}
                        </p>
                      </div>

                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="bg-emerald-500hover:bg-emerald-600text-whitefont-semiboldpx-4py-2sm:px-6sm:py-3rounded-lgtext-smtransition"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex flex-wrap justify-center items-center mt-10 gap-2 sm:gap-3">
              <button className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-emerald-500 transition">
                Previous
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition ${
                    page === 1
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-900 border border-slate-700 text-white hover:bg-emerald-500"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white hover:bg-emerald-500 transition">
                Next
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Bottom Filter */}

        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 p-4">
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-slate-800 text-white py-3 rounded-xl font-semibold">
              <FaFilter />
              Filters
            </button>

            <button className="flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-semibold">
              <FaSearch />
              Search
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
