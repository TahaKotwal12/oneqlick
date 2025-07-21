from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.exc import IntegrityError
from ..models.user import User

class UserRepository:
    @staticmethod
    async def get_all(session: AsyncSession) -> List[User]:
        result = await session.execute(select(User))
        return result.scalars().all()

    @staticmethod
    async def get_by_id(session: AsyncSession, user_id) -> Optional[User]:
        result = await session.execute(select(User).where(User.user_id == user_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def get_by_email(session: AsyncSession, email: str) -> Optional[User]:
        result = await session.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    @staticmethod
    async def create(session: AsyncSession, user: User) -> User:
        session.add(user)
        try:
            await session.commit()
            await session.refresh(user)
            return user
        except IntegrityError:
            await session.rollback()
            raise

    @staticmethod
    async def update(session: AsyncSession, user: User, data: dict) -> User:
        for key, value in data.items():
            setattr(user, key, value)
        await session.commit()
        await session.refresh(user)
        return user

    @staticmethod
    async def delete(session: AsyncSession, user: User):
        await session.delete(user)
        await session.commit() 