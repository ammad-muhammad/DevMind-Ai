# DevMind AI — Your Intelligent Coding Partner

![DevMind AI](https://img.shields.io/badge/DevMind-AI-7c3aed?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Groq](https://img.shields.io/badge/Groq_AI-FF6B35?style=for-the-badge)

> An AI-powered developer tool that helps you explain, 
> debug, write, and review code — built for developers 
> who want to code smarter and ship faster.

🌐 **Live Demo:** [devmind-ai.vercel.app](https://dev-mind-g46052c1l-muhammad-ammads-projects.vercel.app/)

---

## 🚀 Why DevMind AI?

As a developer, I constantly faced these problems:
- Spending hours debugging code without understanding the root cause
- Copying code from Stack Overflow without truly understanding it
- Writing repetitive boilerplate code that slows productivity
- Switching between multiple tools just to explain, debug, and write code

**DevMind AI solves all of this in one place** — paste your code, 
get instant AI-powered explanations, bug fixes, and freshly 
written code, all within a clean developer-focused interface.

---

## ✨ Features

### 🤖 AI-Powered Tools
- **AI Chat** — Ask anything: coding questions, concepts, 
  career advice. Context-aware conversations with memory.
- **Code Debugger** — Paste buggy code and get instant 
  bug analysis with line-by-line fixes and corrected code.
- **Code Explainer** — Understand any codebase instantly 
  with step-by-step plain English explanations.
- **Code Writer** — Describe what you want to build and 
  get production-ready code. Supports UI page generation 
  with live preview.

### 👤 User System
- JWT-based authentication (24-hour sessions)
- Password change and account deletion from settings

### 💾 History & Snippets
- All conversations automatically saved
- Access full chat history from sidebar
- Save useful code snippets for quick access later

### 🎨 Developer Experience
- Dark theme optimized for developers
- Markdown rendering with syntax highlighted code blocks
- Language mismatch detection in Explainer and Debugger
- Live HTML preview for generated web pages
- Responsive design with animated mobile sidebar

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React.js | UI Framework |
| Tailwind CSS | Styling |
| Zustand | State Management |
| React Router | Navigation |
| Axios | API Calls |
| React Markdown | Markdown Rendering |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | REST API Server |
| MongoDB + Mongoose | Database |
| JWT + bcrypt | Authentication |
| Helmet + Rate Limiting | Security |

### AI & Deployment
| Technology | Purpose |
|-----------|---------|
| Groq AI API | LLM (llama-3.3-70b) |
| Multi-model Fallback | Reliability |
| Vercel | Frontend Hosting |
| Railway | Backend Hosting |

---

## 📁 Project Structure

```
devmind-ai/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── MarkdownRenderer.jsx
│   │   │   └── MessageInput.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Privacy.jsx
│   │   │   ├── Terms.jsx
│   │   │   └── dashboard/
│   │   │       ├── Chat.jsx
│   │   │       ├── Debugger.jsx
│   │   │       ├── Explainer.jsx
│   │   │       ├── CodeWriter.jsx
│   │   │       ├── Snippets.jsx
│   │   │       └── Settings.jsx
│   │   ├── store/
│   │   │   ├── authStore.js
│   │   │   ├── chatStore.js
│   │   │   └── snippetStore.js
│   │   └── services/
│   │       └── api.js
└── backend/
    ├── src/
    │   ├── controllers/
    │   │   ├── authController.js
    │   │   ├── chatController.js
    │   │   └── snippetController.js
    │   ├── models/
    │   │   ├── User.js
    │   │   ├── Chat.js
    │   │   └── Snippet.js
    │   ├── routes/
    │   │   ├── authRoutes.js
    │   │   ├── chatRoutes.js
    │   │   └── snippetRoutes.js
    │   ├── middleware/
    │   │   └── authMiddleware.js
    │   └── app.js
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Groq API key (free at console.groq.com)
- Gmail account with App Password

### 1. Clone the repository
```bash
git clone https://github.com/ammad-muhammad/DevMind-Ai.git
cd DevMind-Ai
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create .env file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_secret_key
GROQ_API_KEY=your_groq_api_key
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_gmail_app_password
```

```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create .env file:
```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 🔒 Security Features
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens expire after 24 hours
- Rate limiting: 100 requests/15min (10 for auth routes)
- HTTP security headers via Helmet.js
- Input validation on all auth endpoints
- Users can only access their own data

---

## 🤖 AI Model Fallback System
DevMind AI uses multiple Groq models with automatic fallback:
1. **Primary:** llama-3.3-70b-versatile
2. **Fallback 1:** deepseek-r1-distill-llama-70b
3. **Fallback 2:** mixtral-8x7b-32768

If one model fails or times out, the next one is tried 
automatically ensuring maximum reliability.

---

## 📸 Screenshots

| Landing Page | Dashboard | Code Debugger |
|-------------|-----------|---------------|
| ![Landing]() | ![Dashboard]() | ![Debugger]() |

---

## 👨‍💻 Author

**Muhammad Ammad**
- LinkedIn: [your-linkedin](https://www.linkedin.com/in/ammadm/)
- GitHub: [@ammad-muhammad](https://github.com/ammad-muhammad)

---

## 📄 License
This project is open source and available under the 
[MIT License](LICENSE).

---

⭐ If you found this project helpful, please give it a star!
