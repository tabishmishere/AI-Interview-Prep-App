import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import API_PATHS from "../../utils/apiPaths";
import { axiosInstance } from "../../utils/axiosInstance";
const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async () => {
    e.preventDefault();
    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus || !description) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    isLoading(true);

    try {
      // Make API call to create session
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        },
      );

      // Should be array like [{question: "", answer: ""}]
      const generateQuestions = aiResponse.data;

      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generateQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError(
          "An error occurred while creating the session. Please try again.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Start a New Interview Journey
      </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-3">
        Fill out a few questions and unlock your personalized set of interview
        question!
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleCreateSession}>
        <Input
          label="Role"
          placeholder="e.g., Software Engineer"
          type="text"
          value={formData.role}
          onChange={(e) => handleChange("role", e.target.value)}
        />
        <Input
          label="Experience Level"
          placeholder="e.g., Entry, Mid, Senior"
          type="number"
          value={formData.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
        />
        <Input
          label="Topics to Focus On"
          placeholder="e.g., Algorithms, System Design"
          type="text"
          value={formData.topicsToFocus}
          onChange={(e) => handleChange("topicsToFocus", e.target.value)}
        />
        <Input
          label="Additional Details"
          placeholder="Any specific areas you want to focus on?"
          type="text"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button
          className="btn-primary w-full mt-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />
            ? "Creating Session..."
            : "Create Session"}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
