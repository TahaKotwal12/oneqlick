from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.schemas.users import UserRead, UserCreate
from app.services.users import get_users, create_user
from typing import List

router = APIRouter()

@router.get('/users', response_model=List[UserRead])
def read_users(db: Session = Depends(get_db)):
    return get_users(db)

@router.post('/users', response_model=UserRead)
def add_user(user: UserCreate, db: Session = Depends(get_db)):
    # Optionally check for existing user by email/phone here
    return create_user(db, user) 
