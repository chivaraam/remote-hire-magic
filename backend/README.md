
# JobMatch AI Backend API

This is the backend API for the JobMatch AI application. It provides all the endpoints needed for the frontend application.

## Features

- User authentication and registration
- Job listing and management
- Resume parsing
- Remote work readiness assessment
- Interview scheduling
- AI-based job matching

## Requirements

- Java 17
- Maven

## Getting Started

1. Clone the repository
2. Navigate to the project directory
3. Build the project:
   ```
   mvn clean install
   ```
4. Run the application:
   ```
   java -jar target/jobmatch-api-0.0.1-SNAPSHOT.jar
   ```
   
   Or use Maven:
   ```
   mvn spring-boot:run
   ```

5. The API will be available at `http://localhost:8080/api`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication

### Users
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile
- `GET /api/users/{id}/skills` - Get user skills

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job details
- `POST /api/jobs` - Create a new job posting
- `PUT /api/jobs/{id}` - Update a job posting
- `DELETE /api/jobs/{id}` - Delete a job posting

### Resume Parsing
- `POST /api/resumes/parse` - Parse a resume
- `GET /api/resumes/{id}` - Get parsed resume
- `GET /api/resumes/user/{userId}` - Get user's resume

### Assessments
- `POST /api/assessments/remote` - Submit remote work assessment
- `GET /api/assessments/{id}` - Get assessment details
- `GET /api/assessments/user/{userId}` - Get user's assessments

### Interviews
- `POST /api/interviews` - Schedule an interview
- `GET /api/interviews/{id}` - Get interview details
- `PUT /api/interviews/{id}` - Update an interview
- `DELETE /api/interviews/{id}` - Cancel an interview
- `GET /api/interviews/user/{userId}` - Get user's interviews

### Job Matching
- `GET /api/matches/jobs/{userId}` - Get job matches for a user
- `GET /api/matches/candidates/{jobId}` - Get candidate matches for a job
- `POST /api/matches/calculate` - Calculate job matches for a user

## Database

The application uses an in-memory H2 database for development. The H2 console is available at `http://localhost:8080/h2-console`.

Database credentials (as configured):
- JDBC URL: `jdbc:h2:mem:jobmatchdb`
- Username: `sa`
- Password: `password`

For production, you should configure a persistent database in `application-prod.properties`.
