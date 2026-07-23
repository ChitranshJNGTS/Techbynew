import { FaStar, FaQuoteLeft } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "I found my dream React Developer job within two weeks. The application process was simple and recruiters were genuine.",
  },
  {
    name: "Priya Verma",
    role: "UI/UX Designer",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "This platform helped me connect with amazing companies. The interface is modern, fast, and very easy to use.",
  },
  {
    name: "Amit Patel",
    role: "HR Manager",
    image:
      "https://randomuser.me/api/portraits/men/68.jpg",
    review:
      "We hired multiple developers through this portal. Candidate quality was excellent and hiring became much faster.",
  },
  {
    name: "Sneha Gupta",
    role: "Software Engineer",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "The interview preparation and job recommendations helped me get placed quickly.",
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
            What People Say
          </h2>

          <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
            Thousands of job seekers and recruiters trust our platform.
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
    delay:0,
    disableOnInteraction:false,
    pauseOnMouseEnter:false,
  }}

  breakpoints={{

    640:{
      slidesPerView:1
    },

    768:{
      slidesPerView:2
    },

    1024:{
      slidesPerView:3
    }

  }}

>


          {
            testimonials.map((item,index)=>(


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


                  <FaQuoteLeft 
                    className="
                    text-emerald-400 
                    text-3xl 
                    mb-5
                    "
                  />


                  <p className="
                    text-slate-300 
                    leading-7
                    text-sm
                    md:text-base
                  ">
                    "{item.review}"
                  </p>



                  <div className="flex mt-5 text-yellow-400">

                    {[1,2,3,4,5].map((star)=>(
                      <FaStar key={star}/>
                    ))}

                  </div>



                  <div className="flex items-center mt-7">


                    <img
                      src={item.image}
                      alt={item.name}
                      className="
                      w-14
                      h-14
                      rounded-full
                      object-cover
                      border-2
                      border-emerald-500
                      "
                    />


                    <div className="ml-4">

                      <h3 className="
                      text-white 
                      font-bold
                      ">
                        {item.name}
                      </h3>


                      <p className="
                      text-slate-400
                      text-sm
                      ">
                        {item.role}
                      </p>


                    </div>


                  </div>


                </div>


              </SwiperSlide>


            ))
          }


        </Swiper>


      </div>


    </section>

  );

}