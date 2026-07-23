import { useEffect, useState } from "react";
import API from "../Api/JobApi";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const { data } = await API.get("/applications/all");

      if (data.success) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-8">

      <h1 className="text-3xl font-bold text-white mb-8">
        Job Applications
      </h1>

      <div className="overflow-x-auto rounded-xl">

        <table className="w-full">

          <thead className="bg-emerald-600 text-white">

            <tr>

              <th className="p-4">Candidate</th>

              <th className="p-4">Email</th>

              <th className="p-4">Phone</th>

              <th className="p-4">Job</th>

              <th className="p-4">Company</th>

              <th className="p-4">Resume</th>

              <th className="p-4">Applied</th>

            </tr>

          </thead>

         <tbody>
  {applications.map((item) => (
    <tr
      key={item._id}
      className="border-b border-slate-800 text-center text-white"
    >
      <td className="p-4">
        {item.candidate?.name}
      </td>

      <td className="p-4">
        {item.candidate?.email}
      </td>

      <td className="p-4">
        {item.candidate?.phone}
      </td>

      <td className="p-4">
        {item.job?.jobTitle}
      </td>

      <td className="p-4">
        {item.job?.companyName}
      </td>

      <td className="p-4">
        {item.candidate?.resume ? (
          <a
            href={`http://localhost:5050/${item.candidate.resume.replace(/\\/g, "/")}`}
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:underline"
          >
            View Resume
          </a>
        ) : (
          "No Resume"
        )}
      </td>

      <td className="p-4">
        {new Date(item.createdAt).toLocaleDateString()}
      </td>
    </tr>
  ))}
</tbody>

        </table>

      </div>

    </div>
  );
}