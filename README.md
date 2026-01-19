📘 ZVH2026 – Book Recommendation Application

Book Recommendation web application developed as a TECHIN final project.
The system allows users to register, authenticate, and manage books and categories, with role-based access control.

🧰 Tech Stack
Backend

Java 21

Spring Boot

Spring Data JPA

Spring Security (PasswordEncoder)

H2 Database (development)

Frontend

React

Vite

JavaScript

▶️ How to Run the Project
Backend
cd Books_Project_Backend/Books_Project
mvn spring-boot:run

Backend will start at:

http://localhost:8080

H2 Console:

http://localhost:8080/h2-console

JDBC URL:

jdbc:h2:mem:testdb

Frontend
cd frontend
npm install
npm run dev

Frontend will start at:

http://localhost:5173

👤 Demo Accounts

The application automatically creates demo users on startup (seed data).

Role Email Password
ADMIN admin@demo.lt
Admin123!
USER user@demo.lt
User123!

⚠️ Note: These credentials are for demo/testing purposes only.

🔐 Authentication & Validation

User registration is available

Email and password validation enabled

Passwords are securely stored using hashing

Duplicate email registration is prevented

Role-based access:

ADMIN

USER

📂 Project Structure (Backend – simplified)
Books_Project_Backend/
└── Books_Project/
├── controller
├── service
├── repository
├── entity
├── dto
├── config
│ └── DataInitializer.java
└── resources

🧪 Seed Data

Demo users are created automatically on application startup using DataInitializer:

Users are created only if they do not already exist

Prevents duplicate data on restart

Passwords are encoded using PasswordEncoder

🎓 Academic Context

This project was developed as part of the TECHIN final project (ZVH2026)
and demonstrates:

Clean backend architecture

Validation and error handling

Secure authentication

Git workflow with feature branches and pull requests

📌 Notes

H2 database is used for development/demo

Swagger / OpenAPI is enabled by default

Configuration can be extended for production environments

✅ Status

✔ Backend implemented
✔ Registration & authentication
✔ Demo users seeded
✔ README documented
