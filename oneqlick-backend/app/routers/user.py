from fastapi import APIRouter, HTTPException, Depends, status
from typing import List
from sqlalchemy.orm import Session
from ..services.user_service import UserService
from ..schemas.user import UserCreate, UserOut
from ..db import get_db
from ..models.user import User as UserModel

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    users = UserService.get_all_users(db)
    return users

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: str, db: Session = Depends(get_db)):
    user = UserService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        user_dict = user.dict()
        created_user = UserService.create_user(db, user_dict)
        return created_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: str, user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserService.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    updated_user = UserService.update_user(db, db_user, user.dict())
    return updated_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: str, db: Session = Depends(get_db)):
    db_user = UserService.get_user_by_id(db, user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    UserService.delete_user(db, db_user)
    return None 