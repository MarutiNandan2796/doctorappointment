<div align="center">

  # 🩺 DoctorAppoints
  ### *Modern Healthcare Management & Doctor Appointment Booking Platform*

  [![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express_5.1-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8.17-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.2-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

  <p align="center">
    <b>Empowering patients to connect with top medical specialists effortlessly, featuring AI-assisted health guidance and multi-role portal management.</b>
  </p>

  <p align="center">
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-api-reference">API Reference</a> •
    <a href="#-environment-variables">Environment Variables</a>
  </p>

</div>

---

## 🌟 Overview

**DoctorAppoints** (inspired by *Prescripto*) is a full-stack MERN application designed to streamline doctor-patient engagements. From searching certified doctors across various specialties to scheduling appointments and chatting with an interactive **AI Health Assistant**, DoctorAppoints offers a seamless healthcare experience with modern UI aesthetics.

---

## ✨ Key Features

### 👨‍⚕️ For Patients
- **Specialty Exploration**: Search & filter top doctors across 6+ specialties (*General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist*).
- **Interactive Booking**: Real-time slot selection with booking confirmations and status tracking.
- **🤖 Integrated AI Health Assistant**: Ask medical/symptom questions and receive instant AI-driven health insights.
- **Patient Portal**: View upcoming appointments, cancellation options, and profile details.

### 🔐 Multi-Role Authentication & Portals
- **Role-Based Portals**: Dedicated access flows for **Patients**, **Doctors**, and **Administrators**.
- **JWT Security**: Protected backend API endpoints with hashed passwords via `bcryptjs`.
- **Doctor Dashboard**: Manage appointment schedules, review patient bookings, and update availability status.
- **Admin Dashboard**: Comprehensive overview of platform statistics, registered doctors, and system-wide appointments.

### ⚡ Technical Highlights
- **Monorepo Workspace Setup**: Unified root package managing `client` and `server` concurrently.
- **Dual Data Engine**: MongoDB/Mongoose ORM integration alongside an automatic zero-config mock data layer for instant deployment and testing.
- **Responsive Glassmorphism UI**: Built with React 19, Tailwind CSS v4, and Lucide Icons.

---

## 🛠️ Tech Stack

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | [React 19](https://react.dev/) | Modern UI library with concurrent rendering |
| **Build Tool** | [Vite 7](https://vitejs.dev/) | Ultra-fast HMR and bundle compilation |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS engine with glassmorphic designs |
| **Icons & Assets** | [Lucide React](https://lucide.dev/) | Sleek, customizable UI icons |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side routing with protected route guards |
| **Backend Runtime** | [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) | Scalable RESTful API server |
| **Database** | [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) | NoSQL Document storage with ORM schemas |
| **Authentication** | [JWT](https://jwt.io/) & [BcryptJS](https://github.com/dcodeIO/bcrypt.js) | Secure token-based session management |

---

## 📁 Project Structure

```
doctorappoints/
├── client/                      # React 19 + Vite Frontend
│   ├── src/
│   │   ├── components/          # Reusable UI components (AiAssistant, DoctorCard, Layout, etc.)
│   │   ├── context/             # React Context for Auth, Appointments & App State
│   │   ├── data/                # Fallback mock datasets & static data
│   │   ├── pages/               # Page views (Home, Doctors, DoctorDetails, Dashboard, Logins)
│   │   ├── services/            # Axios API client services
│   │   └── styles.css           # Styling rules & custom utilities
│   ├── package.json
│   └── vite.config.js
│
├── server/                      # Node.js + Express REST API
│   ├── src/
│   │   ├── config/              # Database connection & env setup
│   │   ├── controllers/         # API request handlers (Auth, Doctors, Appointments, AI)
│   │   ├── data/                # Seed data & fallback memory stores
│   │   ├── middleware/          # JWT auth verification & error handling
│   │   ├── models/              # Mongoose data models (User, Doctor, Appointment)
│   │   └── routes/              # Express route declarations
│   └── package.json
│
├── package.json                 # Monorepo root workspace configuration
├── README.md                    # Project documentation
└── .env.example                 # Example environment variables template
```

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- [MongoDB](https://www.mongodb.com/) (Optional - app automatically falls back to in-memory store if DB URI is not configured)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MarutiNandan2796/doctorappointment.git
   cd doctorappoints
   ```

2. **Install Workspace Dependencies**
   Install all dependencies for both `client` and `server` in one command from the project root:
   ```bash
   npm run install:all
   ```
   *Alternatively, standard `npm install` works as well.*

3. **Configure Environment Variables**
   Create `.env` files in `client/` and `server/` using the provided `.env.example` files:
   ```bash
   # Server Environment Setup
   cp server/.env.example server/.env
   
   # Client Environment Setup
   cp client/.env.example client/.env
   ```

4. **Launch Development Servers**
   Run both the Express API and Vite React App concurrently:
   ```bash
   npm run dev
   ```

   - **Frontend App**: Opens at `http://localhost:5173` (or Vite assigned port)
   - **Backend API**: Listening at `http://localhost:4000`

---

## 🌐 API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register a new patient account |
| `POST` | `/api/auth/login` | Public | Authenticate patient, doctor, or admin |
| `GET` | `/api/doctors` | Public | Retrieve list of all registered doctors & specialties |
| `GET` | `/api/doctors/:id` | Public | Get specific doctor details & available slots |
| `GET` | `/api/appointments` | Private | Fetch user or doctor appointments |
| `POST` | `/api/appointments` | Private | Schedule a new doctor appointment |
| `PATCH` | `/api/appointments/:id/cancel` | Private | Cancel an existing appointment |
| `POST` | `/api/ai/chat` | Public / Private | Interact with the AI Health Assistant |

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
PORT=4000
MONGODB_URI=mongodb://localhost:27017/doctorappoints
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:4000/api
```

---

## 📜 Available Scripts

From the root directory, you can run:

- `npm run dev` — Starts client and server concurrently in development mode.
- `npm run build` — Builds the Vite client application for production.
- `npm run start` — Starts the Express backend server in production mode.
- `npm run install:all` — Installs dependencies across all npm workspaces.

---

## 🤝 Contributing

Contributions are always welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">
  <sub>Built with ❤️ for better digital healthcare experiences.</sub>
</div>
