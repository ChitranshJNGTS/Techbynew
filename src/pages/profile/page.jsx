import {
  FaUser,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaFilePdf,
  FaBookmark,
  FaClipboardList,
  FaUserEdit,
  FaChartLine,
  FaCalendarCheck,
  FaSignOutAlt,
} from "react-icons/fa";

import { useEffect, useRef, useState } from "react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import API from "../../Api/JobApi";

export default function Profile() {
  const fileRef = useRef();

  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

const [form, setForm] = useState({
  name: "",
  phone: "",
  education: "",
  experience: "",
  skills: "",
  currentCompany: "",
  currentCTC: "",
  expectedCTC: "",
  noticePeriod: "",
  address: "",
  city: "",
  state: "",
  country: "",
  about: "",
});
useEffect(() => {
  if (user) {
    setForm({
      ...user,
      skills: user.skills?.join(", "),
    });
  }
}, [user]);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const { data } = await API.get("/users/profile");

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadResume = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("resume", file);

      const { data } = await API.put(
        "/users/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        alert("Resume Uploaded Successfully");
        setUser(data.user);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async () => {
  try {
    const payload = {
      ...form,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    const { data } = await API.put(
      "/users/update-profile",
      payload
    );

    if (data.success) {
      setUser(data.user);
      setShowEdit(false);
      alert("Profile Updated");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Update Failed");
  }
};

  if (!user) {
    return (
      <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-white text-xl font-semibold">
            Loading Profile...
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-slate-950 min-h-screen pt-24 pb-16">

        {/* Cover */}

        <div className="relative h-56 md:h-72 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700">

          <div className="absolute inset-0 bg-black/30"></div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">{/* Profile Card */}

<div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-xl overflow-hidden">

  <div className="p-6 lg:p-8">

    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

      {/* Left */}

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">

        <img
          src={
            user.profileImage
              ? `http://localhost:5050/${user.profileImage}`
              : "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=400"
          }
          alt="Profile"
          className="w-36 h-36 rounded-full border-4 border-emerald-500 object-cover"
        />

        <div className="text-center sm:text-left">

          <h1 className="text-3xl lg:text-4xl font-bold text-white">
            {user.name}
          </h1>

          <p className="text-emerald-400 text-lg mt-2 capitalize">
            {user.role}
          </p>

          <div className="flex flex-wrap justify-center sm:justify-start gap-5 mt-5 text-slate-300">

            <span className="flex items-center gap-2">
              <FaBriefcase />
              {user.experience || "Fresher"}
            </span>

            <span className="flex items-center gap-2">
              <FaMapMarkerAlt />
              {`${user.city || ""} ${user.state ? ", " + user.state : ""}`}
            </span>

          </div>

          <div className="flex flex-wrap justify-center sm:justify-start gap-5 mt-4 text-slate-400">

            <span className="flex items-center gap-2">
              <FaEnvelope />
              {user.email}
            </span>

            <span className="flex items-center gap-2">
              <FaPhone />
              {user.phone}
            </span>

          </div>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-col items-center lg:items-end gap-5">

       <button
  onClick={() => setShowEdit(true)}
  className="bg-emerald-500 px-6 py-3 rounded-xl text-white"
>
  <FaUserEdit />
  Edit Profile
</button>

        <div className="w-full lg:w-72">

          <div className="flex justify-between text-sm mb-2 text-white">

            <span>Profile Completion</span>

            <span>80%</span>

          </div>

          <div className="h-3 rounded-full bg-slate-700 overflow-hidden">

            <div
              style={{ width: "80%" }}
              className="bg-emerald-500 h-full rounded-full"
            />

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

{/* Dashboard */}

<div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10">

  {/* Sidebar */}

  <aside className="space-y-6">

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

      <h2 className="text-white text-xl font-semibold mb-6">
        Dashboard
      </h2>

      <div className="space-y-4">

        <button className="w-full flex items-center gap-3 text-emerald-400">

          <FaUser />

          My Profile

        </button>

        <button className="w-full flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition">

          <FaFilePdf />

          Resume

        </button>

        <button className="w-full flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition">

          <FaClipboardList />

          Applied Jobs

        </button>

        <button className="w-full flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition">

          <FaBookmark />

          Saved Jobs

        </button>

        <button className="w-full flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition">

          <FaCalendarCheck />

          Mock Interviews

        </button>

        <button className="w-full flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition">

          <FaChartLine />

          Profile Analytics

        </button>

      </div>

    </div>

    {/* Quick Stats */}

    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">

      <h2 className="text-white text-xl font-semibold mb-6">
        Quick Stats
      </h2>

      <div className="space-y-5">

        <div className="flex justify-between">
          <span className="text-slate-400">Applied Jobs</span>
          <span className="text-white font-bold">0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Saved Jobs</span>
          <span className="text-white font-bold">0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Mock Interviews</span>
          <span className="text-white font-bold">0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-slate-400">Resume</span>

          <span
            className={`font-bold ${
              user.resume ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {user.resume ? "Uploaded" : "Not Uploaded"}
          </span>

        </div>
       

      </div>
    </div>
  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6">
 <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }}
  className="
  flex items-center gap-2
  text-red-400
  hover:text-red-500
  font-semibold
  "
>
  <FaSignOutAlt />
  Logout
</button>
      </div>
  </aside>

  {/* Main Content */}

  <div className="lg:col-span-3 space-y-8">{/* About */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="flex items-center justify-between mb-6">

    <h2 className="text-2xl font-bold text-white">
      About Me
    </h2>

    <button className="text-emerald-400 hover:text-emerald-300">
      Edit
    </button>

  </div>

  <p className="text-slate-300 leading-8">

    {user.about ||
      "No introduction added yet. Tell recruiters about yourself, your experience, projects and career goals."}

  </p>

</div>

{/* Skills */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="flex justify-between items-center mb-8">

    <h2 className="text-2xl font-bold text-white">
      Skills
    </h2>

    <button className="text-emerald-400 hover:text-emerald-300">
      + Add Skill
    </button>

  </div>

  {user.skills && user.skills.length > 0 ? (

    <div className="flex flex-wrap gap-3">

      {user.skills.map((skill, index) => (

        <span
          key={index}
          className="px-5 py-3 bg-slate-800 rounded-xl text-slate-300 hover:bg-emerald-500 hover:text-white transition"
        >
          {skill}
        </span>

      ))}

    </div>

  ) : (

    <div className="text-slate-400">

      No skills added yet.

    </div>

  )}

</div>{/* Experience */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="flex justify-between items-center mb-8">

    <h2 className="text-2xl font-bold text-white">
      Work Experience
    </h2>

    <button className="text-emerald-400 hover:text-emerald-300">
      + Add Experience
    </button>

  </div>

  {user.experience ? (

    <div className="border-l-4 border-emerald-500 pl-6">

      <h3 className="text-xl font-semibold text-white">
        {user.currentCompany || "Current Company"}
      </h3>

      <p className="text-emerald-400 mt-2">
        {user.experience}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <div>
          <p className="text-slate-500 text-sm">
            Current CTC
          </p>

          <p className="text-white mt-1">
            {user.currentCTC || "Not Added"}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Expected CTC
          </p>

          <p className="text-white mt-1">
            {user.expectedCTC || "Not Added"}
          </p>
        </div>

        <div>
          <p className="text-slate-500 text-sm">
            Notice Period
          </p>

          <p className="text-white mt-1">
            {user.noticePeriod || "Immediate"}
          </p>
        </div>

      </div>

    </div>

  ) : (

    <div className="text-slate-400">
      No work experience added yet.
    </div>

  )}

</div>

{/* Education */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="flex justify-between items-center mb-8">

    <h2 className="text-2xl font-bold text-white">
      Education
    </h2>

    <button className="text-emerald-400 hover:text-emerald-300">
      + Add Education
    </button>

  </div>

  {user.education ? (

    <div className="border-l-4 border-yellow-500 pl-6">

      <h3 className="text-xl font-semibold text-white">
        {user.education}
      </h3>

      <p className="text-slate-300 mt-3">
        {user.address || "Address not available"}
      </p>

      <div className="mt-5 flex flex-wrap gap-6">

        <span className="text-slate-400">
          <strong className="text-white">City:</strong> {user.city || "N/A"}
        </span>

        <span className="text-slate-400">
          <strong className="text-white">State:</strong> {user.state || "N/A"}
        </span>

        <span className="text-slate-400">
          <strong className="text-white">Country:</strong> {user.country || "N/A"}
        </span>

      </div>

    </div>

  ) : (

    <div className="text-slate-400">
      No education details added yet.
    </div>

  )}

</div>{/* Resume */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

    <div>

      <h2 className="text-2xl font-bold text-white">
        Resume
      </h2>

      <p className="text-slate-400 mt-3">

        {user.resume
          ? user.resume.split("/").pop()
          : "No Resume Uploaded"}

      </p>

    </div>

    {/* Hidden File Input */}

    <input
      type="file"
      accept=".pdf,.doc,.docx"
      ref={fileRef}
      onChange={uploadResume}
      hidden
    />

    <div className="flex flex-wrap gap-4">

      <button
        onClick={() => {
          if (!user.resume) {
            return alert("No Resume Uploaded");
          }

          window.open(
            `http://localhost:5050/${user.resume}`,
            "_blank"
          );
        }}
        className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition"
      >
        View Resume
      </button>

      <button
        onClick={() => fileRef.current.click()}
        disabled={uploading}
        className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white transition"
      >
        {uploading ? "Uploading..." : "Upload New Resume"}
      </button>

    </div>

  </div>

</div>

{/* Applied Jobs */}

<div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">

  <div className="flex justify-between items-center mb-6">

    <h2 className="text-2xl font-bold text-white">
      Applied Jobs
    </h2>

    <button className="text-emerald-400 hover:text-emerald-300">
      View All
    </button>

  </div>

  <div className="text-slate-400">

    You haven't applied for any jobs yet.

  </div>

</div>

</div>

</div>

</div>

</section>
{showEdit && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
    <div className="bg-slate-900 rounded-2xl w-full max-w-3xl p-8 border border-slate-700">
      <h2 className="text-3xl font-bold text-white mb-8">
        Edit Profile
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Education"
          value={form.education}
          onChange={(e) =>
            setForm({ ...form, education: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Experience"
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Current Company"
          value={form.currentCompany}
          onChange={(e) =>
            setForm({
              ...form,
              currentCompany: e.target.value,
            })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Current CTC"
          value={form.currentCTC}
          onChange={(e) =>
            setForm({
              ...form,
              currentCTC: e.target.value,
            })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Expected CTC"
          value={form.expectedCTC}
          onChange={(e) =>
            setForm({
              ...form,
              expectedCTC: e.target.value,
            })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Notice Period"
          value={form.noticePeriod}
          onChange={(e) =>
            setForm({
              ...form,
              noticePeriod: e.target.value,
            })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="City"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="State"
          value={form.state}
          onChange={(e) =>
            setForm({ ...form, state: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Country"
          value={form.country}
          onChange={(e) =>
            setForm({ ...form, country: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white"
        />

        <input
          placeholder="Skills (React, Node, MongoDB)"
          value={form.skills}
          onChange={(e) =>
            setForm({ ...form, skills: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white md:col-span-2"
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) =>
            setForm({ ...form, address: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white md:col-span-2"
        />

        <textarea
          rows={5}
          placeholder="About Yourself"
          value={form.about}
          onChange={(e) =>
            setForm({ ...form, about: e.target.value })
          }
          className="bg-slate-800 p-3 rounded-lg text-white md:col-span-2"
        />

      </div>

      <div className="flex justify-end gap-4 mt-8">

        <button
          onClick={() => setShowEdit(false)}
          className="px-6 py-3 rounded-lg bg-slate-700 text-white"
        >
          Cancel
        </button>

        <button
          onClick={updateProfile}
          className="px-6 py-3 rounded-lg bg-emerald-500 text-white"
        >
          Save Changes
        </button>

      </div>
    </div>
  </div>
)}

<Footer />

</>
);
}