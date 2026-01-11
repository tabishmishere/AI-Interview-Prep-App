import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";
const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter validate email address.");
      return;
    }
    if (!password) {
      setError("Please enter password.");
      return;
    }
    setError("");
    // Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong.");
      }
    }
  };

  return (
    <div className="w-[92vw]sm:w-[420px] bg-white rounded-xl p-6 sm:p-8 overflow-hidden">
      {/* Header */}
      <h3 className="text-lg font-semibold text-gray-900">Welcome Back</h3>
      <p className="text-sm text-gray-500 mt-1 mb-6">
        Please enter your details to log in
      </p>

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4 overflow-x-hidden">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && (
          <p className="text-xs text-red-500 mt-1 wrap-break-word">{error}</p>
        )}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-sm text-gray-600 text-center">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-primary cursor-pointer font-medium underline"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
