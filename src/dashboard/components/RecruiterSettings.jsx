
import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Camera,
  Save,
  LockKeyhole,
  Loader2,
  ShieldCheck,
} from "lucide-react";

import {
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../../../firebase";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const RecruiterSettings = ({ onProfileUpdate }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || "");
      setPhotoURL(currentUser.photoURL || "");
    }
  }, []);

 
const handleSave = async (e) => {
  e.preventDefault();
  setMessage({ type: "", text: "" });

  const currentUser = auth.currentUser;

  if (!currentUser) {
    setMessage({
      type: "error",
      text: "Your session has expired. Please log in again.",
    });
    return;
  }

  const updatedName = name.trim();
  const updatedPhotoURL = photoURL.trim();

  if (updatedName.length < 2 || updatedName.length > 100) {
    setMessage({
      type: "error",
      text: "Name must contain between 2 and 100 characters.",
    });
    return;
  }

  if (updatedPhotoURL) {
    try {
      new URL(updatedPhotoURL);
    } catch {
      setMessage({
        type: "error",
        text: "Please enter a valid profile image URL.",
      });
      return;
    }
  }

  try {
    setSaving(true);

    // Get Firebase authentication token
    const token = await currentUser.getIdToken();

    // Update MongoDB recruiter profile
    const response = await axios.patch(
      `${API_URL}/recruiters/profile`,
      {
        name: updatedName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data?.success) {
      throw new Error(
        response.data?.message || "Failed to update recruiter profile."
      );
    }

    // Update Firebase display name and profile photo
    await updateProfile(currentUser, {
      displayName: updatedName,
      photoURL: updatedPhotoURL || null,
    });

    await currentUser.reload();

    const updatedUser = auth.currentUser;

    setUser(updatedUser);
    setName(updatedUser.displayName || updatedName);
    setPhotoURL(updatedUser.photoURL || "");

    // Update parent dashboard profile
    onProfileUpdate?.({
      name: updatedUser.displayName || updatedName,
      avatar: updatedUser.photoURL || null,
    });

    setMessage({
      type: "success",
      text: "Your recruiter profile has been updated successfully.",
    });

  } catch (error) {
    console.error(
      "Profile update error:",
      error.response?.data || error
    );

    setMessage({
      type: "error",
      text:
        error.response?.data?.message ||
        error.message ||
        "Unable to update your profile.",
    });
  } finally {
    setSaving(false);
  }
};


  const handlePasswordReset = async () => {
    const email = auth.currentUser?.email;

    if (!email) {
      setMessage({
        type: "error",
        text: "No email address is linked to this account.",
      });
      return;
    }

    try {
      setSendingReset(true);
      setMessage({ type: "", text: "" });

      await sendPasswordResetEmail(auth, email);

      setMessage({
        type: "success",
        text: `Password reset link sent to ${email}. Please check your inbox.`,
      });
    } catch (error) {
      console.error("Password reset error:", error);

      setMessage({
        type: "error",
        text: error.message || "Unable to send password reset email.",
      });
    } finally {
      setSendingReset(false);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={28} />
      </div>
    );
  }

  const avatar =
    photoURL ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name || "Recruiter"
    )}&background=059669&color=fff`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Account Settings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage your recruiter profile and account security.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Personal Information
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Update the information displayed on your recruiter account.
          </p>
        </div>

        <div className="mb-7 flex items-center gap-4">
          <img
            src={avatar}
            alt="Recruiter profile"
            onError={(e) => {
              e.currentTarget.src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  name || "Recruiter"
                )}&background=059669&color=fff`;
            }}
            className="h-20 w-20 rounded-full border border-slate-200 object-cover"
          />

          <div>
            <p className="font-semibold text-slate-800">
              Profile Photo
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Add an image URL below to update your profile photo.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={user.email || ""}
                readOnly
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-500 outline-none"
              />
            </div>

            <p className="mt-1.5 text-xs text-slate-400">
              Your registered Firebase email address.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Profile Image URL
            </label>

            <div className="relative">
              <Camera
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/profile.jpg"
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>

          {message.text && (
            <div
              className={`rounded-xl px-4 py-3 text-sm ${
                message.type === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex justify-end border-t border-slate-100 pt-5">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Save size={17} />
              )}
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-5 flex items-start gap-3">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <ShieldCheck size={22} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Account Security
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Keep your recruiter account secure.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 rounded-xl border border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-slate-100 p-2.5 text-slate-600">
              <LockKeyhole size={20} />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Password
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Receive a password reset link by email.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePasswordReset}
            disabled={sendingReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-700 disabled:opacity-60"
          >
            {sendingReset && (
              <Loader2 size={16} className="animate-spin" />
            )}
            {sendingReset ? "Sending..." : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterSettings;
