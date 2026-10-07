import {
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const quickLinks = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Browse Jobs",
    path: "/all-jobs",
  },
  {
    name: "About Us",
    path: "/about-us",
  },
  {
    name: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    name: "Terms & Conditions",
    path: "/terms-condition",
  },
];

const jobCategories = [
  "Software Development",
  "UI/UX Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Customer Support",
];

export default function Footer() {
  const handleCategoryClick = (category) => {
    return `/all-jobs?search=${encodeURIComponent(category)}`;
  };

  return (
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">

      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 lg:py-20">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 lg:gap-10">


          {/* =================================================
              COMPANY
          ================================================= */}

          <div>

            {/* LOGO */}

            <Link
              to="/"
              className="inline-flex items-center group"
            >

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                Tech
                <span className="text-emerald-500">
                  By
                </span>
              </h2>

            </Link>


            {/* DESCRIPTION */}

            <p className="mt-5 leading-7 text-[15px] text-slate-500 max-w-sm">
              A growing job platform connecting talented
              professionals with companies and helping
              candidates discover the right opportunities.
            </p>


            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div className="flex gap-3 mt-7">

              {/* LINKEDIN */}

              <a
                href="https://www.linkedin.com/company/techby-consultancy-services/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:-translate-y-0.5 shadow-sm transition-all duration-200"
              >
                <FaLinkedinIn />
              </a>


              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/mr_vansh_s?igsi=MWtvd24yOGxwamlm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:-translate-y-0.5 shadow-sm transition-all duration-200"
              >
                <FaInstagram />
              </a>


              {/* WHATSAPP */}

              <a
                href="https://chat.whatsapp.com/CimbUfCYdUnGLTAKJLThWR"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-green-500 hover:text-white hover:border-green-500 hover:-translate-y-0.5 shadow-sm transition-all duration-200"
              >
                <FaWhatsapp />
              </a>

            </div>


            {/* SMALL TRUST TEXT */}

            <div className="mt-7 inline-flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Helping people find better opportunities
            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div>

            <h3 className="text-slate-900 text-lg font-bold mb-6">
              Quick Links
            </h3>


            <ul className="space-y-3.5">

              {quickLinks.map((item) => (

                <li key={item.name}>

                  <Link
                    to={item.path}
                    className="group inline-flex items-center gap-2.5 text-[15px] text-slate-500 hover:text-emerald-600 transition-colors duration-200"
                  >

                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-200">

                      <FaArrowRight className="text-[9px] text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all duration-200" />

                    </span>

                    {item.name}

                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              JOB CATEGORIES
          ================================================= */}

          <div>

            <h3 className="text-slate-900 text-lg font-bold mb-6">
              Job Categories
            </h3>


            <ul className="space-y-3.5">

              {jobCategories.map((category) => (

                <li key={category}>

                  <Link
                    to={handleCategoryClick(category)}
                    className="group inline-flex items-center gap-2.5 text-[15px] text-slate-500 hover:text-emerald-600 transition-colors duration-200"
                  >

                    <span className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-200">

                      <FaArrowRight className="text-[9px] text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all duration-200" />

                    </span>

                    {category}

                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              CONTACT
          ================================================= */}

          <div>

            <h3 className="text-slate-900 text-lg font-bold mb-6">
              Contact Us
            </h3>


            {/* LOCATION CARD */}

            <div className="flex gap-4 p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">

              <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">

                <FaMapMarkerAlt className="text-emerald-500" />

              </div>


              <div>

                <p className="text-sm font-semibold text-slate-800">
                  Our Location
                </p>

                <p className="text-sm text-slate-500 mt-1 leading-6">
                  Indore,
                  <br />
                  Madhya Pradesh, India
                </p>

              </div>

            </div>


            {/* =================================================
                NEWSLETTER
            ================================================= */}

            <div className="mt-7">

              <h4 className="text-slate-900 font-bold mb-2">
                Get Job Updates
              </h4>

              <p className="text-sm text-slate-500 mb-4 leading-6">
                Subscribe to receive the latest job
                opportunities and updates.
              </p>


              <div className="flex w-full">

                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="flex-1 min-w-0 bg-white border border-slate-200 border-r-0 rounded-l-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                />

                <button
                  type="button"
                  className="bg-emerald-500 hover:bg-emerald-600 px-5 rounded-r-xl text-white text-sm font-semibold transition-colors duration-200"
                >
                  Join
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          BOTTOM FOOTER
      ===================================================== */}

      <div className="border-t border-slate-200 bg-white">

        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-6">

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* COPYRIGHT */}

            <p className="text-slate-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-slate-700">
                TechBy
              </span>
              . All Rights Reserved.
            </p>


            {/* LINKS */}

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">

              <Link
                to="/privacy-policy"
                className="text-slate-500 hover:text-emerald-600 transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-condition"
                className="text-slate-500 hover:text-emerald-600 transition-colors"
              >
                Terms & Conditions
              </Link>

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}