# PowerShell Script to Test the API
# Make sure your server is running: npm run dev

$baseUrl = "http://localhost:3000/api"

Write-Host "=== Testing User API ===" -ForegroundColor Green

# 1. Create a user
Write-Host "`n1. Creating a user..." -ForegroundColor Yellow
$userData = @{
    name = "John Doe"
    email = "john@example.com"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users" -Method POST -Body $userData -ContentType "application/json"
    Write-Host "User created successfully!" -ForegroundColor Green
    Write-Host "User ID: $($response.data.id)" -ForegroundColor Cyan
    $userId = $response.data.id
} catch {
    Write-Host "Error creating user: $($_.Exception.Message)" -ForegroundColor Red
    exit
}

# 2. Get all users
Write-Host "`n2. Getting all users..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users" -Method GET
    Write-Host "Found $($response.count) users" -ForegroundColor Green
    $response.data | ForEach-Object {
        Write-Host "  - ID: $($_.id), Name: $($_.name), Email: $($_.email)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "Error getting users: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Get specific user
Write-Host "`n3. Getting user by ID ($userId)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/$userId" -Method GET
    Write-Host "User found: $($response.data.name) - $($response.data.email)" -ForegroundColor Green
} catch {
    Write-Host "Error getting user: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Update user
Write-Host "`n4. Updating user..." -ForegroundColor Yellow
$updateData = @{
    name = "John Doe Updated"
    email = "john.updated@example.com"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/$userId" -Method PUT -Body $updateData -ContentType "application/json"
    Write-Host "User updated successfully!" -ForegroundColor Green
    Write-Host "New name: $($response.data.name), New email: $($response.data.email)" -ForegroundColor Cyan
} catch {
    Write-Host "Error updating user: $($_.Exception.Message)" -ForegroundColor Red
}

# 5. Delete user
Write-Host "`n5. Deleting user..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/users/$userId" -Method DELETE
    Write-Host "User deleted successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error deleting user: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== API Testing Complete ===" -ForegroundColor Green 