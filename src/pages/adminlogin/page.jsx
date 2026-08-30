import { useState } from "react";
import {
FaEnvelope,
FaLock,
FaEye,
FaEyeSlash,
FaArrowLeft,
FaShieldAlt,
FaBriefcase,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
const navigate = useNavigate();

const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
email: "",
password: "",
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleLogin = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/login`,
    formData
  );

  localStorage.setItem("adminToken", res.data.token);

  alert("Login Successful");
  navigate("/admin/dashboard");
} catch (err) {
  alert(
    err.response?.data?.message || "Login Failed. Please try again."
  );
} finally {
  setLoading(false);
}


};

return ( <section className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">

  {/* Background Glow */}
  <div className="absolute top-[-180px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

  <div className="w-full max-w-md relative z-10">

    {/* Logo / Brand */}
    <div className="text-center mb-8">

      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
        <span className="text-3xl font-extrabold text-white">
          T
        </span>
      </div>

      <h1 className="text-3xl font-bold text-white mt-5">
        TechBy Admin
      </h1>

      <p className="text-slate-400 mt-2">
        Manage your job opportunities
      </p>

    </div>

    {/* Login Card */}
    <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-7 sm:p-9 shadow-2xl">

      {/* Card Header */}
      <div className="mb-8">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <FaShieldAlt className="text-emerald-400" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Admin Login
            </h2>

            <p className="text-sm text-slate-500">
              Secure administrator access
            </p>
          </div>

        </div>

      </div>

      <form onSubmit={handleLogin} className="space-y-5">

        {/* Email */}
        <div>

          <label className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>

          <div className="relative">

            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@techby.in"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />

          </div>

        </div>

        {/* Password */}
        <div>

          <div className="flex items-center justify-between mb-2">

            <label className="text-sm font-medium text-slate-300">
              Password
            </label>

          </div>

          <div className="relative">

            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-11 pr-12 text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

          </div>

        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-semibold rounded-xl py-3.5 transition-all duration-200 shadow-lg shadow-emerald-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

      </form>

      {/* Security Note */}
      <div className="mt-7 pt-6 border-t border-slate-800">

        <div className="flex items-start gap-3">

          <FaShieldAlt className="text-emerald-400 mt-0.5 shrink-0" />

          <p className="text-xs leading-5 text-slate-500">
            This area is restricted to authorized TechBy
            administrators. Your login credentials are protected
            and should never be shared.
          </p>

        </div>

      </div>

    </div>

    {/* Back to Website */}
    <div className="text-center mt-7">

      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-emerald-400 transition"
      >
        <FaArrowLeft className="text-xs" />
        Back to TechBy
      </Link>

    </div>

    {/* Footer */}
    <div className="flex items-center justify-center gap-2 mt-8 text-xs text-slate-600">
      <FaBriefcase />
      <span>TechBy • Find Jobs. Build Your Career.</span>
    </div>

  </div>
</section>


);
}
