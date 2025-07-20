from pydantic import BaseModel, EmailStr, constr
from typing import Optional
from uuid import UUID
import enum

class UserRole(str, enum.Enum):
    customer = 'customer'
    admin = 'admin'
    delivery_partner = 'delivery_partner'
    restaurant_owner = 'restaurant_owner'

class UserStatus(str, enum.Enum):
    active = 'active'
    inactive = 'inactive'
    suspended = 'suspended'

class UserBase(BaseModel):
    email: EmailStr
    phone: constr(max_length=20)
    first_name: str
    last_name: str
    role: UserRole
    status: Optional[UserStatus] = UserStatus.active
    profile_image: Optional[str] = None
    email_verified: Optional[bool] = False
    phone_verified: Optional[bool] = False

class UserCreate(UserBase):
    password: str

class UserRead(UserBase):
    user_id: UUID
    created_at: Optional[str]
    updated_at: Optional[str]

    class Config:
        orm_mode = True 