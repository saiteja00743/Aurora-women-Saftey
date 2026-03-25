# Aurora: A Strong Voice - Full App Working Documentation

This document explains the comprehensive architecture, data flows, and technical implementation of the **Aurora** application.

---

## 1. System Architecture Overview

Aurora is a full-stack web application designed to empower and protect women. It is built using:
- **Frontend**: React 19, Vite, TailwindCSS, Framer Motion
- **Backend**: Python 3.10+, FastAPI, SQLAlchemy ORM
- **Database**: SQLite (`aurora.db`)
- **Third-Party APIs**: OpenRouter (GPT-3.5-Turbo) for AI features, Web3Forms for email notifications

The application follows a standard Client-Server architecture where the React frontend communicates with the FastAPI backend via RESTful APIs.

---

## 2. Frontend Working (React + Vite)

The frontend is a single-page application (SPA) running on port `5173`. 
It utilizes **React Router** for navigation and **Framer Motion** for smooth, modern page transitions.

### Key Pages & Routing (`src/App.jsx`)
- **`/` (Entry Flow)**: Renders the `Landing.jsx` page. Once the user clicks "Get Started", it transitions to the `AuthPage.jsx`.
- **`/dashboard`**: The main hub (`Dashboard.jsx`) giving access to the app's features.
- **`/complaint`**: The Complaint Form (`ComplaintForm.jsx`) for filing reports.
- **`/lawbot`**: The AI Legal Assistant interface (`LawBot.jsx`).
- **`/therapist`**: The AI Therapist interface (`Therapist.jsx`).
- **`/admin`**: The Admin Dashboard (`AdminDashboard.jsx`) for managing registered complaints.

### UI Theme
The application features a deeply customized dark theme using **TailwindCSS** and raw CSS:
- **Background**: A custom radial CSS animation (`.aurora-bg` in `index.css`) that shifts between deep crimson (`#8b0000`), dark red (`#3d0c0c`), and black (`#0a0a0a`).
- **Components**: Glassmorphism is heavily used (`bg-black/40`, `backdrop-blur-xl`) with red borders and glowing hover effects to create a striking but highly readable red/black interface.

---

## 3. Backend Working (FastAPI)

The backend is a high-performance Python application running on port `8000`.

### Database & Models (`backend/models.py` & `backend/database.py`)
It relies on SQLAlchemy to interact with a local `aurora.db` SQLite database.
Two primary tables exist:
1. **Users**: Stores `id`, `username`, `email`, `hashed_password`, and an `is_admin` boolean flag.
2. **Complaints**: Stores `id`, `victim_name`, `complaint_title`, `culprit_name`, `incident_description`, `status` (Pending/Reviewed), and `created_at`.

### Authentication (`backend/auth.py`)
- **Register**: Hashes the user's password using `passlib` (pbkdf2_sha256) and stores it in the DB.
- **Login**: Verifies the hash and issues a simple JWT or token back to the client, which stores it in `localStorage`.
- **Admin**: An admin can be created by running the `backend/create_admin.py` script.

---

## 4. Core Features & Data Flow

### A. Complaint System
1. **User Action**: User fills out the form in `ComplaintForm.jsx` and hits submit.
2. **Backend Save**: `api.post("/api/complaints/create")` hits `complaint.py` on the backend, which parses the JSON schema and saves the record to the SQLite `Complaints` table.
3. **Email Alert**: Concurrently, the frontend pushes the formatted complaint data to `Web3Forms API` using a direct `fetch` POST. This sends an immediate email alert to the registered authority email (`gajavellisaiteja123@gmail.com`).

### B. LawBot (AI Legal Assistant)
1. **Context**: LawBot specializes in Indian Women's rights.
2. **Prompt Engineering**: The backend (`lawbot.py`) receives the user's question and wraps it in a system prompt: *"You are a calm, accurate, and empathetic legal assistant specializing in Indian women's rights."*
3. **API Request**: The backend forwards this to the **OpenRouter API** using the `OpenAI` client in Python, targeting the `gpt-3.5-turbo` model. 
4. **Response**: The AI's response is streamed back to the frontend text box.

### C. AI Therapist (Voice & Text)
1. **Speech Recognition**: Uses the native browser `SpeechRecognition` API (configured to Indian English `en-IN`) to convert user voice into text in `Therapist.jsx`.
2. **Prompt Engineering**: `therapist.py` assigns the persona *"You are a calm, empathetic AI therapist designed to emotionally support women..."*
3. **Text-to-Speech**: Once OpenRouter responses return, the frontend uses the `SpeechSynthesisUtterance` browser API to speak the response out loud in a comforting voice.

### D. Admin Dashboard
1. **Access Control**: Renders the admin panel if `user.is_admin === 1` in `localStorage`.
2. **Fetching Data**: Automatically fetches all complaints from `/api/complaints/admin/all`.
3. **Status Update**: Admins can approve/review complaints. Clicking the update button sends a `PATCH` request to `/api/complaints/admin/{id}/status`, updating the SQlite DB.

---

## 5. Security & Edge Cases
- **Encoding Issues**: Handled specifically to support Windows `cp1252` encoding by stripping hardcoded target emojis from Python terminal prints.
- **Environment Variables**: API keys (`OPENROUTER_API_KEY`) and forms access keys are safely kept in `.env` (backend) or frontend memory to prevent exposure.
- **State Preservation**: Framer motion's `AnimatePresence` ensures components do not unmount abruptly. 

---

## 6. How to Run Locally

1. **Start the Frontend**:
   ```bash
   npm run dev
   ```
   *Runs on http://localhost:5173*

2. **Start the Backend**:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```
   *Runs on http://localhost:8000*
