import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full min-w-0">
      <label className="block text-[13px] font-medium text-slate-700 mb-1.5">
        {label}
      </label>

      <div className="input-box">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="min-w-0 flex-1 w-full bg-transparent outline-none placeholder:text-gray-400"
          value={value}
          onChange={onChange}
        />

        {type === "password" && (
          showPassword ? (
            <FaRegEye
              className="text-primary cursor-pointer"
              size={22}
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaRegEyeSlash
              className="text-slate-400 cursor-pointer"
              size={22}
              onClick={() => setShowPassword(true)}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Input;
