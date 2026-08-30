
import {
  FaLinkedinIn,
  FaInstagram,
  FaMapMarkerAlt,
  FaArrowRight,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Browse Jobs", path: "/all-jobs" },
  // { name: "About Us", path: "/about" },
  // { name: "Contact Us", path: "/contact" },
  // { name: "Privacy Policy", path: "/privacy-policy" },
  // { name: "Terms & Conditions", path: "/terms-condition" },
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
    // Query parameter will be used by All Jobs page
    return `/all-jobs?search=${encodeURIComponent(category)}`;
  };

  return (
    <footer className="bg-slate-950 text-slate-400">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

        {/* Company */}
        <div>
          <Link to="/">
            <h2 className="text-3xl font-bold text-white">
              Tech<span className="text-emerald-400">By</span>
            </h2>
          </Link>

          <p className="mt-6 leading-8 text-slate-400">
            A simple and growing platform connecting talented professionals
            with companies and helping candidates discover the right
            opportunities.
          </p>

    
{/* Social Links */}
<div className="flex gap-3 mt-8">

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/company/techby-consultancy-services/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
  >
    <FaLinkedinIn />
  </a>

  {/* Instagram */}
  <a
    href="YOUR_INSTAGRAM_LINK"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
  >
    <FaInstagram />
  </a>

  {/* WhatsApp */}
  <a
    href="https://chat.whatsapp.com/CimbUfCYdUnGLTAKJLThWR"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
  >
    <FaWhatsapp />
  </a>

</div>


        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-6">
            Quick Links
          </h3>

          <ul className="space-y-4">
            {quickLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
                >
                  <FaArrowRight className="text-xs" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Job Categories */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-6">
            Job Categories
          </h3>

          <ul className="space-y-4">
            {jobCategories.map((category) => (
              <li key={category}>
                <Link
                  to={handleCategoryClick(category)}
                  className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition"
                >
                  <FaArrowRight className="text-xs" />
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-6">
            Contact Us
          </h3>

          <div className="space-y-6">

            {/* Location */}
            <div className="flex gap-4">
              <FaMapMarkerAlt className="text-emerald-400 mt-1 shrink-0" />

              <p>
                Indore,
                <br />
                Madhya Pradesh, India
              </p>
            </div>

            {/* Email */}
            {/* <a
              href="mailto:support@techby.in"
              className="flex gap-4 hover:text-emerald-400 transition"
            >
              <FaEnvelope className="text-emerald-400 mt-1 shrink-0" />

              <p>support@techby.in</p>
            </a> */}

            {/* Phone */}
            {/* <a
              href="tel:+917879746796"
              className="flex gap-4 hover:text-emerald-400 transition"
            >
              <FaPhoneAlt className="text-emerald-400 mt-1 shrink-0" />

              <p>+91 7879746796</p>
            </a> */}

          </div>

          {/* Newsletter */}
          <div className="mt-8">

            <h4 className="text-white font-semibold mb-4">
              Subscribe Newsletter
            </h4>

            <div className="flex">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 min-w-0 bg-slate-900 border border-slate-700 rounded-l-xl px-4 py-3 outline-none focus:border-emerald-500 text-white"
              />

              <button
                type="button"
                className="bg-emerald-500 px-6 rounded-r-xl hover:bg-emerald-600 transition text-white font-medium"
              >
                Join
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} TechBy. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm">

            <Link
              to="/privacy-policy"
              className="hover:text-emerald-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms-condition"
              className="hover:text-emerald-400 transition"
            >
              Terms & Conditions
            </Link>



          </div>

        </div>

      </div>

    </footer>
  );
}
