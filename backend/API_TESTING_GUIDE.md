# OneQlick API Testing Guide

This guide contains all the curl commands to test the User CRUD API endpoints.

## 🚀 Server Status

The API server is running on: `http://localhost:8000`

### Health Check
```bash
curl -X GET "http://localhost:8000/health"
```

### Root Endpoint
```bash
curl -X GET "http://localhost:8000/"
```

## 👤 User Management API Tests

### 1. Create User

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "phone": "9876543210",
    "password": "securepass123",
    "first_name": "John",
    "last_name": "Doe",
    "role": "customer",
    "profile_image": "https://example.com/profile.jpg"
  }'
```

### 2. Create Another User (Different Role)

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "phone": "9876543211",
    "password": "securepass123",
    "first_name": "Jane",
    "last_name": "Smith",
    "role": "restaurant_owner",
    "profile_image": "https://example.com/jane.jpg"
  }'
```

### 3. Create Delivery Partner

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "delivery.partner@example.com",
    "phone": "9876543212",
    "password": "securepass123",
    "first_name": "Mike",
    "last_name": "Johnson",
    "role": "delivery_partner"
  }'
```

## 📋 Get User Information

### 4. Get User by ID (Replace {user_id} with actual UUID)

```bash
curl -X GET "http://localhost:8000/users/{user_id}"
```

### 5. Get User by Email

```bash
curl -X GET "http://localhost:8000/users/email/john.doe@example.com"
```

### 6. Get All Users (Paginated)

```bash
curl -X GET "http://localhost:8000/users/?page=1&size=10"
```

### 7. Get Users with Filters

```bash
# Filter by role
curl -X GET "http://localhost:8000/users/?role=customer"

# Filter by status
curl -X GET "http://localhost:8000/users/?status=active"

# Search by name/email/phone
curl -X GET "http://localhost:8000/users/?search=john"

# Combined filters
curl -X GET "http://localhost:8000/users/?role=customer&status=active&page=1&size=5"
```

### 8. Get Users by Role

```bash
curl -X GET "http://localhost:8000/users/role/customer?limit=10"
```

### 9. Get Active Users

```bash
curl -X GET "http://localhost:8000/users/active/list?limit=10"
```

## ✏️ Update User Information

### 10. Update User (Replace {user_id} with actual UUID)

```bash
curl -X PUT "http://localhost:8000/users/{user_id}" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Johnny",
    "last_name": "Doe Jr.",
    "email": "johnny.doe@example.com"
  }'
```

### 11. Update User Password

```bash
curl -X PATCH "http://localhost:8000/users/{user_id}/password" \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "securepass123",
    "new_password": "newsecurepass456"
  }'
```

### 12. Update User Status

```bash
curl -X PATCH "http://localhost:8000/users/{user_id}/status?status=suspended"
```

## ✅ Verification Endpoints

### 13. Verify Email

```bash
curl -X PATCH "http://localhost:8000/users/{user_id}/verify-email"
```

### 14. Verify Phone

```bash
curl -X PATCH "http://localhost:8000/users/{user_id}/verify-phone"
```

## 🗑️ Delete User

### 15. Soft Delete User (Sets status to inactive)

```bash
curl -X DELETE "http://localhost:8000/users/{user_id}"
```

### 16. Permanently Delete User

```bash
curl -X DELETE "http://localhost:8000/users/{user_id}/permanent"
```

## 🔍 Error Testing

### 17. Test Duplicate Email

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "phone": "9876543213",
    "password": "securepass123",
    "first_name": "Duplicate",
    "last_name": "User",
    "role": "customer"
  }'
```

### 18. Test Duplicate Phone

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "new.email@example.com",
    "phone": "9876543210",
    "password": "securepass123",
    "first_name": "Duplicate",
    "last_name": "Phone",
    "role": "customer"
  }'
```

### 19. Test Invalid Email Format

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "phone": "9876543214",
    "password": "securepass123",
    "first_name": "Invalid",
    "last_name": "Email",
    "role": "customer"
  }'
```

### 20. Test Short Password

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "short.pass@example.com",
    "phone": "9876543215",
    "password": "123",
    "first_name": "Short",
    "last_name": "Password",
    "role": "customer"
  }'
