# CCIS Project Management System

A Web-Based Project Management System for Faculty Workflow Coordination in the College of Computing and Information Sciences.

Includes an integrated Capstone/Thesis Student–Teacher Consultation Appointment subsystem.

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL 16 |
| Auth | JWT, bcrypt, RBAC |
| Migrations | node-pg-migrate |
| CI | GitHub Actions |
| Containerization | Docker Compose (development database) |

## Project Structure

```
├── client/                 React + TypeScript frontend (Vite)
│   ├── src/
│   │   ├── api/            Axios HTTP client
│   │   ├── components/     Reusable UI components
│   │   ├── contexts/       React contexts (Auth)
│   │   ├── hooks/          Custom hooks
│   │   ├── pages/          Page components (one per route)
│   │   ├── types/          Shared TypeScript types
│   │   └── utils/          Helper functions
│   └── ...
│
├── server/                 Express + TypeScript backend
│   ├── src/
│   │   ├── config/         Database & environment config
│   │   ├── middleware/     Auth, RBAC, validation, error handling
│   │   └── modules/       Feature modules (auth, users, ...)
│   ├── tests/             Unit & integration tests
│   └── ...
│
├── database/
│   └── migrations/         SQL migration files (node-pg-migrate)
│
├── .github/workflows/      CI configuration
├── docker-compose.yml      Development PostgreSQL container
└── DEVELOPMENT.md          Git workflow & conventions
```

## Prerequisites

- **Node.js** ≥ 22 LTS
- **npm** ≥ 10
- **PostgreSQL 16** — via one of:
  - Docker Desktop (recommended): `docker-compose up -d`
  - Local installation: [postgresql.org/download](https://www.postgresql.org/download/)

## Installation

```bash
# Clone the repository
git clone https://github.com/schvmq/CCIS-Project-Management-System.git
cd "CCIS Project Mangement System"

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

## Environment Variables

Copy the example env files and fill in the values:

```bash
# Root (for Docker Compose)
cp .env.example .env

# Server
cp server/.env.example server/.env

# Client
cp client/.env.example client/.env
```

### Server `.env`

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://ccis_admin:ccis_dev_password@localhost:5432/ccis_pms` |
| `JWT_SECRET` | JWT signing secret | (must set) |
| `JWT_EXPIRES_IN` | JWT expiration duration | `7d` |
| `PORT` | Server port | `5000` |
| `CLIENT_URL` | Frontend URL (for CORS) | `http://localhost:5173` |
| `NODE_ENV` | Environment | `development` |

## Database Setup

### Option A: Docker (recommended)

```bash
# Start PostgreSQL container
docker-compose up -d

# Verify it's running
docker ps
```

### Option B: Local PostgreSQL

1. Install PostgreSQL 16
2. Create a database: `CREATE DATABASE ccis_pms;`
3. Create a user or use the default
4. Update `DATABASE_URL` in `server/.env`

### Run Migrations

```bash
cd server
npm run migrate:up
```

## How to Run

### Start the backend

```bash
cd server
npm run dev
# API: http://localhost:5000
# Health check: http://localhost:5000/api/health
```

### Start the frontend

```bash
cd client
npm run dev
# App: http://localhost:5173
```

### Run tests

```bash
# Server tests
cd server
npm test

# Client lint
cd client
npm run lint
```

## Git Workflow

See [DEVELOPMENT.md](DEVELOPMENT.md) for full details.

```
main              ← stable, always deployable
feature/<name>    ← development work
fix/<name>        ← bug fixes
```

1. Create a feature branch: `git checkout -b feature/name`
2. Develop, commit using conventional commits (`feat:`, `fix:`, `refactor:`, etc.)
3. Push and open a Pull Request
4. Partner reviews → merge into `main`
