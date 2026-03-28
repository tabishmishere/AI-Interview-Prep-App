const STORAGE_KEY = "interview_prep_mock_sessions_v1";

const defaultSeed = () => {
  const now = new Date().toISOString();
  return [
    {
      _id: "seed-session-frontend",
      role: "Frontend Engineer",
      experience: "3",
      topicsToFocus: "React, performance, accessibility",
      description:
        "Mid-level role with emphasis on component architecture and Core Web Vitals.",
      updatedAt: now,
      questions: [
        {
          _id: "seed-q-1",
          question: "How would you optimize a large list render in React?",
          answer:
            "Use **windowing** (e.g. `react-window`) so only visible rows mount. Avoid inline object/array props that break memoization, split heavy subtrees with `React.memo`, and profile with the React Profiler. For server-driven lists, paginate or infinite-scroll.",
          note: "",
          isPinned: true,
        },
        {
          _id: "seed-q-2",
          question: "Explain the difference between controlled and uncontrolled inputs.",
          answer:
            "Controlled inputs store value in React state (`value` + `onChange`). Uncontrolled inputs rely on the DOM (`defaultValue` + refs). Controlled gives a single source of truth and easier validation; uncontrolled is simpler for one-off forms.",
          note: "",
          isPinned: false,
        },
        {
          _id: "seed-q-3",
          question: "What is the purpose of keys in lists?",
          answer:
            "Keys help React identify which items changed, were added, or removed across renders. Stable keys preserve state inside list items; using array index as key is acceptable only when the list is static and not reordered.",
          note: "",
          isPinned: false,
        },
      ],
    },
    {
      _id: "seed-session-backend",
      role: "Backend Engineer",
      experience: "5",
      topicsToFocus: "APIs, databases, caching",
      description: "Senior role focused on reliability and data modeling.",
      updatedAt: now,
      questions: [
        {
          _id: "seed-q-4",
          question: "When would you choose SQL vs NoSQL?",
          answer:
            "**SQL** fits relational data, strong consistency, and complex joins. **NoSQL** fits flexible schemas, horizontal scale, and document or key-value access patterns. Many systems combine both.",
          note: "",
          isPinned: false,
        },
        {
          _id: "seed-q-5",
          question: "How does HTTP caching work at a high level?",
          answer:
            "Caches use headers like `Cache-Control`, `ETag`, and `Last-Modified`. Browsers and CDNs reuse responses when validators match. For APIs, prefer explicit cache policies and avoid caching personalized responses unless scoped.",
          note: "",
          isPinned: false,
        },
      ],
    },
  ];
};

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* ignore */
  }
  const seed = defaultSeed();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

function write(sessions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function listMockSessions() {
  return read();
}

export function getMockSessionById(id) {
  return read().find((s) => s._id === id) || null;
}

export function addMockSession(session) {
  const all = read();
  write([session, ...all]);
  return session;
}

export function removeMockSession(id) {
  const all = read().filter((s) => s._id !== id);
  write(all);
}

export function updateMockSessionQuestions(sessionId, questions) {
  const all = read();
  const i = all.findIndex((s) => s._id === sessionId);
  if (i === -1) return;
  all[i] = {
    ...all[i],
    questions,
    updatedAt: new Date().toISOString(),
  };
  write(all);
}

export function patchMockQuestion(sessionId, questionId, patch) {
  const all = read();
  const si = all.findIndex((s) => s._id === sessionId);
  if (si === -1) return;
  const questions = all[si].questions.map((q) =>
    q._id === questionId ? { ...q, ...patch } : q,
  );
  all[si] = {
    ...all[si],
    questions,
    updatedAt: new Date().toISOString(),
  };
  write(all);
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createMockSessionFromForm({
  role,
  experience,
  topicsToFocus,
  description,
  questionCount = 6,
}) {
  const questions = Array.from({ length: questionCount }, (_, i) => ({
    _id: makeId("q"),
    question: `Practice question ${i + 1}: What would you highlight about "${topicsToFocus.split(",")[0]?.trim() || role}" in this role?`,
    answer: `This is a **placeholder answer** for question ${i + 1}. When you connect the AI API, generated answers will appear here. Focus on clarity, trade-offs, and a concrete example from your experience.`,
    note: "",
    isPinned: false,
  }));

  const session = {
    _id: makeId("session"),
    role,
    experience: String(experience),
    topicsToFocus,
    description,
    updatedAt: new Date().toISOString(),
    questions,
  };
  addMockSession(session);
  return session;
}
