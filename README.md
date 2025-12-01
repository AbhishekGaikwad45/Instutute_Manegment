Institute Management System
<img width="1920" height="1080" alt="Screenshot 2025-11-30 230907" src="https://github.com/user-attachments/assets/1716565f-1c49-46cf-b4e1-f058ee68af8f" />
<img width="1920" height="1080" alt="Screenshot 2025-12-01 165744" src="https://github.com/user-attachments/assets/ba62826e-9b98-4a66-8a29-227af12284fd" />
<img width="1920" height="1080" alt="Screenshot 2025-12-01 164546" src="https://github.com/user-attachments/assets/9e328235-6107-4b0d-89b4-d8841609580b" />


A full-stack Spring Boot + React web application for managing students, faculty, batches, attendance, and payments in an institute. The system includes role-based login, CRUD operations, and a clean REST API.

 Features
 Faculty /  Student /  Counsellor / Admin

Role-based login system (faculty login with email + birthDate method supported)

Add, update, delete, and view:

Students

Faculty

Batches

Assign students to batches

Take & view attendance

Student fee/payment management

CORS-enabled backend for React

Responsive UI built with React

Tech Stack
Frontend

React.js

React Router DOM

React Toastify

Fetch / Axios

Backend

Spring Boot

Spring Web

Spring Data JPA

MySQL / PostgreSQL / Any relational DB

ModelMapper

Validation API

Server Communication

React → Spring Boot REST API (JSON)

 Installation & Setup

1️ Backend Setup (Spring Boot)
Requirements

Java 17+

Maven

MySQL database

Postman (optional)

Steps
cd backend
mvn clean install
mvn spring-boot:run


Default runs on:

http://localhost:8080

2️ Frontend Setup (React)
Requirements

Node.js

npm or yarn

Steps
cd frontend
npm install
npm start


Runs on:

http://localhost:3000
