import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
import os

# Add the backend directory to the path so we can import modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from main import app, get_db
from models import Base
from database import SessionLocal

# Test database URL using SQLite in-memory database
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# Create test database engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

# Create test session
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    """Override the get_db dependency for testing"""
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

# Override the dependency
app.dependency_overrides[get_db] = override_get_db

# Create the test client
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_database():
    """Setup and teardown database for each test"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    yield
    # Drop tables after test
    Base.metadata.drop_all(bind=engine)

def test_create_task():
    """Test 1: Happy Path - Create Task"""
    # Send POST request to create a task
    response = client.post(
        "/tasks/",
        json={"title": "Test the happy path", "completed": False}
    )
    
    # Assert status code is 201 (Created)
    assert response.status_code == 201
    
    # Get response data
    data = response.json()
    
    # Assert response contains correct data
    assert data["title"] == "Test the happy path"
    assert data["completed"] is False
    assert "id" in data
    assert isinstance(data["id"], int)

def test_get_nonexistent_task():
    """Test 2: Edge Case - Get Non-Existent Task"""
    # Send GET request for a task that doesn't exist
    response = client.get("/tasks/999")
    
    # Assert status code is 404 (Not Found)
    assert response.status_code == 404

def test_get_all_tasks_empty():
    """Test 3: Get all tasks when database is empty"""
    response = client.get("/tasks/")
    
    assert response.status_code == 200
    assert response.json() == []

def test_create_and_get_task():
    """Test 4: Create a task and then retrieve it"""
    # Create a task
    create_response = client.post(
        "/tasks/",
        json={"title": "Test task", "completed": False}
    )
    
    assert create_response.status_code == 201
    task_id = create_response.json()["id"]
    
    # Get the task by ID
    get_response = client.get(f"/tasks/{task_id}")
    
    assert get_response.status_code == 200
    data = get_response.json()
    assert data["title"] == "Test task"
    assert data["completed"] is False
    assert data["id"] == task_id

def test_update_task():
    """Test 5: Update task completion status"""
    # Create a task
    create_response = client.post(
        "/tasks/",
        json={"title": "Test update", "completed": False}
    )
    
    task_id = create_response.json()["id"]
    
    # Update the task
    update_response = client.put(
        f"/tasks/{task_id}",
        json={"completed": True}
    )
    
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["completed"] is True
    assert data["title"] == "Test update"

def test_delete_task():
    """Test 6: Delete a task"""
    # Create a task
    create_response = client.post(
        "/tasks/",
        json={"title": "Test delete", "completed": False}
    )
    
    task_id = create_response.json()["id"]
    
    # Delete the task
    delete_response = client.delete(f"/tasks/{task_id}")
    
    assert delete_response.status_code == 200
    
    # Verify task is deleted
    get_response = client.get(f"/tasks/{task_id}")
    assert get_response.status_code == 404

def test_root_endpoint():
    """Test 7: Root endpoint returns welcome message"""
    response = client.get("/")
    
    assert response.status_code == 200
    assert response.json()["message"] == "Todo API is running!"

def test_health_check():
    """Test 8: Health check endpoint"""
    response = client.get("/health")
    
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
