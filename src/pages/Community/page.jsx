import {
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaArrowLeft,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import MobileBottomBar from "../../components/MobileBottomBar";

export default function Community() {
  const communities = [
    {
      name: "WhatsApp",
      description: "Get the latest job updates directly on WhatsApp.",
      icon: <FaWhatsapp />,
      iconBg: "bg-green-500",
      link: "https://chat.whatsapp.com/CimbUfCYdUnGLTAKJLThWR",
    },
    {
      name: "Instagram",
      description: "Follow us for daily jobs, career tips and updates.",
      icon: <FaInstagram />,
      iconBg: "bg-pink-500",
      link: "https://www.instagram.com/mr_vansh_s?igsi=MWtvd24yOGxwamlm",
    },
    {
      name: "LinkedIn",
      description: "Follow TechBy for professional career updates.",
      icon: <FaLinkedin />,
      iconBg: "bg-blue-600",
      link: "https://www.linkedin.com/company/techby-consultancy-services/",
    },
  ];

  return (
  <>
  <Navbar/>
  <MobileBottomBar/>
    <div className="min-h-screen bg-slate-950 text-white px-5 pt-24 pb-24 lg:hidden">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        {/* <Link
          to="/"
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white transition"
        >
          <FaArrowLeft />
        </Link> */}

        <div>
          <h1 className="text-2xl font-bold">
            Join Our Community
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Stay updated with the latest job opportunities.
          </p>
        </div>

      </div>


      {/* Community Cards */}

      <div className="space-y-4">

        {communities.map((community) => (
          <a
            key={community.name}
            href={community.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/80 transition"
          >

            {/* Icon */}

            <div
              className={`w-14 h-14 shrink-0 rounded-2xl ${community.iconBg} flex items-center justify-center text-white text-2xl`}
            >
              {community.icon}
            </div>


            {/* Text */}

            <div className="flex-1 min-w-0">

              <h2 className="text-lg font-semibold text-white">
                {community.name}
              </h2>

              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                {community.description}
              </p>

            </div>


            {/* Arrow */}

            <div className="text-slate-500 group-hover:text-emerald-400 transition text-lg">
              →
            </div>

          </a>
        ))}

      </div>


      {/* Bottom Message */}

      <div className="mt-8 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-center">

        <p className="text-sm text-slate-400">
          Follow TechBy and never miss your next
          <span className="text-emerald-400 font-medium">
            {" "}job opportunity.
          </span>
        </p>

      </div>

    </div>
    </>
  );
}

