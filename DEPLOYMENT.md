# 🚀 Deployment Guide - DoctorAppoints

This guide outlines step-by-step instructions to deploy the **DoctorAppoints** full-stack MERN application to production.

---

## 🎯 Recommended Deployment Platforms

### Option 1: Render.com (Recommended for Free MERN Hosting)

Render supports both Node.js web services and static sites using the pre-configured [`render.yaml`](file:///c:/Users/Maruti%20Nandan/Desktop/doctorappoints/render.yaml).

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add deployment configs"
   git push origin main
   ```
2. **Connect to Render**:
   - Go to [dashboard.render.com](https://dashboard.render.com/).
   - Click **New +** -> **Blueprint**.
   - Connect your GitHub repository `doctorappointment`.
   - Render will automatically detect [`render.yaml`](file:///c:/Users/Maruti%20Nandan/Desktop/doctorappoints/render.yaml) and create both:
     - **Backend Web Service**: Express API on Node.js
     - **Frontend Static Site**: React Vite static build
3. **Set Environment Variables**:
   - Add your `MONGODB_URI` in the backend service environment settings.

---

### Option 2: Vercel (Frontend & Serverless API)

Vercel provides instant deployment with the pre-configured [`vercel.json`](file:///c:/Users/Maruti%20Nandan/Desktop/doctorappoints/vercel.json).

1. **Install Vercel CLI** (or connect via GitHub):
   ```bash
   npm i -g vercel
   ```
2. **Deploy**:
   ```bash
   vercel
   ```
3. Set your environment variables in the Vercel Project Settings dashboard (`MONGODB_URI`, `JWT_SECRET`).

---

### Option 3: Netlify (Frontend) + Railway (Backend)

- **Frontend (Netlify)**:
  - Build command: `npm run build`
  - Publish directory: `client/dist`
  - Environment variable: `VITE_API_URL=https://your-backend-service.up.railway.app/api`
- **Backend (Railway)**:
  - Connect repo, set root directory to `server` or root.
  - Set `MONGODB_URI` and `JWT_SECRET`.

---

### Option 4: Docker Container Deployment

Run locally or on any cloud server (AWS EC2, DigitalOcean droplet, GCP):

```bash
# Build Docker image
docker build -t doctorappoints .

# Run container
docker run -p 4000:4000 -p 5173:5173 doctorappoints
```

---

## ✅ Pre-Deployment Verification Checklist

- [x] Client production build succeeds (`npm run build` generates `client/dist`).
- [x] Server handles production environment variables (`PORT`, `MONGODB_URI`, `JWT_SECRET`).
- [x] CORS configuration allows requests from frontend domain.
- [x] Fallback mock data active if MongoDB URI is not set.
