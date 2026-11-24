
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  X,
  Building2,
  UserCheck,
  Clock3,
  Users,
  Mail,
  Phone,
} from "lucide-react";

const initialVendors = [
  { id: 1, name: "ABC Technologies", contact: "Amit Verma", email: "amit@abctech.com", phone: "+1 555 0111", submissions: 18, status: "Approved", joined: "Oct 12, 2026" },
  { id: 2, name: "Global Talent Solutions", contact: "Priya Shah", email: "priya@globaltalent.com", phone: "+1 555 0112", submissions: 12, status: "Approved", joined: "Oct 18, 2026" },
  { id: 3, name: "NextGen Staffing", contact: "John Mathew", email: "john@nextgen.com", phone: "+1 555 0113", submissions: 9, status: "Pending", joined: "Nov 10, 2026" },
  { id: 4, name: "BrightPath Consulting", contact: "Neha Patel", email: "neha@brightpath.com", phone: "+1 555 0114", submissions: 0, status: "Inactive", joined: "Sep 22, 2026" },
];

const emptyForm = {
  name: "",
  contact: "",
  email: "",
  phone: "",
};

function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Inactive: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, description }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <Icon size={19} />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900 mt-4">{value}</p>
      <p className="text-xs text-slate-400 mt-1">{description}</p>
    </div>
  );
}

export default function VendorManagement() {
  const [vendors, setVendors] = useState(initialVendors);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showInvite, setShowInvite] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = useMemo(() => vendors.filter((vendor) => {
    const matchesSearch = `${vendor.name} ${vendor.contact} ${vendor.email}`
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesSearch && (filter === "All" || vendor.status === filter);
  }), [vendors, search, filter]);

  const inviteVendor = (e) => {
    e.preventDefault();

    const newVendor = {
      ...form,
      id: Date.now(),
      submissions: 0,
      status: "Pending",
      joined: new Date().toLocaleDateString(),
    };

    setVendors((prev) => [newVendor, ...prev]);
    setForm(emptyForm);
    setShowInvite(false);
  };

  const updateStatus = (id, status) => {
    setVendors((prev) => prev.map((vendor) =>
      vendor.id === id ? { ...vendor, status } : vendor
    ));

    setSelected((prev) => prev ? { ...prev, status } : prev);
  };

  return (
    <div className="space-y-7">
      {/* PAGE HEADING */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-emerald-700 mb-1">Recruitment workspace</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Vendor Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your staffing partners, invitations and vendor access.
          </p>
        </div>

        <button
          onClick={() => setShowInvite(true)}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm"
        >
          <Plus size={17} />
          Invite Vendor
        </button>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon={Building2} label="Total Vendors" value={vendors.length} description="All registered partners" />
        <StatCard icon={UserCheck} label="Approved Vendors" value={vendors.filter((v) => v.status === "Approved").length} description="Partners with active access" />
        <StatCard icon={Clock3} label="Pending Approval" value={vendors.filter((v) => v.status === "Pending").length} description="Awaiting approval" />
      </div>

      {/* VENDOR DIRECTORY */}
      <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-slate-900">Vendor Directory</h2>
            <p className="text-xs text-slate-500 mt-1">View and manage your registered staffing partners.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendor or contact..."
                className="w-full sm:w-64 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-emerald-500"
            >
              {["All", "Approved", "Pending", "Inactive"].map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                {["Vendor", "Contact Person", "Email", "Submissions", "Joined", "Status", "Action"].map((heading) => (
                  <th key={heading} className="text-left px-5 py-4 font-semibold">{heading}</th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filtered.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50/80 transition">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                        {vendor.name.split(" ").slice(0, 2).map((n) => n[0]).join("")}
                      </div>
                      <span className="font-semibold text-slate-900">{vendor.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-slate-700">{vendor.contact}</td>
                  <td className="px-5 py-4 text-slate-600">{vendor.email}</td>
                  <td className="px-5 py-4 font-semibold text-slate-800">{vendor.submissions}</td>
                  <td className="px-5 py-4 text-slate-500 whitespace-nowrap">{vendor.joined}</td>
                  <td className="px-5 py-4"><StatusBadge status={vendor.status} /></td>
                  <td className="px-5 py-4">
                    <button onClick={() => setSelected(vendor)} className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1.5">
                      <Eye size={15} /> Manage
                    </button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr><td colSpan="7" className="text-center py-12 text-slate-500">No vendors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {vendors.length} vendors
        </div>
      </section>

      {/* INVITE VENDOR MODAL */}
      {showInvite && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4">
          <form onSubmit={inviteVendor} className="bg-white rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-bold text-lg text-slate-900">Invite Vendor</h2>
                <p className="text-xs text-slate-500 mt-1">Add a staffing partner to your network.</p>
              </div>
              <button type="button" onClick={() => setShowInvite(false)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {[
                ["name", "Company Name", "text"],
                ["contact", "Contact Person", "text"],
                ["email", "Business Email", "email"],
                ["phone", "Phone Number", "text"],
              ].map(([key, label, type]) => (
                <label key={key} className="block text-sm font-medium text-slate-700">
                  {label}
                  <input
                    required
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="mt-1.5 w-full border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
                  />
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setShowInvite(false)} className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold">
                Send Invitation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VENDOR DETAILS MODAL */}
      {selected && (
        <div className="fixed inset-0 z-[100] bg-slate-950/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-5 sm:p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wide">Vendor account</p>
                <h2 className="font-bold text-xl text-slate-900 mt-1">{selected.name}</h2>
                <p className="text-sm text-slate-500 mt-1">Vendor details and access management</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"><Users size={17} /></div>
                <div><p className="text-xs text-slate-400">Contact Person</p><p className="font-semibold text-slate-800">{selected.contact}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"><Mail size={17} /></div>
                <div><p className="text-xs text-slate-400">Business Email</p><p className="font-semibold text-slate-800 break-all">{selected.email}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500"><Phone size={17} /></div>
                <div><p className="text-xs text-slate-400">Phone Number</p><p className="font-semibold text-slate-800">{selected.phone}</p></div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Submissions</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">{selected.submissions}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-400">Joined</p>
                  <p className="text-sm font-bold text-slate-900 mt-2">{selected.joined}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <label className="block font-semibold text-slate-800">
                  Vendor access status
                  <select
                    value={selected.status}
                    onChange={(e) => updateStatus(selected.id, e.target.value)}
                    className="mt-2 w-full border border-slate-200 rounded-xl p-3 bg-white font-normal outline-none focus:border-emerald-500"
                  >
                    {["Approved", "Pending", "Inactive"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <p className="text-xs text-slate-400 mt-2">Demo status only. Actual vendor permissions must be enforced by the backend.</p>
              </div>
            </div>

            <button onClick={() => setSelected(null)} className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-3 text-sm font-semibold">
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
