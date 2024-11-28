# API Documentation

---

## Table of Contents

- [Authentication](#authentication)
- [User Management](#user-management)
- [Animal Data](#animal-data)
- [Quiz Data](#quiz-data)
- [Media Management](#media-management)
- [User Statistics (Optional)](#user-statistics-optional)

---

## Authentication

### POST `/api/auth/register`

- **Description**: Mendaftarkan pengguna baru ke sistem.
- **Request Body**:
  ```json
  {
    "name": "XXXXX",
    "email": "XXXXX@example.com",
    "password": "XXXXX"
  }
  ```

- **Response**:
  ```json
  {
    "status": 201,
    "message": "User registered successfully",
    "data": {
      "userId": "1111ce6b6fd544d5",
      "name": "XXXXX",
      "email": "XXXXX@example.com"
    }
  }
  ```

- **Response (Error)**:
  ```json
  {
    "status": 400,
    "message": "User already exists",
    "error": {
      "details": "The user has registered an account with the same email address"
    }
  }
  ```

### POST `/api/auth/login`

- **Description**: Mengotentikasi pengguna melalui login.
- **Request Body**:
  ```json
  {
    "email": "XXXXX@example.com",
    "password": "XXXXX"
  }
  ```

- **Response**:
  ```json
  {
    "status": 200,
    "message": "User logged in successfully",
    "data": {
      "id": "xxxxxxx",
      "name": "XXXXX",
      "email": "XXXXX@example.com",
      "password": "XXXXX",
      "insertedAt": "2024-11-28T12:38:15.569Z",
      "updatedAt": "2024-11-28T12:38:15.569Z"
    }
  }
  ```

- **Response (Error)**:
  ```json
  {
    "status": 400,
    "message": "Invalid credentials",
    "error": {
      "details": "Authentication failed. Please check your username and password."
    }
  }
  ```

## User Management

### GET `/api/users/:userId`

- **Description**: Mendapatkan profil pengguna berdasarkan ID.
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Receive data successfully",
    "data": {
      "id": "xxxxxx",
      "name": "XXXXX",
      "email": "XXXXX@example.com",
      "password": "XXXXX",
      "insertedAt": "2024-11-28T12:38:15.569Z",
      "updatedAt": "2024-11-28T12:38:15.569Z"
    }
  }
  ```
- **Response (Error)**:
  ```json
  {
    "status": 404,
    "message": "User not found",
    "error": {
      "details": "The user not found in database. Try creating an account."
    }
  }
  ```

### PUT `/api/users/:userId`

- **Description**: Updates profil pengguna berdasarkan ID.
- **Request Body**:
  ```json
  {
    "name": "XXXXX",
    "email": "XXXXX@example.com",
    "password": "XXXXX"
  }
  ```

- **Response**:
  ```json
  {
    "status": 200,
    "message": "User updated successfully",
    "data": {
      "id": "xxxxx",
      "insertedAt": "2024-11-28T12:38:15.569Z",
      "password": "xxxxx",
      "name": "xxxxx",
      "email": "xxxxx@example.com",
      "updatedAt": "2024-11-28T13:04:48.457Z"
    }
  }
  ```

- **Response (Error)**:
  ```json
  {
    "status": 404,
    "message": "User not found",
    "error": {
      "details": "The user not found in database. Try creating an account."
    }
  }
  ```

### DELETE `/api/users/:userId`

- **Description**: Deletes profil pengguna berdasarkan ID.
- **Response**:
  ```json
  { 
    "status": 200, 
    "message": "User deleted successfully" 
  }
  ```

- **Response (Error)**:
  ```json
  {
    "status": 404,
    "message": "User not found",
    "error": {
      "details": "The user not found in database. Try creating an account."
    }
  }
  ```

## Animal Data

### GET `/api/animals`

- **Description**: Retrieves a list of all animals.
- **Response**: Returns an array of animals with fields like name, description, facts, image URL, and audio URL.

### GET `/api/animals/:animalId`

- **Description**: Fetches specific animal details by animalId.
- **Response**: Returns detailed animal data including name, description, facts, image URL, and audio URL.

## Animal Data

### GET `/api/quizzes`

- **Description**: Retrieves all quizzes.
- **Response**: Returns an array of quiz data including question, answer options, and correct answer.

### GET `/api/quizzes/:quizId`

- **Description**: Fetches specific quiz details by quizId.
- **Response**: Returns quiz details including question, options, and correct answer.

## Media Management

### POST `/api/media/upload`

- **Description**: Uploads an animal image or audio file to Cloud Storage.
- **Request**: Form Data: file - The image or audio file to upload.
- **Response**: Returns URL of the uploaded file in Cloud Storage.

### DELETE `/api/media/:fileName`

- **Description**: Deletes media from Cloud Storage by file name.
- **Response**: Returns confirmation of file deletion.

## User Statistics (Optional)

### POST `/api/stats/record`

- **Description**: Records quiz results or other user statistics.
- **Request Body**:
  ```json
  {
    "userId": "string",
    "quizId": "string",
    "score": "number"
  }
  ```
- **Response**: Returns confirmation of recorded statistics.

### GET `/api/stats/:userId`

- **Description**: Fetches quiz scores or statistics for a specific user by userId.
- **Response**: Returns user's quiz statistics or scores.
