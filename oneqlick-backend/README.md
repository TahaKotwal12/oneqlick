# oneQlick Backend

This is the backend for oneQlick, built with FastAPI and PostgreSQL.

## Project Structure

- `app/api/` — API routers
- `app/core/` — Core settings, config, security
- `app/db/` — Database models and migrations
- `app/models/` — ORM models
- `app/schemas/` — Pydantic schemas
- `app/services/` — Business logic
- `app/utils/` — Utility functions
- `app/main.py` — FastAPI entrypoint
- `alembic/` — Database migrations
- `tests/` — Backend tests

## Getting Started

1. Create a virtual environment and activate it:
   ```sh
   python3 -m venv venv
   source venv/bin/activate
   ```
2. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Copy `.env.example` to `.env` and set your environment variables.
4. Run the app:
   ```sh
   uvicorn app.main:app --reload
   ```

---

For more details, see the main project README.
