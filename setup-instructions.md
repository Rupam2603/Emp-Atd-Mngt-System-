# Setup Instructions – Employee Attendance Management System

## 1. Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher recommended)  
  - Download from: https://nodejs.org  
  - Verify installation:
    ```bash
    node -v
    npm -v
    ```

- **Git** (optional, for version control)  
  - Download from: https://git-scm.com

- **MongoDB Atlas Account** (free tier is sufficient)  
  - Sign up at: https://cloud.mongodb.com  
  - Create a cluster, a database user, and allow all IPs (`0.0.0.0/0`) for development.

- **Code Editor** (e.g., VS Code)  
  - Download from: https://code.visualstudio.com

---

## 2. Project Structure Overview

The project is organized as follows:

```text
employee-attendance-system/
├─ client/          # React (Vite) frontend
├─ server/          # Node.js + Express backend
├─ docs/            # Documentation (this file, API docs, etc.)
└─ README.md        # Project overview
```

---

## 3. Backend Setup (`server/`)

### 3.1 Navigate to Backend Folder

From the project root:

```bash
cd server
```

### 3.2 Install Dependencies

```bash
npm install
```

This installs all required packages defined in `package.json` (Express, Mongoose, bcryptjs, jsonwebtoken, etc.).

### 3.3 Configure Environment Variables

1. In the `server/` folder, create a file named `.env`.
2. Copy the contents from `.env.example` (if provided) or create it manually:

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/attendanceDB?retryWrites=true&w=majority
JWT_SECRET=superSecretKeyForAttendanceApp2026
CLIENT_URL=http://localhost:5173
```

3. Replace the `MONGO_URI` value with your actual MongoDB Atlas connection string:
   - Go to your cluster → **Connect** → **Connect your application**.
   - Copy the connection string.
   - Replace `<username>` and `<password>` with your database user credentials.

### 3.4 Seed Initial Data (HR User + Company Settings)

Run the seed script once to create:
- One HR admin user
- One sample employee user
- Default company attendance & leave settings

```bash
npm run seed
```

This executes `src/seeds/seedAll.js` and populates the database.

**Default Test Accounts:**

- **HR Admin**
  - Email: `hr@innereye.com`
  - Password: `hr1234`

- **Employee**
  - Email: `employee@innereye.com`
  - Password: `emp1234`

### 3.5 Start the Backend Server

For development (with auto-restart on changes):

```bash
npm run dev
```

You should see logs similar to:

```text
[INFO] MongoDB connected
[INFO] Server running on port 4000
```

The backend API will be available at:  
**http://localhost:4000**

You can test the health endpoint:  
**http://localhost:4000/health**

---

## 4. Frontend Setup (`client/`)

### 4.1 Navigate to Frontend Folder

From the project root:

```bash
cd client
```

### 4.2 Install Dependencies

```bash
npm install
```

This installs React, Vite, Axios, React Router, Tailwind CSS, etc.

### 4.3 Configure Environment Variables

1. In the `client/` folder, create a file named `.env`.
2. Add the following:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

This tells the frontend where to find the backend API.

### 4.4 Start the Frontend Application

```bash
npm run dev
```

Vite will start a development server, typically at:  
**http://localhost:5173**

Open this URL in your browser.

---

## 5. Running the Full System

1. **Start the backend** in one terminal:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend** in another terminal:
   ```bash
   cd client
   npm run dev
   ```

3. Open **http://localhost:5173** in your browser.

4. **Log in** using one of the test accounts:
   - HR: `hr@innereye.com` / `hr1234`
   - Employee: `employee@innereye.com` / `emp1234`

---

## 6. Testing Key Features

### As an Employee

1. **Login** with the employee account.
2. On the **Employee Dashboard**:
   - Click **Check-In** to mark your arrival.
   - Click **Check-Out** at the end of the day.
   - View today's status and working hours.
3. Navigate to **Attendance History** to see past records.
4. Go to **Leave Management**:
   - Fill out the leave form (type, dates, reason).
   - Submit the request.
   - View your leave balance and request history.

### As an HR Admin

1. **Login** with the HR account.
2. On the **HR Dashboard**:
   - View KPIs: total employees, present/absent/late today, on leave today.
3. Navigate to **Employees** to see the employee list.
4. Go to **Attendance Report** to view all attendance logs.
5. Go to **Leave Approvals**:
   - See pending leave requests.
   - Approve or reject requests.

---

## 7. Troubleshooting

### Backend Issues

- **"MongoDB connection error"**
  - Check your `MONGO_URI` in `.env`.
  - Ensure your IP is allowed in MongoDB Atlas (use `0.0.0.0/0` for development).
  - Verify your database username and password.

- **"Port already in use"**
  - Change the `PORT` value in `server/.env` (e.g., `4001`).
  - Update `VITE_API_BASE_URL` in `client/.env` accordingly.

### Frontend Issues

- **"Network Error" / API calls failing**
  - Ensure the backend is running on `http://localhost:4000`.
  - Check `VITE_API_BASE_URL` in `client/.env` matches the backend URL.
  - Clear browser cache or try incognito mode.

- **Blank page / White screen**
  - Open browser console (F12) to check for errors.
  - Ensure all dependencies are installed (`npm install`).

---

## 8. Additional Notes

- **Do not commit `.env` files** to version control. They are excluded via `.gitignore`.
- For production deployment:
  - Use environment variables provided by your hosting platform (e.g., Render, Vercel).
  - Update `CLIENT_URL` and `VITE_API_BASE_URL` to match your deployed URLs.

---

## 9. Support

If you encounter any issues during setup:

1. Verify all steps above are followed exactly.
2. Check the terminal logs for both backend and frontend.
3. Ensure your MongoDB Atlas cluster is active and accessible.

For further assistance, contact the development team or refer to the project's `README.md`.