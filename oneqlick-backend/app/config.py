from dotenv import load_dotenv
import os

load_dotenv()  # Load .env file

DATABASE_URL = os.getenv('DATABASE_URL')
APP_ENV = os.getenv("APP_ENV", "development")
