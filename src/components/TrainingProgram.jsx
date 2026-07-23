import {
  FaUsers,
  FaLaptopCode,
  FaPhoneAlt,
  FaChartLine,
  FaUserTie,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const programs = [
  {
    id: 1,
    title: "React Developer Training",
    icon: <FaLaptopCode />,
    color: "from-blue-500 to-cyan-500",
    duration: "1 Month",
    timing: "Mon - Fri | 8:00 PM - 9:00 PM",
    mode: "Online Live",
    price: "₹1,999",
    booked: 12,
    total: 20,
    topics: [
      "HTML5 & CSS3",
      "JavaScript",
      "React.js",
      "REST API",
      "Projects",
      "Interview Preparation",
    ],
  },
  {
    id: 2,
    title: "Tele Sales Training",
    icon: <FaPhoneAlt />,
    color: "from-emerald-500 to-green-600",
    duration: "1 Month",
    timing: "Mon - Fri | 7:00 PM - 8:00 PM",
    mode: "Online Live",
    price: "₹999",
    booked: 18,
    total: 20,
    topics: [
      "Cold Calling",
      "Communication",
      "CRM",
      "Sales Script",
      "Lead Handling",
      "Customer Support",
    ],
  },
  {
    id: 3,
    title: "Sales Executive Training",
    icon: <FaChartLine />,
    color: "from-yellow-500 to-orange-500",
    duration: "1 Month",
    timing: "Weekend Batch",
    mode: "Online Live",
    price: "₹1,499",
    booked: 9,
    total: 20,
    topics: [
      "Lead Generation",
      "Negotiation",
      "Closing Deals",
      "Follow Up",
      "Presentation Skills",
      "Sales Strategy",
    ],
  },
  {
    id: 4,
    title: "HR Recruiter Training",
    icon: <FaUserTie />,
    color: "from-purple-500 to-pink-500",
    duration: "1 Month",
    timing: "Mon - Fri | 6:00 PM",
    mode: "Online Live",
    price: "₹1,799",
    booked: 15,
    total: 20,
    topics: [
      "LinkedIn Hiring",
      "Boolean Search",
      "ATS",
      "Resume Screening",
      "Interview Scheduling",
      "Recruitment Process",
    ],
  },
];

export default function TrainingProgram() {
  return (
    <div className="bg-slate-950 min-h-screen">

      {/* HERO */}

      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-transparent to-blue-600/20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>

              <span className="inline-block bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold">
                🚀 Limited Batch • Only 20 Students
              </span>

              <h1 className="text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight">
                Become
                <span className="text-emerald-400"> Job Ready </span>
                in Just
                <span className="text-emerald-400"> 30 Days</span>
              </h1>

              <p className="text-slate-300 text-lg leading-8 mt-8">
                Learn directly from experienced professionals, build practical
                skills, attend live mock interviews, improve your resume, and
                prepare yourself for real company interviews.
              </p>

              <div className="flex flex-wrap gap-5 mt-10">

                <button className="bg-emerald-500 hover:bg-emerald-600 transition px-8 py-4 rounded-xl text-white font-semibold">
                  Book Your Seat
                </button>

                <button className="border border-slate-700 hover:border-emerald-500 px-8 py-4 rounded-xl text-white">
                  View Programs
                </button>

              </div>

            </div>

            <div className="bg-slate-900 rounded-3xl border border-slate-800 p-10">

              <h2 className="text-3xl text-white font-bold">
                Training Highlights
              </h2>

              <div className="space-y-6 mt-10">

                {[
                  "Live Online Classes",
                  "Daily Practice Assignments",
                  "Resume Building",
                  "Mock Interviews",
                  "WhatsApp Support",
                  "Certificate of Completion",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4"
                  >
                    <FaCheckCircle className="text-emerald-400 text-xl" />

                    <p className="text-slate-300">{item}</p>
                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* WHY CHOOSE */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-white">
              Why Join Our Training Program?
            </h2>

            <p className="text-slate-400 mt-5 max-w-3xl mx-auto">
              Our training is focused on practical skills and interview
              preparation rather than only theory.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[
              {
                icon: <FaUsers />,
                title: "Industry Mentors",
                desc: "Learn from professionals working in the industry.",
              },
              {
                icon: <FaLaptopCode />,
                title: "Hands-on Projects",
                desc: "Build practical projects throughout the course.",
              },
              {
                icon: <FaUserTie />,
                title: "Mock Interviews",
                desc: "Get real interview experience with HR experts.",
              },
              {
                icon: <FaCheckCircle />,
                title: "Placement Guidance",
                desc: "Resume review and interview preparation support.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-900 rounded-2xl border border-slate-800 p-8 hover:border-emerald-500 transition"
              >
                <div className="w-16 h-16 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-2xl">
                  {item.icon}
                </div>

                <h3 className="text-white text-2xl font-semibold mt-6">
                  {item.title}
                </h3>

                <p className="text-slate-400 mt-4 leading-7">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* PROGRAMS */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold text-white">
              Available Training Programs
            </h2>

            <p className="text-slate-400 mt-4">
              Choose the training program according to your career goal.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {programs.map((program) => (
              <div
                key={program.id}
                className="bg-slate-900 rounded-3xl border border-slate-800 p-8 hover:border-emerald-500 transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center text-white text-2xl`}
                    >
                      {program.icon}
                    </div>

                    <h3 className="text-white text-2xl font-bold mt-6">
                      {program.title}
                    </h3>

                  </div>

                  <div className="text-right">

                    <p className="text-emerald-400 text-3xl font-bold">
                      {program.price}
                    </p>

                    <p className="text-slate-400 text-sm">
                      One Time Fee
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 text-slate-300">

                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    {program.duration}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaClock />
                    {program.timing}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt />
                    {program.mode}
                  </div>

                </div>

                <div className="mt-8">

                  <h4 className="text-white font-semibold mb-4">
                    You'll Learn
                  </h4>

                  <div className="grid grid-cols-2 gap-3">

                    {program.topics.map((topic) => (
                      <div
                        key={topic}
                        className="flex items-center gap-2 text-slate-300"
                      >
                        <FaCheckCircle className="text-emerald-400 text-sm" />
                        {topic}
                      </div>
                    ))}

                  </div>

                </div>

                <div className="mt-8">

                  <div className="flex justify-between text-sm text-slate-300 mb-2">
                    <span>Seats Filled</span>
                    <span>
                      {program.booked}/{program.total}
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden">

                    <div
                      className="bg-emerald-500 h-full"
                      style={{
                        width: `${(program.booked / program.total) * 100}%`,
                      }}
                    ></div>

                  </div>

                </div>

                <button className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white font-semibold flex justify-center items-center gap-3 transition">

                  Book This Batch

                  <FaArrowRight />

                </button>

              </div>
            ))}

          </div>

        </div>

      </section>
      {/* HOW IT WORKS */}

      <section className="py-24 bg-slate-900/40">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-emerald-400 font-semibold uppercase tracking-widest">
              Training Process
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-4">
              How Our Training Program Works
            </h2>

            <p className="text-slate-400 mt-5 max-w-3xl mx-auto text-lg">
              We don't just teach. We prepare you for real jobs through live
              classes, assignments, mock interviews, and career guidance.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {[
              {
                step: "01",
                title: "Book Your Seat",
                desc: "Choose your preferred training program and complete the registration.",
              },
              {
                step: "02",
                title: "Join WhatsApp Group",
                desc: "Receive your class schedule, Zoom link and daily updates.",
              },
              {
                step: "03",
                title: "Attend Live Classes",
                desc: "Join live sessions, complete assignments and clear your doubts.",
              },
              {
                step: "04",
                title: "Mock Interview",
                desc: "Give a live interview and receive detailed feedback from HR.",
              },
            ].map((item) => (

              <div
                key={item.step}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500 transition"
              >

                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white text-2xl font-bold flex items-center justify-center">
                  {item.step}
                </div>

                <h3 className="text-white text-2xl font-bold mt-6">
                  {item.title}
                </h3>

                <p className="text-slate-400 mt-4 leading-7">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* 1 MONTH TIMELINE */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-emerald-400 font-semibold uppercase">
              Course Timeline
            </span>

            <h2 className="text-5xl font-bold text-white mt-4">
              30 Days Learning Roadmap
            </h2>

          </div>

          <div className="space-y-8">

            {[
              {
                week: "Week 1",
                title: "Foundation",
                topics: [
                  "Introduction",
                  "Basic Concepts",
                  "Communication Skills",
                  "Industry Overview",
                ],
              },
              {
                week: "Week 2",
                title: "Core Skills",
                topics: [
                  "Live Practical Sessions",
                  "Assignments",
                  "Problem Solving",
                  "Daily Practice",
                ],
              },
              {
                week: "Week 3",
                title: "Projects & Real Scenarios",
                topics: [
                  "Real Company Tasks",
                  "Mini Projects",
                  "Resume Building",
                  "LinkedIn Profile",
                ],
              },
              {
                week: "Week 4",
                title: "Interview Preparation",
                topics: [
                  "Mock Interview",
                  "HR Questions",
                  "Technical Round",
                  "Career Guidance",
                ],
              },
            ].map((week) => (

              <div
                key={week.week}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-8 lg:flex justify-between items-center gap-12"
              >

                <div className="lg:w-1/3">

                  <span className="bg-emerald-500 px-4 py-2 rounded-full text-white text-sm">
                    {week.week}
                  </span>

                  <h3 className="text-3xl font-bold text-white mt-5">
                    {week.title}
                  </h3>

                </div>

                <div className="grid md:grid-cols-2 gap-4 lg:w-2/3 mt-8 lg:mt-0">

                  {week.topics.map((topic) => (

                    <div
                      key={topic}
                      className="flex items-center gap-3 bg-slate-800 rounded-xl p-4"
                    >
                      <FaCheckCircle className="text-emerald-400" />

                      <span className="text-slate-300">
                        {topic}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* WHAT YOU WILL GET */}

      <section className="py-24 bg-slate-900/40">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <h2 className="text-5xl font-bold text-white">
              What You'll Get
            </h2>

            <p className="text-slate-400 mt-5">
              Everything you need to become job-ready.
            </p>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

            {[
              "Live Online Classes",
              "Recorded Sessions",
              "Daily Assignments",
              "PDF Notes",
              "Resume Review",
              "LinkedIn Optimization",
              "Mock Interview",
              "Certificate",
              "Placement Guidance",
              "WhatsApp Support",
              "Doubt Sessions",
              "Career Mentorship",
            ].map((item) => (

              <div
                key={item}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500 transition"
              >

                <div className="flex items-center gap-4">

                  <FaCheckCircle className="text-emerald-400 text-2xl" />

                  <span className="text-white text-lg">
                    {item}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* PRICING */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center">

            <span className="text-emerald-400 uppercase font-semibold">
              Affordable Pricing
            </span>

            <h2 className="text-5xl font-bold text-white mt-4">
              Training Fees
            </h2>

          </div>

          <div className="overflow-x-auto mt-16 rounded-3xl border border-slate-800">

            <table className="w-full text-left">

              <thead className="bg-slate-900">

                <tr>

                  <th className="p-6 text-white">Program</th>

                  <th className="p-6 text-white">Duration</th>

                  <th className="p-6 text-white">Seats</th>

                  <th className="p-6 text-white">Fee</th>

                </tr>

              </thead>

              <tbody>

                {[
                  ["React Developer", "1 Month", "20", "₹1,999"],
                  ["Tele Sales", "1 Month", "20", "₹999"],
                  ["Sales Executive", "1 Month", "20", "₹1,499"],
                  ["HR Recruiter", "1 Month", "20", "₹1,799"],
                ].map((row) => (

                  <tr
                    key={row[0]}
                    className="border-t border-slate-800 hover:bg-slate-900"
                  >

                    <td className="p-6 text-white">{row[0]}</td>

                    <td className="p-6 text-slate-300">{row[1]}</td>

                    <td className="p-6 text-slate-300">{row[2]}</td>

                    <td className="p-6 text-emerald-400 font-bold text-xl">
                      {row[3]}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>
      
    </div>
  );
}