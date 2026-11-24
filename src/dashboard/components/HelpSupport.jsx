
import React from "react";
import {
  Headset,
  Mail,
  MessageCircle,
  Clock,
  ArrowUpRight,
  HelpCircle,
  ShieldCheck,
  BriefcaseBusiness,
} from "lucide-react";

const SUPPORT_EMAIL = "support@techby.in";

const HelpSupport = () => {
  const subject = "TechBy Recruiter Support Request";

  const mailtoLink = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}`;

  const supportTopics = [
    {
      icon: <BriefcaseBusiness size={21} />,
      title: "Job Requirements",
      description:
        "Get help with job details, requirements, and position-related queries.",
    },
    {
      icon: <MessageCircle size={21} />,
      title: "Candidate Submissions",
      description:
        "Need assistance with candidate submissions, status updates, or feedback?",
    },
    {
      icon: <ShieldCheck size={21} />,
      title: "Account & Access",
      description:
        "Contact us for login issues, account settings, or access-related problems.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Help & Support
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Need assistance? Our support team is here to help.
        </p>
      </div>

      {/* MAIN SUPPORT CARD */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white sm:p-9">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative max-w-2xl">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white">
            <Headset size={28} />
          </div>

          <h3 className="text-2xl font-bold sm:text-3xl">
            How can we help you?
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            If you have any questions, face an issue, or need assistance
            with your recruiter workspace, please reach out to our support
            team. We will be happy to assist you.
          </p>

          <a
            href={mailtoLink}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            <Mail size={18} />
            Email Support
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>

      {/* CONTACT DETAILS */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Mail size={21} />
          </div>

          <h3 className="font-semibold text-slate-900">
            Email Support
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Send your questions or issues directly to our support team.
          </p>

          <a
            href={mailtoLink}
            className="mt-4 inline-flex items-center gap-2 break-all text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {SUPPORT_EMAIL}
            <ArrowUpRight size={15} />
          </a>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Clock size={21} />
          </div>

          <h3 className="font-semibold text-slate-900">
            Support Requests
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Send us a detailed email describing your issue. Our team
            will review your request and respond as soon as possible.
          </p>
        </div>
      </div>

      {/* SUPPORT TOPICS */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">
            What can we help you with?
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            You can contact us regarding any of these topics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {supportTopics.map((topic, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                {topic.icon}
              </div>

              <h4 className="font-semibold text-slate-800">
                {topic.title}
              </h4>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {topic.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER SUPPORT CTA */}
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <HelpCircle
              size={23}
              className="mt-0.5 shrink-0 text-emerald-700"
            />
            <div>
              <h3 className="font-semibold text-slate-900">
                Still need help?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Write to our support team and explain how we can assist you.
              </p>
            </div>
          </div>

          <a
            href={mailtoLink}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-sm transition hover:bg-emerald-100"
          >
            Contact TechBy
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
