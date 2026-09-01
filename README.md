# Employee Attendance Management System

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB (Atlas)

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Backend
1. \cd server\
2. \
pm install\
3. Create \.env\ with:
   - PORT
   - MONGO_URI
   - JWT_SECRET
   - CLIENT_URL
4. \
pm run seed\ (once)
5. \
pm run dev\

### Frontend
1. \cd client\
2. \
pm install\
3. Create \.env\ with:
   - VITE_API_BASE_URL=http://localhost:4000/api
4. \
pm run dev\

### Test Accounts
- HR: hr@innereye.com / hr1234
- Employee: employee@innereye.com / emp1234

## Features
- Employee login & registration
- Attendance check-in / check-out
- Working hours calculation
- Leave request & approval
- HR dashboard & reports
