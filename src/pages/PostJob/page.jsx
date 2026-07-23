import { useState } from "react";
import API from "../../Api/JobApi";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import AdminApplications from "../../components/AdminApplications";
import AdminCreateInterview from "../../components/AdminCreateInterview";

export default function PostJob() {
  const initialState = {
    companyName: "",
    companyWebsite: "",
    companyEmail: "",
    companyLogo: null,

    jobTitle: "",
    category: "",
    employmentType: "",
    workMode: "",
    experience: "",

    salaryMin: "",
    salaryMax: "",

    country: "",
    state: "",
    city: "",
    pinCode: "",
    address: "",

    jobSummary: "",
    responsibilities: "",
    requirements: "",

    skills: "",
    benefits: "",

    vacancies: "",
    applicationDeadline: "",
    joiningDate: "",
  };

  const [job, setJob] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setJob((prev) => ({
      ...prev,
      companyLogo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(job).forEach((key) => {
        formData.append(key, job[key]);
      });

      const res = await API.post("/jobs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message || "Job posted successfully!");

      setJob(initialState);
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <>
      <Navbar />

<AdminCreateInterview/>
<AdminApplications/>
      <section className="bg-slate-950 min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}

          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
              Recruiter Portal
            </span>

            <h1 className="text-5xl font-bold text-white mt-6">
              Post a New Job
            </h1>

            <p className="text-slate-400 max-w-3xl mx-auto mt-5 text-lg leading-8">
              Reach thousands of skilled candidates by publishing your job
              opening on WorkScout.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* FORM START */}

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-2 space-y-8"
            >
              {/* Company Information */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Company Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-300 mb-2">
                      Company Name
                    </label>

                    <input
                      type="text"
                      name="companyName"
                      value={job.companyName}
                      onChange={handleChange}
                      placeholder="Google"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Company Website
                    </label>

                    <input
                      type="url"
                      name="companyWebsite"
                      value={job.companyWebsite}
                      onChange={handleChange}
                      placeholder="https://company.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Company Email
                    </label>

                    <input
                      type="email"
                      name="companyEmail"
                      value={job.companyEmail}
                      onChange={handleChange}
                      placeholder="hr@company.com"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-2">
                      Company Logo
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-white file:bg-emerald-500 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Job Details Starts Here */}              {/* Job Details */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Job Details
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-slate-300 block mb-2">
                      Job Title
                    </label>

                    <input
                      type="text"
                      name="jobTitle"
                      value={job.jobTitle}
                      onChange={handleChange}
                      placeholder="Senior React Developer"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Category
                    </label>

                    <select
                      name="category"
                      value={job.category}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white"
                    >
                      <option value="">Select Category</option>
                      <option>Software Development</option>
                      <option>UI/UX Design</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Finance</option>
                      <option>Human Resources</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Employment Type
                    </label>

                    <select
                      name="employmentType"
                      value={job.employmentType}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white"
                    >
                      <option value="">Select</option>
                      <option>Full Time</option>
                      <option>Part Time</option>
                      <option>Internship</option>
                      <option>Contract</option>
                      <option>Freelance</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Work Mode
                    </label>

                    <select
                      name="workMode"
                      value={job.workMode}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white"
                    >
                      <option value="">Select</option>
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On Site</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Experience Required
                    </label>

                    <select
                      name="experience"
                      value={job.experience}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white"
                    >
                      <option value="">Select</option>
                      <option>Fresher</option>
                      <option>1+ Years</option>
                      <option>2+ Years</option>
                      <option>3+ Years</option>
                      <option>5+ Years</option>
                      <option>10+ Years</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Minimum Salary (₹)
                    </label>

                    <input
                      type="number"
                      name="salaryMin"
                      value={job.salaryMin}
                      onChange={handleChange}
                      placeholder="500000"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Maximum Salary (₹)
                    </label>

                    <input
                      type="number"
                      name="salaryMax"
                      value={job.salaryMax}
                      onChange={handleChange}
                      placeholder="1200000"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Job Location */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Job Location
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-slate-300 block mb-2">
                      Country
                    </label>

                    <input
                      type="text"
                      name="country"
                      value={job.country}
                      onChange={handleChange}
                      placeholder="India"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      State
                    </label>

                    <input
                      type="text"
                      name="state"
                      value={job.state}
                      onChange={handleChange}
                      placeholder="Karnataka"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      City
                    </label>

                    <input
                      type="text"
                      name="city"
                      value={job.city}
                      onChange={handleChange}
                      placeholder="Bangalore"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Pin Code
                    </label>

                    <input
                      type="text"
                      name="pinCode"
                      value={job.pinCode}
                      onChange={handleChange}
                      placeholder="560001"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-slate-300 block mb-2">
                      Office Address
                    </label>

                    <textarea
                      rows={3}
                      name="address"
                      value={job.address}
                      onChange={handleChange}
                      placeholder="Enter complete office address..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white resize-none outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Job Description Starts Here */}              {/* Job Description */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Job Description
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="text-slate-300 block mb-2">
                      Job Summary
                    </label>

                    <textarea
                      rows={6}
                      name="jobSummary"
                      value={job.jobSummary}
                      onChange={handleChange}
                      placeholder="Write a brief overview about the job..."
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white resize-none outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Responsibilities
                    </label>

                    <textarea
                      rows={8}
                      name="responsibilities"
                      value={job.responsibilities}
                      onChange={handleChange}
                      placeholder="• Develop React applications&#10;• Work with REST APIs&#10;• Collaborate with designers"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white resize-none outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Requirements
                    </label>

                    <textarea
                      rows={8}
                      name="requirements"
                      value={job.requirements}
                      onChange={handleChange}
                      placeholder="• React.js&#10;• JavaScript&#10;• Redux Toolkit&#10;• Git"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white resize-none outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Required Skills */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Required Skills
                </h2>

                <input
                  type="text"
                  name="skills"
                  value={job.skills}
                  onChange={handleChange}
                  placeholder="React, JavaScript, Node.js, MongoDB..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                />

                <p className="text-slate-500 mt-3 text-sm">
                  Separate multiple skills with commas.
                </p>
              </div>

              {/* Company Benefits */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Company Benefits
                </h2>

                <textarea
                  rows={6}
                  name="benefits"
                  value={job.benefits}
                  onChange={handleChange}
                  placeholder="Health Insurance, Work From Home, Paid Leave, Performance Bonus..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white resize-none outline-none focus:border-emerald-500"
                />
              </div>

              {/* Hiring Information */}

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-8">
                  Hiring Information
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-slate-300 block mb-2">
                      Open Positions
                    </label>

                    <input
                      type="number"
                      name="vacancies"
                      value={job.vacancies}
                      onChange={handleChange}
                      placeholder="5"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Application Deadline
                    </label>

                    <input
                      type="date"
                      name="applicationDeadline"
                      value={job.applicationDeadline}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-2">
                      Joining Date
                    </label>

                    <input
                      type="date"
                      name="joiningDate"
                      value={job.joiningDate}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 text-white font-semibold py-4 rounded-xl"
              >
                Post Job
              </button>

            </form>

            {/* Sidebar Starts Here */}            {/* Sidebar */}

            <div className="space-y-6">
              <div className="top-28 bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h2 className="text-white text-2xl font-bold mb-6">
                  Posting Tips
                </h2>

                <ul className="space-y-4 text-slate-300">
                  <li>✅ Use a clear and searchable job title.</li>

                  <li>✅ Mention an accurate salary range.</li>

                  <li>✅ Add all required technical and soft skills.</li>

                  <li>✅ Write a detailed job summary and responsibilities.</li>

                  <li>✅ Include application deadline and joining date.</li>

                  <li>✅ Highlight company culture and employee benefits.</li>
                </ul>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Before You Publish
                </h3>

                <ul className="space-y-3 text-slate-400 text-sm">
                  <li>✔ Verify company email address.</li>
                  <li>✔ Upload a high-quality company logo.</li>
                  <li>✔ Double-check salary and location.</li>
                  <li>✔ Review spelling and grammar.</li>
                  <li>✔ Ensure job requirements are complete.</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}