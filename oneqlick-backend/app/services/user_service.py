from typing import List, Dict
from pydantic import EmailStr
from ..repository.user_repository import UserRepository
import uuid

class UserService:
    @staticmethod
    def get_all_users() -> List[Dict]:
        return UserRepository.get_all()

    @staticmethod
    def create_user(user_data: Dict) -> Dict:
        # Check for duplicate email or phone
        for u in UserRepository.get_all():
            if u["email"] == user_data["email"]:
                raise ValueError("Email already exists")
            if u["phone"] == user_data["phone"]:
                raise ValueError("Phone already exists")
        user_id = str(uuid.uuid4())
        user_data["user_id"] = user_id
        return UserRepository.create(user_data) 