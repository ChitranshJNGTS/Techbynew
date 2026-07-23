import {
  FaBriefcase,
  FaBuilding,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";

export default function WhatWeDo() {
  const services = [
    {
      icon: <FaBriefcase />,
      title: "Job Opportunities",
      description:
        "Explore thousands of verified job openings from startups, MNCs, and leading companies across various industries.",
    },
    {
      icon: <FaBuilding />,
      title: "Employer Hiring",
      description:
        "Help companies find skilled candidates quickly through an easy-to-use hiring platform and applicant management system.",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Mock Interviews",
      description:
        "Practice technical and HR interviews with experienced professionals to improve confidence before real interviews.",
    },
    {
      icon: <FaFileAlt />,
      title: "Resume Assistance",
      description:
        "Build a professional resume and receive expert suggestions to increase your chances of getting shortlisted.",
    },
    {
      icon: <FaUserGraduate />,
      title: "Career Guidance",
      description:
        "Get career advice, interview tips, industry insights, and personalized guidance to achieve your professional goals.",
    },
    {
      icon: <FaUsers />,
      title: "Skill Development",
      description:
        "Prepare yourself for the latest industry requirements through learning resources, assessments, and interview preparation.",
    },
  ];

  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-emerald-400 font-semibold uppercase tracking-widest">
            What We Do
          </span>

          <h2 className="text-5xl font-bold text-white mt-5">
            Helping Talent Meet Opportunity
          </h2>

          <p className="text-slate-400 mt-6 text-lg leading-8">
            Our platform is built to bridge the gap between job seekers and
            employers. Whether you're looking for your dream job or searching
            for the perfect candidate, we provide everything you need to make
            the hiring journey simple, fast, and successful.
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500 hover:-translate-y-2 transition duration-300"
            >

              <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-white text-2xl">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mt-8">
                {service.title}
              </h3>

              <p className="text-slate-400 mt-5 leading-8">
                {service.description}
              </p>

            </div>

          ))}

        </div>

        {/* Bottom Section */}

        <div className="mt-24 bg-gradient-to-r from-emerald-500 to-green-600 rounded-[35px] p-12 lg:p-16 text-center">

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Our Platform Serves Everyone
          </h2>

          <p className="text-green-100 max-w-4xl mx-auto mt-6 text-lg leading-8">
            We are more than just a job portal. We support fresh graduates,
            experienced professionals, recruiters, startups, and enterprises by
            providing verified job listings, recruitment solutions, mock
            interviews, resume support, career guidance, and tools that help
            both candidates and employers achieve success.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14">

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-white">15K+</h3>
              <p className="text-green-100 mt-2">Jobs Posted</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-white">5K+</h3>
              <p className="text-green-100 mt-2">Companies</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-white">120K+</h3>
              <p className="text-green-100 mt-2">Candidates</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-6">
              <h3 className="text-4xl font-bold text-white">98%</h3>
              <p className="text-green-100 mt-2">Hiring Success</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}