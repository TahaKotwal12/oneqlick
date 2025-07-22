from pydantic import BaseModel, EmailStr, validator, ConfigDict
from uuid import UUID
from typing import Optional, List
from enum import Enum
from datetime import datetime

class UserRole(str, Enum):
    customer = 'customer'
    admin = 'admin'
    delivery_partner = 'delivery_partner'
    restaurant_owner = 'restaurant_owner'

class UserStatus(str, Enum):
    active = 'active'
    inactive = 'inactive'
    suspended = 'suspended'

class UserCreate(BaseModel):
    email: EmailStr
    phone: str
    password: str
    first_name: str
    last_name: str
    role: UserRole = UserRole.customer
    profile_image: Optional[str] = None

    @validator('phone')
    def validate_phone(cls, v):
        if not v or len(v) < 10:
            raise ValueError('Phone number must be at least 10 digits')
        return v

    @validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return v

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    role: Optional[UserRole] = None
    status: Optional[UserStatus] = None
    profile_image: Optional[str] = None

    @validator('phone')
    def validate_phone(cls, v):
        if v is not None and (not v or len(v) < 10):
            raise ValueError('Phone number must be at least 10 digits')
        return v

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
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)

class UserListResponse(BaseModel):
    users: List[UserResponse]
    total: int
    page: int
    size: int
    total_pages: int

class UserPasswordUpdate(BaseModel):
    current_password: str
    new_password: str

    @validator('new_password')
    def validate_new_password(cls, v):
        if len(v) < 6:
            raise ValueError('Password must be at least 6 characters long')
        return v 