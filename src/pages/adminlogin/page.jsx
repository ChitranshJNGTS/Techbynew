import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
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
        "http://localhost:5050/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

        <div className="text-center">

          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500 flex items-center justify-center text-3xl font-bold text-white">
            W
          </div>

          <h1 className="text-4xl font-bold text-white mt-6">
            Admin Login
          </h1>

          <p className="text-slate-400 mt-3">
            Login to your WorkScout Admin Panel
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-6"
        >

          {/* Email */}

          <div>

            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <div className="relative">

              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@workscout.com"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-4 pl-12 pr-12 text-white outline-none focus:border-emerald-500"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 rounded-xl py-4 text-lg font-semibold text-white transition disabled:opacity-50"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

        <div className="text-center mt-8">

          <Link
            to="/"
            className="text-slate-400 hover:text-emerald-400"
          >
            ← Back to Website
          </Link>

        </div>

      </div>

    </section>
  );
}