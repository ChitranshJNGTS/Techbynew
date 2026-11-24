
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BriefcaseBusiness,
  Mail,
  LockKeyhole,
  UserRound,
  Building2,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../../firebase";

const API_URL = import.meta.env.VITE_API_URL;

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 disabled:opacity-60";

// =====================================
// REUSABLE INPUT COMPONENT
// Keep outside RecruiterAuth
// =====================================
const Input = ({ label, icon: Icon, loading, ...props }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">
      {label}
    </span>

    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <input
        {...props}
        className={inputClass}
        required
        disabled={loading}
      />
    </div>
  </label>
);

// =====================================
// REUSABLE PASSWORD COMPONENT
// Keep outside RecruiterAuth
// =====================================
const Password = ({
  label,
  value,
  onChange,
  visible,
  toggle,
  loading,
}) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">
      {label}
    </span>

    <div className="relative">
      <LockKeyhole className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        required
        disabled={loading}
        placeholder="Enter your password"
        className={`${inputClass} pr-12`}
      />

      <button
        type="button"
        onClick={toggle}
        disabled={loading}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 disabled:opacity-50"
      >
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  </label>
);

// =====================================
// MAIN RECRUITER AUTH COMPONENT
// =====================================
export default function RecruiterAuth() {
  const navigate = useNavigate();

  const [page, setPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [signup, setSignup] = useState({
    name: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const changePage = (value) => {
    setPage(value);
    setMessage("");
    setMessageType("success");
    setShowPassword(false);
    setShowConfirm(false);
  };

  const showFeedback = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  // =====================================
  // BACKEND API HELPER
  // =====================================
  const recruiterRequest = async (endpoint, token, options = {}) => {
    if (!API_URL) {
      throw new Error("API URL is not configured. Check VITE_API_URL.");
    }

    const response = await fetch(
      `${API_URL}/recruiters${endpoint}`,
      {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...options.headers,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(
        data.message || "Something went wrong."
      );

      error.status = response.status;
      error.code = data.code;

      throw error;
    }

    return data;
  };

  // =====================================
  // RECRUITER LOGIN
  // =====================================
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const result = await signInWithEmailAndPassword(
        auth,
        login.email.trim(),
        login.password
      );

      const token = await result.user.getIdToken(true);

      // Verify recruiter profile in MongoDB
      await recruiterRequest("/me", token);

      showFeedback("Login successful. Redirecting...");

      navigate("/recruiter", { replace: true });
    } catch (error) {
      console.error("Recruiter login error:", error);

      // Remove Firebase session if recruiter access is denied
      if (error.status === 403 || error.status === 401) {
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error("Sign out error:", signOutError);
        }
      }

      let errorMessage = "Unable to sign in. Please try again.";

      if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This Firebase account has been disabled.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection.";
      } else if (error.status === 403) {
        errorMessage =
          "This account is not registered as a TechBy recruiter. Please create a recruiter account.";
      } else if (error.status === 401) {
        errorMessage =
          "Your session could not be verified. Please log in again.";
      } else {
        errorMessage = error.message || errorMessage;
      }

      showFeedback(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // RECRUITER SIGNUP
  // =====================================
  const handleSignup = async (e) => {
    e.preventDefault();

    setMessage("");

    if (signup.name.trim().length < 2) {
      showFeedback("Please enter your full name.", "error");
      return;
    }

    if (signup.company.trim().length < 2) {
      showFeedback("Please enter your company name.", "error");
      return;
    }

    if (signup.password.length < 8) {
      showFeedback(
        "Password must contain at least 8 characters.",
        "error"
      );
      return;
    }

    if (signup.password !== signup.confirmPassword) {
      showFeedback("Passwords do not match.", "error");
      return;
    }

    setLoading(true);

    try {
      // Create Firebase account
      const result = await createUserWithEmailAndPassword(
        auth,
        signup.email.trim(),
        signup.password
      );

      const firebaseUser = result.user;

      await updateProfile(firebaseUser, {
        displayName: signup.name.trim(),
      });

      const token = await firebaseUser.getIdToken(true);

      // Create recruiter profile in MongoDB
      await recruiterRequest("/register", token, {
        method: "POST",
        body: JSON.stringify({
          name: signup.name.trim(),
          companyName: signup.company.trim(),
          jobTitle: "US IT Recruiter",
        }),
      });

      showFeedback("Account created successfully. Redirecting...");

      navigate("/recruiter", { replace: true });
    } catch (error) {
      console.error("Recruiter signup error:", error);

      if (error.code === "auth/email-already-in-use") {
        showFeedback(
          "This email is already registered. Please sign in.",
          "error"
        );
      } else if (error.code === "auth/weak-password") {
        showFeedback(
          "Please choose a stronger password.",
          "error"
        );
      } else if (error.code === "auth/invalid-email") {
        showFeedback("Please enter a valid email address.", "error");
      } else {
        showFeedback(
          error.message ||
            "Account creation failed. Please try again.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // FORGOT PASSWORD
  // =====================================
  const handleForgot = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      await sendPasswordResetEmail(
        auth,
        forgotEmail.trim()
      );

      showFeedback(
        "If an account exists for this email, a password reset link will be sent. Please check your inbox."
      );
    } catch (error) {
      console.error("Password reset error:", error);

      let errorMessage =
        "Unable to send reset email. Please try again.";

      if (error.code === "auth/invalid-email") {
        errorMessage = "Please enter a valid email address.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your connection.";
      }

      showFeedback(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // SUBMIT BUTTON
  // =====================================
  const SubmitButton = ({ children }) => (
    <button
      type="submit"
      disabled={loading}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Please wait...
        </>
      ) : (
        <>
          {children}
          <ArrowRight size={17} />
        </>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#f4f7f6] px-4 py-8 sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 lg:grid-cols-2">

          {/* LEFT BRAND SECTION */}
          <div className="relative hidden overflow-hidden bg-[#102b26] p-12 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative z-10">
              <a href="/" className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400 text-[#102b26]">
                  <BriefcaseBusiness size={25} />
                </div>

                <span className="text-2xl font-extrabold tracking-tight">
                  TechBy<span className="text-emerald-400">.</span>
                </span>
              </a>

              <div className="mt-24">
                <p className="mb-4 text-xs font-bold uppercase tracking-[3px] text-emerald-400">
                  TechBy Recruit
                </p>

                <h1 className="max-w-md text-5xl font-bold leading-tight">
                  Recruitment management,{" "}
                  <span className="text-emerald-400">
                    made simpler.
                  </span>
                </h1>

                <p className="mt-6 max-w-md text-base leading-7 text-slate-300">
                  Manage your job requirements, candidate submissions
                  and vendor relationships from one professional workspace.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-6">
              {[
                {
                  icon: BriefcaseBusiness,
                  title: "Manage Requirements",
                  desc: "Organize and monitor your active job openings.",
                },
                {
                  icon: Users,
                  title: "Vendor Collaboration",
                  desc: "Coordinate with vendors and track submissions.",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Workspace",
                  desc: "Keep your recruitment workflow organized.",
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-emerald-400">
                    <item.icon size={20} />
                  </div>

                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}

              <p className="pt-5 text-xs text-slate-500">
                © {new Date().getFullYear()} TechBy. All rights reserved.
              </p>
            </div>
          </div>

          {/* RIGHT FORM SECTION */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-12 lg:px-14">
            <div className="w-full max-w-md">

              {/* MOBILE BRAND */}
              <div className="mb-10 flex items-center gap-3 lg:hidden">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#102b26] text-emerald-400">
                  <BriefcaseBusiness size={21} />
                </div>

                <span className="text-xl font-extrabold text-slate-900">
                  TechBy<span className="text-emerald-600">.</span>
                </span>
              </div>

              {/* LOGIN */}
              {page === "login" && (
                <>
                  <div className="mb-8">
                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      RECRUITER WORKSPACE
                    </span>

                    <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
                      Welcome back
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Sign in to access your recruiter dashboard.
                    </p>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-5">
                    <Input
                      label="Work Email"
                      icon={Mail}
                      loading={loading}
                      type="email"
                      placeholder="you@company.com"
                      value={login.email}
                      onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                      }
                    />

                    <Password
                      label="Password"
                      value={login.password}
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                      visible={showPassword}
                      toggle={() => setShowPassword(!showPassword)}
                      loading={loading}
                    />

                    <div className="flex justify-end">
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => changePage("forgot")}
                        className="text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <SubmitButton>Sign In</SubmitButton>
                  </form>

                  <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                    <p className="text-sm text-slate-500">
                      Don't have a recruiter account?{" "}
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() => changePage("signup")}
                        className="font-bold text-emerald-700 hover:underline"
                      >
                        Create account
                      </button>
                    </p>
                  </div>
                </>
              )}

              {/* CREATE ACCOUNT */}
              {page === "signup" && (
                <>
                  <div className="mb-7">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => changePage("login")}
                      className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
                    >
                      <ArrowLeft size={16} /> Back to login
                    </button>

                    <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                      JOIN TECHBY RECRUIT
                    </span>

                    <h2 className="mt-5 text-3xl font-bold text-slate-900">
                      Create account
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Create your recruiter workspace.
                    </p>
                  </div>

                  <form onSubmit={handleSignup} className="space-y-4">
                    <Input
                      label="Full Name"
                      icon={UserRound}
                      loading={loading}
                      type="text"
                      placeholder="Enter your full name"
                      value={signup.name}
                      onChange={(e) =>
                        setSignup({ ...signup, name: e.target.value })
                      }
                    />

                    <Input
                      label="Work Email"
                      icon={Mail}
                      loading={loading}
                      type="email"
                      placeholder="you@company.com"
                      value={signup.email}
                      onChange={(e) =>
                        setSignup({ ...signup, email: e.target.value })
                      }
                    />

                    <Input
                      label="Company Name"
                      icon={Building2}
                      loading={loading}
                      type="text"
                      placeholder="Enter staffing company name"
                      value={signup.company}
                      onChange={(e) =>
                        setSignup({ ...signup, company: e.target.value })
                      }
                    />

                    <Password
                      label="Create Password"
                      value={signup.password}
                      onChange={(e) =>
                        setSignup({ ...signup, password: e.target.value })
                      }
                      visible={showPassword}
                      toggle={() => setShowPassword(!showPassword)}
                      loading={loading}
                    />

                    <Password
                      label="Confirm Password"
                      value={signup.confirmPassword}
                      onChange={(e) =>
                        setSignup({
                          ...signup,
                          confirmPassword: e.target.value,
                        })
                      }
                      visible={showConfirm}
                      toggle={() => setShowConfirm(!showConfirm)}
                      loading={loading}
                    />

                    <p className="text-xs leading-5 text-slate-400">
                      Use at least 8 characters. Your recruiter workspace
                      will be available immediately after registration.
                    </p>

                    <SubmitButton>
                      Create Recruiter Account
                    </SubmitButton>
                  </form>

                  <div className="mt-6 text-center text-sm text-slate-500">
                    Already registered?{" "}
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => changePage("login")}
                      className="font-bold text-emerald-700 hover:underline"
                    >
                      Sign in
                    </button>
                  </div>
                </>
              )}

              {/* FORGOT PASSWORD */}
              {page === "forgot" && (
                <>
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => changePage("login")}
                    className="mb-8 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
                  >
                    <ArrowLeft size={16} /> Back to login
                  </button>

                  <div className="mb-8">
                    <div className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                      <LockKeyhole size={25} />
                    </div>

                    <h2 className="text-3xl font-bold text-slate-900">
                      Forgot password?
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Enter your registered work email. We'll send you
                      a password reset link.
                    </p>
                  </div>

                  <form onSubmit={handleForgot} className="space-y-5">
                    <Input
                      label="Registered Work Email"
                      icon={Mail}
                      loading={loading}
                      type="email"
                      placeholder="you@company.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />

                    <SubmitButton>Send Reset Link</SubmitButton>
                  </form>
                </>
              )}

              {/* FEEDBACK */}
              {message && (
                <div
                  className={`mt-5 flex items-start gap-2 rounded-xl border p-3 text-sm ${
                    messageType === "error"
                      ? "border-red-200 bg-red-50 text-red-700"
                      : "border-emerald-200 bg-emerald-50 text-emerald-800"
                  }`}
                >
                  {messageType === "error" ? (
                    <AlertCircle
                      size={17}
                      className="mt-0.5 shrink-0"
                    />
                  ) : (
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0"
                    />
                  )}

                  <span>{message}</span>
                </div>
              )}

              <div className="mt-9 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} />
                Secure Recruiter Access
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                By continuing, you agree to TechBy's Terms & Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
