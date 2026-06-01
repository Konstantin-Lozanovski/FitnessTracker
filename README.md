# Fitness Tracker

A fitness tracking application with a Node.js backend, MongoDB database, and React frontend. This project is containerized using Docker for backend and database.

---

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