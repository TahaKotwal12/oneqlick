from typing import Optional, List, Tuple
from uuid import UUID
from sqlalchemy.orm import Session
from app.infra.postgres.repositories.user_repository import UserRepository
from app.api.schemas.user_schema import UserCreate, UserUpdate, UserPasswordUpdate, UserListResponse
from app.infra.postgres.models.user import UserRole, UserStatus
from fastapi import HTTPException


class UserService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repository = UserRepository(db)

    def create_user(self, user_data: UserCreate):
        """Create a new user"""
        try:
            user = self.user_repository.create_user(user_data)
            return user
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to create user")

    def get_user_by_id(self, user_id: UUID):
        """Get user by ID"""
        user = self.user_repository.get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def get_user_by_email(self, email: str):
        """Get user by email"""
        user = self.user_repository.get_user_by_email(email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def get_users_paginated(
        self,
        page: int = 1,
        size: int = 10,
        role: Optional[UserRole] = None,
        status: Optional[UserStatus] = None,
        search: Optional[str] = None
    ) -> UserListResponse:
        """Get paginated users with filters"""
        # Calculate skip value for pagination
        skip = (page - 1) * size

        try:
            users, total = self.user_repository.get_users_paginated(
                skip=skip,
                limit=size,
                role=role,
                status=status,
                search=search
            )

            # Calculate total pages
            total_pages = (total + size - 1) // size

            return UserListResponse(
                users=users,
                total=total,
                page=page,
                size=size,
                total_pages=total_pages
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to fetch users")

    def update_user(self, user_id: UUID, user_data: UserUpdate):
        """Update user information"""
        try:
            user = self.user_repository.update_user(user_id, user_data)
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            return user
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to update user")

    def update_user_password(self, user_id: UUID, password_data: UserPasswordUpdate):
        """Update user password"""
        try:
            success = self.user_repository.update_user_password(
                user_id, 
                password_data.current_password, 
                password_data.new_password
            )
            if not success:
                raise HTTPException(status_code=404, detail="User not found")
            return {"message": "Password updated successfully"}
        except ValueError as e:
            raise HTTPException(status_code=400, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to update password")

    def delete_user(self, user_id: UUID):
        """Soft delete user"""
        success = self.user_repository.delete_user(user_id)
        if not success:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "User deleted successfully"}

    def hard_delete_user(self, user_id: UUID):
        """Permanently delete user"""
        success = self.user_repository.hard_delete_user(user_id)
        if not success:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": "User permanently deleted"}

    def verify_user_credentials(self, email: str, password: str):
        """Verify user credentials for login"""
        user = self.user_repository.verify_user_credentials(email, password)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        return user

    def update_verification_status(
        self, 
        user_id: UUID, 
        email_verified: bool = None, 
        phone_verified: bool = None
    ):
        """Update email or phone verification status"""
        user = self.user_repository.update_verification_status(
            user_id, email_verified, phone_verified
        )
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    def get_users_by_role(self, role: UserRole, limit: int = 100):
        """Get users by role"""
        try:
            users, _ = self.user_repository.get_users_paginated(
                skip=0, limit=limit, role=role
            )
            return users
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to fetch users")

    def get_active_users(self, limit: int = 100):
        """Get active users"""
        try:
            users, _ = self.user_repository.get_users_paginated(
                skip=0, limit=limit, status=UserStatus.active
            )
            return users
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to fetch users") 