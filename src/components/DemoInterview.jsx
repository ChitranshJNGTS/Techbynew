// import { useState } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";

// const slots = [
//   { id: 1, date: "2026-07-18", time: "10:00 AM" },
//   { id: 2, date: "2026-07-18", time: "11:00 AM" },
//   { id: 3, date: "2026-07-18", time: "02:00 PM" },
//   { id: 4, date: "2026-07-19", time: "10:00 AM" },
// ];

// const packages = [
//   {
//     id: 1,
//     name: "Basic Interview",
//     price: 49,
//     duration: "30 Minutes",
//     features: ["Live Interview"],
//   },
//   {
//     id: 2,
//     name: "Interview + PDF",
//     price: 99,
//     duration: "30 Minutes",
//     features: ["Live Interview", "PDF of Q&A"],
//   },
//   {
//     id: 3,
//     name: "Premium Interview",
//     price: 149,
//     duration: "45 Minutes",
//     features: ["Live Interview", "PDF of Q&A", "Resume Review & Improvement Tips"],
//   },
// ];

// export default function DemoInterview() {
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [selectedRole, setSelectedRole] = useState("");

//   const handlePayment = () => {
//     if (!selectedSlot || !selectedPackage || !selectedRole) {
//       alert("Please select role, package, and slot!");
//       return;
//     }
//     alert(
//       `Booking confirmed!\nRole: ${selectedRole}\nPackage: ${selectedPackage.name}\nSlot: ${selectedSlot.date} at ${selectedSlot.time}\nPrice: ₹${selectedPackage.price}`
//     );
//     // Integrate Stripe/Razorpay here
//   };

//   return (
//    <>
//     <div className="bg-gradient-to-br  from-slate-950 via-slate-900 to-slate-800 min-h-screen py-32">
//       <Navbar />
//       <div className="max-w-6xl mx-auto px-6">
//         <h1 className="text-5xl font-extrabold text-center text-white mb-6 tracking-tight">
//           Book Your Demo Interview
//         </h1>
//         <p className="text-center text-slate-400 mb-12 text-lg">
//           Choose your role, package, and slot to secure your interview.
//         </p>

//         {/* Role Selection */}
//         <div className="mb-12">
//           <h2 className="text-2xl text-white font-bold mb-4">Select Interview Type</h2>
//           <select
//             value={selectedRole}
//             onChange={(e) => setSelectedRole(e.target.value)}
//             className="w-full bg-slate-800 text-white rounded-xl p-4"
//           >
//             <option value="">Select Role</option>
//             <option>React Developer</option>
//             <option>BOP Interview</option>
//             <option>Node.js Developer</option>
//             <option>Java Developer</option>
//             <option>Python Developer</option>
//             <option>Full Stack Developer</option>
//             <option>QA Engineer</option>
//           </select>
//         </div>

