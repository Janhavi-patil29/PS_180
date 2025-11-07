# user-service/src/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # <-- 1. Import CORSMiddleware

# --- Import DB components and Models FIRST ---
from core.database import engine
from domains.users.models import Base
import domains.users.models 

# --- Create database tables ---
Base.metadata.create_all(bind=engine)

# Import the router AFTER potentially creating tables
from domains.users import router as user_router

app = FastAPI(
    title="User & Auth Service",
    description="Manages users, roles, and authentication.",
    version="0.1.0"
)

# --- 2. Define Allowed Origins ---
origins = [
    "http://localhost:5173", # Vite dev server
    "http://localhost:3000", # Docker frontend service (for later)
]

# --- 3. Add CORS Middleware to the App ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # Allow specific origins
    allow_credentials=True,    # Allow cookies (if needed)
    allow_methods=["*"],       # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],       # Allow all headers
)
# ------------------------------------

@app.get("/")
def read_root():
    return {"service": "User & Auth Service", "status": "ok"}

# Include the user router
app.include_router(user_router.router)