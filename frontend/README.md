# Frontend Application

This is the frontend component for the Serviots practical task. Built with **React 19**, **Vite 6**, **TypeScript**, and **Tailwind CSS v4**.

## Technologies

- **View & Build**: React & Vite
- **Type Checking**: TypeScript
- **Styling**: Tailwind CSS, React-Icons
- **State & Data**: Redux Toolkit, Redux Persist, React Query (TanStack Query)
- **Forms & Validation**: React Hook Form, Yup
- **Routing & Networking**: React Router DOM, Axios
- **Notifications**: React Toastify

## Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn package manager

## Setup Instructions

1. **Navigate to the frontend directory** (if you aren't already):
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root of the `frontend` folder if required by your API base URL logic.
   ```env
   # Example
   VITE_API_URL=http://localhost:3000/api
   ```

## Running the Application

To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will usually be available at `http://localhost:5173/`.
