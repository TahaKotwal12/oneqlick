from pydantic import BaseModel, EmailStr
from uuid import UUID
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    customer = 'customer'
    admin = 'admin'
    delivery_partner = 'delivery_partner'
    restaurant_owner = 'restaurant_owner'

class UserStatus(str, Enum):
    active = 'active'
    inactive = 'inactive'
    suspended = 'suspended'

class UserResponse(BaseModel):
    user_id: UUID
    email: EmailStr
    phone: str
    first_name: str
    last_name: str
    role: UserRole
    status: UserStatus
    profile_image: Optional[str] = None
    email_verified: bool
    phone_verified: bool
    created_at: Optional[str]
    updated_at: Optional[str]

    class Config:
        orm_mode = True 