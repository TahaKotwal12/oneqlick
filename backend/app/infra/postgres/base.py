from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from app.config.config import DATABASE_URL  # Import from your config module

# Create a base class for your ORM models
Base = declarative_base()

# Import all models to ensure they are registered with Base
from .models.user import User  # This ensures the User table is created

# Initialize engine and session as None initially
engine = None
SessionLocal = None


def get_engine():
    """Get or create the database engine"""
    global engine
    if engine is None:
        try:
            # Handle SQLite vs PostgreSQL
            if DATABASE_URL.startswith('sqlite'):
                engine = create_engine(
                    DATABASE_URL, 
                    connect_args={"check_same_thread": False},
                    pool_pre_ping=True, 
                    echo=False
                )
            else:
                engine = create_engine(DATABASE_URL, pool_pre_ping=True, echo=False)
            
            # Create tables if they don't exist
            Base.metadata.create_all(bind=engine)
            print("✅ Database connection established successfully")
        except Exception as e:
            print(f"❌ Error connecting to database: {e}")
            raise e
    return engine


def get_session_local():
    """Get or create the session local"""
    global SessionLocal
    if SessionLocal is None:
        SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=get_engine()))
    return SessionLocal


def get_db():
    """Dependency to get database session"""
    db = get_session_local()()
    try:
        yield db
    finally:
        db.close()
