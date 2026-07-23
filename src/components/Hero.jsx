import React, { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = () => {
    navigate(
      `/all-jobs?keyword=${encodeURIComponent(
        keyword
      )}&location=${encodeURIComponent(
        location
      )}&category=${encodeURIComponent(category)}`
    );
  };

  return (
    <section
      className="relative min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-black/65"></div>

      <div className="relative z-10 flex items-center min-h-screen pt-24">
        <div className="max-w-7xl mx-auto w-full px-5 lg:px-8">
          <div className="max-w-5xl">

            <h1 className="text-6xl font-bold text-white">
              Find Your <span className="text-green-400">Dream Job</span>
            </h1>

            <p className="text-xl text-gray-200 mt-6 mb-10">
              Hire experts or get hired in your dream company.
            </p>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid lg:grid-cols-4">

                {/* Job */}
                <div className="p-5 border-r">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Job Title
                  </label>

                  <div className="flex items-center gap-3">
                    <FaSearch className="text-gray-400" />

                    <input
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="React Developer"
                      className="w-full outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="p-5 border-r">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Location
                  </label>

                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-gray-400" />

                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Indore"
                      className="w-full outline-none"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="p-5 border-r">
                  <label className="block text-sm font-semibold text-gray-600 mb-2">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full outline-none"
                  >
                    <option value="">All Categories</option>
                    <option>Software Development</option>
                    <option>UI/UX Design</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Finance</option>
                  </select>
                </div>

                {/* Search */}
                <button
                  onClick={handleSearch}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-3"
                >
                  <FaSearch />
                  Search Jobs
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;