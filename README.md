# Fitness Tracker

🌐 **Live Demo:** https://fitness-tracker-deployment-rouge.vercel.app/

A fitness tracking application with a Node.js backend, MongoDB database, and React frontend.

## **Prerequisites**

- [Docker](https://www.docker.com/get-started) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) installed
- [Node.js](https://nodejs.org/)


---

## **Setup**

1. **Clone the repository**
```bash
git clone https://github.com/Konstantin-Lozanovski/FitnessTracker.git
cd FitnessTracker
```

2. **Copy example environment files**
```bash
# Backend folder (for Node.js backend)
cp backend/.env.example backend/.env
```

> The `.env` files contain safe placeholder credentials.

---

## **Running the application**

Use Docker Compose to build and start the containers:

```bash
docker compose up --build
```
- The frontend will be available at:
```
http://localhost:5173
```

- The backend API will be available at:
```
http://localhost:5000
```
## **API Documentation**

The API is documented using Swagger.
- After starting the application, the Swagger UI is available at:

```bash
http://localhost:5000/api/docs
```
- The raw OpenAPI/Swagger specification can be accessed at:
```
http://localhost:5000/api/swagger.json
```

This documentation provides details about all available API endpoints, request parameters, and response formats.

## **Stopping the application**

To stop the backend and database containers:
```bash
docker compose down
```


---

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Containerization:** Docker, Docker Compose
- **Runtime:** Node.js
- **API Communication:** REST API