
import { FaStar, FaQuoteLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    name: "Aman Verma",
    role: "Frontend Developer",
    review:
      "I really liked how simple the job search process is. The job details were easy to understand and applying was quick.",
  },
  {
    name: "Priya Sharma",
    role: "Software Developer",
    review:
      "The platform is clean and easy to use. I found relevant job opportunities without having to search through too many unnecessary listings.",
  },
  {
    name: "Rohit Patel",
    role: "HR Executive",
    review:
      "A useful platform for recruiters and candidates. The process of connecting with potential candidates is straightforward and convenient.",
  },
  {
    name: "Neha Singh",
    role: "B.Tech Graduate",
    review:
      "As a fresher, I was looking for a simple platform where I could find suitable opportunities. The experience has been really smooth so far.",
  },
  {
    name: "Arjun Mehta",
    role: "MERN Stack Developer",
    review:
      "I liked the overall experience. The job information is presented clearly and it makes it easier to decide which opportunities to apply for.",
  },
  {
    name: "Kavya Joshi",
    role: "HR Recruiter",
    review:
      "The platform has a simple interface and makes the hiring process easier to manage. Looking forward to seeing more companies and candidates join.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-emerald-400 uppercase tracking-[4px] font-semibold">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            What Our Users Say
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            We're building a better way for candidates and recruiters to
            connect, discover opportunities, and grow together.
          </p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          loop={true}
          speed={3000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className="
                  bg-slate-950
                  border
                  border-slate-800
                  rounded-3xl
                  p-7
                  h-full
                  hover:border-emerald-500
                  transition
                  duration-300
                "
              >
                <FaQuoteLeft className="text-emerald-400 text-3xl mb-5" />

                <p className="text-slate-300 leading-7 text-sm md:text-base min-h-[120px]">
                  "{item.review}"
                </p>

                {/* Rating */}
                <div className="flex mt-5 text-yellow-400 gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar key={star} />
                  ))}
                </div>

                {/* User */}
                <div className="flex items-center mt-7">

                  {/* Avatar */}
                  <div
                    className="
                      w-14
                      h-14
                      rounded-full
                      bg-emerald-500/10
                      border-2
                      border-emerald-500
                      flex
                      items-center
                      justify-center
                      text-emerald-400
                      font-bold
                      text-lg
                    "
                  >
                    {item.name.charAt(0)}
                  </div>

                  <div className="ml-4">
                    <h3 className="text-white font-bold">
                      {item.name}
                    </h3>

                    <p className="text-slate-400 text-sm">
                      {item.role}
                    </p>
                  </div>

                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

