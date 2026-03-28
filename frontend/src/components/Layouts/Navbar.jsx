import React, { useContext } from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/90 border-b border-gray-200/70 backdrop-blur-md">
      <div className="container flex items-center justify-between mx-auto gap-5 h-full px-4 md:px-6">
        <Link to="/dashboard" className="shrink-0">
          <span className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
            Interview Prep AI
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <ProfileInfoCard />
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2"
              >
                Log in
              </Link>
              <Link
                to="/sign-up"
                className="text-sm font-semibold rounded-full bg-gradient-to-r from-[#FF9324] to-[#E99A4B] text-white px-4 py-2 shadow-sm hover:opacity-95"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
