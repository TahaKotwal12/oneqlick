from fastapi import APIRouter, HTTPException
from typing import List
from ..services.user_service import UserService
from ..schemas.user import UserCreate, UserOut

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/", response_model=List[UserOut])
def list_users():
    return UserService.get_all_users()

@router.post("/", response_model=UserOut)
def create_user(user: UserCreate):
    try:
        user_dict = user.dict()
        created_user = UserService.create_user(user_dict)
        return created_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) 