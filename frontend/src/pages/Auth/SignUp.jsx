import React, { useContext, useState } from "react";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import uploadImage from "../../utils/uploadeImage";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!fullName) return setError("Please enter full name.");
    if (!validateEmail(email)) return setError("Please enter valid email.");
    if (!password) return setError("Please enter password.");

    setError("");
    try {
      let profileImageUrl = "";

      if (profilePic) {
        const imgUploadeRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadeRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full min-w-0 max-w-[420px] mx-auto overflow-x-hidden">
      <h3 className="text-lg font-semibold text-gray-900">Create an Account</h3>
      <p className="text-sm text-gray-500 mt-1 mb-5">
        Join us today by entering your details below.
      </p>

      <form
        onSubmit={handleSignup}
        className="space-y-4 sm:space-y-5 w-full min-w-0"
      >
        <div className="flex justify-center w-full min-w-0 overflow-hidden py-1">
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        </div>

        <Input
          label="Full Name"
          placeholder="John"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <Input
          label="Email Address"
          placeholder="john@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 wrap-break-word">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full">
          SIGN UP
        </button>

        <p className="text-sm text-gray-600 text-center pt-1">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className="text-primary cursor-pointer font-medium underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
