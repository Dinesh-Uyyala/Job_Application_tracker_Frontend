# 🚀 Mini Job Application Tracker – Step-by-Step Guide

Welcome to your all-in-one solution for tracking job applications!  
Follow these steps to set up, run, and explore the features of your Job Application Tracker.

---

1️⃣ Clone the Repository

git clone https://github.com/Dinesh-Uyyala/Job_Application_tracker_Frontend.git
cd frontend    for frontend

git clone https://github.com/Dinesh-Uyyala/Job_Application_tracker_Backend.git
cd backend     for backend
---

2️⃣ Backend Setup (Node.js + Express + MySQL)

a. Install Dependencies

cd backend
npm install

b. Configure Database

- Create a MySQL database (e.g., job_tracker).
- Update your backend/config/db.js or .env with your DB credentials.

c. Run Database Migrations

- Import the provided SQL schema or run migration scripts to create tables.

d. Start the Backend Server

npm run dev

- The backend will run on http://localhost:3000

---

3️⃣ Frontend Setup (Angular)

a. Install Dependencies

cd ../frontend
npm install

b. Configure API URL

- Edit src/environments/environment.ts and set apiUrl to your backend URL.

c. Start the Frontend

ng serve

- The frontend will run on http://localhost:4200

---

4️⃣ Key Features

- 🔐 Authentication: Secure login/register for Jobseekers, Recruiters, and Admins.
- 📝 Job Application Form: Apply for jobs with a simple, intuitive form.
- 📋 Applications Table: View, sort, and filter all your job applications.
- ✏️ Edit/Delete: Update or remove your applications and job postings.
<!-- - 📊 Dashboard: Visual summary stats for applications, interviews, offers, and more. -->
- 🛡️ Role-Based Access: Different dashboards and permissions for each user type.

---

5️⃣ Bonus Features

- Token-Based Authentication (JWT)
- Responsive UI with Angular Material
- RESTful API Design

---

6️⃣ Demo Accounts

you can use these or you can register and login
- Recruiter: dinesh@maxatmin.com / Dinesh@123
- Jobseeker: dineshuyyala1@gmail.com / Dinesh@123

---

7️⃣ Explore the App

- Register as a new user or use a demo account.
- Login and access your personalized dashboard.
- Add, edit, or delete job postings and applications.


---

8️⃣ Live Demo Links

- 🌐 Frontend: https://job-application-tracker-frontend-two.vercel.app/jobs
- 🖥️ Backend API: https://job-application-tracker-backend-b1su.onrender.com/api

---

✨ Happy Tracking & Good Luck with Your Job Search! ✨

---

> Replace the demo links above with your actual deployed URLs.