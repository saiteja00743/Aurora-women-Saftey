# 🌸 Aurora — A Strong Voice

> **An AI-powered web platform providing discreet legal, emotional, and complaint support for women facing abuse.**

Aurora is a full-stack final year project built to empower women through technology — offering instant legal guidance, empathetic AI therapy, and a safe complaint filing system, all within a secure and private interface.

---

## 🎯 Purpose

Women facing abuse often cannot seek help openly due to fear, stigma, or surveillance. Aurora bridges this gap by providing:

- ⚖️ **Instant legal knowledge** about women's rights under Indian law
- 💬 **Emotional support** through a compassionate AI therapist
- 📋 **Confidential complaint filing** with automatic authority notification
- 🛡️ **Admin tools** to manage and track all submitted complaints

---

## ✨ Features

### 1. 📋 Complaint Filing System
- Fill a structured complaint form (victim name, title, culprit, description)
- Complaint is saved securely to the database
- Automated email notification dispatched to authorities via Web3Forms
- Real-time success/error feedback in the UI

### 2. ⚖️ LawBot — AI Legal Assistant
- AI chatbot specializing in **Indian women's rights**
- Covers: Domestic Violence Act, POSH Act, IPC sections, cybercrime laws, free legal aid
- 5 built-in quick-question suggestions for common scenarios
- Powered by **GPT-3.5-Turbo** via OpenRouter API

### 3. 🧠 AI Therapist — Emotional Support
- Full conversational chat interface with message history
- **Voice input** via browser's SpeechRecognition API (Indian English)
- **Text-to-speech** output — AI speaks its responses aloud
- Empathetic, non-diagnostic support (does not give medical advice)
- Powered by **GPT-3.5-Turbo** via OpenRouter API

### 4. 🛡️ Admin Dashboard
- Real-time statistics: Total, Pending, and Reviewed complaints
- Search by victim name or complaint title
- Filter by status: All / Pending / Reviewed
- One-click status update (Mark as Reviewed / Pending)
- Access restricted to admin accounts only

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, TailwindCSS, Framer Motion, React Router |
| **Backend** | Python, FastAPI, SQLAlchemy ORM |
| **Database** | SQLite (`aurora.db`) |
| **AI Engine** | GPT-3.5-Turbo via OpenRouter API |
| **Email** | Web3Forms API |
| **Auth** | pbkdf2_sha256 password hashing, localStorage session |

---

## 📁 Project Structure

```
Aurora-A-Strong-Voice-master/
│
├── backend/
│   ├── routes/
│   │   └── complaint.py       # Complaint CRUD API
│   ├── auth.py                # Register & Login endpoints
│   ├── database.py            # SQLAlchemy engine & session
│   ├── lawbot.py              # LawBot AI endpoint
│   ├── therapist.py           # Therapist AI endpoint
│   ├── models.py              # User & Complaint DB models
│   ├── schemas.py             # Pydantic request schemas
│   ├── create_admin.py        # Script to create admin accounts
│   ├── main.py                # FastAPI app entry point
│   └── aurora.db              # SQLite database
│
├── src/
│   ├── assets/                # Images (im1.jpg, im2.jpg)
│   ├── components/
│   │   └── AuthForm.jsx       # Login/Register form component
│   ├── pages/
│   │   ├── Landing.jsx        # Public home page
│   │   ├── AuthPage.jsx       # Auth entry page
│   │   ├── Dashboard.jsx      # Feature hub (post-login)
│   │   ├── ComplaintForm.jsx  # File a complaint
│   │   ├── LawBot.jsx         # Legal AI chatbot
│   │   ├── Therapist.jsx      # AI therapist chat
│   │   └── AdminDashboard.jsx # Admin complaint management
│   ├── services/
│   │   └── api.js             # Axios instance with base URL
│   ├── App.jsx                # Router & route definitions
│   └── main.jsx               # React entry point
│
├── public/
├── .env                       # API keys (not committed to Git)
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 How to Run

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- An OpenRouter API key (set in `.env`)

### ▶️ Frontend
```bash
npm install
npm run dev
```
Runs at → **http://localhost:5173**

### ▶️ Backend
```bash
cd backend
pip install fastapi uvicorn sqlalchemy passlib python-dotenv openai
uvicorn main:app --reload
```
Runs at → **http://localhost:8000**  
API Docs → **http://localhost:8000/docs**

> ⚠️ Both frontend and backend must be running simultaneously.

### 🔑 Environment Variables
Create a `.env` file in the root directory:
```
OPENROUTER_API_KEY=your_openrouter_api_key_here
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_key_here
```

### 👑 Creating an Admin Account
```bash
cd backend
python create_admin.py
```

---

## 📊 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive token |
| POST | `/api/lawbot/ask` | Ask a legal question |
| POST | `/api/therapist/chat` | Send a therapy message |
| POST | `/api/complaints/create` | Submit a complaint |
| GET | `/api/complaints/admin/all` | Admin: get all complaints |
| PATCH | `/api/complaints/admin/{id}/status` | Admin: update status |

---

## 🔮 Future Enhancements

- [ ] Steganography-based SOS (hide distress signals in social media images)
- [ ] Multi-turn conversation memory in AI Therapist
- [ ] Hindi and regional language support
- [ ] Mobile application (React Native / Flutter)
- [ ] Real-time complaint status notifications
- [ ] Integration with official women's helplines (1091)

---

## 🎓 Academic Details

- **Project Type:** Final Year Project
- **Domain:** Artificial Intelligence + Full Stack Web Development
- **Social Impact:** Women Safety, Legal Empowerment, Mental Health Support
- **Academic Year:** 2025–2026

---

## 📄 License

This project is developed for **educational and social awareness purposes**.  
© 2026 Gajavelli Saiteja. All rights reserved.