# oneQlick

A production-ready food delivery platform for rural areas.

## Tech Stack
- **Frontend (User & Partner Apps):** React Native (Expo) with TypeScript
- **Backend:** FastAPI (Python) with PostgreSQL

## Project Structure

```
oneqlick/
├── oneqlick-user-app/         # User mobile app (Expo, TypeScript)
├── oneqlick-partner-app/      # Restaurant/Partner mobile app (Expo, TypeScript)
├── oneqlick-backend/          # FastAPI backend
└── README.md                  # Main project README
```

### oneqlick-user-app
- Modular structure under `src/features/`
- See [oneqlick-user-app/README.md](oneqlick-user-app/README.md)

### oneqlick-partner-app
- Modular structure under `src/features/`
- See [oneqlick-partner-app/README.md](oneqlick-partner-app/README.md)

### oneqlick-backend
- Modular FastAPI backend
- See [oneqlick-backend/README.md](oneqlick-backend/README.md)

---

## Getting Started

See the README in each subproject for setup instructions.

---

## Production Readiness
- Modular, scalable codebase
- Environment variable support
- Docker-ready backend
- Ready for CI/CD integration