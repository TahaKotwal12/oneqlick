from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import Optional, List, Tuple
from uuid import UUID
import uuid
from ..models.user import User, UserRole, UserStatus
from app.api.schemas.user_schema import UserCreate, UserUpdate
import bcrypt


class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user_data: UserCreate) -> User:
        """Create a new user with hashed password"""
        # Check if user already exists
        existing_user = self.get_user_by_email_or_phone(user_data.email, user_data.phone)
        if existing_user:
            raise ValueError("User with this email or phone already exists")

        # Hash the password
        password_hash = bcrypt.hashpw(user_data.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

        # Create user object
        db_user = User(
            user_id=uuid.uuid4(),
            email=user_data.email,
            phone=user_data.phone,
            password_hash=password_hash,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            role=user_data.role,
            profile_image=user_data.profile_image
        )

        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        """Get user by ID"""
        return self.db.query(User).filter(User.user_id == user_id).first()

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email"""
        return self.db.query(User).filter(User.email == email).first()

    def get_user_by_phone(self, phone: str) -> Optional[User]:
        """Get user by phone"""
        return self.db.query(User).filter(User.phone == phone).first()

    def get_user_by_email_or_phone(self, email: str, phone: str) -> Optional[User]:
        """Get user by email or phone"""
        return self.db.query(User).filter(
            or_(User.email == email, User.phone == phone)
        ).first()

    def get_users_paginated(
        self, 
        skip: int = 0, 
        limit: int = 10, 
        role: Optional[UserRole] = None,
        status: Optional[UserStatus] = None,
        search: Optional[str] = None
    ) -> Tuple[List[User], int]:
        """Get paginated users with optional filters"""
        query = self.db.query(User)

        # Apply filters
        if role:
            query = query.filter(User.role == role)
        if status:
            query = query.filter(User.status == status)
        if search:
            search_filter = or_(
                User.first_name.ilike(f"%{search}%"),
                User.last_name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%"),
                User.phone.ilike(f"%{search}%")
            )
            query = query.filter(search_filter)

        # Get total count
        total = query.count()

        # Apply pagination
        users = query.offset(skip).limit(limit).all()

        return users, total

    def update_user(self, user_id: UUID, user_data: UserUpdate) -> Optional[User]:
        """Update user information"""
        user = self.get_user_by_id(user_id)
        if not user:
            return None

        # Check for unique constraints if email or phone is being updated
        if user_data.email and user_data.email != user.email:
            existing_user = self.get_user_by_email(user_data.email)
            if existing_user:
                raise ValueError("Email already exists")

        if user_data.phone and user_data.phone != user.phone:
            existing_user = self.get_user_by_phone(user_data.phone)
            if existing_user:
                raise ValueError("Phone number already exists")

        # Update fields
        update_data = user_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)

        self.db.commit()
        self.db.refresh(user)
        return user

    def update_user_password(self, user_id: UUID, current_password: str, new_password: str) -> bool:
        """Update user password"""
        user = self.get_user_by_id(user_id)
        if not user:
            return False

        # Verify current password
        if not bcrypt.checkpw(current_password.encode('utf-8'), user.password_hash.encode('utf-8')):
            raise ValueError("Current password is incorrect")

        # Hash new password
        new_password_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        user.password_hash = new_password_hash

        self.db.commit()
        return True

    def delete_user(self, user_id: UUID) -> bool:
        """Soft delete user by setting status to inactive"""
        user = self.get_user_by_id(user_id)
        if not user:
            return False

        user.status = UserStatus.inactive
        self.db.commit()
        return True

    def hard_delete_user(self, user_id: UUID) -> bool:
        """Permanently delete user from database"""
        user = self.get_user_by_id(user_id)
        if not user:
            return False

        self.db.delete(user)
        self.db.commit()
        return True

    def verify_user_credentials(self, email: str, password: str) -> Optional[User]:
        """Verify user credentials for login"""
        user = self.get_user_by_email(email)
        if not user:
            return None

        if bcrypt.checkpw(password.encode('utf-8'), user.password_hash.encode('utf-8')):
            return user
        return None

    def update_verification_status(self, user_id: UUID, email_verified: bool = None, phone_verified: bool = None) -> Optional[User]:
        """Update email or phone verification status"""
        user = self.get_user_by_id(user_id)
        if not user:
            return None

        if email_verified is not None:
            user.email_verified = email_verified
        if phone_verified is not None:
            user.phone_verified = phone_verified

        self.db.commit()
        self.db.refresh(user)
        return user 