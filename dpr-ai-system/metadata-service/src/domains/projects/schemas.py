# metadata-service/src/domains/projects/schemas.py
from pydantic import BaseModel, Field
from typing import Optional, Any, Dict
import uuid
from datetime import datetime

# --- Project Schemas ---

# Base schema: Fields common to creation and response
class ProjectBase(BaseModel):
    project_name: str = Field(..., min_length=3, max_length=150)
    # We can add more fields here later if needed for creation,
    # e.g., owner_id: Optional[uuid.UUID] = None

# Create schema: Fields required when creating a new project
# Initially, we might only need the name, as the AI will populate the rest.
class ProjectCreate(ProjectBase):
    pass # Add any other fields required *at creation* here

# Update schema: Fields that can be updated (e.g., by the AI services)
class ProjectUpdate(BaseModel):
    status: Optional[str] = None
    risk_score: Optional[float] = None
    risk_level: Optional[str] = None
    compliance_status: Optional[Dict[str, Any]] = None
    extracted_data: Optional[Dict[str, Any]] = None
    raw_text_content: Optional[str] = None

# Full Project schema: Used for API responses
class Project(ProjectBase):
    project_id: uuid.UUID
    status: str
    created_at: datetime
    updated_at: datetime
    risk_score: Optional[float] = None
    risk_level: Optional[str] = None
    compliance_status: Optional[Dict[str, Any]] = None
    extracted_data: Optional[Dict[str, Any]] = None
    # raw_text_content: Optional[str] = None # Optionally exclude heavy text field from general responses

    class Config:
        from_attributes = True # Pydantic v2+ (replaces orm_mode=True)