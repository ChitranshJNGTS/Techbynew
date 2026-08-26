// import {
//   FaUserPlus,
//   FaFileUpload,
//   FaSearch,
//   FaBriefcase,
// } from "react-icons/fa";

// import { motion } from "framer-motion";

// const steps = [
//   {
//     icon: <FaUserPlus />,
//     title: "Create Account",
//     desc: "Sign up in less than a minute and build your professional profile.",
//   },
//   {
//     icon: <FaFileUpload />,
//     title: "Upload Resume",
//     desc: "Upload your latest resume so recruiters can easily find you.",
//   },
//   {
//     icon: <FaSearch />,
//     title: "Find Jobs",
//     desc: "Search thousands of verified jobs using filters and keywords.",
//   },
//   {
//     icon: <FaBriefcase />,
//     title: "Get Hired",
//     desc: "Apply instantly and connect directly with top employers.",
//   },
// ];

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.18,
//     },
//   },
// };

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 70,
//     scale: 0.95,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// export default function HowItWorks() {
//   return (
//     <section className="bg-slate-900 py-24 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: -40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-20"
//         >
//           <motion.span
//             initial={{ opacity: 0, letterSpacing: "0px" }}
//             whileInView={{
//               opacity: 1,
//               letterSpacing: "4px",
//             }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//             className="text-emerald-400 uppercase font-semibold"
//           >
//             Process
//           </motion.span>

//           <h2 className="text-5xl font-bold text-white mt-4">
//             How It Works
//           </h2>

//           <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
//             Finding your dream job has never been easier. Follow these simple
//             steps and get hired faster.
//           </p>
//         </motion.div>

//         {/* Cards */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{
//             once: true,
//             amount: 0.2,
//           }}
//           className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
//         >
//           {steps.map((step, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               whileHover={{
//                 y: -12,
//                 scale: 1.02,
//               }}
//               transition={{
//                 type: "spring",
//                 stiffness: 250,
//                 damping: 18,
//               }}
//               className="relative group bg-slate-950 rounded-3xl p-10 border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
//             >

//               {/* Number */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   delay: 0.3 + index * 0.15,
//                   duration: 0.5,
//                 }}
//                 className="absolute top-6 right-6 text-6xl font-bold text-slate-800 group-hover:text-emerald-900 transition-colors duration-300"
//               >
//                 0{index + 1}
//               </motion.div>

//               {/* Icon */}
//               <motion.div
//                 whileHover={{
//                   rotate: [0, -8, 8, -8, 0],
//                   scale: 1.1,
//                 }}
//                 transition={{
//                   duration: 0.5,
//                 }}
//                 className="relative w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-4xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"
//               >
//                 {step.icon}
//               </motion.div>

//               {/* Title */}
//               <motion.h3
//                 whileHover={{ x: 5 }}
//                 className="text-2xl font-bold text-white mt-8"
//               >
//                 {step.title}
//               </motion.h3>

//               {/* Description */}
//               <p className="text-slate-400 mt-4 leading-7">
//                 {step.desc}
//               </p>

//               {/* Bottom animated line */}
//               <motion.div
//                 initial={{ width: 0 }}
//                 whileInView={{ width: "40%" }}
//                 viewport={{ once: true }}
//                 transition={{
//                   delay: 0.5 + index * 0.15,
//                   duration: 0.6,
//                 }}
//                 className="h-1 bg-emerald-500 rounded-full mt-8"
//               />

//             </motion.div>
//           ))}
//         </motion.div>

//       </div>
//     </section>
//   );
// } 





import {
  FaSearch,
  FaFilter,
  FaBriefcase,
  FaExternalLinkAlt,
} from "react-icons/fa";

import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaSearch />,
    title: "Browse Jobs",
    desc: "Explore the latest job opportunities available from companies and recruiters.",
  },
  {
    icon: <FaFilter />,
    title: "Find the Right Job",
    desc: "Use job details such as location, experience, salary, and skills to find suitable opportunities.",
  },
  {
    icon: <FaBriefcase />,
    title: "View Job Details",
    desc: "Check the complete job description, company information, requirements, salary, and other details.",
  },
  {
    icon: <FaExternalLinkAlt />,
    title: "Apply for the Job",
    desc: "Click the Apply button and continue to the provided application link to submit your application.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 70,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function HowItWorks() {
  return (
    <section className="bg-slate-900 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0px" }}
            whileInView={{
              opacity: 1,
              letterSpacing: "4px",
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-emerald-400 uppercase font-semibold"
          >
            Simple Process
          </motion.span>

          <h2 className="text-5xl font-bold text-white mt-4">
            How It Works
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Finding your next job is simple. Browse available opportunities,
            explore the job details, and apply through the provided link.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="relative group bg-slate-950 rounded-3xl p-10 border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
            >

              {/* Number */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + index * 0.15,
                  duration: 0.5,
                }}
                className="absolute top-6 right-6 text-6xl font-bold text-slate-800 group-hover:text-emerald-900 transition-colors duration-300"
              >
                0{index + 1}
              </motion.div>

              {/* Icon */}
              <motion.div
                whileHover={{
                  rotate: [0, -8, 8, -8, 0],
                  scale: 1.1,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="relative w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-4xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300"
              >
                {step.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                whileHover={{ x: 5 }}
                className="text-2xl font-bold text-white mt-8"
              >
                {step.title}
              </motion.h3>

              {/* Description */}
              <p className="text-slate-400 mt-4 leading-7">
                {step.desc}
              </p>

              {/* Bottom animated line */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "40%" }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.5 + index * 0.15,
                  duration: 0.6,
                }}
                className="h-1 bg-emerald-500 rounded-full mt-8"
              />

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}