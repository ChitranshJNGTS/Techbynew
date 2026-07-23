import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Contact() {
  return (
    <>
    <Navbar/>
    <div className="bg-slate-950 text-white min-h-screen">

      {/* Hero Section */}

      <section className="relative bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 overflow-hidden">

        <div className="absolute inset-0 bg-emerald-500/5"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">

          <div className="max-w-3xl">

            <span className="inline-block bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-full font-medium">
              Contact Us
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-8 leading-tight">
              We'd Love To
              <span className="text-emerald-400"> Hear From You</span>
            </h1>

            <p className="text-slate-400 text-lg leading-8 mt-8">
              Whether you're a job seeker looking for opportunities,
              an employer searching for top talent, or someone who
              wants to schedule a mock interview, our team is here
              to help you every step of the way.
            </p>

          </div>

        </div>

      </section>

      {/* Contact Cards */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-emerald-500 transition">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl">

                <FaEnvelope />

              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Email Us
              </h3>

              <p className="text-slate-400 mt-4">
                support@yourportal.com
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-emerald-500 transition">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl">

                <FaPhoneAlt />

              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Call Us
              </h3>

              <p className="text-slate-400 mt-4">
                +91 98765 43210
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-emerald-500 transition">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl">

                <FaMapMarkerAlt />

              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Office
              </h3>

              <p className="text-slate-400 mt-4">
                Indore,
                Madhya Pradesh,
                India
              </p>

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center hover:border-emerald-500 transition">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500 flex items-center justify-center text-2xl">

                <FaClock />

              </div>

              <h3 className="text-2xl font-semibold mt-6">
                Working Hours
              </h3>

              <p className="text-slate-400 mt-4">
                Mon - Sat
                <br />
                9:00 AM - 7:00 PM
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Contact Form */}

      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid lg:grid-cols-2 gap-14 items-center">

            {/* Left */}

            <div>

              <span className="text-emerald-400 uppercase tracking-widest font-semibold">
                Send Message
              </span>

              <h2 className="text-5xl font-bold mt-5">
                Get In Touch
              </h2>

              <p className="text-slate-400 mt-6 leading-8">
                Fill out the form below and our team will get back
                to you as soon as possible.
              </p>

            </div>

            {/* Right */}

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

              <form className="space-y-6">

                <div className="grid md:grid-cols-2 gap-5">

                  <input
                    type="text"
                    placeholder="Full Name"
                    className="bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                  />

                </div>

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500"
                />

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-5 py-4 text-white outline-none focus:border-emerald-500 resize-none"
                ></textarea>

                <button
                  className="bg-emerald-500 hover:bg-emerald-600 transition px-8 py-4 rounded-xl font-semibold flex items-center gap-3"
                >
                  <FaPaperPlane />
                  Send Message
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>      {/* Office Information */}

      <section className="py-24 bg-slate-900">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="text-emerald-400 uppercase tracking-widest font-semibold">
              Visit Our Office
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              We're Always Happy To Meet You
            </h2>

            <p className="text-slate-400 max-w-3xl mx-auto mt-6 leading-8">
              Whether you are a candidate searching for your next opportunity,
              an employer looking for skilled professionals, or someone
              interested in our mock interview services, you're always welcome
              to connect with us.
            </p>

          </div>

          <div className="grid lg:grid-cols-2 gap-10 mt-20">

            {/* Office Details */}

            <div className="space-y-8">

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-6">
                  Head Office
                </h3>

                <div className="space-y-6">

                  <div className="flex gap-5">

                    <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt />
                    </div>

                    <div>

                      <h4 className="font-semibold text-lg">
                        Address
                      </h4>

                      <p className="text-slate-400 mt-2 leading-7">
                        Indore,
                        Madhya Pradesh,
                        India
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-5">

                    <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                      <FaEnvelope />
                    </div>

                    <div>

                      <h4 className="font-semibold text-lg">
                        Email
                      </h4>

                      <p className="text-slate-400 mt-2">
                        support@yourportal.com
                      </p>

                    </div>

                  </div>

                  <div className="flex gap-5">

                    <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0">
                      <FaPhoneAlt />
                    </div>

                    <div>

                      <h4 className="font-semibold text-lg">
                        Phone
                      </h4>

                      <p className="text-slate-400 mt-2">
                        +91 98765 43210
                      </p>

                    </div>

                  </div>

                </div>

              </div>

              {/* Business Hours */}

              <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8">

                <h3 className="text-2xl font-bold mb-8">
                  Business Hours
                </h3>

                <div className="space-y-5">

                  {[
                    ["Monday", "09:00 AM - 07:00 PM"],
                    ["Tuesday", "09:00 AM - 07:00 PM"],
                    ["Wednesday", "09:00 AM - 07:00 PM"],
                    ["Thursday", "09:00 AM - 07:00 PM"],
                    ["Friday", "09:00 AM - 07:00 PM"],
                    ["Saturday", "10:00 AM - 05:00 PM"],
                    ["Sunday", "Closed"],
                  ].map(([day, time]) => (

                    <div
                      key={day}
                      className="flex justify-between border-b border-slate-800 pb-4"
                    >

                      <span className="text-white">
                        {day}
                      </span>

                      <span className="text-slate-400">
                        {time}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Google Map */}

            <div>

              <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden h-full">

                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps?q=Indore,Madhya%20Pradesh&output=embed"
                  className="w-full h-[650px]"
                  loading="lazy"
                ></iframe>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="py-24">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="text-emerald-400 uppercase tracking-widest font-semibold">
              Frequently Asked Questions
            </span>

            <h2 className="text-4xl lg:text-5xl font-bold mt-4">
              Need Help?
            </h2>

            <p className="text-slate-400 mt-6">
              Here are answers to some common questions.
            </p>

          </div>

          <div className="mt-16 space-y-6">

            {[
              {
                q: "How can I apply for a job?",
                a: "Simply create an account, complete your profile, upload your resume, and click the Apply button on any job listing.",
              },
              {
                q: "Can employers post jobs?",
                a: "Yes. Employers can register, purchase a plan if required, and publish job vacancies directly from their dashboard.",
              },
              {
                q: "How do mock interviews work?",
                a: "Choose an available time slot, make the booking, and you'll receive your interview details by email.",
              },
              {
                q: "Is creating an account free?",
                a: "Yes. Candidates can register and apply for jobs completely free.",
              },
            ].map((faq) => (

              <div
                key={faq.q}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
              >

                <h3 className="text-xl font-semibold">
                  {faq.q}
                </h3>

                <p className="text-slate-400 mt-4 leading-8">
                  {faq.a}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>      {/* CTA Section */}

      <section className="py-24 bg-slate-900">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-[35px] overflow-hidden">

            <div className="grid lg:grid-cols-2 items-center">

              <div className="p-10 lg:p-16">

                <span className="bg-white/20 px-4 py-2 rounded-full">
                  Start Your Journey
                </span>

                <h2 className="text-4xl lg:text-5xl font-bold mt-8 leading-tight">
                  Ready To Find Your
                  <br />
                  Dream Job?
                </h2>

                <p className="mt-6 text-green-100 leading-8 text-lg">
                  Join thousands of professionals and employers using our
                  platform every day. Browse jobs, schedule mock interviews,
                  and accelerate your career.
                </p>

                <div className="flex flex-wrap gap-5 mt-10">

                  <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
                    Browse Jobs
                  </button>

                  <button className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition">
                    Schedule Demo
                  </button>

                </div>

              </div>

              <div className="hidden lg:flex justify-center">

                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
                  alt="Career"
                  className="h-full object-cover"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Social Media */}

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <span className="text-emerald-400 uppercase tracking-widest font-semibold">
              Stay Connected
            </span>

            <h2 className="text-5xl font-bold mt-5">
              Follow Us
            </h2>

            <p className="text-slate-400 mt-6 max-w-2xl mx-auto">
              Follow us on social media for career tips, latest job openings,
              interview preparation, and hiring updates.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">

            {[
              {
                name: "Facebook",
                color: "hover:border-blue-500",
              },
              {
                name: "LinkedIn",
                color: "hover:border-sky-500",
              },
              {
                name: "Instagram",
                color: "hover:border-pink-500",
              },
              {
                name: "Twitter",
                color: "hover:border-cyan-500",
              },
            ].map((item) => (

              <div
                key={item.name}
                className={`bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center transition ${item.color}`}
              >

                <div className="w-16 h-16 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold">

                  {item.name.charAt(0)}

                </div>

                <h3 className="text-2xl font-semibold mt-6">
                  {item.name}
                </h3>

                <p className="text-slate-400 mt-4">
                  Follow us for daily career updates.
                </p>

                <button className="mt-6 text-emerald-400 hover:underline">
                  Follow →
                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Newsletter */}

      <section className="pb-24">

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-slate-900 border border-slate-800 rounded-[35px] p-10 lg:p-16 text-center">

            <h2 className="text-4xl font-bold">
              Subscribe To Our Newsletter
            </h2>

            <p className="text-slate-400 mt-5 max-w-2xl mx-auto leading-8">
              Receive the latest job openings, hiring news, career advice,
              interview tips, and platform updates directly in your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10 max-w-3xl mx-auto">

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-6 py-4 outline-none text-white focus:border-emerald-500"
              />

              <button className="bg-emerald-500 hover:bg-emerald-600 px-8 py-4 rounded-xl font-semibold whitespace-nowrap transition">
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </section>

    </div>
    <Footer/>
    </>
  );
}