// import {
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
//   FaBriefcase,
//   FaArrowRight,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const jobs = [
//   {
//     id: 1,
//     color: "border-l-violet-500",
//     logo: "https://logo.clearbit.com/google.com",
//     company: "Google",
//     title: "Senior React Developer",
//     location: "Bangalore, India",
//     salary: "₹18 - ₹28 LPA",
//     tags: ["Full Time", "Remote"],
//   },
//   {
//     id: 2,
//     color: "border-l-red-500",
//     logo: "https://logo.clearbit.com/amazon.com",
//     company: "Amazon",
//     title: "Frontend Engineer",
//     location: "Hyderabad, India",
//     salary: "₹22 - ₹35 LPA",
//     tags: ["Full Time", "Hybrid"],
//   },
//   {
//     id: 3,
//     color: "border-l-green-500",
//     logo: "https://logo.clearbit.com/microsoft.com",
//     company: "Microsoft",
//     title: "UI/UX Designer",
//     location: "Noida, India",
//     salary: "₹12 - ₹18 LPA",
//     tags: ["Remote"],
//   },
//   {
//     id: 4,
//     color: "border-l-yellow-400",
//     logo: "https://logo.clearbit.com/adobe.com",
//     company: "Adobe",
//     title: "Node.js Developer",
//     location: "Pune, India",
//     salary: "₹15 - ₹24 LPA",
//     tags: ["Internship"],
//   },
//   {
//     id: 5,
//     color: "border-l-blue-500",
//     logo: "https://logo.clearbit.com/netflix.com",
//     company: "Netflix",
//     title: "Backend Engineer",
//     location: "Remote",
//     salary: "₹30 - ₹45 LPA",
//     tags: ["Full Time"],
//   },
// ];

// const badgeColor = (tag) => {
//   switch (tag) {
//     case "Full Time":
//       return "bg-blue-100 text-blue-600";
//     case "Remote":
//       return "bg-purple-100 text-purple-600";
//     case "Hybrid":
//       return "bg-green-100 text-green-600";
//     case "Internship":
//       return "bg-yellow-100 text-yellow-700";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };

// export default function RecentJobs() {
//   const featured = jobs[0];

//   return (
//     <section className="bg-slate-950 py-20">
//       <div className="max-w-7xl mx-auto px-6">

//         <div className="grid lg:grid-cols-3 gap-10">

//           {/* Recent Jobs */}

//           <div className="lg:col-span-2">

//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-4xl font-bold text-white">
//                 Recent Jobs
//               </h2>

//               <button className="text-emerald-400 hover:text-white">
//                 View All
//               </button>
//             </div>

//             <div className="space-y-5">

//               {jobs.map((job) => (
//                <Link
//   key={job.id}
//   to={`/jobs/${job.id}`}
//   className={`block bg-slate-900 rounded-2xl border-l-4 ${job.color}
//   border border-slate-800 p-6 hover:border-emerald-500
//   transition duration-300 hover:-translate-y-1`}
// >
//                   <div className="flex flex-col md:flex-row justify-between gap-6">

//                     <div className="flex gap-5">

//                       <img
//                         src={job.logo}
//                         alt={job.company}
//                         className="w-16 h-16 rounded-xl bg-white object-contain p-2"
//                       />

//                       <div>

//                         <h3 className="text-white text-xl font-semibold">
//                           {job.title}
//                         </h3>

//                         <div className="flex flex-wrap gap-5 mt-3 text-slate-400 text-sm">

//                           <span className="flex items-center gap-2">
//                             <FaBriefcase />
//                             {job.company}
//                           </span>

//                           <span className="flex items-center gap-2">
//                             <FaMapMarkerAlt />
//                             {job.location}
//                           </span>

//                           <span className="flex items-center gap-2">
//                             <FaMoneyBillWave />
//                             {job.salary}
//                           </span>

//                         </div>

//                       </div>

//                     </div>

//                     <div className="flex gap-2 flex-wrap items-start">

//                       {job.tags.map((tag) => (
//                         <span
//                           key={tag}
//                           className={`px-3 py-2 rounded-lg text-xs font-semibold ${badgeColor(
//                             tag
//                           )}`}
//                         >
//                           {tag}
//                         </span>
//                       ))}

//                     </div>

//                   </div>
//                 </Link>
//               ))}

//             </div>

//             <div className="text-center mt-10">
//               <Link to={"/all-jobs"} className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition">
//                 Browse All Jobs
//               </Link>
//             </div>

//           </div>

//           {/* Featured Job */}

//           <div>

//             <h2 className="text-4xl font-bold text-white mb-8">
//               Featured Job
//             </h2>

//             <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 sticky top-24">

//               <img
//                 src={featured.logo}
//                 alt=""
//                 className="w-20 h-20 bg-white rounded-xl p-3"
//               />

//               <h3 className="text-2xl font-bold text-white mt-6">
//                 {featured.title}
//               </h3>

//               <p className="text-emerald-400 mt-2">
//                 {featured.company}
//               </p>

//               <div className="space-y-4 mt-8 text-slate-400">

//                 <p className="flex items-center gap-3">
//                   <FaMapMarkerAlt />
//                   {featured.location}
//                 </p>

//                 <p className="flex items-center gap-3">
//                   <FaMoneyBillWave />
//                   {featured.salary}
//                 </p>

//               </div>

//               <div className="flex gap-2 mt-8">

//                 {featured.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className={`px-3 py-2 rounded-lg text-xs font-semibold ${badgeColor(
//                       tag
//                     )}`}
//                   >
//                     {tag}
//                   </span>
//                 ))}

