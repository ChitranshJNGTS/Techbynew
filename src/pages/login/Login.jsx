import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaUser,
  FaPhoneAlt,
  FaBriefcase,
} from "react-icons/fa";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const API = "http://localhost:5050/api/users";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "candidate",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    if (isLogin) {
      const res = await axios.post(`${API}/login`, {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/");
    } else {
      const res = await axios.post(`${API}/register`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirmPassword: form.confirmPassword,
        role: form.role,
      });

      alert(res.data.message);

      setIsLogin(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "candidate",
      });
    }
  } catch (err) {
    alert(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};
  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center py-16 px-4">

      <div className="max-w-6xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">

        {/* Left Side */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-emerald-500 to-green-700 p-14 text-white">

          <h1 className="text-5xl font-bold leading-tight">
            Welcome to
            <br />
            Job Portal
          </h1>

          <p className="mt-8 text-lg leading-8 text-green-100">
            Find your dream job, connect with top companies,
            schedule mock interviews, build your career,
            and get hired faster.
          </p>

          <div className="space-y-6 mt-12">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <FaBriefcase />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  10,000+ Jobs
                </h3>

                <p className="text-green-100">
                  Updated daily
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <FaUser />
              </div>

              <div>
                <h3 className="font-semibold text-xl">
                  5,000+ Companies
                </h3>

                <p className="text-green-100">
                  Trusted employers
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="p-10 lg:p-14">

          <div className="text-center">

            <h2 className="text-4xl font-bold text-white">

              {isLogin ? "Welcome Back" : "Create Account"}

            </h2>

            <p className="text-slate-400 mt-3">

              {isLogin
                ? "Login to continue"
                : "Register and start your career"}

            </p>

          </div>

          {/* Toggle */}

          <div className="bg-slate-800 rounded-full flex p-1 mt-10">

            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-full transition ${
                isLogin
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-full transition ${
                !isLogin
                  ? "bg-emerald-500 text-white"
                  : "text-slate-300"
              }`}
            >
              Register
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 mt-10"
          >            {!isLogin && (
              <>
                {/* Full Name */}

                <div className="relative">
                  <FaUser className="absolute left-4 top-5 text-slate-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Phone */}

                <div className="relative">
                  <FaPhoneAlt className="absolute left-4 top-5 text-slate-400" />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Mobile Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                  />
                </div>
              </>
            )}

            {/* Email */}

            <div className="relative">
              <FaEnvelope className="absolute left-4 top-5 text-slate-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
              />
            </div>

            {/* Password */}

            <div className="relative">
              <FaLock className="absolute left-4 top-5 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-5 text-slate-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Confirm Password */}

            {!isLogin && (
              <div className="relative">
                <FaLock className="absolute left-4 top-5 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />
              </div>
            )}

            {/* Role */}

            {!isLogin && (
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 px-4 text-white outline-none"
              >
                <option value="candidate">Candidate</option>
                <option value="employer">Employer</option>
              </select>
            )}

            {/* Remember */}

            {isLogin && (
              <div className="flex justify-between items-center">

                <label className="flex items-center gap-2 text-slate-300">
                  <input type="checkbox" />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="text-emerald-400 hover:underline"
                >
                  Forgot Password?
                </button>

              </div>
            )}

            {/* Terms */}

            {!isLogin && (
              <label className="flex items-start gap-3 text-slate-300 text-sm">
                <input type="checkbox" required className="mt-1" />
                I agree to the Terms & Conditions and Privacy Policy.
              </label>
            )}

            {/* Submit */}

            <button
  type="submit"
  disabled={loading}
  className="w-full bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-white font-semibold transition disabled:opacity-50"
>
  {loading
    ? "Please Wait..."
    : isLogin
    ? "Login"
    : "Create Account"}
</button>

            <div className="flex items-center gap-3">

              <div className="flex-1 h-px bg-slate-700"></div>

              <span className="text-slate-400 text-sm">
                OR
              </span>

              <div className="flex-1 h-px bg-slate-700"></div>

            </div>

            {/* Social Login */}

            <div className="grid grid-cols-3 gap-4">

              <button
                type="button"
                className="py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 flex justify-center"
              >
                <FaGoogle />
              </button>

              <button
                type="button"
                className="py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 flex justify-center"
              >
                <FaFacebook />
              </button>

              <button
                type="button"
                className="py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 flex justify-center"
              >
                <FaLinkedin />
              </button>

            </div>

          </form>

          <p className="text-center text-slate-400 mt-8">

            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-emerald-400 ml-2 hover:underline font-semibold"
            >
              {isLogin ? "Register" : "Login"}
            </button>

          </p>

        </div>

      </div>

    </section>
  );
}