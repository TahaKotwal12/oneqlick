from pydantic import BaseModel, EmailStr, constr
from typing import Optional

class UserCreate(BaseModel):
    email: EmailStr
    phone: constr(regex=r"^[6-9]\d{9}$")  # Indian phone validation
    first_name: constr(min_length=1, max_length=100)
    last_name: constr(min_length=1, max_length=100)
    role: str  # Should be validated against allowed roles

class UserOut(BaseModel):
    user_id: str
    email: EmailStr
    phone: str
    first_name: str
    last_name: str
    role: str 