// import {
//   FaCheckCircle,
//   FaUsers,
//   FaBuilding,
//   FaRocket,
//   FaShieldAlt,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const features = [
//   "Verified Job Opportunities",
//   "Easy & Fast Applications",
//   "Direct Recruiter Connection",
//   "Mock Interview Preparation",
//   "Personalized Job Alerts",
//   "Secure Candidate Profiles",
// ];

// const cards = [
//   {
//     icon: <FaUsers />,
//     title: "Candidates",
//     description:
//       "Build your profile and discover suitable opportunities",
//   },
//   {
//     icon: <FaBuilding />,
//     title: "Recruiters",
//     description:
//       "Connect with companies and hiring professionals",
//   },
//   {
//     icon: <FaRocket />,
//     title: "Career Growth",
//     description:
//       "Improve your skills and prepare for upcoming interviews",
//   },
//   {
//     icon: <FaShieldAlt />,
//     title: "Secure Platform",
//     description:
//       "Your profile and application details stay protected",
//   },
// ];

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.12,
//     },
//   },
// };

// const itemVariants = {
//   hidden: {
//     opacity: 0,
//     y: 50,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: "easeOut",
//     },
//   },
// };

// export default function WhyChooseUs() {
//   return (
//     <section className="py-24 bg-slate-950 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">

//         <div className="grid lg:grid-cols-2 gap-20 items-center">

