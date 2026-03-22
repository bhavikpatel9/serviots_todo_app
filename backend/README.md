# Backend

Express.js REST API with MongoDB, JWT authentication, and task management.

## Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (local instance or MongoDB Atlas)
- **npm**

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env` and set the required values:

| Variable    | Description                    | Example                          |
|-------------|--------------------------------|----------------------------------|
| `PORT`      | Server port (optional, default: 3000) | `3000`                    |
| `MONGO_URI` | MongoDB connection string      | `mongodb://localhost:27017/tasks` |
| `JWT_SECRET`| Secret for signing JWT tokens  | `your-secret-key`                |

**MongoDB Atlas example:**
```
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

### 3. Run the application

**Development mode** (with hot reload):

```bash
npm run dev
```

The server runs at `http://localhost:3000` (or your configured `PORT`).

## API Endpoints

Base URL: `/api`

### Auth
| Method | Endpoint           | Description  |
|--------|--------------------|--------------|
| POST   | `/auth/register`   | Register user |
| POST   | `/auth/login`      | Login and get JWT |

### Tasks (requires JWT)
| Method | Endpoint       | Description     |
|--------|----------------|-----------------|
| POST   | `/tasks`       | Create task     |
| GET    | `/tasks`       | Get all tasks   |
| PUT    | `/tasks/:id`   | Update task     |
| DELETE | `/tasks/:id`   | Delete task     |

Include the JWT in the `Authorization` header: `Bearer <token>`.
