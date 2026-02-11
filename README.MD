# Task Manager Assignment - Yonatan Isakov

## Setup and Installation

### Backend

1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Start the server: `npm run dev` (Runs on **port 4000**)

### Frontend

1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the app: `npm run dev` (Typically runs on **port 5173**)

## CORS Configuration

The backend is configured to allow requests from `http://localhost:5173` (default Vite port)
**Note:** If your frontend runs on a different port (e.g., 3000), please update the `origin` in `backend/server.js` to ensure the API communication works correctly.

## API Endpoints

The API follows REST conventions

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update task details
- `DELETE /api/tasks/:id` - Remove a task (requires confirmation)
- `PATCH /api/tasks/:id/toggle` - Toggle completion status
