import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
     import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300">
      {/* Top CTA */}
      {/* <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-10 flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>
            <h2 className="text-4xl font-bold text-white">
              Ready to Find Your Dream Job?
            </h2>

            <p className="text-green-100 mt-3 max-w-xl">
              Join thousands of job seekers and employers who trust our platform
              every day.
            </p>
          </div>

          <button className="bg-white text-emerald-600 font-semibold px-8 py-4 rounded-xl hover:bg-slate-100 transition">
            Get Started
          </button>
        </div>
      </div> */}

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-4 md:grid-cols-2 gap-12">

        {/* Company */}

        <div>
          <h2 className="text-3xl font-bold text-white">
            Tech<span className="text-emerald-400">By</span>
          </h2>

          <p className="mt-6 leading-8 text-slate-400">
            India's trusted job platform connecting talented professionals with
            top companies across multiple industries.
          </p>

          <div className="flex gap-4 mt-8">

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <FaTwitter />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-11 h-11 rounded-full bg-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition"
            >
              <FaGithub />
            </a>

          </div>
        </div>

        {/* Quick Links */}

<div>
  <h3 className="text-white text-xl font-semibold mb-6">
    Quick Links
  </h3>

  <ul className="space-y-4">

    {[
      {
        name: "Home",
        path: "/"
      },
      {
        name: "Browse Jobs",
        path: "/jobs"
      },
      {
        name: "About",
        path: "/about"
      },
      {
        name: "Contact",
        path: "/contact"
      },
      {
        name: "Privacy Policy",
        path: "/privacy-policy"
      },
      {
        name: "Terms & Condition",
        path: "/terms-condition"
      }

    ].map((item) => (

      <li key={item.name}>

        <Link
          to={item.path}
          className="
          flex 
          items-center 
          gap-2 
          text-slate-400
          hover:text-emerald-400 
          transition
          "
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

            {[
              "Software Development",
              "UI/UX Design",
              "Marketing",
              "Finance",
              "Healthcare",
              "Customer Support",

            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="flex items-center gap-2 hover:text-emerald-400 transition"
                >
                  <FaArrowRight className="text-xs" />
                  {item}
                </a>
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

            <div className="flex gap-4">

              <FaMapMarkerAlt className="text-emerald-400 mt-1" />

              <p>
                Indore,
                <br />
                Madhya Pradesh, India
              </p>

            </div>

            <div className="flex gap-4">

              <FaEnvelope className="text-emerald-400 mt-1" />

              <p>support@jobportal.com</p>

            </div>

            <div className="flex gap-4">

              <FaPhoneAlt className="text-emerald-400 mt-1" />

              <p>+91 7879746796</p>

            </div>

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
                className="flex-1 bg-slate-900 border border-slate-700 rounded-l-xl px-4 py-3 outline-none focus:border-emerald-500"
              />

              <button className="bg-emerald-500 px-6 rounded-r-xl hover:bg-emerald-600 transition text-white">
                Join
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-400">
            © {new Date().getFullYear()} JobPortal. All Rights Reserved.
          </p>

          <div className="flex gap-8">

            <a href="#" className="hover:text-emerald-400 transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-emerald-400 transition">
              Terms & Conditions
            </a>

            <a href="#" className="hover:text-emerald-400 transition">
              Cookies
            </a>

          </div>

        </div>

      </div>
    </footer>
  );
}