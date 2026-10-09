
# Authify - Django JWT Authentication System

Authify is a user authentication web application built using Django REST Framework and JSON Web Tokens (JWT). It provides user registration, login, token generation, token verification, token refreshing, and access to protected user profile information.

The project includes a frontend built with HTML, CSS, and JavaScript, connected to the Django REST API.

## Features

- User registration with username, email, and password.
- Input validation for password length and duplicate email addresses.
- Secure password hashing using Django's built-in user model.
- User login using username and password.
- JWT access and refresh token generation.
- Access token verification and refreshing.
- Protected profile API requiring authentication.
- Dashboard displaying the authenticated user's username and email.
- Logout functionality.
- Responsive user interface with a white and orange theme.

## Technology Stack

- **Backend:** Python, Django
- **API Framework:** Django REST Framework
- **Authentication:** Simple JWT
- **Frontend:** HTML, CSS, JavaScript
- **Database:** SQLite (Django default database)
- **API Testing:** Postman
- **Development Environment:** Visual Studio Code

## Project Structure

```text
Django_project/
│
├── accounts/
│   ├── templates/
│   │   └── accounts/
│   │       ├── register.html
│   │       ├── login.html
│   │       └── dashboard.html
│   │
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   └── models.py
│
├── config/
│   ├── settings.py
│   └── urls.py
│
├── manage.py
├── db.sqlite3
└── README.md
```

The static files (`style.css` and `app.js`) are stored in the project's configured static directory.

## Installation and Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Django_project
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install django djangorestframework djangorestframework-simplejwt
```

### 4. Apply database migrations

```bash
python manage.py migrate
```

### 5. Start the development server

```bash
python manage.py runserver
```

Open the application in your browser:

- Registration: http://127.0.0.1:8000/register/
- Login: http://127.0.0.1:8000/login/
- Dashboard: http://127.0.0.1:8000/dashboard/

## API Documentation

Base URL: `http://127.0.0.1:8000`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/register/` | Register a new user |
| POST | `/api/token/` | Log in and generate JWT tokens |
| POST | `/api/token/refresh/` | Generate a new access token |
| POST | `/api/token/verify/` | Verify a JWT token |
| GET | `/api/profile/` | Retrieve the authenticated user's profile |

### 1. User Registration

**Endpoint:** `POST /api/register/`

Request body:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "Password123"
}
```

A successful registration returns `201 Created`.

### 2. User Login

**Endpoint:** `POST /api/token/`

Request body:

```json
{
  "username": "testuser",
  "password": "Password123"
}
```

A successful login returns an access token and a refresh token.

### 3. Refresh Token

**Endpoint:** `POST /api/token/refresh/`

Request body:

```json
{
  "refresh": "<your-refresh-token>"
}
```

Returns a new access token when the refresh token is valid.

### 4. Verify Token

**Endpoint:** `POST /api/token/verify/`

Request body:

```json
{
  "token": "<your-access-token>"
}
```

A valid token returns `200 OK`.

### 5. Retrieve User Profile

**Endpoint:** `GET /api/profile/`

Request header:

```text
Authorization: Bearer <your-access-token>
```

The endpoint returns the authenticated user's username and email.

## Authentication Workflow

1. A user registers with a username, email, and password.
2. Django validates the registration data and stores the user.
3. The user logs in with their credentials.
4. Simple JWT generates access and refresh tokens.
5. The frontend stores the tokens in session storage.
6. The dashboard sends the access token to the protected profile API.
7. The API authenticates the request and returns the user's profile.
8. Logging out clears the tokens from session storage.

## Validation and Error Handling

- Passwords must contain at least eight characters.
- Duplicate email addresses are rejected.
- Duplicate usernames are rejected by Django's user model.
- Invalid credentials are rejected during login.
- Protected endpoints require a valid access token.
- Expired or invalid tokens cannot access protected resources.

## Future Enhancements

- Password reset functionality.
- Email verification.
- User profile editing.
- Improved token expiry and session handling.
- Automated API and frontend tests.
- Deployment to a production server.

## Learning Outcomes

This project demonstrates practical experience with:

- Django REST Framework API development.
- Serializers and input validation.
- JWT-based authentication and authorization.
- Protected API endpoints and permissions.
- Frontend-to-backend integration using JavaScript Fetch API.
- Token management and API testing.

## Author

**Isha Sisodia**

B.Tech - Computer Science Engineering
