# Application Framework Assignment 1

## Overview
This project is a RESTful API for managing courses, timetables, classrooms, and student enrollments. It provides functionality for user authentication, CRUD operations on courses, timetable management, room booking, student enrollment, notifications, and more.

## Installation
1. Clone the repository: https://github.com/sliitcsse/assignment-01-IT21198090.git

2. Navigate to the project directory

3. Install dependencies: 
                    bcryptjs
                    dotenv
                    express
                    express-winston
                    jsonwebtoken
                    mongoose
                    nodemon
                    winston

4. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add the following variables:
    ```
    PORT=3000 (or import any port externally)
    SECRET_KEY=my_secret_key_1997
    MONGODB_URI='mongodb://localhost/API_Check' (make sure to have mongodb in the device. Having Compass is useful)
    ```

## Usage
1. Start the server

2. Use API endpoints to interact with the system:
    - Authentication: `/api/auth/login`, `/api/auth/register`
    - Course Management: `/api/courses`, `/api/courses/:id`
    - Timetable Management: `/api/timetable`, `/api/timetable/:id`
    - Room Booking: `/api/classrooms`, `/api/classrooms/:id`
    - Student Enrollment: `/api/enrollment`, `/api/enrollment/my-courses`
    - Notifications: `/api/notifications`

## Configuration
    - PORT: The port on which the server will run.
    - SECRET_KEY: Secret key for JWT token generation.
    - MONGODB_URI: MongoDB connection string.

## Contact
For support or inquiries, please contact:
    - John Doe: johndoe@example.com
    - Jane Smith: janesmith@example.com
