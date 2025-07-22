from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from app.infra.postgres.base import get_db
from app.domain.services.user_service import UserService
from app.api.schemas.user_schema import (
    UserCreate, 
    UserUpdate, 
    UserResponse, 
    UserListResponse, 
    UserPasswordUpdate,
    UserRole,
    UserStatus
)

router = APIRouter(prefix="/users", tags=["users"])


def get_user_service(db: Session = Depends(get_db)) -> UserService:
    """Dependency to get user service"""
    return UserService(db)


@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(
    user_data: UserCreate,
    user_service: UserService = Depends(get_user_service)
):
    """
    Create a new user
    
    - **email**: User's email address (must be unique)
    - **phone**: User's phone number (must be unique)
    - **password**: User's password (minimum 6 characters)
    - **first_name**: User's first name
    - **last_name**: User's last name
    - **role**: User's role (default: customer)
    - **profile_image**: Optional profile image URL
    """
    return user_service.create_user(user_data)


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: UUID,
    user_service: UserService = Depends(get_user_service)
):
    """
    Get user by ID
    
    - **user_id**: Unique identifier of the user
    """
    return user_service.get_user_by_id(user_id)


@router.get("/email/{email}", response_model=UserResponse)
async def get_user_by_email(
    email: str,
    user_service: UserService = Depends(get_user_service)
):
    """
    Get user by email address
    
    - **email**: User's email address
    """
    return user_service.get_user_by_email(email)


@router.get("/", response_model=UserListResponse)
async def get_users(
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, le=100, description="Number of items per page"),
    role: Optional[UserRole] = Query(None, description="Filter by user role"),
    status: Optional[UserStatus] = Query(None, description="Filter by user status"),
    search: Optional[str] = Query(None, description="Search in name, email, or phone"),
    user_service: UserService = Depends(get_user_service)
):
    """
    Get paginated list of users with optional filters
    
    - **page**: Page number (starts from 1)
    - **size**: Number of items per page (max 100)
    - **role**: Filter by user role
    - **status**: Filter by user status
    - **search**: Search term for name, email, or phone
    """
    return user_service.get_users_paginated(
        page=page,
        size=size,
        role=role,
        status=status,
        search=search
    )


@router.put("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: UUID,
    user_data: UserUpdate,
    user_service: UserService = Depends(get_user_service)
):
    """
    Update user information
    
    - **user_id**: Unique identifier of the user
    - **user_data**: Updated user information (only provided fields will be updated)
    """
    return user_service.update_user(user_id, user_data)


@router.patch("/{user_id}/password")
async def update_user_password(
    user_id: UUID,
    password_data: UserPasswordUpdate,
    user_service: UserService = Depends(get_user_service)
):
    """
    Update user password
    
    - **user_id**: Unique identifier of the user
    - **password_data**: Current and new password
    """
    return user_service.update_user_password(user_id, password_data)


@router.delete("/{user_id}")
async def delete_user(
    user_id: UUID,
    user_service: UserService = Depends(get_user_service)
):
    """
    Soft delete user (sets status to inactive)
    
    - **user_id**: Unique identifier of the user
    """
    return user_service.delete_user(user_id)


@router.delete("/{user_id}/permanent")
async def hard_delete_user(
    user_id: UUID,
    user_service: UserService = Depends(get_user_service)
):
    """
    Permanently delete user from database
    
    - **user_id**: Unique identifier of the user
    """
    return user_service.hard_delete_user(user_id)


@router.get("/role/{role}", response_model=list[UserResponse])
async def get_users_by_role(
    role: UserRole,
    limit: int = Query(100, ge=1, le=1000, description="Maximum number of users to return"),
    user_service: UserService = Depends(get_user_service)
):
    """
    Get users by role
    
    - **role**: User role to filter by
    - **limit**: Maximum number of users to return
    """
    return user_service.get_users_by_role(role, limit)


@router.get("/active/list", response_model=list[UserResponse])
async def get_active_users(
    limit: int = Query(100, ge=1, le=1000, description="Maximum number of users to return"),
    user_service: UserService = Depends(get_user_service)
):
    """
    Get all active users
    
    - **limit**: Maximum number of users to return
    """
    return user_service.get_active_users(limit)


@router.patch("/{user_id}/verify-email")
async def verify_email(
    user_id: UUID,
    user_service: UserService = Depends(get_user_service)
):
    """
    Mark user's email as verified
    
    - **user_id**: Unique identifier of the user
    """
    return user_service.update_verification_status(user_id, email_verified=True)


@router.patch("/{user_id}/verify-phone")
async def verify_phone(
    user_id: UUID,
    user_service: UserService = Depends(get_user_service)
):
    """
    Mark user's phone as verified
    
    - **user_id**: Unique identifier of the user
    """
    return user_service.update_verification_status(user_id, phone_verified=True)


@router.patch("/{user_id}/status")
async def update_user_status(
    user_id: UUID,
    status: UserStatus,
    user_service: UserService = Depends(get_user_service)
):
    """
    Update user status
    
    - **user_id**: Unique identifier of the user
    - **status**: New status for the user
    """
    return user_service.update_user(user_id, UserUpdate(status=status)) 