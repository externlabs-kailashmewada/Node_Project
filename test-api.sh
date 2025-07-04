#!/bin/bash
# Bash Script to Test the API using curl
# Make sure your server is running: npm run dev

BASE_URL="http://localhost:3000/api"

echo "=== Testing User API ==="

# 1. Create a user
echo -e "\n1. Creating a user..."
USER_RESPONSE=$(curl -s -X POST "$BASE_URL/users" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}')

echo "Response: $USER_RESPONSE"

# Extract user ID from response
USER_ID=$(echo $USER_RESPONSE | grep -o '"id":[0-9]*' | cut -d':' -f2)
echo "User ID: $USER_ID"

# 2. Get all users
echo -e "\n2. Getting all users..."
curl -s -X GET "$BASE_URL/users" | jq '.'

# 3. Get specific user
echo -e "\n3. Getting user by ID ($USER_ID)..."
curl -s -X GET "$BASE_URL/users/$USER_ID" | jq '.'

# 4. Update user
echo -e "\n4. Updating user..."
curl -s -X PUT "$BASE_URL/users/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe Updated", "email": "john.updated@example.com"}' | jq '.'

# 5. Delete user
echo -e "\n5. Deleting user..."
curl -s -X DELETE "$BASE_URL/users/$USER_ID" | jq '.'

echo -e "\n=== API Testing Complete ===" 