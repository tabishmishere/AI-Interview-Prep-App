import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  const expNum = Number(experience);
  const yearLabel =
    experience === "1" ||
    experience === 1 ||
    expNum === 1
      ? "Year"
      : "Years";

  return (
    <div className="group bg-white border border-gray-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-300/80 transition-all duration-200">
      <div
        className="rounded-t-2xl p-4 md:p-5 cursor-pointer relative"
        style={{ background: colors.bgcolor }}
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.();
          }
        }}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/70 border border-white/80 flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-gray-800">
              {getInitials(role)}
            </span>
          </div>
          <div className="flex-grow min-w-0">
            <h2 className="text-base font-semibold text-gray-900 leading-snug truncate">
              {role}
            </h2>
            <p className="text-sm text-gray-700 mt-0.5 line-clamp-2">
              {topicsToFocus}
            </p>
          </div>
          <button
            type="button"
            className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-white/90 border border-rose-200 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-opacity shrink-0"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            title="Delete session"
          >
            <LuTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      <div
        className="px-4 md:px-5 pb-4 pt-1 cursor-pointer"
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect?.();
          }
        }}
      >
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span className="text-[10px] font-semibold text-gray-800 px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/80">
            Exp: {experience} {yearLabel}
          </span>
          <span className="text-[10px] font-semibold text-gray-800 px-2.5 py-1 rounded-full border border-gray-200 bg-gray-50/80">
            {questions} Q&A
          </span>
          {lastUpdated ? (
            <span className="text-[10px] font-medium text-gray-500 px-2.5 py-1">
              {lastUpdated}
            </span>
          ) : null}
        </div>
        <p className="text-[13px] text-gray-500 line-clamp-2 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
