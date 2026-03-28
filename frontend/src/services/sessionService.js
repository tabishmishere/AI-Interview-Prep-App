import { USE_MOCK_DATA } from "../config/featureFlags";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import {
  listMockSessions,
  getMockSessionById,
  removeMockSession,
  createMockSessionFromForm,
} from "../data/mockSessionStore";

export async function fetchSessions() {
  if (USE_MOCK_DATA) {
    return listMockSessions();
  }
  const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
  return response.data;
}

export async function fetchSessionById(sessionId) {
  if (USE_MOCK_DATA) {
    const session = getMockSessionById(sessionId);
    if (!session) throw new Error("Session not found");
    return session;
  }
  const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));
  if (response.data?.session) return response.data.session;
  throw new Error("Session not found");
}

export async function deleteSessionById(sessionId) {
  if (USE_MOCK_DATA) {
    removeMockSession(sessionId);
    return;
  }
  await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionId));
}

/**
 * Creates a session: mock store only, or AI + API when USE_MOCK_DATA is false.
 */
export async function createSessionFromForm(formData) {
  const { role, experience, topicsToFocus, description } = formData;

  if (USE_MOCK_DATA) {
    return createMockSessionFromForm({
      role,
      experience,
      topicsToFocus,
      description,
      questionCount: 6,
    });
  }

  const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
    role,
    experience,
    topicsToFocus,
    numberOfQuestions: 10,
  });

  const generated = aiResponse.data;
  const questionsPayload = Array.isArray(generated)
    ? generated
    : generated?.questions || [];

  const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
    role,
    experience,
    topicsToFocus,
    description,
    questions: questionsPayload,
  });

  if (!response.data?.session?._id) {
    throw new Error("Could not create session");
  }
  return response.data.session;
}
