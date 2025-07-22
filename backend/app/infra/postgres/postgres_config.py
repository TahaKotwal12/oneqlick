from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.pool import QueuePool
from app.config.config import DATABASE_URL 

engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=10,           # Max connections in pool
    max_overflow=20,        # Extra connections beyond pool_size
    pool_timeout=30,        # Timeout for acquiring a connection
    pool_pre_ping=True,     # Test connection before use
)

SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
