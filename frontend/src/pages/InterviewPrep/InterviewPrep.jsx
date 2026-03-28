import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-hot-toast";
import RoleInfoHeader from "./components/RoleInfoHeader";
import DashboardLayout from "../../components/Layouts/DashboardLayout";
import QuestionCard from "./components/QuestionCard";
import ExplanationPanel from "./components/ExplanationPanel";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { fetchSessionById } from "../../services/sessionService";
import { USE_MOCK_DATA } from "../../config/featureFlags";
import { patchMockQuestion } from "../../data/mockSessionStore";
import { getMockExplanation } from "../../data/mockExplanations";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuCircleAlert } from "react-icons/lu";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openExplain, setOpenExplain] = useState(false);
  const [explanation, setExplanation] = useState({ title: "", body: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [explainingId, setExplainingId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!sessionId) return;
      setIsLoading(true);
      setErrorMsg("");
      try {
        const data = await fetchSessionById(sessionId);
        if (!cancelled) setSessionData(data);
      } catch {
        if (!cancelled) {
          setErrorMsg("We could not load this session.");
          setSessionData(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const sortedQuestions = useMemo(() => {
    const q = sessionData?.questions || [];
    return [...q].sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
  }, [sessionData]);

  const questionText = (q) =>
    typeof q === "object" && q?.question != null ? q.question : String(q);

  const handleTogglePin = (item) => {
    const newPinned = !item.isPinned;
    setSessionData((prev) => {
      if (!prev) return prev;
      const questions = prev.questions.map((x) =>
        x._id === item._id ? { ...x, isPinned: newPinned } : x,
      );
      if (USE_MOCK_DATA) {
        patchMockQuestion(sessionId, item._id, { isPinned: newPinned });
      }
      return { ...prev, questions };
    });
  };

  const handleNoteChange = (qid, value) => {
    setSessionData((prev) => {
      if (!prev) return prev;
      const questions = prev.questions.map((x) =>
        x._id === qid ? { ...x, note: value } : x,
      );
      if (USE_MOCK_DATA) {
        patchMockQuestion(sessionId, qid, { note: value });
      }
      return { ...prev, questions };
    });
  };

  const generateConceptExplanation = async (q) => {
    const text = questionText(q);
    setExplainingId(q._id);
    setExplanation({ title: "", body: "" });
    try {
      if (USE_MOCK_DATA) {
        const mock = getMockExplanation(text);
        setExplanation({
          title: mock.title,
          body: mock.explanation,
        });
        setOpenExplain(true);
        return;
      }
      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        { question: text },
      );
      const data = response.data;
      setExplanation({
        title: data.title || "Explanation",
        body: data.explanation || "",
      });
      setOpenExplain(true);
    } catch (err) {
      console.error(err);
      toast.error("Could not load explanation.");
    } finally {
      setExplainingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#fcfbfc]">
        <SpinnerLoader />
      </div>
    );
  }

  if (errorMsg || !sessionData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#fcfbfc] px-4 text-center">
        <LuCircleAlert className="text-rose-500 mb-3" size={40} />
        <p className="text-gray-800 font-medium">{errorMsg || "Not found."}</p>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData.role || ""}
        topicsToFocus={sessionData.topicsToFocus || ""}
        experience={sessionData.experience || "-"}
        questions={sessionData.questions?.length ?? 0}
        description={sessionData.description || ""}
        lastUpdated={
          sessionData.updatedAt
            ? moment(sessionData.updatedAt).format("Do MMM YYYY")
            : ""
        }
      />

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-10 max-w-4xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 text-center sm:text-left">
          <div className="max-w-2xl mx-auto sm:mx-0">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 tracking-tight">
              Interview Q&amp;A
            </h2>
            <p className="text-sm md:text-[15px] text-gray-600 mt-2 leading-relaxed">
              Expand each card for the model answer, add your notes, and use
              Deeper dive for AI-style concept breakdowns.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          {sortedQuestions.map((item, index) => (
            <QuestionCard
              key={item._id || index}
              item={item}
              index={index}
              onTogglePin={handleTogglePin}
              onExplain={generateConceptExplanation}
              isExplaining={explainingId === item._id}
              onNoteChange={handleNoteChange}
            />
          ))}
        </div>
      </div>

      <ExplanationPanel
        open={openExplain}
        title={explanation.title}
        body={explanation.body}
        onClose={() => setOpenExplain(false)}
      />
    </DashboardLayout>
  );
};

export default InterviewPrep;
