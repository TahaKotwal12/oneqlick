from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from ..models.user import User

class UserRepository:
    @staticmethod
    def get_all(session: Session) -> List[User]:
        return session.execute(select(User)).scalars().all()

    @staticmethod
    def get_by_id(session: Session, user_id: str) -> Optional[User]:
        return session.execute(select(User).where(User.user_id == user_id)).scalar_one_or_none()

    @staticmethod
    def get_by_email(session: Session, email: str) -> Optional[User]:
        return session.execute(select(User).where(User.email == email)).scalar_one_or_none()

    @staticmethod
    def create(session: Session, user: User) -> User:
        session.add(user)
        try:
            session.commit()
            session.refresh(user)
            return user
        except IntegrityError:
            session.rollback()
            raise

    @staticmethod
    def update(session: Session, user: User, data: dict) -> User:
        for key, value in data.items():
            setattr(user, key, value)
        session.commit()
        session.refresh(user)
        return user

    @staticmethod
    def delete(session: Session, user: User):
        session.delete(user)
        session.commit() 