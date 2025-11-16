# metadata-service/src/domains/projects/router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

# Import necessary modules from this service
from core.database import get_db # We'll create this soon
from domains.projects import schemas, models # Import from the same directory

router = APIRouter(
    prefix="/projects", # All routes in this file will start with /projects
    tags=["Projects"],    # Tag for OpenAPI documentation
    responses={404: {"description": "Not found"}},
)

# --- Endpoint to create a new project record ---
@router.post("/", response_model=schemas.Project, status_code=status.HTTP_201_CREATED)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    """
    Creates a new, empty project record in the database.
    This is typically called by the Ingestion Service.
    """
    # (Add checks for duplicate project names later if needed)

    new_project = models.Project(
        project_name=project.project_name
        # Status defaults to "Processing" as defined in the model
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project) # Get generated project_id, created_at
    return new_project

# --- Endpoint to get a list of all projects ---
@router.get("/", response_model=List[schemas.Project])
def get_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieves a list of all project records.
    Used by the frontend dashboard's "Projects" page.
    """
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

# --- Endpoint to get a single project's details (for later) ---
# @router.get("/{project_id}", response_model=schemas.Project)
# def get_project(project_id: uuid.UUID, db: Session = Depends(get_db)):
#     """
#     Retrieves detailed information for a single project.
#     """
#     project = db.query(models.Project).filter(models.Project.project_id == project_id).first()
#     if project is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
#     return project

# --- Endpoint to update a project (for later) ---
# (This will be used by the AI services to post results)
# @router.patch("/{project_id}", response_model=schemas.Project)
# def update_project(project_id: uuid.UUID, update_data: schemas.ProjectUpdate, db: Session = Depends(get_db)):
#     """
#     Updates a project's fields (e.g., status, risk_score).
#     Called by AI processing services.
#     """
#     project = db.query(models.Project).filter(models.Project.project_id == project_id).first()
#     if project is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

#     # Update fields from update_data
#     update_data_dict = update_data.model_dump(exclude_unset=True) # Get only fields that were set
#     for key, value in update_data_dict.items():
#         setattr(project, key, value)

#     db.commit()
#     db.refresh(project)
#     return project