//         {/* Package Selection */}
//         <h2 className="text-2xl text-white font-bold mb-6">Choose a Package</h2>
//         <div className="grid md:grid-cols-3 gap-8 mb-12">
//           {packages.map((pkg) => (
//             <div
//               key={pkg.id}
//               onClick={() => setSelectedPackage(pkg)}
//               className={`cursor-pointer p-8 rounded-2xl shadow-lg transition transform hover:scale-105 ${
//                 selectedPackage?.id === pkg.id
//                   ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
//                   : "bg-slate-900 text-slate-300 hover:bg-slate-800"
//               }`}
//             >
//               <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
//               <p className="text-lg">₹{pkg.price}</p>
//               <p className="text-sm mt-2">{pkg.duration}</p>
//               <ul className="mt-4 space-y-2 text-sm">
//                 {pkg.features.map((f, i) => (
//                   <li key={i}>✔ {f}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//         {/* Slot Selection */}
//         <h2 className="text-2xl text-white font-bold mb-6">Available Slots</h2>
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {slots.map((slot) => (
//             <div
//               key={slot.id}
//               onClick={() => setSelectedSlot(slot)}
//               className={`cursor-pointer p-6 rounded-xl shadow-lg transition transform hover:scale-105 ${
//                 selectedSlot?.id === slot.id
//                   ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
//                   : "bg-slate-900 text-slate-300 hover:bg-slate-800"
//               }`}
//             >
//               <h3 className="text-xl font-bold">{slot.date}</h3>
//               <p className="text-lg">{slot.time}</p>
//               {selectedSlot?.id === slot.id && (
//                 <p className="mt-2 text-sm italic">Selected</p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Payment Button */}
//         <button
//           onClick={handlePayment}
//           className="mt-12 w-full md:w-1/2 mx-auto block bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white text-xl font-semibold shadow-lg transition"
//         >
//           {selectedSlot && selectedPackage && selectedRole
//             ? "Proceed to Payment"
//             : "Complete Selection"}
//         </button>

//         {/* Details Section */}
// <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-slate-300">
//   <h2 className="text-2xl text-white font-bold mb-6">Important Information</h2>
//   <ul className="space-y-4 text-sm leading-relaxed">
//     <li>✔ We provide professional mock interviews tailored to your chosen role (React, BOP, Java, Python, etc.).</li>
//     <li>✔ Charges cover interviewer time, preparation, and resources provided.</li>
//     <li>✔ Packages:
//       <ul className="ml-6 mt-2 list-disc">
//         <li>₹49 — 30 min live interview</li>
//         <li>₹99 — Interview + PDF of Q&A</li>
//         <li>₹149 — Interview + PDF + Resume Review</li>
//       </ul>
//     </li>
//     <li>✔ Charges are <span className="text-red-400 font-semibold">non‑refundable</span> once booking is confirmed.</li>
//     <li>✔ Payments ensure your slot is reserved and interviewer time is allocated.</li>
//     <li>✔ We aim to provide career guidance, feedback, and improvement tips to help you succeed in real interviews.</li>
//   </ul>

//   <h2 className="text-2xl text-white font-bold mt-10 mb-6">Instructions for Candidates</h2>
//   <ul className="space-y-4 text-sm leading-relaxed">
//     <li>✔ You can join the interview from either your <span className="text-emerald-400 font-semibold">phone</span> or <span className="text-emerald-400 font-semibold">laptop</span>. Ensure you have a stable internet connection.</li>
//     <li>✔ Please take the interview seriously — treat it as if you are facing a real recruiter.</li>
//     <li>✔ Be prepared before the test: revise your concepts, keep your resume ready, and join on time.</li>
//     <li>✔ Maintain a quiet environment during the interview to avoid distractions.</li>
//     <li>✔ Keep a notepad and pen handy for notes during feedback.</li>
//     <li>✔ Late arrivals may result in reduced interview time, so punctuality is important.</li>
//   </ul>
// </div>

//       </div>
//     </div>
//       <Footer/>
//       </>
//   );
// }

import {
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaVideo,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import API from "../Api/JobApi";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function BookInterview() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const { data } = await API.get("/interviews");

      if (data.success) {
        setInterviews(data.interviews);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const bookInterview = async (interview) => {
    try {
      const { data } = await API.post("/payment/create-order", {
        interviewId: interview._id,
      });
      if (!data.success) {
        alert("Unable to create payment");

        return;
      }
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Workscout",
        description: "Mock Interview Booking",
        order_id: data.order.id,
        handler: async function (response) {
          try {
            // verify payment
            const verify = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,

              razorpay_payment_id: response.razorpay_payment_id,

              razorpay_signature: response.razorpay_signature,

              interviewId: interview._id,
            });

            if (verify.data.success) {
              alert("Interview booked successfully");

              fetchInterviews();
            }
          } catch (error) {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: "",

          email: "",

          contact: "",
        },

        theme: {
          color: "#10b981",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Payment failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
        Loading Interviews...
      </div>
    );
  }
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Hero */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              🚀 Live HR Training Sessions
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold text-white mt-6 leading-tight">
              Book Your
              <span className="text-emerald-400"> Mock Interview</span>
            </h1>

            <p className="max-w-3xl mx-auto text-slate-400 mt-6 text-lg leading-8">
              Learn directly from experienced HR professionals, improve your
              interview skills, receive personalized feedback, and increase your
              chances of getting selected in your dream company.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <div className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                <FaVideo className="text-emerald-400" />
                Live Google Meet
              </div>

              <div className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                <FaUsers className="text-emerald-400" />
                Max 5 Candidates
              </div>

              <div className="px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                <FaCheckCircle className="text-emerald-400" />
                Resume Review Included
              </div>
            </div>
          </div>
          {/* Current Slot */}
         <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 rounded-3xl overflow-hidden shadow-2xl">

  <div className="grid grid-cols-1 lg:grid-cols-3">

    {/* LEFT */}

    <div className="lg:col-span-2 p-5 sm:p-8 lg:p-10">

      <span className="inline-flex items-center bg-red-500 text-white text-xs sm:text-sm px-4 py-2 rounded-full font-semibold animate-pulse">
        🔴 LIVE THIS WEEK
      </span>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-5 leading-tight">
        {interviews[0]?.title}
      </h2>

      <p className="text-slate-400 mt-4 text-sm sm:text-base lg:text-lg leading-7">
        Practice with a real HR recruiter in a small batch interview,
        receive detailed feedback, improve communication skills and
        prepare yourself for upcoming hiring drives.
      </p>

      {/* Details */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-8">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <FaCalendarAlt />
            <span>Date</span>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-white">
            {interviews[0]?.date}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <FaClock />
            <span>Time</span>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-white">
            {interviews[0]?.time}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <FaVideo />
            <span>Mode</span>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-white">
            {interviews[0]?.mode}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-3 text-emerald-400 mb-2">
            <FaUsers />
            <span>Duration</span>
          </div>

          <p className="text-lg sm:text-xl font-semibold text-white">
            {interviews[0]?.duration}
          </p>
        </div>

      </div>

      <button
        onClick={() => bookInterview(interviews[0])}
        disabled={
          interviews[0]?.bookedSeats >= interviews[0]?.totalSeats
        }
        className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition"
      >
        {interviews[0]?.bookedSeats >= interviews[0]?.totalSeats
          ? "Seats Full"
          : "Book This Interview"}
      </button>

    </div>

    {/* RIGHT */}

    <div className="bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 sm:p-8">

      {/* Recruiter */}

      <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5 text-center sm:text-left">

        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center text-3xl font-bold text-white shrink-0">
          P
        </div>

        <div>
          <h3 className="text-white text-2xl font-bold">
            {interviews[0]?.recruiter}
          </h3>

          <p className="text-emerald-400">
            {interviews[0]?.role}
          </p>

          <p className="text-slate-400 text-sm">
            {interviews[0]?.company}
          </p>
        </div>

      </div>

      {/* Info */}

      <div className="mt-8 space-y-4">

        <div className="flex justify-between text-slate-300">
          <span>Experience</span>
          <span>{interviews[0]?.experience}</span>
        </div>

        <div className="flex justify-between text-slate-300">

          <span>Rating</span>

          <div className="flex items-center gap-1 text-yellow-400">
            <FaStar />
            4.9
          </div>

        </div>

        <div className="flex justify-between items-center text-slate-300">

          <span>Price</span>

          <span className="text-emerald-400 font-bold text-2xl">
            ₹{interviews[0]?.price}
          </span>

        </div>

      </div>

      {/* Seats */}

      <div className="mt-8">

        <div className="flex justify-between text-slate-300 mb-3">
          <span>Seats Filled</span>

          <span>
            {interviews[0]?.bookedSeats}/{interviews[0]?.totalSeats}
          </span>
        </div>

        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{
              width: `${
                (interviews[0]?.bookedSeats /
                  interviews[0]?.totalSeats) *
                100
              }%`,
            }}
          />

        </div>

        <p className="text-red-400 mt-3 font-semibold text-sm">
          {interviews[0]?.totalSeats -
            interviews[0]?.bookedSeats}{" "}
          Seats Left
        </p>

      </div>

      {/* Countdown */}

      <div className="mt-8">

        <h4 className="text-white font-semibold mb-4">
          Starts In
        </h4>

        <div className="grid grid-cols-3 gap-3">

          <div className="bg-slate-800 rounded-xl py-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center">
              02
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm text-center">
              Days
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl py-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center">
              11
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm text-center">
              Hours
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl py-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-white text-center">
              25
            </h3>

            <p className="text-slate-400 text-xs sm:text-sm text-center">
              Minutes
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

</div>
          {/* Upcoming Interview Slots */}
          <div className="mt-20">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-4xl font-bold text-white">
                  Upcoming Interview Slots
                </h2>

                <p className="text-slate-400 mt-2">
                  Reserve your seat before all slots are filled.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {interviews.slice(1).map((slot, index) => (
                <div
                  key={slot._id}
                  className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500 transition duration-300"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                          Upcoming Session
                        </span>

                        <h3 className="text-2xl font-bold text-white mt-5">
                          {slot.title}
                        </h3>
                      </div>

                      <div className="text-emerald-400 font-bold text-2xl">
                        ₹{slot.price}
                      </div>
                    </div>

                    <div className="mt-8 space-y-4 text-slate-300">
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-emerald-400" />
                        {slot.date}
                      </div>

                      <div className="flex items-center gap-3">
                        <FaClock className="text-emerald-400" />
                        {slot.time}
                      </div>

                      <div className="flex items-center gap-3">
                        <FaUsers className="text-emerald-400" />
                        Seats Filled : {slot.bookedSeats}/{slot.totalSeats}
                      </div>
                    </div>

                    <div className="mt-8 p-5 rounded-2xl bg-slate-800">
                      <p className="text-slate-400 text-sm">Recruiter</p>

                      <h4 className="text-white font-bold text-xl mt-1">
                        {slot.recruiter}
                      </h4>

                      <p className="text-emerald-400 text-sm mt-1">
                        {slot.company}
                      </p>
                    </div>

                    <button
                      onClick={() => bookInterview(slot)}
                      disabled={slot.bookedSeats >= slot.totalSeats}
                      className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-700 text-white py-4 rounded-xl"
                    >
                      {slot.bookedSeats >= slot.totalSeats
                        ? "Seats Full"
                        : "Book Slot"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* What You'll Learn */}
          <div className="mt-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-white">
                What You'll Learn
              </h2>

              <p className="text-slate-400 mt-4">
                Everything required to crack modern interviews.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {[
                "Resume Review & ATS Optimization",
                "Tell Me About Yourself",
                "HR Interview Questions",
                "Technical Round Preparation",
                "Behavioral Interview Answers",
                "Communication & Confidence",
                "Salary Negotiation",
                "LinkedIn Profile Improvement",
                "Common Interview Mistakes",
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl p-7 hover:border-emerald-500 transition"
                >
                  <div className="w-14 h-14 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-5">
                    <FaCheckCircle className="text-emerald-400 text-2xl" />
                  </div>

                  <h3 className="text-white text-xl font-semibold">{item}</h3>

                  <p className="text-slate-400 mt-3 leading-7">
                    Learn practical strategies, recruiter expectations, and real
                    interview techniques used in top companies.
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Interview Process Starts Here */}
          {/* Interview Process */}
          <div className="mt-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-white">
                Interview Process
              </h2>

              <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
                Our mock interviews are designed to simulate a real company
                hiring process and provide actionable feedback.
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {[
                {
                  step: "01",
                  title: "Book Session",
                  desc: "Reserve your interview slot by completing the payment.",
                },
                {
                  step: "02",
                  title: "Resume Review",
                  desc: "Our recruiter reviews your resume before the interview.",
                },
                {
                  step: "03",
                  title: "Live Interview",
                  desc: "Attend a real interview through Google Meet or Zoom.",
                },
                {
                  step: "04",
                  title: "Feedback",
                  desc: "Receive detailed feedback on every answer and mistake.",
                },
                {
                  step: "05",
                  title: "Action Plan",
                  desc: "Get personalized tips to improve and crack interviews.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative bg-slate-900 border border-slate-800 rounded-3xl p-7 hover:border-emerald-500 transition"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>

                  <h3 className="text-white text-xl font-bold mt-6">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 mt-4 leading-7">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Success Statistics */}
          <div className="mt-24">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: "Candidates Trained" },
                { value: "500+", label: "Live Sessions" },
                { value: "95%", label: "Positive Feedback" },
                { value: "4.9★", label: "Average Rating" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center"
                >
                  <h2 className="text-5xl font-extrabold text-emerald-400">
                    {item.value}
                  </h2>

                  <p className="text-slate-400 mt-4 text-lg">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
          {/* FAQ Section Starts Here */}
          ```jsx id="n4m8xq"
          {/* FAQ Section */}
          <div className="mt-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-bold text-white">
                Frequently Asked Questions
              </h2>

              <p className="text-slate-400 mt-4">
                Everything you need to know before booking your interview.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Can freshers join this mock interview?",
                  answer:
                    "Yes. These sessions are specially designed for freshers as well as experienced professionals.",
                },
                {
                  question: "How many candidates can join one session?",
                  answer:
                    "Each batch is limited to only 5 candidates so that every participant receives detailed feedback.",
                },
                {
                  question: "Which platform is used for the interview?",
                  answer:
                    "The interview is conducted through Google Meet or Zoom. The meeting link will be shared after successful payment.",
                },
                {
                  question: "Will I receive feedback after the interview?",
                  answer:
                    "Yes. You'll receive personalized feedback, suggestions for improvement, and interview tips from the recruiter.",
                },
                {
                  question: "Can I get a refund if I miss the session?",
                  answer:
                    "No. Fees are non-refundable unless the session is cancelled by the recruiter or platform.",
                },
              ].map((faq, index) => (
                <details
                  key={index}
                  className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 open:border-emerald-500"
                >
                  <summary className="cursor-pointer list-none flex items-center justify-between text-white font-semibold text-lg">
                    {faq.question}

                    <span className="text-emerald-400 text-2xl group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>

                  <p className="mt-5 text-slate-400 leading-8">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
