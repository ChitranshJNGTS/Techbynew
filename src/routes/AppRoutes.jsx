
// import { Routes, Route } from "react-router-dom";

// // Pages
// import Home from "../pages/Home";
// import AllJobs from "../components/AllJobs";
// import Login from "../pages/login/Login";
// import JobDescription from "../components/JobDescription";
// import PrivacyPolicy from "../pages/privecy&policy/page";
// import TermsAndConditions from "../pages/term&condition/page";
// import PostJob from "../pages/PostJob/page";
// import AdminDashboard from "../pages/admin-Dashboard/page";
// import AdminLogin from "../pages/adminlogin/page";
// import About from "../pages/About/About";
// import Community from "../pages/Community/page";
// import AdminProtectedRoute from "./AdminProtectedRoute";
// import JobNews from "../components/JobNews";
// import NewsDetails from "../components/NewsDetails";
// import VendorPortal from "../pages/VenderPortal/page";
// import RecruiterDashboard from "../pages/RecruiterDashboard/page";
// import RecruiterAuth from "../pages/RecruiterAuth/page";
// import JobRequirements from "../dashboard/components/JobRequirements";
// import MySubmissions from "../dashboard/components/MySubmissions";
// import Candidates from "../dashboard/components/Candidates";
// import VendorManagement from "../dashboard/components/VendorManagement";
// import VendorJobDetails from "../pages/VenderPortal/VendorTracker";

// export default function AppRoutes() {
//   return (
//     <Routes>

//       {/* ================= PUBLIC ROUTES ================= */}

//       <Route path="/" element={<Home />} />

//       <Route path="/recruiter/jobs" element={<JobRequirements />} />
// <Route path="/recruiter/submissions" element={<MySubmissions />} />
// <Route path="/recruiter/candidates" element={<Candidates />} />
// <Route path="/recruiter/vendors" element={<VendorManagement />} />
// <Route
//   path="/vendor-tracker/job/:jobId"
//   element={<VendorJobDetails />}
// />
//       <Route path="/all-jobs" element={<AllJobs />} />
//       <Route path="/recruiter/login" element={<RecruiterAuth />} />

//       <Route path="/jobs" element={<AllJobs />} />
//       <Route path="/about-us" element={<About />} />
//       <Route path="/community" element={<Community />} />
// <Route path="/vendor-tracker" element={<VendorPortal />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/recruiter" element={<RecruiterDashboard />} />

//       <Route path="/jobs/:slug" element={<JobDescription />} />

//       <Route
//         path="/privacy-policy"
//         element={<PrivacyPolicy />}
//       />

//       <Route
//         path="/terms-condition"
//         element={<TermsAndConditions />}
//       />

//      <Route path="/job-news" element={<JobNews />} />
// <Route path="/job-news/:slug" element={<NewsDetails />} />
//       {/* ================= ADMIN LOGIN ================= */}

//       <Route
//         path="/admin/login"
//         element={<AdminLogin />}
//       />

  
//       {/* ================= PROTECTED ADMIN ROUTES ================= */}

//       <Route element={<AdminProtectedRoute />}>
//         <Route
//           path="/admin/dashboard"
//           element={<AdminDashboard />}
//         />

//         {/* ================= RECRUITER ================= */}

//       </Route>

//     </Routes>
//   );
// }

import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import AllJobs from "../components/AllJobs";
import Login from "../pages/login/Login";
import JobDescription from "../components/JobDescription";
import PrivacyPolicy from "../pages/privecy&policy/page";
import TermsAndConditions from "../pages/term&condition/page";
import About from "../pages/About/About";
import Community from "../pages/Community/page";
import JobNews from "../components/JobNews";
import NewsDetails from "../components/NewsDetails";

// Authentication
import AdminLogin from "../pages/adminlogin/page";
import RecruiterAuth from "../pages/RecruiterAuth/page";

// Admin
import AdminDashboard from "../pages/admin-Dashboard/page";
import AdminProtectedRoute from "./AdminProtectedRoute";

// Recruiter
import RecruiterDashboard from "../pages/RecruiterDashboard/page";
import RecruiterProtectedRoute from "./RecruiterProtectedRoute";
import JobRequirements from "../dashboard/components/JobRequirements";
import MySubmissions from "../dashboard/components/MySubmissions";
import Candidates from "../dashboard/components/Candidates";
import VendorManagement from "../dashboard/components/VendorManagement";

// Vendor Portal
import VendorPortal from "../pages/VenderPortal/page";
import VendorJobDetails from "../pages/VenderPortal/VendorTracker";

export default function AppRoutes() {
  return (
    <Routes>

      {/* =====================================
          PUBLIC ROUTES
      ===================================== */}

      <Route path="/" element={<Home />} />

      <Route path="/jobs" element={<AllJobs />} />
      <Route path="/all-jobs" element={<AllJobs />} />
      <Route path="/jobs/:slug" element={<JobDescription />} />

      <Route path="/login" element={<Login />} />

      <Route path="/about-us" element={<About />} />
      <Route path="/community" element={<Community />} />

      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-condition" element={<TermsAndConditions />} />

      <Route path="/job-news" element={<JobNews />} />
      <Route path="/job-news/:slug" element={<NewsDetails />} />

      {/* =====================================
          PUBLIC VENDOR PORTAL
      ===================================== */}

      <Route path="/vendor-tracker" element={<VendorPortal />} />

      <Route
        path="/vendor-tracker/job/:jobId"
        element={<VendorJobDetails />}
      />

      {/* =====================================
          AUTHENTICATION ROUTES
      ===================================== */}

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/recruiter/login" element={<RecruiterAuth />} />

      {/* =====================================
          PROTECTED ADMIN ROUTES
      ===================================== */}

      <Route element={<AdminProtectedRoute />}>
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
      </Route>

      {/* =====================================
          PROTECTED RECRUITER ROUTES
      ===================================== */}

      <Route element={<RecruiterProtectedRoute />}>

        <Route
          path="/recruiter"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/recruiter/jobs"
          element={<JobRequirements />}
        />

        <Route
          path="/recruiter/submissions"
          element={<MySubmissions />}
        />

        <Route
          path="/recruiter/candidates"
          element={<Candidates />}
        />

        <Route
          path="/recruiter/vendors"
          element={<VendorManagement />}
        />

      </Route>

    </Routes>
  );
}
