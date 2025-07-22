from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql+psycopg://postgres:postgres@localhost:5432/core_db')

CLICKHOUSE_CONFIG = {
    "host": os.getenv("CLICKHOUSE_HOST", "localhost"),
    "port": int(os.getenv("CLICKHOUSE_PORT", 9000)),
    "user": os.getenv("CLICKHOUSE_USER", "default"),
    "password": os.getenv("CLICKHOUSE_PASSWORD", ""),
    "database": os.getenv("CLICKHOUSE_DATABASE", "default"),
    "query_data_limit": int(os.getenv("CLICKHOUSE_QUERY_DATA_LIMIT", 100))
}
APP_ENV = os.getenv("APP_ENV", "development")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

TOTAL_ALLOWED_INSIGHTS=os.getenv("TOTAL_ALLOWED_INSIGHTS")
CLICKHOUSE_DATABASE = os.getenv("CLICKHOUSE_DATABASE", "ENSPECT")