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
    <div className="min-h-screen bg-[#FFFDF7]">
      {/* ───────────────────────── Hero ───────────────────────── */}
      <div className="w-full bg-[linear-gradient(135deg,_#FFF4CC_0%,_#FFFCEF_45%,_#FFFFFF_75%)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Navbar */}
          <header className="flex items-center justify-between py-5 md:py-6">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 cursor-pointer">
              Interview Prep AI
            </h1>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                type="button"
                onClick={() => setOpenAuthModal(true)}
                className="rounded-full bg-gradient-to-r from-[#FF9324] to-[#E99A4B] px-5 sm:px-7 py-2 sm:py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200/50 hover:shadow-lg hover:shadow-orange-300/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all duration-200"
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero content */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 lg:gap-20 pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28">
            {/* Left */}
            <div className="flex flex-col justify-center text-center md:text-left">
              <div className="inline-flex cursor-default items-center gap-2 rounded-full bg-yellow-100 border border-yellow-300 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-700 mb-5 mx-auto md:mx-0 w-fit">
                <LuSparkles className="text-orange-500 text-sm" />
                AI Powered
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight text-gray-900">
                Ace Interviews with{" "}
                <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-[#FF9324] to-[#FCD760] bg-clip-text text-transparent">
                  AI-Powered
                </span>{" "}
                Learning
              </h2>
            </div>

            {/* Right */}
            <div className="flex flex-col items-center md:items-start gap-5 max-w-lg mx-auto md:mx-0 text-center md:text-left justify-center">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
              </p>

              <button
                type="button"
                onClick={handleCTA}
                className="rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 active:scale-[0.97] cursor-pointer border border-gray-900 hover:shadow-lg transition-all duration-200 mt-1"
              >
                Get Started →
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* ──────────── Dashboard Preview ──────────── */}
      <section
        className="relative w-full bg-gradient-to-b from-[#FFFCF3] via-[#FFF9EF] to-[#FFFCEF] py-14 md:py-20 lg:py-24 overflow-hidden"
        aria-labelledby="dashboard-preview-heading"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
          <p className="text-center text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.25em] text-orange-500 mb-3">
            Product Preview
          </p>
          <h2
            id="dashboard-preview-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-3 max-w-2xl mx-auto tracking-tight"
          >
            Your interview prep dashboard
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-500 mb-10 md:mb-14 max-w-xl mx-auto leading-relaxed">
            Sessions, tailored Q&amp;A, notes, and deeper dives — all in one
            calm workspace.
          </p>

          {/* Image container */}
          <div className="relative mx-auto max-w-5xl group">
            {/* Glow behind image */}
            <div
              className="absolute -inset-3 sm:-inset-4 rounded-[2rem] bg-gradient-to-tr from-orange-300/25 via-amber-200/20 to-yellow-100/25 blur-2xl opacity-70 group-hover:opacity-90 transition-opacity duration-500"
              aria-hidden="true"
            />

            {/* Image frame */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] ring-1 ring-gray-200/80 p-2 sm:p-3">
              {/* Top bar dots */}
              <div className="flex items-center gap-1.5 px-3 py-2.5 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                <span className="ml-3 text-[0.6rem] text-gray-400 font-medium tracking-wide">
                  interview-prep-ai.app
                </span>
              </div>

              <img
                src="/landing-dashboard-preview.png"
                alt="Dashboard showing Interview Prep AI session cards and workspace"
                className="w-full h-auto object-cover object-top rounded-xl sm:rounded-2xl select-none"
                width={1200}
                height={675}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────── Features ──────────── */}
      <div className="w-full bg-[#FFFCEF]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-14 md:py-20 lg:py-24">
          <p className="text-center text-[0.65rem] sm:text-xs font-bold uppercase tracking-[0.25em] text-orange-500 mb-3">
            Why choose us
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-4 tracking-tight">
            Features That Make You Shine
          </h2>
          <p className="text-center text-sm sm:text-base text-gray-500 mb-12 md:mb-16 max-w-md mx-auto leading-relaxed">
            Everything you need to prepare confidently and land the role.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {APP_FEATURES.slice(0, 6).map((feature) => (
              <div
                key={feature.id}
                className="group bg-white/80 backdrop-blur-sm p-6 sm:p-7 rounded-2xl border border-amber-100/80 shadow-sm hover:shadow-md hover:shadow-orange-100/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="font-bold text-base sm:text-lg text-center text-gray-900 mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-center text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────── Footer ──────────── */}
      <footer className="w-full bg-[#FFFCEF] border-t border-amber-100/60">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 md:py-10 flex flex-col items-center gap-2">
          <p className="text-base sm:text-lg font-bold text-gray-800">
            Made by{" "}
            <span className="bg-gradient-to-r from-[#FF9324] to-[#FCD760] bg-clip-text text-transparent">
              Tabish
            </span>
          </p>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Interview Prep AI
          </p>
        </div>
      </footer>

      {/* ──────────── Auth Modal ──────────── */}
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
        {currentPage === "signup" && (
          <SignUp setCurrentPage={setCurrentPage} />
        )}
      </Model>
    </div>
  );
};

export default LandingPage;