```

### 21. Test Short Phone Number

```bash
curl -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "short.phone@example.com",
    "phone": "123",
    "password": "securepass123",
    "first_name": "Short",
    "last_name": "Phone",
    "role": "customer"
  }'
```

### 22. Test Non-existent User

```bash
curl -X GET "http://localhost:8000/users/00000000-0000-0000-0000-000000000000"
```

### 23. Test Wrong Password Update

```bash
curl -X PATCH "http://localhost:8000/users/{user_id}/password" \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "wrongpassword",
    "new_password": "newsecurepass456"
  }'
```

## 📊 Pagination Testing

### 24. Test Different Page Sizes

```bash
# Page size 1
curl -X GET "http://localhost:8000/users/?page=1&size=1"

# Page size 5
curl -X GET "http://localhost:8000/users/?page=1&size=5"

# Page size 100 (max)
curl -X GET "http://localhost:8000/users/?page=1&size=100"
```

### 25. Test Page Navigation

```bash
# First page
curl -X GET "http://localhost:8000/users/?page=1&size=2"

# Second page
curl -X GET "http://localhost:8000/users/?page=2&size=2"

# Third page
curl -X GET "http://localhost:8000/users/?page=3&size=2"
```

## 🔧 Complete Workflow Test

### 26. Full User Lifecycle Test

```bash
# Step 1: Create user
CREATE_RESPONSE=$(curl -s -X POST "http://localhost:8000/users/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "workflow.test@example.com",
    "phone": "9876543216",
    "password": "securepass123",
    "first_name": "Workflow",
    "last_name": "Test",
    "role": "customer"
  }')

echo "Created user: $CREATE_RESPONSE"

# Extract user ID (you'll need to manually extract this from the response)
USER_ID="your-extracted-user-id"

# Step 2: Get user
curl -X GET "http://localhost:8000/users/$USER_ID"

# Step 3: Update user
curl -X PUT "http://localhost:8000/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Updated",
    "last_name": "Workflow"
  }'

# Step 4: Verify email
curl -X PATCH "http://localhost:8000/users/$USER_ID/verify-email"

# Step 5: Verify phone
curl -X PATCH "http://localhost:8000/users/$USER_ID/verify-phone"

# Step 6: Update password
curl -X PATCH "http://localhost:8000/users/$USER_ID/password" \
  -H "Content-Type: application/json" \
  -d '{
    "current_password": "securepass123",
    "new_password": "newworkflowpass789"
  }'

# Step 7: Soft delete user
curl -X DELETE "http://localhost:8000/users/$USER_ID"

# Step 8: Verify user is inactive
curl -X GET "http://localhost:8000/users/$USER_ID"
```

## 📝 Response Examples

### Successful User Creation Response
```json
{
  "user_id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "john.doe@example.com",
  "phone": "9876543210",
  "first_name": "John",
  "last_name": "Doe",
  "role": "customer",
  "status": "active",
  "profile_image": "https://example.com/profile.jpg",
  "email_verified": false,
  "phone_verified": false,
  "created_at": "2024-01-15T10:30:00",
  "updated_at": "2024-01-15T10:30:00"
}
```

### Paginated Users Response
```json
{
  "users": [
    {
      "user_id": "123e4567-e89b-12d3-a456-426614174000",
      "email": "john.doe@example.com",
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
  ],
  "total": 1,
  "page": 1,
  "size": 10,
  "total_pages": 1
}
```

### Error Response Example
```json
{
  "detail": "User with this email or phone already exists"
}
```

## 🚨 Common Error Codes

- **400 Bad Request**: Invalid input data, validation errors
- **401 Unauthorized**: Invalid credentials
- **404 Not Found**: User not found
- **409 Conflict**: Email or phone already exists
- **500 Internal Server Error**: Database or server errors

## 💡 Tips for Testing

1. **Replace {user_id}**: Always replace `{user_id}` with actual UUIDs from responses
2. **Check Response Headers**: Look for status codes and response headers
3. **Test Edge Cases**: Try invalid data, duplicate entries, etc.
4. **Use Different Roles**: Test with customer, restaurant_owner, delivery_partner, admin
5. **Test Pagination**: Verify page sizes and navigation work correctly
6. **Check Validation**: Ensure email format, phone length, password strength are validated

## 🔗 API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Health Check**: http://localhost:8000/health 