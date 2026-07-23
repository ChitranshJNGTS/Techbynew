import { useState } from "react";
import API from "../Api/JobApi";

export default function AdminCreateInterview() {
  const [form, setForm] = useState({
    title: "",
    recruiter: "",
    role: "",
    company: "",
    date: "",
    time: "",
    duration: "90 Minutes",
    mode: "Google Meet",
    price: "",
    totalSeats: 5,
    interviewLink: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/interviews/create",
        {
          ...form,
          price: Number(form.price),
          totalSeats: Number(form.totalSeats),
        }
      );

      if (data.success) {
        alert("Interview Slot Created Successfully");

        setForm({
          title: "",
          recruiter: "",
          role: "",
          company: "",
          date: "",
          time: "",
          duration: "90 Minutes",
          mode: "Google Meet",
          price: "",
          totalSeats: 5,
          interviewLink: "",
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-8">

        <h1 className="text-3xl font-bold text-white mb-8">
          Create Demo Interview Slot
        </h1>

        <form
          onSubmit={submitHandler}
          className="grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Interview Title"
            value={form.title}
            onChange={handleChange}
            required
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="recruiter"
            placeholder="Recruiter Name"
            value={form.recruiter}
            onChange={handleChange}
            required
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="role"
            placeholder="Recruiter Role"
            value={form.role}
            onChange={handleChange}
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="time"
            placeholder="7:00 PM - 8:30 PM"
            value={form.time}
            onChange={handleChange}
            required
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <select
            name="mode"
            value={form.mode}
            onChange={handleChange}
            className="bg-slate-800 p-4 rounded-xl text-white"
          >
            <option>Google Meet</option>
            <option>Zoom</option>
            <option>Offline</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="number"
            name="totalSeats"
            value={form.totalSeats}
            onChange={handleChange}
            className="bg-slate-800 p-4 rounded-xl text-white"
          />

          <input
            type="text"
            name="interviewLink"
            placeholder="Google Meet Link (Optional)"
            value={form.interviewLink}
            onChange={handleChange}
            className="bg-slate-800 p-4 rounded-xl text-white md:col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold"
          >
            {loading ? "Creating..." : "Create Interview Slot"}
          </button>

        </form>
      </div>
    </div>
  );
}