//           {/* ================= LEFT ================= */}

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{
//               once: true,
//               amount: 0.2,
//             }}
//             variants={containerVariants}
//           >

//             {/* Small Heading */}
//             <motion.span
//               variants={itemVariants}
//               className="text-emerald-400 uppercase tracking-[4px] font-semibold"
//             >
//               Why Choose TechBy
//             </motion.span>

//             {/* Heading */}
//             <motion.h2
//               variants={itemVariants}
//               className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
//             >
//               Start Your Career
//               <br />
//               With the Right Opportunity
//             </motion.h2>

//             {/* Description */}
//             <motion.p
//               variants={itemVariants}
//               className="text-slate-400 mt-6 leading-8 max-w-xl"
//             >
//               TechBy is built to make job searching simpler and more
//               effective. Discover relevant opportunities, connect with
//               recruiters, and prepare yourself for your next interview.
//             </motion.p>

//             {/* Feature List */}
//             <motion.div
//               variants={containerVariants}
//               className="grid sm:grid-cols-2 gap-5 mt-10"
//             >
//               {features.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   variants={itemVariants}
//                   whileHover={{
//                     y: -6,
//                     scale: 1.02,
//                   }}
//                   transition={{
//                     type: "spring",
//                     stiffness: 250,
//                     damping: 18,
//                   }}
//                   className="group flex items-center gap-4 bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
//                 >
//                   <motion.div
//                     whileHover={{
//                       scale: 1.2,
//                       rotate: 360,
//                     }}
//                     transition={{
//                       duration: 0.5,
//                     }}
//                   >
//                     <FaCheckCircle className="text-emerald-400 text-xl shrink-0" />
//                   </motion.div>

//                   <span className="text-white font-medium">
//                     {item}
//                   </span>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* Button */}
//             <motion.div
//               variants={itemVariants}
//               className="mt-10"
//             >
//               <Link to="/all-jobs">
//                 <motion.div
//                   whileHover={{
//                     scale: 1.05,
//                   }}
//                   whileTap={{
//                     scale: 0.95,
//                   }}
//                   className="inline-flex px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition-colors duration-300"
//                 >
//                   Explore Jobs
//                 </motion.div>
//               </Link>
//             </motion.div>

//           </motion.div>

//           {/* ================= RIGHT ================= */}

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{
//               once: true,
//               amount: 0.2,
//             }}
//             variants={containerVariants}
//             className="grid grid-cols-2 gap-5"
//           >

//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 variants={itemVariants}
//                 whileHover={{
//                   y: -12,
//                   scale: 1.03,
//                 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 250,
//                   damping: 18,
//                 }}
//                 className="group bg-slate-900 rounded-3xl p-7 text-center border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
//               >

//                 {/* Icon */}
//                 <motion.div
//                   whileHover={{
//                     rotate: [0, -10, 10, -10, 0],
//                     scale: 1.15,
//                   }}
//                   transition={{
//                     duration: 0.5,
//                   }}
//                   className="mx-auto text-4xl text-emerald-400 mb-5 w-fit"
//                 >
//                   {card.icon}
//                 </motion.div>

//                 {/* Title */}
//                 <motion.h3
//                   whileHover={{
//                     scale: 1.05,
//                   }}
//                   className="text-2xl font-bold text-white"
//                 >
//                   {card.title}
//                 </motion.h3>

//                 {/* Description */}
//                 <p className="text-slate-400 mt-2">
//                   {card.description}
//                 </p>

//                 {/* Animated Line */}
//                 <motion.div
//                   initial={{ width: 0 }}
//                   whileInView={{ width: "35%" }}
//                   viewport={{ once: true }}
//                   transition={{
//                     delay: 0.4 + index * 0.12,
//                     duration: 0.5,
//                   }}
//                   className="h-1 bg-emerald-500 rounded-full mx-auto mt-6"
//                 />

//               </motion.div>
//             ))}

//           </motion.div>

//         </div>

//       </div>
//     </section>
//   );
// } 




import {
  FaCheckCircle,
  FaBriefcase,
  FaSearch,
  FaBuilding,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  "Free Job Listings",
  "No Login Required to Browse Jobs",
  "Latest Job Opportunities",
  "Jobs Across Different Industries",
  "Complete Job Details",
  "Easy Direct Applications",
];

const cards = [
  {
    icon: <FaBriefcase />,
    title: "Latest Jobs",
    description:
      "Discover new job openings from companies, recruiters, startups, and other organizations.",
  },
  {
    icon: <FaSearch />,
    title: "Easy Job Search",
    description:
      "Explore job opportunities by role, location, experience, salary, and other important details.",
  },
  {
    icon: <FaBuilding />,
    title: "Multiple Companies",
    description:
      "Find opportunities from different companies and recruiters in one convenient place.",
  },
  {
    icon: <FaExternalLinkAlt />,
    title: "Easy Apply",
    description:
      "Find a suitable opportunity and apply through the application link provided with the job.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* ================= LEFT ================= */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={containerVariants}
          >

            {/* Small Heading */}
            <motion.span
              variants={itemVariants}
              className="text-emerald-400 uppercase tracking-[4px] font-semibold"
            >
              Why Choose Us
            </motion.span>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight"
            >
              Find Your Next
              <br />
              Job Opportunity
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 mt-6 leading-8 max-w-xl"
            >
              We make job searching simple. Browse the latest job openings,
              check complete job details, and find opportunities that match
              your skills and experience — without needing to create an
              account.
            </motion.p>

            {/* Feature List */}
            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-5 mt-10"
            >
              {features.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 250,
                    damping: 18,
                  }}
                  className="group flex items-center gap-4 bg-slate-900 p-5 rounded-xl border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  >
                    <FaCheckCircle className="text-emerald-400 text-xl shrink-0" />
                  </motion.div>

                  <span className="text-white font-medium">
                    {item}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Button */}
            <motion.div
              variants={itemVariants}
              className="mt-10"
            >
              <Link to="/all-jobs">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="inline-flex px-8 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition-colors duration-300"
                >
                  Explore Jobs
                </motion.div>
              </Link>
            </motion.div>

          </motion.div>

          {/* ================= RIGHT ================= */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            variants={containerVariants}
            className="grid grid-cols-2 gap-5"
          >

            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="group bg-slate-900 rounded-3xl p-7 text-center border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
              >

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.15,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="mx-auto text-4xl text-emerald-400 mb-5 w-fit"
                >
                  {card.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="text-2xl font-bold text-white"
                >
                  {card.title}
                </motion.h3>

                {/* Description */}
                <p className="text-slate-400 mt-2">
                  {card.description}
                </p>

                {/* Animated Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "35%" }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + index * 0.12,
                    duration: 0.5,
                  }}
                  className="h-1 bg-emerald-500 rounded-full mx-auto mt-6"
                />

              </motion.div>
            ))}

          </motion.div>

        </div>

      </div>
    </section>
  );
}