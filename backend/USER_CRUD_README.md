# OneQlick User CRUD API

This document describes the complete User CRUD (Create, Read, Update, Delete) functionality implemented for the OneQlick food delivery application.

## 🏗️ Architecture Overview

The User CRUD implementation follows a clean, modular architecture:

```
app/
├── api/
│   ├── routes/
│   │   └── user_routes.py          # API endpoints
│   └── schemas/
│       └── user_schema.py          # Pydantic models
├── domain/
│   └── services/
│       └── user_service.py         # Business logic
├── infra/
│   └── postgres/
│       ├── models/
│       │   └── user.py             # SQLAlchemy model
│       └── repositories/
│           └── user_repository.py  # Database operations
└── main.py                         # FastAPI application
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
# Install the new bcrypt dependency
uv add bcrypt>=4.1.2
```

### 2. Database Setup

Make sure your PostgreSQL database is running and the `DATABASE_URL` environment variable is set in your `.env` file:

```env
DATABASE_URL=postgresql+psycopg://username:password@localhost:5432/core_db
```

### 3. Run the Application

```bash
# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Access the API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📋 API Endpoints

### User Management

#### Create User
```http
POST /users/
Content-Type: application/json

{
  "email": "user@example.com",
  "phone": "9876543210",
  "password": "securepassword123",
  "first_name": "John",
  "last_name": "Doe",
  "role": "customer",
  "profile_image": "https://example.com/profile.jpg"
}
```

#### Get User by ID
```http
GET /users/{user_id}
```

#### Get User by Email
```http
GET /users/email/{email}
```

#### Get Users List (Paginated)
```http
GET /users/?page=1&size=10&role=customer&status=active&search=john
```

#### Update User
```http
PUT /users/{user_id}
Content-Type: application/json

{
  "first_name": "Jane",
  "last_name": "Smith",
  "email": "jane@example.com"
}
```

#### Update Password
```http
PATCH /users/{user_id}/password
Content-Type: application/json

{
  "current_password": "oldpassword",
  "new_password": "newpassword123"
}
```

#### Delete User (Soft Delete)
```http
DELETE /users/{user_id}
```

#### Permanently Delete User
```http
DELETE /users/{user_id}/permanent
```

### User Verification

#### Verify Email
```http
PATCH /users/{user_id}/verify-email
```

#### Verify Phone
```http
PATCH /users/{user_id}/verify-phone
```

### User Status Management

#### Update User Status
```http
PATCH /users/{user_id}/status?status=active
```

### User Filtering

#### Get Users by Role
```http
GET /users/role/{role}?limit=100
```

#### Get Active Users
```http
GET /users/active/list?limit=100
```

## 🔐 Security Features

### Password Hashing
- All passwords are hashed using bcrypt with salt
- Password validation (minimum 6 characters)
- Secure password update with current password verification

### Input Validation
- Email format validation
- Phone number validation (minimum 10 digits)
- Role and status enum validation
- Unique constraint validation for email and phone

## 📊 Data Models

### User Schema
```python
class UserResponse(BaseModel):
    user_id: UUID
    email: EmailStr
    phone: str
    first_name: str
    last_name: str
    role: UserRole
    status: UserStatus
    profile_image: Optional[str]
    email_verified: bool
    phone_verified: bool
    created_at: Optional[str]
    updated_at: Optional[str]
```

### User Roles
- `customer` - Regular food delivery customers
- `admin` - System administrators
- `delivery_partner` - Food delivery partners
- `restaurant_owner` - Restaurant owners

### User Status
- `active` - Active user account
- `inactive` - Inactive/suspended account
- `suspended` - Temporarily suspended account

## 🧪 Testing

### Run the Test Script
```bash
# Install requests if not already installed
uv add requests

# Run the test script
python test_user_crud.py
```

The test script will:
1. Create a new user
2. Retrieve user by ID and email
3. Update user information
4. Test pagination and filtering
5. Update password
6. Verify email and phone
7. Soft delete the user
8. Verify the user status

### Manual Testing with curl

#### Create User
```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "9876543210",
    "password": "testpass123",
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer"
  }'
```

#### Get Users List
```bash
curl -X GET "http://localhost:8000/users/?page=1&size=5"
```

## 🔧 Error Handling

The API provides comprehensive error handling:

- **400 Bad Request**: Invalid input data, validation errors
- **401 Unauthorized**: Invalid credentials
- **404 Not Found**: User not found
- **409 Conflict**: Email or phone already exists
- **500 Internal Server Error**: Database or server errors

## 📝 Response Examples

### Successful User Creation
```json
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "phone": "9876543210",
  "first_name": "John",
  "last_name": "Doe",
  "role": "customer",
  "status": "active",
  "profile_image": null,
  "email_verified": false,
  "phone_verified": false,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

### Paginated Users List
```json
{
  "users": [...],
  "total": 150,
  "page": 1,
  "size": 10,
  "total_pages": 15
}
```

## 🚀 Next Steps

This User CRUD implementation provides a solid foundation for the OneQlick application. Next features to implement could include:

1. **Authentication & Authorization**: JWT tokens, role-based access control
2. **Email/Phone Verification**: OTP-based verification
3. **Password Reset**: Forgot password functionality
4. **User Profile Management**: Profile picture upload, preferences
5. **Audit Logging**: Track user actions and changes
6. **Rate Limiting**: API rate limiting for security
7. **Caching**: Redis caching for frequently accessed data

## 📞 Support

For any questions or issues with the User CRUD implementation, please refer to the API documentation at `/docs` or contact the development team. 