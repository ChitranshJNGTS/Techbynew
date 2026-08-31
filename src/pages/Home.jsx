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

export default function Home() {
  return (
 <>
    
<Navbar/>
<MobileBottomBar/>
<Hero/>

{/* <PopularCategories /> */}
      <RecentJobs />
      {/* <HotJobs/> */}
      <DemoInterviewSection/>
      <HowItWorks />
      <WhyChooseUs />
      {/* <Testimonials /> */}
      <Footer />

      {/* <TrainingProgram/> */}

</>
  );
}