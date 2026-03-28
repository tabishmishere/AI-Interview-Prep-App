import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import { APP_FEATURES } from "../utils/data";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Model from "../components/Model";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Hero */}
      <div className="w-full bg-[linear-gradient(135deg,_#FFF4CC_0%,_#FFFCEF_45%,_#FFFFFF_75%)] min-h-[min(100vh,900px)] pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <header className="flex items-center justify-between py-6">
            <h1 className="text-2xl font-bold text-black cursor-pointer">
              Interview Prep AI
            </h1>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                type="button"
                onClick={() => setOpenAuthModal(true)}
                className="rounded-full bg-gradient-to-r from-[#FF9324] to-[#E99A4B] px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white shadow-lg hover:opacity-90 cursor-pointer transition-all"
              >
                Login / Sign Up
              </button>
            )}
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 py-12 md:py-16 lg:py-20">
            <div className="text-center md:text-left">
              <div className="inline-flex cursor-default items-center gap-2 rounded-full bg-yellow-100 border border-yellow-300 px-4 py-2 font-medium text-orange-800 mb-6 mx-auto md:mx-0">
                <LuSparkles />
                AI Powered
              </div>

              <h2 className="text-3xl md:text-5xl font-semibold leading-tight text-gray-900">
                Ace Interviews with <br />
                <span className="bg-gradient-to-r from-[#FF9324] to-[#FCD760] bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Learning
              </h2>
            </div>

            <div className="flex flex-col items-center md:items-start gap-6 max-w-xl mx-auto md:mx-0 text-center md:text-left justify-center">
              <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
              </p>

              <button
                type="button"
                onClick={handleCTA}
                className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-yellow-100 cursor-pointer hover:text-black border transition-all"
              >
                Get Started
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Dashboard preview — bridges hero and features */}
      <section
        className="relative w-full bg-gradient-to-b from-[#FFFCF3] via-[#FFF9EF] to-[#fffcef] py-10 md:py-14 lg:py-16 overflow-x-hidden"
        aria-labelledby="dashboard-preview-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-orange-600 mb-2">
            Product preview
          </p>
          <h2
            id="dashboard-preview-heading"
            className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-3 max-w-2xl mx-auto"
          >
            Your interview prep dashboard
          </h2>
          <p className="text-center text-sm md:text-base text-gray-600 mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">
            Sessions, tailored Q&amp;A, notes, and deeper dives — all in one
            calm workspace.
          </p>

          <div className="relative mx-auto max-w-5xl">
            <div
              className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-tr from-orange-400/20 via-amber-200/20 to-teal-200/20 blur-xl opacity-80"
              aria-hidden
            />
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100/90 to-white shadow-2xl shadow-gray-900/10 ring-1 ring-gray-200/90 p-1.5 sm:p-2">
              <img
                src="/landing-dashboard-preview.png"
                alt="Dashboard showing Interview Prep AI session cards and workspace"
                className="w-full h-auto object-cover object-top rounded-[1.1rem] md:rounded-2xl select-none"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <div className="w-full bg-[#fffcef] pt-4 pb-2">
        <div className="container mx-auto px-4 sm:px-6 py-10 md:py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10 md:mb-12 text-gray-900">
            Features That Make You Shine
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {APP_FEATURES.slice(0, 6).map((feature, index) => {
              const isFirstBottomCard = index === 3;

              return (
                <div
                  key={feature.id}
                  className={`bg-[#FFFEF8] p-6 rounded-xl border border-amber-100 shadow-md hover:shadow-lg transition-all
          ${isFirstBottomCard ? "md:col-start-1" : ""}
        `}
                >
                  <h3 className="font-semibold mb-3 text-lg text-center text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="text-center text-xl md:text-2xl py-8 font-bold bg-[#fffcef] text-gray-900">
        Made By{" "}
        <span className="bg-gradient-to-r from-[#FF9324] to-[#FCD760] bg-clip-text text-transparent">
          Tabish
        </span>
      </div>

      <Model
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
        authMode
      >
        {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Model>
    </>
  );
};

export default LandingPage;
