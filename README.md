# ElderEase — Senior Assistance & Companionship Platform

ElderEase is a senior assistance platform designed to help elderly people who may need support with everyday activities while their family members are living or working away from them.

The platform aims to connect families with assistance services and make it easier to arrange and manage support requests for senior citizens.

This repository currently contains the **v0.1.0 MVP backend**, developed using Java and Spring Boot.

## 1. MVP Features

### Senior Management
- Create senior profiles.
- Retrieve all senior profiles belonging to a family.
- Retrieve an individual senior profile.
- Validate senior profile information.
- Enforce family ownership checks.

### Assistance Request Management
- Create assistance requests for senior profiles.
- Retrieve all assistance requests belonging to a family.
- Retrieve individual assistance requests.
- Accept pending requests.
- Complete accepted requests.
- Cancel pending requests.
- Validate request details and scheduled dates.
- Enforce family ownership checks.

### Request Lifecycle

The MVP supports the following request lifecycle:

```text
PENDING
   |
   | Accept
   v
ACCEPTED
   |
   | Complete
   v
COMPLETED

PENDING
   |
   | Cancel
   v
CANCELLED
```

Invalid status transitions are rejected.

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Java 17 | Backend programming language |
| Spring Boot 3.3.5 | Backend framework |
| Spring Web | REST API development |
| Spring Data JPA | Database operations |
| Hibernate | ORM |
| MySQL | Relational database |
| Maven | Build and dependency management |
| JUnit 5 | Automated testing |
| Mockito | Unit testing and mocking |

## 3. Backend Architecture

The application follows a layered architecture:

```text
Client
  |
  v
Controller Layer
  |
  v
Service Layer
  |
  v
Repository Layer
  |
  v
MySQL Database
```

### Project Structure

```text
src/
├── main/
│   ├── java/com/elderease/
│   │   ├── controller/
│   │   ├── dto/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── service/
│   │   └── ElderEaseApplication.java
│   │
│   └── resources/
│       └── application.properties/
│
└── test/
    └── java/com/elderease/
        └── service/
```

## 4. Database Entities

### Senior

Stores senior profile information:

- id
- familyId
- name
- age
- address
- phone

### AssistanceRequest

Stores assistance request information:

- id
- seniorId
- familyId
- helperId
- requestType
- description
- scheduledDate
- scheduledTime
- durationMinutes
- status

## 5. REST API Documentation

Base URL:

```text
http://localhost:8080
```

### Senior Management APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/seniors` | Create senior profile |
| GET | `/api/seniors?familyId=7` | Get family seniors |
| GET | `/api/seniors/{seniorId}?familyId=7` | Get individual senior |

### Assistance Request APIs

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/requests?familyId=7` | Create assistance request |
| GET | `/api/requests?familyId=7` | Get family requests |
| GET | `/api/requests/{requestId}?familyId=7` | Get individual request |
| PATCH | `/api/requests/{requestId}/accept?familyId=7` | Accept request |
| PATCH | `/api/requests/{requestId}/complete?familyId=7` | Complete request |
| PATCH | `/api/requests/{requestId}/cancel?familyId=7` | Cancel request |

### Example: Create Assistance Request

**POST**

```text
http://localhost:8080/api/requests?familyId=7
```

Request JSON:

```json
{
  "seniorId": 1,
  "requestType": "GROCERY",
  "description": "Purchase essential groceries",
  "scheduledDate": "2026-12-10",
  "scheduledTime": "10:00:00",
  "durationMinutes": 60
}
```

## 6. Requirements

- Java 17 or later
- Maven 3.8 or later
- MySQL 8 or later
- IntelliJ IDEA or another Java IDE
- Postman for API testing

## 7. Installation and Setup

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Step 2: Navigate to the backend

```bash
cd elderEase-backend
```

### Step 3: Create the MySQL database

```sql
CREATE DATABASE elderease;
```

### Step 4: Configure database connection

Open:

```text
src/main/resources/application.properties
```

Configure your local MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/elderease
spring.datasource.username=root
spring.datasource.password=YOUR_LOCAL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

server.port=8080
```

**Important:** Do not commit your actual database password or other secrets to GitHub.

### Step 5: Run the application

```bash
mvn spring-boot:run
```

The backend will start at:

```text
http://localhost:8080
```

## 8. Testing

### Run automated tests

```bash
mvn test
```

The test suites use JUnit 5 and Mockito to verify service-layer functionality, including:

- Senior management operations.
- Assistance request creation and validation.
- Family ownership checks.
- Request retrieval.
- Request lifecycle transitions.
- Invalid status transition handling.

### Manual API testing

The REST endpoints were manually tested using Postman.

Testing covers successful operations, invalid inputs, access restrictions, missing resources, and invalid request transitions.

## 9. Current Limitations

This is an MVP prototype and is not production-ready.

- Spring Security authentication is not implemented yet.
- JWT-based authorization is planned for V1.
- The `familyId` is temporarily accepted as a request parameter for testing purposes.
- This temporary approach does not provide secure authentication or authorization.
- Helper management and availability are not implemented.
- Admin functionality is not implemented.
- React frontend integration is planned for a future version.
- Notifications and visit reports are not implemented.

## 10. Development Roadmap

| Version | Planned Scope |
|---|---|
| v0.1.0 — MVP | Senior management, assistance requests, MySQL persistence, testing |
| v1.0.0 | Spring Security, JWT, registration, login, role-based authorization, helper management, React integration |
| v2.0.0 | Admin dashboard, helper verification, visit reports, notifications, request history and reliability improvements |

## 11. Version Documentation

Detailed release documentation is maintained in:

```text
docs/
└── versions/
    └── v0.1.0-MVP.md
```

## 12. Current Release

**Project:** ElderEase — Senior Assistance & Companionship Platform

**Version:** v0.1.0

**Release Type:** Minimum Viable Product (MVP)

**Status:** Core backend implementation and testing completed.

**Next Release:** v1.0.0 — Authentication and Authorization
