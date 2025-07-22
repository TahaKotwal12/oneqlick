#!/usr/bin/env python3
"""
Simple test script to verify User CRUD functionality
Run this script to test the basic User operations
"""

import requests
import json
from uuid import UUID

# Base URL for the API
BASE_URL = "http://localhost:8000"

def test_user_crud():
    """Test basic User CRUD operations"""
    
    print("🧪 Testing OneQlick User CRUD Operations")
    print("=" * 50)
    
    # Test data
    test_user = {
        "email": "test@example.com",
        "phone": "9876543210",
        "password": "testpassword123",
        "first_name": "John",
        "last_name": "Doe",
        "role": "customer",
        "profile_image": "https://example.com/profile.jpg"
    }
    
    user_id = None
    
    try:
        # 1. Test Create User
        print("\n1️⃣ Testing Create User...")
        response = requests.post(f"{BASE_URL}/users/", json=test_user)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 201:
            user_data = response.json()
            user_id = user_data["user_id"]
            print(f"✅ User created successfully with ID: {user_id}")
            print(f"   Email: {user_data['email']}")
            print(f"   Name: {user_data['first_name']} {user_data['last_name']}")
        else:
            print(f"❌ Failed to create user: {response.text}")
            return
        
        # 2. Test Get User by ID
        print("\n2️⃣ Testing Get User by ID...")
        response = requests.get(f"{BASE_URL}/users/{user_id}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ User retrieved successfully")
            print(f"   Email: {user_data['email']}")
            print(f"   Status: {user_data['status']}")
        else:
            print(f"❌ Failed to get user: {response.text}")
        
        # 3. Test Get User by Email
        print("\n3️⃣ Testing Get User by Email...")
        response = requests.get(f"{BASE_URL}/users/email/{test_user['email']}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ User retrieved by email successfully")
            print(f"   Phone: {user_data['phone']}")
        else:
            print(f"❌ Failed to get user by email: {response.text}")
        
        # 4. Test Update User
        print("\n4️⃣ Testing Update User...")
        update_data = {
            "first_name": "Jane",
            "last_name": "Smith"
        }
        response = requests.put(f"{BASE_URL}/users/{user_id}", json=update_data)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ User updated successfully")
            print(f"   New Name: {user_data['first_name']} {user_data['last_name']}")
        else:
            print(f"❌ Failed to update user: {response.text}")
        
        # 5. Test Get Users List
        print("\n5️⃣ Testing Get Users List...")
        response = requests.get(f"{BASE_URL}/users/")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            users_data = response.json()
            print(f"✅ Users list retrieved successfully")
            print(f"   Total Users: {users_data['total']}")
            print(f"   Page: {users_data['page']}")
            print(f"   Users in this page: {len(users_data['users'])}")
        else:
            print(f"❌ Failed to get users list: {response.text}")
        
        # 6. Test Get Users by Role
        print("\n6️⃣ Testing Get Users by Role...")
        response = requests.get(f"{BASE_URL}/users/role/customer")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            users = response.json()
            print(f"✅ Users by role retrieved successfully")
            print(f"   Customer users found: {len(users)}")
        else:
            print(f"❌ Failed to get users by role: {response.text}")
        
        # 7. Test Update Password
        print("\n7️⃣ Testing Update Password...")
        password_data = {
            "current_password": "testpassword123",
            "new_password": "newpassword123"
        }
        response = requests.patch(f"{BASE_URL}/users/{user_id}/password", json=password_data)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Password updated successfully")
            print(f"   Message: {result['message']}")
        else:
            print(f"❌ Failed to update password: {response.text}")
        
        # 8. Test Verify Email
        print("\n8️⃣ Testing Verify Email...")
        response = requests.patch(f"{BASE_URL}/users/{user_id}/verify-email")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ Email verified successfully")
            print(f"   Email Verified: {user_data['email_verified']}")
        else:
            print(f"❌ Failed to verify email: {response.text}")
        
        # 9. Test Verify Phone
        print("\n9️⃣ Testing Verify Phone...")
        response = requests.patch(f"{BASE_URL}/users/{user_id}/verify-phone")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ Phone verified successfully")
            print(f"   Phone Verified: {user_data['phone_verified']}")
        else:
            print(f"❌ Failed to verify phone: {response.text}")
        
        # 10. Test Soft Delete User
        print("\n🔟 Testing Soft Delete User...")
        response = requests.delete(f"{BASE_URL}/users/{user_id}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ User soft deleted successfully")
            print(f"   Message: {result['message']}")
        else:
            print(f"❌ Failed to delete user: {response.text}")
        
        # 11. Verify user is inactive
        print("\n1️⃣1️⃣ Verifying user is inactive...")
        response = requests.get(f"{BASE_URL}/users/{user_id}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            user_data = response.json()
            print(f"✅ User status verified")
            print(f"   Status: {user_data['status']}")
        else:
            print(f"❌ Failed to verify user status: {response.text}")
        
        print("\n" + "=" * 50)
        print("🎉 All tests completed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the server is running on http://localhost:8000")
        print("   Run: uvicorn app.main:app --reload")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")

if __name__ == "__main__":
    test_user_crud() 