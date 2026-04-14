import React from "react";

const SpinnerLoader = ({ size = 40, label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className="relative"
        style={{ width: size, height: size }}
        role="status"
      >
        {/* Glow background */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 blur-md opacity-40 animate-pulse"></div>

        {/* Spinner */}
        <svg
          className="relative z-10 w-full h-full animate-spin"
          viewBox="0 0 50 50"
        >
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#fb923c" />   {/* orange-400 */}
              <stop offset="50%" stopColor="#f97316" />  {/* orange-500 */}
              <stop offset="100%" stopColor="#f59e0b" /> {/* amber-500 */}
            </linearGradient>
          </defs>

          <circle
            cx="25"
            cy="25"
            r="20"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="90"
            strokeDashoffset="60"
          />
        </svg>
      </div>

      {/* Optional label */}
      {label && (
        <span className="text-sm text-orange-500 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
};

export default SpinnerLoader;