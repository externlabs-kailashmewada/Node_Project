# Express Sequelize API Demo

A Node.js REST API built with Express.js and Sequelize ORM using PostgreSQL.

## Features

- User management with CRUD operations
- PostgreSQL database with Sequelize ORM
- Input validation and error handling
- RESTful API design
- CORS enabled

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd demo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
# Edit .env with your database credentials
```

4. Configure your PostgreSQL database and update the credentials in `.env`

5. Run database migrations:
```bash
npm run db:migrate
```

6. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Documentation

Interactive API documentation is available at `http://localhost:3000/api-docs` using Swagger UI.

## Available Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Run database seeders
- `npm run db:reset` - Reset database (drop, create, migrate)

## API Endpoints

### Users

#### Create User
```
POST /api/users
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 201
}
```

#### Get All Users
```
GET /api/users
```

**Response:**
```json
{
  "status": "success",
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "count": 1,
  "statusCode": 200
}
```

#### Get User by ID
```
GET /api/users/{id}
```

**Response:**
```json
{
  "status": "success",
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 200
}
```

#### Update User
```
PUT /api/users/{id}
```

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com"
}
```

**Response:**
```json
{
  "status": "success",
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "John Doe Updated",
    "email": "john.updated@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "statusCode": 200
}
```

#### Delete User
```
DELETE /api/users/{id}
```

**Response:**
```json
{
  "status": "success",
  "message": "User deleted successfully",
  "statusCode": 200
}
```

## Project Structure

```
├── app.js                 # Main application file
├── config/               # Database configuration
├── controllers/          # Route controllers
├── middlewares/          # Custom middleware
├── migrations/           # Database migrations
├── models/              # Sequelize models
├── routes/              # API routes
└── seeders/             # Database seeders
```

## Error Handling

The API returns consistent error responses:

```json
{
  "status": "error",
  "message": "Error description",
  "statusCode": 400
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC 