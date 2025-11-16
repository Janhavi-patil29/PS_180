# metadata-service/src/main.py
from fastapi import FastAPI

# Import DB components and Models FIRST
from core.database import engine
from domains.projects.models import Base # Import Base from where models are defined
import domains.projects.models # Import the models module itself

# --- Create database tables ---
# This creates the 'projects' table if it doesn't exist
Base.metadata.create_all(bind=engine)
# -----------------------------

# Import the router
from domains.projects import router as projects_router

app = FastAPI(
    title="Metadata Service",
    description="Manages DPR project metadata, status, and AI results.",
    version="0.1.0"
)

@app.get("/")
def read_root():
    return {"service": "Metadata Service", "status": "ok"}

# Include the projects router
app.include_router(projects_router.router)