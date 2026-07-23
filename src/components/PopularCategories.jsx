import {
  FaLaptopCode,
  FaBullhorn,
  FaPaintBrush,
  FaBriefcase,
  FaChartLine,
  FaHeartbeat,
  FaUniversity,
  FaHeadset,
} from "react-icons/fa";

const categories = [
  {
    icon: <FaLaptopCode />,
    title: "IT & Software",
    jobs: "2,450 Jobs",
  },
  {
    icon: <FaBullhorn />,
    title: "Marketing",
    jobs: "1,120 Jobs",
  },
  {
    icon: <FaPaintBrush />,
    title: "UI/UX Design",
    jobs: "830 Jobs",
  },
  {
    icon: <FaBriefcase />,
    title: "Business",
    jobs: "980 Jobs",
  },
  {
    icon: <FaChartLine />,
    title: "Finance",
    jobs: "640 Jobs",
  },
  {
    icon: <FaHeartbeat />,
    title: "Healthcare",
    jobs: "720 Jobs",
  },
  {
    icon: <FaUniversity />,
    title: "Government",
    jobs: "310 Jobs",
  },
  {
    icon: <FaHeadset />,
    title: "Customer Support",
    jobs: "560 Jobs",
  },
];

export default function PopularCategories() {
  return (
    <section className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">
          <p className="text-emerald-400 font-semibold uppercase tracking-widest">
            Explore
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            Popular Categories
          </h2>

          <p className="text-slate-400 mt-5 max-w-2xl mx-auto">
            Discover thousands of opportunities from top companies across
            different industries.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((item, index) => (
            <div
              key={index}
              className="group bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-emerald-500 hover:-translate-y-2 transition duration-300 cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-3xl group-hover:bg-emerald-500 group-hover:text-white transition">
                {item.icon}
              </div>

              <h3 className="text-white text-xl font-semibold mt-6">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-2">{item.jobs}</p>

              <button className="mt-6 text-emerald-400 font-semibold group-hover:text-white">
                Browse Jobs →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}