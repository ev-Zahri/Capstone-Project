# API Documentation

---

## Table of Contents

- [Authentication](#authentication)
- [User Management](#user-management)
- [Animal Data](#animal-data)
- [Quiz Data](#quiz-animal)

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

- **Description**: Mendapatkan daftar hewan yang tersedia.
- **Response**:

  ```json
  {
    "status": 200,
    "message": "Receive data successfully",
    "data": [
      {
        "name": "Kelelawar",
        "scientific_name": "Chiroptera",
        "description": "Kelelawar adalah satu-satunya mamalia yang bisa terbang! Mereka hidup di berbagai habitat seperti gua, pohon, dan bahkan bangunan kosong. Kebanyakan kelelawar aktif di malam hari (nokturnal) dan memiliki kemampuan luar biasa untuk menggunakan 'sonar alami' yang disebut ekolokasi. Ini membantu mereka menemukan makanan bahkan dalam kegelapan total! Makanan kelelawar bervariasi, ada yang makan buah-buahan (frugivora), serangga (insektivora), dan ada juga yang menghisap nektar bunga. Ukurannya beragam, mulai dari kelelawar kecil sepanjang 6 cm hingga kelelawar besar seperti kelelawar buah dengan sayap sepanjang 1,5 meter."
      },
      {
        "name": "Beruang",
        "scientific_name": "Ursidae",
        "description": "Beruang adalah hewan besar dan kuat yang hidup di hutan, pegunungan, atau wilayah bersalju. Ada banyak jenis beruang, seperti beruang coklat, beruang kutub, dan beruang madu. Beruang dikenal sebagai omnivora; mereka memakan buah, ikan, dan bahkan serangga! Ukuran beruang bisa sangat besar, dengan berat mencapai 600 kilogram untuk beruang kutub. Mereka juga pelari cepat meskipun terlihat besar dan lamban! Beruang kutub misalnya, adalah perenang hebat yang bisa menjelajahi lautan untuk mencari makanan."
      }, ...
    ]
  }
  ```

### GET `/api/animals/:animalId`

- **Description**: Fetches specific animal details by animal name.
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Receive data successfully",
    "data": {
      "name": "Kelelawar",
      "scientific_name": "Chiroptera",
      "description": "Kelelawar adalah satu-satunya mamalia yang bisa terbang! Mereka hidup di berbagai habitat seperti gua, pohon, dan bahkan bangunan kosong. Kebanyakan kelelawar aktif di malam hari (nokturnal) dan memiliki kemampuan luar biasa untuk menggunakan 'sonar alami' yang disebut ekolokasi. Ini membantu mereka menemukan makanan bahkan dalam kegelapan total! ..."
    }
  }
  ```
- **Response (Error)**:
  ```json
  {
    "status": 404,
    "message": "Animal not found",
    "error": { "details": "The animal not found in database." }
  }
  ```

## Quiz Animal

### GET `/api/quizzes/:animalName`

- **Description**: Retrieves spesific quizzes by name animals.
- **Response**:
  ```json
  {
    "status": 200,
    "message": "Quiz animal data successfully",
    "data": {
      "quiz_id": 1,
      "animal_name": "Kelelawar",
      "quiz_question": "Apa makanan utama kelelawar buah?",
      "quiz_options": ["Serangga", "Buah", "Ikan", "Daging"],
      "correct_answer": "Buah",
      "fun_fact": "Kelelawar buah memainkan peran penting dalam ekosistem dengan menyebarkan biji dan membantu penyerbukan tanaman. Mereka adalah makhluk nokturnal yang menggunakan penglihatan dan penciuman yang tajam untuk menemukan buah di malam hari."
    }
  }
  ```
- **Response (Error)**:
  ```json
  {
    "status": 404,
    "message": "Quiz not found",
    "error": { "details": "The quiz animal not found in database." }
  }
  ```

### POST `/api/quizzes/:animalName/verify`

- **Description**: Fetches specific quiz details by quizId.
- **Request Body**:

  ```json
  {
    "answer": "xxxx"
  }
  ```
- **Response (Correct)**:
  ```json
  {
    "status": 200,
    "message": "Correct answer!",
    "data": {
      "correct": true,
      "fun_fact": "Kelelawar buah memainkan peran penting dalam ekosistem dengan menyebarkan biji dan membantu penyerbukan tanaman. Mereka adalah makhluk nokturnal yang menggunakan penglihatan dan penciuman yang tajam untuk menemukan buah di malam hari."
    }
  }
  ```
- **Response (Incorrect)**:
  ```json
  {
    "status": 200,
    "message": "Incorrect answer",
    "data": { "correct": false, "correct_answer": "Buah" }
  }
  ```
- **Response (Error)**:
  ```json
  { "status": 400, "message": "Answer not provided" }
  ```
