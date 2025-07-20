from dotenv import load_dotenv
import os
from urllib.parse import quote_plus

load_dotenv()  # Load .env file

# Properly encode special characters in password
DB_PASSWORD = quote_plus(os.getenv('DB_PASSWORD', 'Taubas@123'))

# Recommended Supabase connection string with SSL
DATABASE_URL = (
    f"postgresql+psycopg2://{os.getenv('DB_USER', 'postgres')}:"
    f"{DB_PASSWORD}@{os.getenv('DB_HOST', 'db.dlgqoqptdhljptpqdoxi.supabase.co')}:"
    f"{os.getenv('DB_PORT', '5432')}/{os.getenv('DB_NAME', 'postgres')}?sslmode=require"
)

# ClickHouse configuration (if needed in future)
CLICKHOUSE_CONFIG = {
    "host": os.getenv("CLICKHOUSE_HOST", "localhost"),
    "port": int(os.getenv("CLICKHOUSE_PORT", 9000)),
    "user": os.getenv("CLICKHOUSE_USER", "default"),
    "password": os.getenv("CLICKHOUSE_PASSWORD", ""),
    "database": os.getenv("CLICKHOUSE_DATABASE", "default"),
    "query_data_limit": int(os.getenv("CLICKHOUSE_QUERY_DATA_LIMIT", 100))
}

# App environment
APP_ENV = os.getenv("APP_ENV", "development")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
TOTAL_ALLOWED_INSIGHTS = os.getenv("TOTAL_ALLOWED_INSIGHTS")
CLICKHOUSE_DATABASE = os.getenv("CLICKHOUSE_DATABASE", "ENSPECT") 