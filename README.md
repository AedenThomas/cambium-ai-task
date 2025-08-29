# Full-Stack Todo Application

A simple and useful CRUD to-do app, built as part of the Cambium AI Graduate Software Developer task. This project was developed in under 2 hours by maximally leveraging AI tools for planning, scaffolding, and implementation.

The application features a modern React/TypeScript frontend prototyped with **Lovable**, a robust Python **FastAPI** backend, and a persistent **PostgreSQL** database managed with **Docker**.

## Key Features

- **Full CRUD Functionality**: Create, read, and mark tasks as complete.
- **Data Persistence**: All tasks are saved across sessions in a PostgreSQL database.
- **Modern Stack**: Built with React, TypeScript, FastAPI, and SQLAlchemy.
- **Excellent DX**: Simple setup with Docker Compose and clear run commands.
- **Automated Migrations**: Database schema managed by Alembic.
- **Robust API**: Well-structured, validated, and tested API endpoints.
- **Polished UI/UX**: Includes loading, empty, and error states for a smooth user experience.

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, TanStack Query
- **Backend**: Python, FastAPI, Pydantic, SQLAlchemy
- **Database**: PostgreSQL
- **DevOps & Tooling**: Docker, Docker Compose, Alembic, Pytest

---

## 🚀 How to Run

### Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- Docker & Docker Compose

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd aedenthomas-cambium-ai-task
```

### Step 2: Configure Environment Variables

Create a `.env` file in the project root by copying the example. No changes are needed to run locally with the default settings.

```bash
cp .env.example .env
```

### Step 3: Start the Database

Run the PostgreSQL database container using Docker Compose.

```bash
docker-compose up db -d
```

### Step 4: Setup and Run the Backend

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create and activate a Python virtual environment:**

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    # On Windows, use: .venv\Scripts\activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Run database migrations:**

    ```bash
    alembic upgrade head
    ```

5.  **Start the FastAPI server:**
    ```bash
    uvicorn main:app --reload
    ```
    The backend API will be running at `http://localhost:8000`.

### Step 5: Setup and Run the Frontend

1.  **In a new terminal, navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:8080`.

**API Base URL:** The frontend is configured to communicate with the backend at `http://localhost:8000/api/v1`. This can be changed in `frontend/src/lib/api.ts` if needed.

---

## 🤖 Process & AI Tool Usage

My process was designed to maximize efficiency and quality within the 2-hour timebox by strategically delegating tasks to a suite of AI tools.

#### Phase 1: Planning and Frontend Scaffolding (Google AI Studio & Lovable)

I began by using **Google AI Studio** to interact with Gemini. My goal was to draft a comprehensive, high-level plan for the entire project. I then tasked it with a meta-prompting exercise: "Draft an expert-level, comprehensive prompt for an AI UI generator that follows advanced prompting techniques to produce a polished, modern to-do application UI." This ensured the prompt given to Lovable was rich in detail, covering component libraries (shadcn/ui), a specific design system (colors, fonts, spacing), and desired states (empty, loading). This front-loading of detail minimized the need for iterative, time-consuming follow-up prompts in Lovable.

#### Phase 2: Agentic Backend Development and Integration (Cursor)

Once I downloaded the generated frontend from Lovable, I moved to my local environment and used **Cursor** alongside **Cline**. I leveraged its agentic capabilities to execute the backend and integration phases of my plan.

Instead of asking the AI to write small, isolated functions, I used it as a pair programmer, guiding it with high-level, context-rich prompts based on established software engineering principles. My prompting strategy focused on:

- **Providing Context:** "You are building a FastAPI backend for a to-do app. Here is the existing frontend structure. Create a corresponding backend structure with directories for schemas, models, and CRUD operations."
- **Describing Ideas Comprehensively:** "Implement the full set of CRUD endpoints for the `Task` model. Ensure you use Pydantic for request/response validation, handle 404 errors for non-existent tasks, and use proper dependency injection for the database session."
- **Specifying Frameworks and Best Practices:** "Integrate Alembic for database migrations. Initialize it, configure `env.py` to use our models, and generate the initial migration to create the `tasks` table."

#### Phase 3: Automated Process Logging

To maintain a clear and auditable trail of my interactions with the AI agent, I have a custom rule in my Cursor/Cline configuration that automatically logs key development steps and AI-driven architectural decisions to the `AGENTS.md` file. This serves as a transparent development log, detailing the project's evolution and the role AI played at each stage.

---

## Assumptions and Trade-offs

- **State Management:** I chose **TanStack Query (React Query)** for frontend server state management. It simplifies data fetching, caching, and synchronization, significantly reducing boilerplate compared to `useState`/`useEffect` for API calls.
- **Security:** The API is open for simplicity. In a production environment, I would implement authentication (e.g., OAuth2 with JWTs) to secure the endpoints.
- **Testing:** For the backend, I used an in-memory SQLite database for tests to ensure they are fast and isolated, which is a standard practice. The frontend lacks dedicated tests due to the time constraint.
- **Error Handling:** Backend error handling is robust (HTTP exceptions). Frontend error handling is implemented for key interactions (API fetching, mutations) using toasts, but could be extended to more granular cases.

## TODOs (If I had more time)

- **User Authentication**: Add user registration and login to support multi-user functionality.
- **Frontend Testing**: Add unit and integration tests for React components using Vitest and React Testing Library.
- **Advanced Features**: Implement features like task editing, due dates, and task filtering (e.g., all/active/completed).

## Time Spent

- **Total Time:** 5:50 PM - 7:00 PM (1 hour 10 minutes)
