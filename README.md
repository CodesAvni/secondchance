# 🌱 SecondChance — AI-Powered Career Restart Platform

> “A career gap should never define your future.”

SecondChance is a full-stack AI-powered platform designed to help individuals restart their careers after a break and connect them with inclusive employers who value skills over continuous employment history.

It bridges the gap between **career returners** and **opportunity providers** using structured profiles, skill-based matching, and AI-assisted career storytelling.

---

##  Live Concept

SecondChance empowers:
-  Job seekers restarting careers (maternity, health breaks, personal reasons)
-  Employers offering flexible and inclusive opportunities
-  AI-driven career profile enhancement and job matching

---

##  Key Features

###  Job Seeker Module
- Profile creation & management
- Skill tagging system with experience levels
- Career break-friendly profile structure
- Opportunity browsing & application tracking

###  Employer Module
- Create and manage job opportunities
- View and manage applicants
- Accept / Reject workflow system
- Role-based access control

###  Application System
- Apply to opportunities
- Prevent duplicate applications
- Status tracking (PENDING / ACCEPTED / REJECTED)

###  AI Career Assistant (Gemini 2.5 Flash)
- Converts raw career notes into professional summaries
- Acts as an empathetic career advisor
- Improves profile bios with human-like storytelling
- Helps users present career gaps positively

---

##  Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM

### Database
- PostgreSQL

### AI Integration
- Google Gemini 2.5 Flash (`@google/genai`)

### Authentication
- JWT-based authentication
- bcrypt password hashing

---

##  Architecture Overview


Frontend (Next.js)
↓
REST APIs (Express.js)
↓
Prisma ORM Layer
↓
PostgreSQL Database


AI Layer:

User Input → Express API → Gemini AI → Structured Career Summary → Frontend State Update


---

##  Project Structure


secondchance/
│
├── apps/
│ ├── web # Frontend (Next.js)
│ └── server # Backend (Express)
│
├── packages/
│ ├── config
│ ├── types
│ └── ui


---

##  Authentication Flow


User Login/Register
↓
Backend verifies credentials
↓
JWT Token generated
↓
Stored in localStorage
↓
Sent with API requests (Bearer Token)


---

##  Core Modules

### Backend APIs
- Auth (`/auth/register`, `/auth/login`)
- Profile (`/profile`)
- Skills (`/skills`)
- Opportunities (`/opportunities`)
- Applications (`/applications`)
- AI Profile Enhancement (`/ai`)

---

##  AI Integration Highlights

- Integrated **Google Gemini 2.5 Flash**
- Converts fragmented user input into:
  - Professional summaries
  - First-person storytelling bios
- Designed prompt for empathetic career guidance
- Real-time profile enhancement system

---

##  Current Status

###  Completed
- Authentication system
- Job seeker dashboard
- Employer dashboard
- Skills management
- Opportunity system
- Application workflow
- AI profile assistant
- Backend APIs fully functional
- Prisma + PostgreSQL integration

