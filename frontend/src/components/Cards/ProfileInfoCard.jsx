import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };
  return (
    user && (
      <div className="flex items-center">
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt=""
            className="w-11 h-11 object-cover rounded-full mr-3 border border-gray-200"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-full mr-3 bg-gradient-to-br from-orange-200 to-amber-100 border border-orange-200/80 flex items-center justify-center text-sm font-bold text-orange-900"
            aria-hidden
          >
            {(user.name || "?").slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user.name || ""}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
