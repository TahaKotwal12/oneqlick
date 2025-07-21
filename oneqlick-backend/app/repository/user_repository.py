from typing import List, Dict

# Dummy in-memory user store
users = []

class UserRepository:
    @staticmethod
    def get_all() -> List[Dict]:
        return users

    @staticmethod
    def create(user_data: Dict) -> Dict:
        users.append(user_data)
        return user_data 