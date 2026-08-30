// import { Routes, Route } from "react-router-dom";

// // Pages
// import Home from "../pages/Home";
// import AllJobs from "../components/AllJobs";
// import Login from "../pages/login/Login";
// import DemoInterview from "../components/DemoInterview";
// import JobDescription from "../components/JobDescription";
// import About from "../pages/About/About";
// import Contact from "../pages/contect/page";
// import PrivacyPolicy from "../pages/privecy&policy/page";
// import TermsAndConditions from "../pages/term&condition/page";
// import Profile from "../pages/profile/page";
// import AdminDashboard from "../pages/admin-Dashboard/page";
// import PostJob from "../pages/PostJob/page";
// import AdminLogin from "../pages/adminlogin/page";
// import TrainingProgram from "../components/TrainingProgram";


// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public Routes */}
//       <Route path="/" element={<Home />} />
//      <Route path="/all-jobs" element={<AllJobs />} />
// <Route path="/jobs" element={<AllJobs />} />
//       {/* <Route path="/mock-interview" element={<DemoInterview />} /> */}
//        <Route path="/login" element={<Login />} />
//         <Route path="/jobs/:slug" element={<JobDescription />} />
//          {/* <Route path="/about" element={<About />} /> */}
//           {/* <Route path="/contact" element={<Contact />} /> */}
//             <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//               <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//               {/* <Route path="/profile" element={<Profile />} /> */}
//               {/* <Route path="/admin" element={<AdminDashboard/>} /> */}
//               <Route path="/recruiter/post-job" element={<PostJob />} />
//               <Route path="/admin/login" element={<AdminLogin />} />
//               {/* <Route path="/training" element={<TrainingProgram />} /> */}
//     </Routes>
//   );
// } 



import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/Home";
import AllJobs from "../components/AllJobs";
import Login from "../pages/login/Login";
import JobDescription from "../components/JobDescription";
import PrivacyPolicy from "../pages/privecy&policy/page";
import TermsAndConditions from "../pages/term&condition/page";
import PostJob from "../pages/PostJob/page";
import AdminDashboard from "../pages/admin-Dashboard/page";
import AdminLogin from "../pages/adminlogin/page";
import About from "../pages/About/About";

import AdminProtectedRoute from "./AdminProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/all-jobs" element={<AllJobs />} />

      <Route path="/jobs" element={<AllJobs />} />
      <Route path="/about-us" element={<About />} />

      <Route path="/login" element={<Login />} />

      <Route path="/jobs/:slug" element={<JobDescription />} />

      <Route
        path="/privacy-policy"
        element={<PrivacyPolicy />}
      />

      <Route
        path="/terms-condition"
        element={<TermsAndConditions />}
      />

     
      {/* ================= ADMIN LOGIN ================= */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* ================= PROTECTED ADMIN ROUTES ================= */}

      <Route element={<AdminProtectedRoute />}>

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
 {/* ================= RECRUITER ================= */}

      <Route
        path="/recruiter/post-job"
        element={<PostJob />}
      />

      </Route>

    </Routes>
  );
}