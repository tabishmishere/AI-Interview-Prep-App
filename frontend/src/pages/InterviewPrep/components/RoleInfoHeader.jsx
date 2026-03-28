import React from "react";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuBriefcase, LuCalendar, LuLayers } from "react-icons/lu";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
}) => {
  const expLabel =
    experience === "1" || experience === 1 ? "Year" : "Years";

  return (
    <div className="relative overflow-hidden border-b border-gray-200/70 bg-gradient-to-b from-[#fffbf5] via-white to-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6 pt-5 pb-8 md:pb-10 relative z-10 max-w-5xl">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
        >
          <span className="rounded-full p-1 bg-white border border-gray-200/80 shadow-sm group-hover:border-orange-200 group-hover:bg-orange-50/50">
            <LuArrowLeft className="w-4 h-4" />
          </span>
          Back to dashboard
        </Link>

        <div className="rounded-2xl border border-gray-200/80 bg-white/70 backdrop-blur-sm shadow-sm shadow-gray-200/40 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="min-w-0 flex-1 text-center lg:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-orange-600 mb-3">
                Session overview
              </p>
              <div className="flex justify-center lg:justify-start mb-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 text-white shadow-md shadow-orange-500/25">
                  <LuBriefcase className="w-6 h-6" aria-hidden />
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-[2rem] font-semibold text-gray-900 leading-tight tracking-tight">
                {role || "Interview session"}
              </h1>
              <p className="text-base md:text-lg text-gray-700 mt-3 font-medium">
                {topicsToFocus}
              </p>
              {description ? (
                <p className="text-sm text-gray-500 mt-4 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-2 lg:max-w-md lg:flex-col lg:items-stretch">
              <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200/90 px-4 py-2 rounded-xl">
                <LuLayers className="w-4 h-4 text-orange-500 shrink-0" />
                {questions} questions
              </span>
              <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-gray-800 bg-gray-50 border border-gray-200/90 px-4 py-2 rounded-xl">
                <span className="text-orange-500 font-bold">{experience}</span>
                {expLabel} experience
              </span>
              {lastUpdated ? (
                <span className="inline-flex items-center justify-center gap-2 text-xs font-medium text-gray-600 bg-white border border-gray-200 px-4 py-2 rounded-xl">
                  <LuCalendar className="w-4 h-4 text-gray-400 shrink-0" />
                  Updated {lastUpdated}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-0 right-0 w-[50%] max-w-lg h-full opacity-[0.65]"
        aria-hidden
      >
        <div className="absolute top-10 right-8 w-28 h-28 bg-orange-200/60 blur-[80px] animate-blob1" />
        <div className="absolute top-24 right-20 w-24 h-24 bg-teal-200/50 blur-[72px] animate-blob2" />
        <div className="absolute bottom-16 right-12 w-32 h-32 bg-amber-100/70 blur-[88px] animate-blob3" />
      </div>
    </div>
  );
};

export default RoleInfoHeader;
