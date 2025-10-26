# user-service/src/main.py
from fastapi import FastAPI

# --- Import DB components and Models FIRST ---
from core.database import engine # Import the engine
from domains.users.models import Base # Import Base from where models are defined
import domains.users.models # Import the models module itself to ensure registration
# ---------------------------------------------

# --- Create database tables ---
# Now call create_all using the imported Base and engine
Base.metadata.create_all(bind=engine)
# -----------------------------

# Import the router AFTER potentially creating tables
from domains.users import router as user_router

app = FastAPI(
    title="User & Auth Service",
    description="Manages users, roles, and authentication.",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"service": "User & Auth Service", "status": "ok"}

# Include the user router
app.include_router(user_router.router)