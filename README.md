# Full-Stack Todo Application

A complete, production-ready CRUD todo application built with React frontend, Python FastAPI backend, and PostgreSQL database.

## 🚀 Features

- ✅ **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- ✅ **Real-time Updates**: Instant UI updates with React Query state management
- ✅ **Modern UI/UX**: Beautiful, responsive design with Shadcn/ui components
- ✅ **Type Safety**: Full TypeScript implementation across frontend and backend
- ✅ **Error Handling**: Comprehensive error handling with user-friendly notifications
- ✅ **Database Persistence**: PostgreSQL database with proper migrations
- ✅ **API Documentation**: Auto-generated OpenAPI/Swagger documentation
- ✅ **Production Ready**: Docker setup, environment configuration, and best practices

## 🛠 Technology Stack

### Frontend
- **React 18.x** with TypeScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern, accessible component library
- **React Query (@tanstack/react-query)** - Server state management
- **Axios** - HTTP client for API communication
- **React Router** - Client-side routing

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - Python SQL toolkit and ORM
- **PostgreSQL** - Robust, open-source relational database
- **Alembic** - Database migration tool
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server implementation

### Infrastructure
- **Docker & Docker Compose** - Containerization and orchestration
- **CORS Middleware** - Cross-origin resource sharing configuration

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Docker and Docker Compose

### 1. Clone the Repository
```bash
git clone <repository-url>
cd cambium-ai-task
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python3 -m venv .venv

# Activate virtual environment
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Database Setup
```bash
# Start PostgreSQL database
docker-compose up -d db

# Run database migrations
cd backend
source .venv/bin/activate
alembic upgrade head
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
source .venv/bin/activate
python main.py
```
The API will be available at `http://localhost:8000`

### Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:8080`

### Access Points
- **Frontend Application**: http://localhost:8080
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs (Swagger UI)
- **Alternative API Docs**: http://localhost:8000/redoc

## 📋 Usage

1. **Add Tasks**: Enter task description and click "Add Task"
2. **Complete Tasks**: Click the checkbox to mark tasks as completed
3. **View Tasks**: All tasks are displayed with real-time updates
4. **Task States**: Completed tasks show with strikethrough text and grayed-out appearance

## 🏗 Project Structure

```
cambium-ai-task/
├── frontend/                   # React TypeScript application
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # Shadcn/ui components
│   │   │   └── TodoApp.tsx   # Main todo application component
│   │   ├── lib/              # Utility functions and API client
│   │   │   └── api.ts        # API service layer with type definitions
│   │   ├── pages/            # Page components
│   │   ├── hooks/            # Custom React hooks
│   │   └── main.tsx          # Application entry point
│   ├── package.json          # Frontend dependencies
│   └── vite.config.ts        # Vite configuration
├── backend/                    # FastAPI application
│   ├── alembic/               # Database migration files
│   ├── crud.py                # Database CRUD operations
│   ├── database.py            # Database connection and session management
│   ├── main.py                # FastAPI application entry point
│   ├── models.py              # SQLAlchemy database models
│   ├── schemas.py             # Pydantic data validation schemas
│   ├── requirements.txt       # Python dependencies
│   └── alembic.ini           # Alembic configuration
├── docker-compose.yml         # Docker services configuration
├── .env                       # Environment variables
├── .env.example              # Environment variables template
└── README.md                 # Project documentation
```

## 🔌 API Endpoints

### Tasks
- `GET /tasks/` - Retrieve all tasks
- `GET /tasks/{task_id}` - Retrieve a specific task
- `POST /tasks/` - Create a new task
- `PUT /tasks/{task_id}` - Update an existing task
- `DELETE /tasks/{task_id}` - Delete a task

### Health & Info
- `GET /` - Root endpoint with welcome message
- `GET /health` - Health check endpoint

### Task Data Model
```json
{
  "id": 1,
  "title": "Complete the todo application",
  "completed": false
}
```

## 🧪 Development Notes

### Database Migrations
```bash
# Create a new migration
alembic revision --autogenerate -m "Description of changes"

# Apply migrations
alembic upgrade head

# Rollback to previous migration
alembic downgrade -1
```

### Environment Variables
The application uses the following environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_USER` - Database username
- `POSTGRES_PASSWORD` - Database password
- `POSTGRES_DB` - Database name
- `API_HOST` - FastAPI host (default: localhost)
- `API_PORT` - FastAPI port (default: 8000)

### CORS Configuration
The backend is configured to accept requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (Create React App default)
- `http://localhost:8080` (Current frontend port)

## 🔧 Development Commands

### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

### Backend
```bash
python main.py              # Start FastAPI server
alembic upgrade head        # Apply database migrations
alembic revision --autogenerate -m "message"  # Create new migration
```

## 🐳 Docker Commands

```bash
docker-compose up -d db     # Start only PostgreSQL database
docker-compose up -d        # Start all services
docker-compose down         # Stop all services
docker-compose logs db      # View database logs
```

## 🚀 Production Deployment

For production deployment, consider:

1. **Environment Variables**: Use production database credentials
2. **CORS Origins**: Update allowed origins for your domain
3. **Database**: Use managed PostgreSQL service (AWS RDS, Google Cloud SQL, etc.)
4. **Frontend**: Build and serve static files via CDN
5. **Backend**: Deploy using Docker containers or serverless functions
6. **SSL/TLS**: Enable HTTPS for secure communication

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](issues).
