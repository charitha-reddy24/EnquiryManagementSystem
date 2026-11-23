# Enquiry Management System

A web-based Enquiry Management System developed using Python, Flask, MySQL, HTML, CSS and JavaScript.

## Project Overview

The Enquiry Management System helps users manage customer enquiries efficiently. Users can submit new enquiries, view existing records, update information, delete records and search for enquiries.

## Technologies Used

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Python, Flask
- **Database:** MySQL
- **API:** REST-style APIs
- **Database Connectivity:** MySQL Connector
- **Environment Management:** Python Virtual Environment and python-dotenv

## Features

- Submit new enquiries.
- View all enquiries.
- Update existing enquiries.
- Delete enquiries.
- Search enquiries.
- Frontend and backend validation.
- MySQL database integration.

## Project Structure

```text
Enquirymanagementsystem/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── backend/
│   ├── app.py
│   ├── database.py
│   └── enquiry.py
│
├── database/
│   └── schema.sql
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## Database Configuration

1. Install MySQL.
2. Create the database and table using `database/schema.sql`.
3. Create a `.env` file in the project root.
4. Add your own database credentials:

```text
DB_HOST=localhost
DB_PORT=3307
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=enquiry_db
```

Do not upload your actual `.env` file to GitHub.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/charitha-reddy24/EnquiryManagementSystem.git
```

### 2. Navigate to the project

```bash
cd EnquiryManagementSystem
```

### 3. Create a virtual environment

```bash
py -m venv venv
```

### 4. Activate the virtual environment

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
py -m pip install -r requirements.txt
```

### 6. Configure the database

Create the MySQL database and table using `database/schema.sql`.

Create your `.env` file using the configuration shown above.

### 7. Start the Flask backend

```bash
py backend/app.py
```

Backend URL:

http://127.0.0.1:5000

### 8. Start the frontend

Open another terminal:

```bash
cd frontend
py -m http.server 5500
```

Open the application in your browser:

http://localhost:5500/index.html

## API Endpoints

| HTTP Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Home API |
| GET | `/api/enquiries` | Retrieve all enquiries |
| POST | `/api/enquiries` | Create a new enquiry |
| PUT | `/api/enquiries/<id>` | Update an enquiry |
| DELETE | `/api/enquiries/<id>` | Delete an enquiry |
| GET | `/api/enquiries/search?search=value` | Search enquiries |

## Learning Outcomes

Through this project, I gained practical experience in:

- Python object-oriented programming.
- Flask application development.
- REST API development.
- Frontend and backend integration.
- MySQL database connectivity.
- CRUD operations.
- Input validation.
- Git and GitHub version control.

## Author

Charitha Reddy

## Project Status

Completed – Enquiry Management System.
