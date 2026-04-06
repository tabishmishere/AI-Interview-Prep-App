# AI Project Instructions: AI Interview Prep App

This file provides system instructions and project context for any AI coding assistant parsing this codebase. Read this carefully before making structural changes or writing new code.

## 📖 Project Overview
This project is an **AI-powered Interview Preparation Platform** built with the **MERN** stack (MongoDB, Express, React, Node.js). It leverages AI models (OpenAI or Google Gemini) to generate tailored interview questions and concept explanations.

## 🏗 System Architecture & Stack

### Frontend
- **Framework:** React 19 (via Vite)
- **Styling:** Tailwind CSS V4
- **Routing:** React Router v7
- **Key Libraries:** `axios`, `framer-motion`, `react-icons`, `react-hot-toast`, `react-markdown`
- **Location:** `/frontend`
- **Starting point:** `npm run dev`

### Backend
- **Framework:** Node.js, Express.js (v5)
- **Database:** MongoDB (via Mongoose v9)
- **Authentication:** JWT & bcryptjs
- **File Upload:** Multer (local `uploads/` dir)
- **AI Integration:** `@google/genai` (Gemini) and `openai` (GPT-4o-mini)
- **Location:** `/backend`
- **Starting point:** `npm run dev` (starts on port defined in `.env`)

## 📂 Code Structure Rules

### Backend conventions:
1. **Routing:** All routes are defined in `/backend/routes/` and mounted in `server.js` under `/api/`.
2. **Controllers:** Business logic resides in `/backend/controllers/`.
3. **Models:** Mongoose schemas are stored in `/backend/models/` (`User.js`, `Session.js`, `Question.js`).
4. **Middleware:** Custom middleware (like `authMiddleware.js` for JWT `protect`) is located in `/backend/middlewares/`.
5. **AI Handling:** Handled in `aiController.js`. It checks for `.env` keys `GEMINI_API_KEY` or `OPENAI_API_KEY` to pick the corresponding model dynamically.

### Frontend conventions:
1. **Pages:** Large route components belong in `/frontend/src/pages/` (e.g., Auth, Home, InterviewPrep).
2. **Components:** Reusable UI pieces belong in `/frontend/src/components/` (e.g., Cards, Inputs, Layouts, Loader, Models).
3. **API Calls:** Handled via `axios` targeting the backend base URL.

## 🚀 AI Coding Guidelines

1. **Imports:** 
   - Backend uses strictly ES module imports (`import ... from '...'` and `.js` file extensions in import paths, e.g., `import connectDB from "./config/db.js"`).
   - Require statement is **NOT** allowed.
2. **Environment Variables:**
   - Always assume `.env` provides standard fields like `PORT`, `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY`/`OPENAI_API_KEY`.
3. **TailwindCSS:** Use the new utility classes provided by v4. Do not enforce legacy configuration formats.
4. **Error Handling:** 
   - API endpoints must return proper HTTP status codes (`400`, `401`, `403`, `404`, `500`) with structured JSON errors `{ message: "Error details" }`.
   - Frontend must wrap visual errors using `react-hot-toast`.
5. **Types:** Although written in JS, respect implicit types. React 19 rules apply (use functional components, hooks, etc.).

When generating new code, mimic the existing separation of concerns. Do not mix business logic into route definitions or frontend components.
