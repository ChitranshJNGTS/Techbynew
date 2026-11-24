import Navbar from "../components/Navbar";
import RecentJobs from "../components/RecentJobs";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import MobileBottomBar from "../components/MobileBottomBar";
import JobNewsSection from "../components/JobNewsSection";
import CompanyCarousel from "../components/CompanyCarousel";

export default function Home() {
  return (
    <>
      <Navbar />
      <MobileBottomBar />
      <Hero />
      {/* <CompanyCarousel /> */}
      <RecentJobs />
      <JobNewsSection />
      <Footer />
    </>
  );
}
