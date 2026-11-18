# ElderEase – Senior Assistance & Companionship Platform

ElderEase is a web-based platform designed to help families arrange basic assistance and companionship for elderly people, particularly those living alone while their family members are away for work or studies.

The platform aims to simplify senior management, assistance requests, and coordination between families and elderly individuals through a centralized application.

## Features

- **Dashboard:** Overview of seniors and assistance activities.
- **Senior Management:** Manage elderly individuals and their information.
- **Assistance Requests:** Create and manage requests for assistance.
- **Request Status Tracking:** Track the progress and status of assistance requests.
- **Senior Details:** View individual senior information.
- **Visit History:** Maintain a record of visits.
- **REST API Integration:** Connect the frontend with the backend.

## Technology Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs
- Maven

### Database
- MySQL / PostgreSQL

## Project Architecture

The application follows a frontend-backend separation architecture.

```text
                 ELDER EASE
                     |
          +----------+----------+
          |                     |
     FRONTEND                BACKEND
          |                     |
       React.js             Spring Boot
          |                     |
      Axios Client  ------> REST APIs
                                |
                         Service Layer
                                |
                         Repository Layer
                                |
                             Database
                         MySQL / PostgreSQL
```

## Project Structure

```text
ElderEase/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── README.md
│
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

Install the following before running the application:

- Java JDK 17 or compatible version required by the backend
- Node.js and npm
- Maven (or use the Maven wrapper if provided)
- MySQL or PostgreSQL

### 1. Clone the Repository

```bash
git clone https://github.com/CoderKing246/ElderEase.git
cd ElderEase
```

### 2. Setup the Backend

Navigate to the backend directory:

```bash
cd backend
```

Configure your database credentials in:

`src/main/resources/application.properties`

Example configuration for MySQL:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/elderease
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Create the database in MySQL:

```sql
CREATE DATABASE elderEase;
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will start on the configured Spring Boot port (8080 by default).

### 3. Setup the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal. By default:

```text
http://localhost:5173
```

## Running Both Applications

The frontend and backend run independently.

| Application | Default URL |
|---|---|
| React Frontend | http://localhost:5173 |
| Spring Boot Backend | http://localhost:8080 |

Make sure the backend is running and the frontend API configuration points to the correct backend URL.

## Development

Frontend and backend can be developed, tested, and deployed independently.

- Frontend changes are maintained inside `frontend/`.
- Backend changes are maintained inside `backend/`.
- API communication takes place through REST endpoints.

## Future Enhancements

- User authentication and role-based access control.
- Secure authentication using Spring Security and JWT.
- Emergency assistance and notifications.
- Family member access and remote monitoring.
- Improved assistance-provider coordination.
- Deployment and production monitoring.

## Academic Project

**Project Name:** ElderEase – Senior Assistance & Companionship Platform

**Project Type:** Software Engineering Project

**Architecture:** Frontend and Backend Separation

**Purpose:** To provide a centralized platform for coordinating basic assistance and companionship for elderly individuals.

---

*Built as an academic Software Engineering project.*
