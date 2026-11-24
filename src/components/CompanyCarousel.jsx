
import React from "react";

const companies = [
  {
    name: "Infosys",
    logo: "https://logo.clearbit.com/infosys.com",
  },
  {
    name: "TCS",
    logo: "https://logo.clearbit.com/tcs.com",
  },
  {
    name: "Wipro",
    logo: "https://logo.clearbit.com/wipro.com",
  },
  {
    name: "HCLTech",
    logo: "https://logo.clearbit.com/hcltech.com",
  },
  {
    name: "Tech Mahindra",
    logo: "https://logo.clearbit.com/techmahindra.com",
  },
  {
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
  },
  {
    name: "Cognizant",
    logo: "https://logo.clearbit.com/cognizant.com",
  },
  {
    name: "Capgemini",
    logo: "https://logo.clearbit.com/capgemini.com",
  },
  {
    name: "IBM",
    logo: "https://logo.clearbit.com/ibm.com",
  },
  {
    name: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    name: "Google",
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
  },
];

const CompanyCarousel = () => {
  // Duplicate list for seamless infinite animation
  const sliderCompanies = [...companies, ...companies];

  return (
    <section className="bg-white py-12 border-b border-slate-100 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-9">

          <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mb-2">
            Our Employer Network
          </p>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Companies Hiring Through{" "}
            <span className="text-emerald-600">TechBy</span>
          </h2>

          <p className="text-slate-500 mt-2 text-sm sm:text-base">
            Explore companies and discover exciting career opportunities.
          </p>

        </div>

      </div>

      {/* Infinite Slider */}
      <div className="relative overflow-hidden">

        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-company-scroll hover:[animation-play-state:paused]">

          {sliderCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="w-44 sm:w-56 h-24 sm:h-28 mx-2 sm:mx-3 rounded-2xl border border-slate-200 bg-white flex items-center justify-center p-6 group hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 transition-all duration-300"
            >

              <img
                src={company.logo}
                alt={`${company.name} logo`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling.style.display = "block";
                }}
                className="max-w-full max-h-12 object-contain grayscale group-hover:grayscale-0 transition duration-300"
              />

              <span className="hidden text-lg font-bold text-slate-700">
                {company.name}
              </span>

            </div>
          ))}

        </div>

      </div>

      <style>{`
        @keyframes companyScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .animate-company-scroll {
          animation: companyScroll 35s linear infinite;
          will-change: transform;
        }

        @media (max-width: 640px) {
          .animate-company-scroll {
            animation-duration: 25s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-company-scroll {
            animation: none;
          }
        }
      `}</style>

    </section>
  );
};

export default CompanyCarousel;
