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
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login Error:", error); // ← Full error object
      console.error("Error Response:", error.response); // ← Server response (most important)
      console.error("Error Request:", error.request); // ← What was actually sent

      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        const message =
          error.response.data?.message ||
          error.response.data?.error ||
          error.response.data ||
          "Server error";
        setError(message);
      } else if (error.request) {
        // Request was made but no response received (CORS, network, timeout, etc.)
        setError("No response from server. Check network or CORS.");
      } else {
        setError("Something went wrong. " + (error.message || ""));
      }
    }
  };

  return (
    <div className="w-full min-w-0 max-w-[420px] mx-auto overflow-x-hidden">
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
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 wrap-break-word">
            {error}
          </p>
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
