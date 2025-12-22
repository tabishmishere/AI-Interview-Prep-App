import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { APP_FEATURES } from "../utils/data";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Model from "../components/Model";

const LandingPage = () => {
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const handleCTA = () => {};
  return (
    <>
      <div className="w-full min-h-screen bg-white">
        {/* Gradient Hero Background */}
        <div className="bg-[linear-gradient(135deg,_#FFF4CC_0%,_#FFFCEF_45%,_#FFFFFF_75%)] min-h-[80vh]">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <header className="flex items-center justify-between py-6">
              <h1 className="text-2xl font-bold text-black cursor-pointer">
                Interview Prep AI
              </h1>

              <button
                onClick={() => setOpenAuthModal(true)}
                className="rounded-full bg-gradient-to-r from-[#FF9324] to-[#E99A4B] px-5 py-2 font-medium text-white shadow-sm hover:opacity-90 cursor-pointer"
              >
                Login / Sign Up
              </button>
            </header>

            {/* Hero Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-16 py-16 md:py-20">
              {/* Left */}
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 border border-yellow-300 px-4 py-2 font-medium text-orange-800 mb-6 mx-auto md:mx-0">
                  <LuSparkles />
                  AI Powered
                </div>

                <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-gray-900">
                  Ace Interviews with <br />
                  <span className="bg-gradient-to-r from-[#FF9324] to-[#FCD760] bg-clip-text text-transparent">
                    AI-Powered
                  </span>{" "}
                  Learning
                </h1>
              </div>

              {/* Right */}
              <div className="flex flex-col items-center md:items-start gap-6 max-w-xl mx-auto md:mx-0 text-center md:text-left mt-12">
                <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                  Get role-specific questions, expand answers when you need
                  them, dive deeper into concepts, and organize everything your
                  way.
                </p>

                <button
                  onClick={handleCTA}
                  className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-yellow-100 cursor-pointer hover:text-black border transition"
                >
                  Get Started
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="w-full bg-[#fffcef] mt-10">
        <div className="container mx-auto px-4 pt-10 pb-20">
          <h2 className="text-2xl font-medium text-center mb-12">
            Features That Make You Shine
          </h2>

          <div className="flex flex-col items-center gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl border border-amber-100 hover:shadow-lg transition"
                >
                  <h3 className="font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
              {APP_FEATURES.slice(8).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl border border-amber-100 hover:shadow-lg transition"
                >
                  <h3 className="font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xl py-6">
        Made By{" "}
        <span className="bg-gradient-to-r from-[#FF9324] to-[#FCD760] bg-clip-text text-transparent font-bold">
          Tabish
        </span>
      </div>

      {/* Auth Modal */}
      <Model
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Model>
    </>
  );
};

export default LandingPage;
