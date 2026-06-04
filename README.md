# Wanderlust Server

The REST API backend for the [Wanderlust](https://github.com/erpranto55/Wanderlust) travel platform. Built with Express.js and MongoDB, deployed as a serverless application on Vercel.

[![Express.js](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

**Live API:** [https://wanderlust-server-puce-five.vercel.app](https://wanderlust-server-puce-five.vercel.app)  
**Client Repo:** [Wanderlust](https://github.com/erpranto55/Wanderlust)

---

## About

This is the standalone backend server for Wanderlust. It handles all data operations — destinations, bookings, reviews — and exposes a JSON REST API consumed by the Next.js frontend. Authentication tokens are verified using `jose-cjs` (JWT). The server is deployed serverlessly on Vercel via `vercel.json`.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5.x
- **Database:** MongoDB 7.x (via MongoDB Atlas)
- **Auth:** jose-cjs (JWT verification)
- **Other:** cors, dotenv, vercel (serverless adapter)

---

## Directory Structure

```
Wanderlust-server/
├── index.js          # Entry point — Express app, routes, DB connection
├── vercel.json       # Vercel serverless config
├── package.json
├── .env              # Environment variables (not committed)
└── .gitignore
```

---

## API Endpoints

All responses are JSON. Protected routes require a valid `Authorization: Bearer <token>` header.

| Method | Endpoint                  | Auth | Description                       |
| ------ | ------------------------- | ---- | --------------------------------- |
| GET    | `/`                       | No   | Health check                      |
| GET    | `/destinations`           | No   | Get all destinations              |
| GET    | `/destinations/:id`       | No   | Get a single destination          |
| POST   | `/destinations`           | Yes  | Add a new destination             |
| PUT    | `/destinations/:id`       | Yes  | Update a destination              |
| DELETE | `/destinations/:id`       | Yes  | Delete a destination              |
| GET    | `/bookings`               | Yes  | Get bookings for the current user |
| POST   | `/bookings`               | Yes  | Create a new booking              |
| DELETE | `/bookings/:id`           | Yes  | Cancel a booking                  |
| GET    | `/reviews/:destinationId` | No   | Get reviews for a destination     |
| POST   | `/reviews/:destinationId` | Yes  | Post a review                     |

> **Note:** Exact routes are defined in `index.js`. Update this table if endpoints change.

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/erpranto55/Wanderlust-server.git
cd Wanderlust-server

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env   # then fill in your values

# 4. Start the server
node index.js
```

The server will be available at `http://localhost:5000` (or whichever port you configure).

---

## Environment Variables

Create a `.env` file in the project root. **Never commit this file.**

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority

# Port to run the server on locally
PORT=5000

# JWT secret for signing and verifying tokens
JWT_SECRET=your_jwt_secret_here

# Allowed origin for CORS (your frontend URL)
CLIENT_URL=http://localhost:3000
```

For production on Vercel, add these same keys under **Settings → Environment Variables** in your Vercel project dashboard.

---

## Deployment

This server is configured for serverless deployment on Vercel using `vercel.json`. To deploy:

```bash
npm install -g vercel
vercel
```

Follow the prompts. Set environment variables in the Vercel dashboard before going live.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push and open a Pull Request against `main`

---