//               </div>

//               <p className="text-slate-400 mt-8 leading-7">
//                 Join one of the world's leading technology companies and work
//                 on modern web applications using React, TypeScript, and cloud
//                 technologies.
//               </p>

//              <Link
//   to={`/jobs/${featured.id}`}
//   className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition"
// >
//   Apply Now
//   <FaArrowRight />
// </Link>

//             </div>

//           </div>

//         </div>

//       </div>
//     </section>
//   );
// }
















import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../Api/JobApi";

const badgeColor = (tag) => {
  switch (tag) {
    case "Full Time":
      return "px-3 py-2 rounded-lg text-xs font-semibold bg-blue-100 text-blue-600";
    case "Part Time":
      return "px-3 py-2 rounded-lg text-xs font-semibold bg-indigo-100 text-indigo-600";
    case "Internship":
      return "px-3 py-2 rounded-lg text-xs font-semibold bg-yellow-100 text-yellow-700";
    case "Remote":
      return "px-3 py-2 rounded-lg text-xs font-semibold bg-purple-100 text-purple-600";
    case "Hybrid":
      return "px-3 py-2 rounded-lg text-xs font-semibold bg-green-100 text-green-600";
    case "Office":
      return "px-3 py-2 rounded-lg text-xs font-semibold bg-red-100 text-red-600";
    default:
      return "px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600";
  }
};

export default function RecentJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentJobs();
  }, []);

  const getRecentJobs = async () => {
    try {
      const { data } = await API.get("/jobs");

      if (data.success) {
        setJobs(data.jobs.slice(0, 5));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-emerald-500 border-r-emerald-400 animate-spin"></div>
          </div>
        </div>
      </section>
    );
  }

  // No jobs
  if (jobs.length === 0) {
    return (
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-slate-800 flex items-center justify-center">
              <FaSearch className="text-emerald-400 text-2xl" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">
              No Jobs Available
            </h2>

            <p className="text-slate-400 max-w-md mx-auto leading-7">
              We don't have any job openings available right now. Check back
              soon for new opportunities.
            </p>

            <Link
              to="/all-jobs"
              className="inline-flex mt-7 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const featured = jobs[0];

  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-white">
                Recent Jobs
              </h2>

              <Link
                to="/all-jobs"
                className="text-emerald-400 hover:text-white transition"
              >
                View All
              </Link>
            </div>

            <div className="space-y-5">
              {jobs.map((job) => (
                <Link
                  key={job._id}
                  to={`/jobs/${job._id}`}
                  className="block bg-slate-900 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-800 p-6 hover:border-emerald-500 transition duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">

                    <div className="flex gap-5">
                      <img
                        src={
                          job.companyLogo ||
                          "https://via.placeholder.com/80"
                        }
                        alt={job.companyName}
                        className="w-16 h-16 rounded-xl bg-white object-contain p-2"
                      />

                      <div>
                        <h3 className="text-white text-xl font-semibold">
                          {job.jobTitle}
                        </h3>

                        <div className="flex flex-wrap gap-5 mt-3 text-slate-400 text-sm">

                          <span className="flex items-center gap-2">
                            <FaBriefcase />
                            {job.companyName}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaMapMarkerAlt />
                            {job.city}, {job.state}
                          </span>

                          <span className="flex items-center gap-2">
                            <FaMoneyBillWave />
                            ₹{job.salaryMin?.toLocaleString()} - ₹
                            {job.salaryMax?.toLocaleString()}
                          </span>

                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 flex-wrap items-start">
                      <span className={badgeColor(job.employmentType)}>
                        {job.employmentType}
                      </span>

                      <span className={badgeColor(job.workMode)}>
                        {job.workMode}
                      </span>
                    </div>

                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/all-jobs"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition inline-flex items-center gap-2"
              >
                Browse All Jobs
                <FaArrowRight />
              </Link>
            </div>
          </div>

          {/* Featured Job */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">
              Featured Job
            </h2>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 sticky top-24">

              <img
                src={
                  featured.companyLogo ||
                  "https://via.placeholder.com/100"
                }
                className="w-20 h-20 bg-white rounded-xl p-3 object-contain"
                alt={featured.companyName}
              />

              <h3 className="text-2xl font-bold text-white mt-6">
                {featured.jobTitle}
              </h3>

              <p className="text-emerald-400 mt-2">
                {featured.companyName}
              </p>

              <div className="space-y-4 mt-8 text-slate-400">

                <p className="flex items-center gap-3">
                  <FaMapMarkerAlt />
                  {featured.city}, {featured.state}
                </p>

                <p className="flex items-center gap-3">
                  <FaMoneyBillWave />
                  ₹{featured.salaryMin?.toLocaleString()} - ₹
                  {featured.salaryMax?.toLocaleString()}
                </p>

              </div>

              <div className="flex gap-2 mt-8 flex-wrap">
                <span className={badgeColor(featured.employmentType)}>
                  {featured.employmentType}
                </span>

                <span className={badgeColor(featured.workMode)}>
                  {featured.workMode}
                </span>
              </div>

              <p className="text-slate-400 mt-8 leading-7">
                {featured.description
                  ? featured.description.substring(0, 150) + "..."
                  : "Explore this opportunity and discover more details about the role, requirements, and application process."}
              </p>

              <Link
                to={`/jobs/${featured._id}`}
                className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-2 transition"
              >
                View Job
                <FaArrowRight />
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}