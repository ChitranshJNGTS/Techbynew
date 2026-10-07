import {
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import PopularCategories from "../components/PopularCategories";
import RecentJobs from "../components/RecentJobs";
import HowItWorks from "../components/HowItWorks";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

import DemoInterviewSection from "../components/DemoInterviewSection";
import Hero from "../components/Hero";
import TrainingProgram from "../components/TrainingProgram";
import HotJobs from "../components/HotJobs";
import MobileBottomBar from "../components/MobileBottomBar";
import LinkedInHome from "../components/LinkDinHome";
import Ads from "../components/Ads";
import JobNews from "../components/JobNews";
import JobNewsSection from "../components/JobNewsSection";

export default function Home() {
  return (
 <>
    
<Navbar/>
<MobileBottomBar/>
<Hero/>
{/* ================= TOP BANNER AD ================= */}
{/* <div className="max-w-7xl mx-auto px-4 bg-slate-900 sm:px-6 lg:px-8 my-6">
  <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden">
    
    <p className="text-[10px] text-slate-500 mb-3 uppercase tracking-wider">
      Advertisement
    </p>

    <div className="w-full flex justify-center items-center overflow-hidden bg-slate-900">
      <Ads type="728x90" />
    </div>

  </div>
</div> */}

{/* <PopularCategories /> */}
      <RecentJobs />
      {/* <HotJobs/> */}
      {/* <Ads type="320x50" /> */}
      {/* <DemoInterviewSection/> */}
      {/* <HowItWorks /> */}
      {/* <WhyChooseUs /> */}
      {/* <Ads type="profit-1" /> */}
      {/* <Testimonials /> */}
      <JobNewsSection/>
      {/* <JobNews/> */}
      <Footer />











      {/* <Ads type="profit-2" /> */}
      {/* <LinkedInHome/> */}

      {/* <TrainingProgram/> */}

</>
  );
}