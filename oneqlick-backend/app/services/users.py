from sqlalchemy.orm import Session
from app.models.users import User
from app.schemas.users import UserCreate
import uuid

def get_users(db: Session):
    return db.query(User).all()

def create_user(db: Session, user: UserCreate):
    db_user = User(
        user_id=uuid.uuid4(),
        email=user.email,
        phone=user.phone,
        password_hash=user.password,  # TODO: hash password
        first_name=user.first_name,
        last_name=user.last_name,
        role=user.role,
        status=user.status,
        profile_image=user.profile_image,
        email_verified=user.email_verified,
        phone_verified=user.phone_verified
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user 