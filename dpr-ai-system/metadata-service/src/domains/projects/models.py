import uuid
from sqlalchemy import Column, String, TIMESTAMP, ForeignKey, Integer, Float, Text, JSON
from sqlalchemy.dialects.postgresql import UUID as PgUUID
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base

# Create the Base class for our models to inherit from
Base = declarative_base()

class Project(Base):
    __tablename__ = 'projects'

    # Core Project Fields
    project_id = Column(PgUUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    project_name = Column(String, nullable=False, index=True)
    status = Column(String, default="Processing", nullable=False, index=True) # e.g., Processing, Pending Review, Approved
    created_at = Column(TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = Column(TIMESTAMP(timezone=True), default=func.now(), onupdate=func.now())

    # Risk Assessment Fields (populated by AI)
    risk_score = Column(Float, nullable=True) # A numerical score (e.g., 0.0 to 1.0)
    risk_level = Column(String, nullable=True, index=True) # e.g., Low, Medium, High
    compliance_status = Column(JSON, nullable=True) # Store checklist results, e.g., {"EPC_Clause": "Missing", "Land_Clearance": "Found"}

    # Extracted Data Fields (populated by AI)
    # Store extracted entities as structured JSON
    extracted_data = Column(JSON, nullable=True) 
    # Store the full raw text for reference
    raw_text_content = Column(Text, nullable=True) 

    # --- Relationships (Example for later) ---
    # Link to the user who uploaded it (optional, requires user_id from User service)
    # owner_id = Column(PgUUID(as_uuid=True), index=True) # This would be a foreign key in a full system

    def __repr__(self):
        return f"<Project(project_name='{self.project_name}', status='{self.status}', risk_level='{self.risk_level}')>"