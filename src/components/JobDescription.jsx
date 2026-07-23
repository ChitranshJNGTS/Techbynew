import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaMoneyBillWave,
  FaGlobe,
  FaEnvelope,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../Api/JobApi";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function JobDescription() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    getJob();
  }, []);

  const getJob = async () => {
    try {
      setLoading(true);

      const { data } = await API.get(`/jobs/${id}`);

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

  const applyJob = async () => {
  try {
    setApplying(true);

    const token = localStorage.getItem("token");

    const { data } = await API.post(
      `/applications/apply/${job._id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Failed to apply."
    );
  } finally {
    setApplying(false);
  }
};

  if (loading) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-white">
            Loading Job...
          </h1>
        </div>
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex justify-center items-center">
          <h1 className="text-red-500 text-2xl">
            {error}
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-slate-100 min-h-screen pt-24 pb-16">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}

            <div className="lg:col-span-2 space-y-8">

              {/* Job Header */}

              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

                <div className="flex flex-col lg:flex-row justify-between gap-8">

                  <div>

                    <div className="flex flex-wrap gap-3 mb-5">

                      <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {job.employmentType}
                      </span>

                      <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {job.workMode}
                      </span>

                      {job.featured && (
                        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      )}

                      {job.urgentHiring && (
                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold">
                          Urgent Hiring
                        </span>
                      )}

                    </div>

                    <h1 className="text-4xl font-bold text-slate-800">
                      {job.jobTitle}
                    </h1>

                    <div className="flex flex-wrap gap-5 mt-6 text-slate-600">

                      <span className="flex items-center gap-2">
                        <FaBriefcase className="text-emerald-500" />
                        {job.experience}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-emerald-500" />
                        {job.city}, {job.state}, {job.country}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-emerald-500" />
                        ₹{job.salaryMin?.toLocaleString()} -
                        ₹{job.salaryMax?.toLocaleString()}
                      </span>

                    </div>

                  </div>

               <button
  onClick={applyJob}
  disabled={applying}
  className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-xl h-fit transition disabled:opacity-50"
>
  {applying ? "Applying..." : "Apply Now"}
</button>
                </div>

              </div>

              {/* Company Card */}

              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

                <div className="flex flex-col md:flex-row gap-6">

                  <img
                    src={
                      job.companyLogo ||
                      "https://via.placeholder.com/120"
                    }
                    alt={job.companyName}
                    className="w-28 h-28 rounded-2xl border bg-white object-contain p-3"
                  />

                  <div className="flex-1">

                    <div className="flex items-center gap-3">

                      <h2 className="text-3xl font-bold text-slate-800">
                        {job.companyName}
                      </h2>

                      <FaCheckCircle className="text-emerald-500 text-xl" />

                    </div>

                    <p className="text-slate-500 mt-2">
                      Hiring talented professionals.
                    </p>

                    <div className="grid md:grid-cols-2 gap-5 mt-8">

                      <div className="flex items-center gap-3 text-slate-700">

                        <FaGlobe className="text-emerald-500" />

                        <a
                          href={job.companyWebsite}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-emerald-600 break-all"
                        >
                          {job.companyWebsite}
                        </a>

                      </div>

                      <div className="flex items-center gap-3 text-slate-700">

                        <FaEnvelope className="text-emerald-500" />

                        <span>{job.companyEmail}</span>

                      </div>

                      {job.companyPhone && (
                        <div className="flex items-center gap-3 text-slate-700">

                          <FaPhoneAlt className="text-emerald-500" />

                          <span>{job.companyPhone}</span>

                        </div>
                      )}

                      <div className="flex items-center gap-3 text-slate-700">

                        <FaMapMarkerAlt className="text-emerald-500" />

                        <span>
                          {job.officeAddress}, {job.city}
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Part 2 Starts Here */}{/* Job Summary */}

<div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

  <h2 className="text-3xl font-bold text-slate-800 mb-6">
    Job Summary
  </h2>

  <p className="text-slate-600 leading-8 whitespace-pre-line">
    {job.jobSummary}
  </p>

</div>

{/* Responsibilities */}

<div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

  <h2 className="text-3xl font-bold text-slate-800 mb-6">
    Responsibilities
  </h2>

  <div className="text-slate-600 leading-8 whitespace-pre-line">
    {job.responsibilities}
  </div>

</div>

{/* Requirements */}

<div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

  <h2 className="text-3xl font-bold text-slate-800 mb-6">
    Requirements
  </h2>

  <div className="text-slate-600 leading-8 whitespace-pre-line">
    {job.requirements}
  </div>

</div>

{/* Skills */}

<div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

  <div className="flex justify-between items-center mb-8">

    <h2 className="text-3xl font-bold text-slate-800">
      Required Skills
    </h2>

    <span className="text-slate-500">
      {job.skills?.length || 0} Skills
    </span>

  </div>

  <div className="flex flex-wrap gap-4">

    {job.skills?.map((skill) => (

      <span
        key={skill}
        className="px-5 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium hover:bg-emerald-500 hover:text-white transition"
      >
        {skill}
      </span>

    ))}

  </div>

</div>

{/* Benefits */}

<div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

  <h2 className="text-3xl font-bold text-slate-800 mb-6">
    Benefits
  </h2>

  <div className="text-slate-600 leading-8 whitespace-pre-line">
    {job.benefits || "Benefits will be discussed during the interview."}
  </div>

</div>


            </div>

            {/* RIGHT SIDEBAR */}

            <div className="space-y-8">

              {/* Job Overview */}

              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 ">

                <h2 className="text-2xl font-bold text-slate-800 mb-8">
                  Job Overview
                </h2>

                <div className="space-y-6">

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-slate-500">
                      <FaClock className="text-emerald-500" />
                      Posted
                    </span>

                    <span className="font-semibold text-slate-800">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-slate-500">
                      <FaClock className="text-emerald-500" />
                      Deadline
                    </span>

                    <span className="font-semibold text-slate-800">
                      {new Date(
                        job.applicationDeadline
                      ).toLocaleDateString()}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-slate-500">
                      <FaMapMarkerAlt className="text-emerald-500" />
                      Location
                    </span>

                    <span className="font-semibold text-slate-800 text-right">
                      {job.city}, {job.state}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-slate-500">
                      <FaBriefcase className="text-emerald-500" />
                      Experience
                    </span>

                    <span className="font-semibold text-slate-800">
                      {job.experience}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-slate-500">
                      <FaBriefcase className="text-emerald-500" />
                      Employment
                    </span>

                    <span className="font-semibold text-slate-800">
                      {job.employmentType}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-slate-500">
                      <FaBriefcase className="text-emerald-500" />
                      Work Mode
                    </span>

                    <span className="font-semibold text-slate-800">
                      {job.workMode}
                    </span>

                  </div>

                  <div className="flex justify-between items-center">

                    <span className="flex items-center gap-2 text-slate-500">
                      <FaMoneyBillWave className="text-emerald-500" />
                      Salary
                    </span>

                    <span className="font-semibold text-emerald-600 text-right">
                      ₹{job.salaryMin?.toLocaleString()} -
                      ₹{job.salaryMax?.toLocaleString()}
                    </span>

                  </div>

                </div>

               <button
  onClick={applyJob}
  disabled={applying}
  className="w-full mt-10 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition disabled:opacity-50"
>
  {applying ? "Applying..." : "Apply Now"}
</button>

              </div>

              {/* Company Overview */}

              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8">

                <h2 className="text-2xl font-bold text-slate-800 mb-6">
                  Company Details
                </h2>

                <div className="space-y-5">

                  <div>

                    <p className="text-slate-500 text-sm">
                      Company
                    </p>

                    <h3 className="font-semibold text-slate-800">
                      {job.companyName}
                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Email
                    </p>

                    <h3 className="font-semibold text-slate-800 break-all">
                      {job.companyEmail}
                    </h3>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Website
                    </p>

                    <a
                      href={job.companyWebsite}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-600 hover:underline break-all"
                    >
                      {job.companyWebsite}
                    </a>

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Office Address
                    </p>

                    <h3 className="font-semibold text-slate-800">
                      {job.officeAddress}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </>

  );
}