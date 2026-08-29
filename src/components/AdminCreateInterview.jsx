// import { useState } from "react";
// import API from "../Api/JobApi";

// export default function AdminCreateInterview() {
//   const [form, setForm] = useState({
//     title: "",
//     recruiter: "",
//     role: "",
//     company: "",
//     date: "",
//     time: "",
//     duration: "90 Minutes",
//     mode: "Google Meet",
//     price: "",
//     totalSeats: 5,
//     interviewLink: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const { data } = await API.post(
//         "/interviews/create",
//         {
//           ...form,
//           price: Number(form.price),
//           totalSeats: Number(form.totalSeats),
//         }
//       );

//       if (data.success) {
//         alert("Interview Slot Created Successfully");

//         setForm({
//           title: "",
//           recruiter: "",
//           role: "",
//           company: "",
//           date: "",
//           time: "",
//           duration: "90 Minutes",
//           mode: "Google Meet",
//           price: "",
//           totalSeats: 5,
//           interviewLink: "",
//         });
//       }
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 p-8">
//       <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl border border-slate-800 p-8">

//         <h1 className="text-3xl font-bold text-white mb-8">
//           Create Demo Interview Slot
//         </h1>

//         <form
//           onSubmit={submitHandler}
//           className="grid md:grid-cols-2 gap-6"
//         >

//           <input
//             type="text"
//             name="title"
//             placeholder="Interview Title"
//             value={form.title}
//             onChange={handleChange}
//             required
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="text"
//             name="recruiter"
//             placeholder="Recruiter Name"
//             value={form.recruiter}
//             onChange={handleChange}
//             required
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="text"
//             name="role"
//             placeholder="Recruiter Role"
//             value={form.role}
//             onChange={handleChange}
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="text"
//             name="company"
//             placeholder="Company"
//             value={form.company}
//             onChange={handleChange}
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="date"
//             name="date"
//             value={form.date}
//             onChange={handleChange}
//             required
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="text"
//             name="time"
//             placeholder="7:00 PM - 8:30 PM"
//             value={form.time}
//             onChange={handleChange}
//             required
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="text"
//             name="duration"
//             value={form.duration}
//             onChange={handleChange}
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <select
//             name="mode"
//             value={form.mode}
//             onChange={handleChange}
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           >
//             <option>Google Meet</option>
//             <option>Zoom</option>
//             <option>Offline</option>
//           </select>

//           <input
//             type="number"
//             name="price"
//             placeholder="Price"
//             value={form.price}
//             onChange={handleChange}
//             required
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="number"
//             name="totalSeats"
//             value={form.totalSeats}
//             onChange={handleChange}
//             className="bg-slate-800 p-4 rounded-xl text-white"
//           />

//           <input
//             type="text"
//             name="interviewLink"
//             placeholder="Google Meet Link (Optional)"
//             value={form.interviewLink}
//             onChange={handleChange}
//             className="bg-slate-800 p-4 rounded-xl text-white md:col-span-2"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-semibold"
//           >
//             {loading ? "Creating..." : "Create Interview Slot"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// } 



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

      const { data } = await API.post("/interviews/create", {
        ...form,
        price: Number(form.price),
        totalSeats: Number(form.totalSeats),
      });

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
      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">

      <div className="max-w-4xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Create Demo Interview Slot
          </h1>

          <p className="text-slate-500 mt-2">
            Create a new interview session for candidates.
          </p>

        </div>


        {/* ================= FORM CARD ================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-8">

          <form
            onSubmit={submitHandler}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* Interview Title */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Frontend Developer Interview"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Recruiter */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Recruiter Name
              </label>

              <input
                type="text"
                name="recruiter"
                placeholder="Recruiter Name"
                value={form.recruiter}
                onChange={handleChange}
                required
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Recruiter Role */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Recruiter Role
              </label>

              <input
                type="text"
                name="role"
                placeholder="e.g. HR Manager"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Company */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Company
              </label>

              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={form.company}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Date */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Date
              </label>

              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Time */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Time
              </label>

              <input
                type="text"
                name="time"
                placeholder="7:00 PM - 8:30 PM"
                value={form.time}
                onChange={handleChange}
                required
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Duration */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Duration
              </label>

              <input
                type="text"
                name="duration"
                placeholder="90 Minutes"
                value={form.duration}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Mode */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Mode
              </label>

              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              >
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Offline</option>
              </select>
            </div>


            {/* Price */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  placeholder="499"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full bg-white border border-slate-200 p-4 pl-9 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                />

              </div>
            </div>


            {/* Total Seats */}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Total Seats
              </label>

              <input
                type="number"
                name="totalSeats"
                value={form.totalSeats}
                onChange={handleChange}
                min="1"
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>


            {/* Interview Link */}

            <div className="md:col-span-2">

              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Link
                <span className="text-slate-400 font-normal ml-1">
                  (Optional)
                </span>
              </label>

              <input
                type="text"
                name="interviewLink"
                placeholder="https://meet.google.com/..."
                value={form.interviewLink}
                onChange={handleChange}
                className="w-full bg-white border border-slate-200 p-4 rounded-xl text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />

            </div>


            {/* ================= SUBMIT BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white py-4 rounded-xl font-semibold transition shadow-sm flex items-center justify-center gap-2"
            >

              {loading && (
                <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              )}

              {loading
                ? "Creating..."
                : "Create Interview Slot"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

