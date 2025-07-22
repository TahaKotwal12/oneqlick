# main.py

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app.infra.postgres.base import SessionLocal
from app.infra.postgres.models.user import User
from app.api.schemas.user_schema import UserResponse
from uuid import UUID


app = FastAPI(title="OneQlick API")

# Add your endpoints here


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: UUID, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.user_id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
