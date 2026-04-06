# 🤖 AI Interview Prep App

A full-stack AI-powered interview preparation platform built using the modern MERN stack.  
This application helps users practice technical and behavioral interview questions with AI-generated responses and explanations.

---

## 📌 Project Overview

The AI Interview Prep App is designed to simulate real interview scenarios and help users level up their skills.  
Users can:

- Register & Login securely via JWT.
- Provide their role, experience, and focus topics to generate custom interview questions.
- Gain deep understanding using AI-generated concept explanations.
- Track their preparation sessions and progress.

This project demonstrates full-stack development, standard authentication, file profile uploads, robust API integration, and cloud database usage combined with LLMs text generation.

---

## 🏗️ System Architecture

Frontend (React + Vite)  →  Backend (Node/Express)  →  MongoDB Atlas  
                                ↓  
                    Google Gemini / OpenAI API  

---

## 🛠️ Tech Stack

### 👨‍💻 Frontend
- **React.js 19**
- **Vite**
- **Tailwind CSS V4**
- **Framer Motion** (Animations)
- React Router DOM v7
- Axios
- React Markdown

### ⚙️ Backend
- **Node.js & Express.js (v5)** (ES Modules)
- **MongoDB** & **Mongoose (v9)**
- **JWT Authentication** & bcryptjs
- **Multer** (File profile uploads)
- dotenv & cors

### ☁️ Cloud & APIs
- **MongoDB Atlas**
- **Google Gemini API** (`gemini-2.0-flash-lite`)
- **OpenAI API** (`gpt-4o-mini`)

---

## 🔐 Authentication Flow

- User registers with name, email, password, and optional profile image.
- Password is encrypted using `bcryptjs` before storage.
- A JWT token is generated upon successful login.
- Protected routes use custom middleware (`protect`) to verify tokens passed via the `Authorization` header.

---

## 📂 Codebase & Folder Structure

```
AI-Interview-Prep-App/
│
├── frontend/                 # React frontend workspace (Vite)
│   ├── src/
│   │   ├── components/       # Reusable modular UI elements (Cards, Inputs, etc.)
│   │   ├── pages/            # View components mapping back to routes
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Node/Express backend workspace
│   ├── config/               # Database connection scripts
│   ├── controllers/          # Request handlers and business logic
│   ├── middlewares/          # Custom auth & file middlewares
│   ├── models/               # MongoDB models (User, Session, Question)
│   ├── routes/               # Express routers definition
│   ├── uploads/              # Local storage for Multer
│   ├── server.js             # Entry point
│   └── package.json
│
├── AI_INSTRUCTIONS.md        # Specialized rules for AI tools processing the project
└── README.md
```

---

## 🧠 Instructions for AI Agents

If you are an AI coding assistant working on this project, please make sure to read the [`AI_INSTRUCTIONS.md`](./AI_INSTRUCTIONS.md) file first before writing or editing any code.

---

## 🎯 Learning Outcomes

This project is a strong exploration of:

- Modern React with Vite and Tailwind v4.
- Integration of large language model (LLM) APIs (Gemini & OpenAI) in real-world scenarios.
- Complete application architecture using ES Modules on Node.js.
- Clean separation of concerns (Routes → Controllers → Models).
- RESTful API error handling & status codes.

---

## 👨‍💻 Author

Muhammad Tabish  
GitHub: https://github.com/tabishmishere  
LinkedIn: https://www.linkedin.com/in/muhammadtabish1/

---

## ⭐ If you found this project helpful, give it a star!
