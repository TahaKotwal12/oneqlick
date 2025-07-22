from typing import List, Dict, Optional
from sqlalchemy.orm import Session
from ..repository.user_repository import UserRepository
from ..models.user import User, UserRole, UserStatus

class UserService:
    @staticmethod
    def get_all_users(session: Session) -> List[User]:
        return UserRepository.get_all(session)

    @staticmethod
    def get_user_by_id(session: Session, user_id: str) -> Optional[User]:
        return UserRepository.get_by_id(session, user_id)

    @staticmethod
    def get_user_by_email(session: Session, email: str) -> Optional[User]:
        return UserRepository.get_by_email(session, email)

    @staticmethod
    def create_user(session: Session, user_data: Dict) -> User:
        # Check for duplicate email or phone
        if UserRepository.get_by_email(session, user_data["email"]):
            raise ValueError("Email already exists")
        # You may want to add phone check as well
        user = User(
            email=user_data["email"],
            phone=user_data["phone"],
            password_hash=user_data.get("password_hash", ""),
            first_name=user_data["first_name"],
            last_name=user_data["last_name"],
            role=user_data["role"],
            status=UserStatus.active,
            profile_image=user_data.get("profile_image"),
            email_verified=False,
            phone_verified=False,
        )
        return UserRepository.create(session, user)

    @staticmethod
    def update_user(session: Session, user: User, data: dict) -> User:
        return UserRepository.update(session, user, data)

    @staticmethod
    def delete_user(session: Session, user: User):
        UserRepository.delete(session, user) 