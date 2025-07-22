from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from app.config import DATABASE_URL  # Import from your config module

# Create the SQLAlchemy engine using the database URL from the config
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# Create a scoped session for thread-safety
SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

# Create a base class for your ORM models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 