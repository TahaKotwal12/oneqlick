from typing import List, Dict, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from ..repository.user_repository import UserRepository
from ..models.user import User, UserRole, UserStatus
import uuid

class UserService:
    @staticmethod
    async def get_all_users(session: AsyncSession) -> List[User]:
        return await UserRepository.get_all(session)

    @staticmethod
    async def get_user_by_id(session: AsyncSession, user_id: str) -> Optional[User]:
        return await UserRepository.get_by_id(session, user_id)

    @staticmethod
    async def get_user_by_email(session: AsyncSession, email: str) -> Optional[User]:
        return await UserRepository.get_by_email(session, email)

    @staticmethod
    async def create_user(session: AsyncSession, user_data: Dict) -> User:
        # Check for duplicate email or phone
        if await UserRepository.get_by_email(session, user_data["email"]):
            raise ValueError("Email already exists")
        # You may want to add phone check as well
        user = User(
            user_id=uuid.uuid4(),
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
            created_at=user_data.get("created_at"),
            updated_at=user_data.get("updated_at"),
        )
        return await UserRepository.create(session, user)

    @staticmethod
    async def update_user(session: AsyncSession, user: User, data: dict) -> User:
        return await UserRepository.update(session, user, data)

    @staticmethod
    async def delete_user(session: AsyncSession, user: User):
        await UserRepository.delete(session, user) 