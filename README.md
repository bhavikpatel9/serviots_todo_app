# Serviots - Practical Task

This repository contains the full-stack practical task application consisting of a React-based frontend and a Node.js/Express backend.

## Project Structure

- `frontend/`: The frontend React application (Vite + TypeScript + Tailwind CSS).
- `backend/`: The backend REST API (Express.js + MongoDB + TypeScript).

## Prerequisites

- **Node.js**: v18 or higher recommended.
- **MongoDB**: Local instance or MongoDB Atlas account.
- **npm**: Node Package Manager.

---

## Backend Setup Instructions

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file and set your keys:
   ```bash
   cp .env.example .env
   ```
   *Note: Ensure you set `MONGO_URI` (MongoDB connection string) and `JWT_SECRET` (secret for signing JWT tokens) in your new `.env` file.*

4. **Run the Backend Server:**
   Start the development server (with hot reload):
   ```bash
   npm run dev
   ```
   The backend server will run at `http://localhost:3000` (or the port specified in your `.env`).

---

## Frontend Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the Frontend Application:**
   Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will typically run at `http://localhost:5173`. 

---

## Additional Information

For more detailed information on backend API endpoints and features, please refer to the `backend/README.md` file.

postman collection is also added into `backend/postman/` folder.
