import React, { useState } from "react";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateEmail } from "../../utils/helper";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!fullName) return setError("Please enter full name.");
    if (!validateEmail(email)) return setError("Please enter valid email.");
    if (!password) return setError("Please enter password.");

    setError("");
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-xl p-5 sm:p-8 overflow-hidden mx-auto">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900">
        Create an Account
      </h3>
      <p className="text-sm text-gray-500 mt-1 mb-5">
        Join us today by entering your details below.
      </p>

      {/* Form */}
      <form onSubmit={handleSignup} className="space-y-4 overflow-x-hidden">
        {/* Profile Photo */}
        <div className="flex justify-center">
          <ProfilePhotoSelector
            image={profilePic}
            setImage={setProfilePic}
          />
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

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button type="submit" className="btn-primary w-full">
          SIGN UP
        </button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setCurrentPage("login")}
            className="text-primary font-medium underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
