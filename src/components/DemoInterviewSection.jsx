import {
  FaLaptopCode,
  FaUserTie,
  FaClipboardCheck,
  FaChartLine,
  FaArrowRight,
  FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function DemoInterviewSection() {
  const features = [
    {
      icon: <FaLaptopCode />,
      title: "Real Technical Interview",
      description:
        "Experience a live technical interview just like top product and service-based companies.",
    },
    {
      icon: <FaUserTie />,
      title: "Expert Interviewers",
      description:
        "Practice with experienced developers and recruiters who conduct real industry interviews.",
    },
    {
      icon: <FaClipboardCheck />,
      title: "Detailed Feedback",
      description:
        "Receive personalized feedback on your communication, coding, and problem-solving skills.",
    },
    {
      icon: <FaChartLine />,
      title: "Boost Confidence",
      description:
        "Identify your weak areas, improve your performance, and attend real interviews with confidence.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="bg-slate-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={containerVariants}
          >

            {/* Badge */}
            <motion.div variants={itemVariants}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full font-medium border border-emerald-500/10"
              >
                <FaCalendarAlt />
                Mock Interview Program
              </motion.span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="text-5xl font-bold text-white mt-6 leading-tight"
            >
              Practice Before Your
              <span className="text-emerald-400"> Real Interview</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-lg mt-6 leading-8"
            >
              Improve your interview skills by scheduling a one-on-one mock
              interview with experienced professionals. Get real interview
              experience, personalized feedback, resume suggestions, and
              practical tips to increase your chances of getting hired.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={containerVariants}
              className="grid sm:grid-cols-2 gap-4 mt-10"
            >

              {/* 30 Min */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
              >
                <motion.h3
                  whileHover={{ scale: 1.08 }}
                  className="text-3xl font-bold text-emerald-400 origin-left"
                >
                  30 Min
                </motion.h3>

                <p className="text-slate-400 mt-2">
                  Live Mock Interview
                </p>
              </motion.div>

              {/* Feedback */}
              <motion.div
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="bg-slate-900 rounded-xl p-5 border border-slate-800 hover:border-emerald-500 transition-colors duration-300"
              >
                <motion.h3
                  whileHover={{ scale: 1.08 }}
                  className="text-3xl font-bold text-emerald-400 origin-left"
                >
                  100%
                </motion.h3>

                <p className="text-slate-400 mt-2">
                  Personalized Feedback
                </p>
              </motion.div>

            </motion.div>

            {/* Button */}
            <motion.div
              variants={itemVariants}
              className="mt-10"
            >
              <Link
                to="/book-interview"
                className="inline-flex"
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors duration-300"
                >
                  Schedule Demo Interview

                  <motion.span
                    animate={{
                      x: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FaArrowRight />
                  </motion.span>
                </motion.div>
              </Link>
            </motion.div>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="grid sm:grid-cols-2 gap-6"
          >

            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                }}
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 18,
                }}
                className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500 transition-colors duration-300"
              >

                {/* Icon */}
                <motion.div
                  whileHover={{
                    rotate: [0, -8, 8, -8, 0],
                    scale: 1.1,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="w-16 h-16 rounded-xl bg-emerald-500 flex items-center justify-center text-white text-2xl"
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <motion.h3
                  whileHover={{ x: 5 }}
                  className="text-white text-xl font-semibold mt-6"
                >
                  {item.title}
                </motion.h3>

                {/* Description */}
                <p className="text-slate-400 mt-4 leading-7">
                  {item.description}
                </p>

                {/* Animated bottom line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "35%" }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="h-1 bg-emerald-500 rounded-full mt-6"
                />

              </motion.div>
            ))}

          </motion.div>

        </div>
      </div>
    </section>
  );
}