import {
  FaInfoCircle,
  FaShieldAlt,
  FaFileContract,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MobileBottomBar from "../../components/MobileBottomBar";

export default function Community() {
  const informationLinks = [
    {
      name: "About Us",
      description: "Learn more about TechBy and what we do.",
      icon: <FaInfoCircle />,
      path: "/about",
    },
    {
      name: "Privacy Policy",
      description:
        "Learn how we collect, use and protect your information.",
      icon: <FaShieldAlt />,
      path: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      description:
        "Read the terms and conditions for using TechBy.",
      icon: <FaFileContract />,
      path: "/terms-and-conditions",
    },
  ];

  return (
    <>
      <Navbar />
      <MobileBottomBar />

      <div className="min-h-screen bg-white px-5 pb-24 pt-24 text-slate-900">

        {/* Header */}
        <div className="mx-auto mb-8 max-w-3xl">

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
            TechBy Information
          </div>

          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            About TechBy
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Learn more about TechBy, our policies and the terms
            for using our website.
          </p>

        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-3xl">

          {/* Information Links */}
          <div>

            <h2 className="mb-4 text-lg font-bold text-slate-900">
              Website Information
            </h2>

            <div className="space-y-3">

              {informationLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-all hover:border-emerald-300 hover:bg-white hover:shadow-sm"
                >

                  {/* Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg text-emerald-600 transition group-hover:border-emerald-200 group-hover:bg-emerald-50">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">

                    <h3 className="text-base font-semibold text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-xs leading-relaxed text-slate-500">
                      {item.description}
                    </p>

                  </div>

                  {/* Arrow */}
                  <div className="text-slate-400 transition group-hover:text-emerald-500">
                    <FaArrowRight />
                  </div>

                </Link>
              ))}

            </div>

          </div>

          {/* Bottom Information */}
          <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">

            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-600 shadow-sm">
              <FaInfoCircle />
            </div>

            <h3 className="text-sm font-bold text-slate-900">
              About TechBy
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-600">
              TechBy provides job opportunities, government job
              updates, recruitment information and career resources
              to help job seekers discover relevant opportunities.
            </p>

          </div>

          {/* Footer */}
          <div className="mt-8 pb-4 text-center">

            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} TechBy. All rights reserved.
            </p>

          </div>

        </div>

      </div>
    </>
  );
}