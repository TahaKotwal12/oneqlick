# OneQlick Backend

## Running the FastAPI App

1. Install Poetry if not already installed:
   ```bash
   pip install poetry
   ```

2. Install dependencies:
   ```bash
   poetry install
   ```

3. Run the FastAPI app with Uvicorn:
   ```bash
   poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

## Database Configuration

Set your PostgreSQL connection string as an environment variable:

```
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.dlgqoqptdhljptpqdoxi.supabase.co:5432/postgres
```

Replace `[YOUR-PASSWORD]` with your actual password.
