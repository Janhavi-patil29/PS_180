from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
import uuid
from datetime import datetime

# --- Permission Schemas ---
class PermissionBase(BaseModel):
    permission_name: str = Field(..., min_length=3, max_length=50, description="Unique name of the permission")

class PermissionCreate(PermissionBase):
    pass # No extra fields needed for creation initially

class Permission(PermissionBase):
    permission_id: int
    # roles: List['Role'] = [] # Avoid circular dependency for now

    class Config:
        from_attributes = True # Replaces orm_mode=True in Pydantic v2+

# --- Role Schemas ---
class RoleBase(BaseModel):
    role_name: str = Field(..., min_length=3, max_length=50, description="Unique name of the role")

class RoleCreate(RoleBase):
    pass # No extra fields needed for creation initially

class Role(RoleBase):
    role_id: int
    permissions: List[Permission] = []

    class Config:
        from_attributes = True

# --- User Schemas ---
class UserBase(BaseModel):
    username: str = Field(..., min_length=3, max_length=50, pattern="^[a-zA-Z0-9_-]+$", description="Unique username")
    email: EmailStr = Field(..., description="Valid email address")

class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="User password (will be hashed)")
    role_id: int = Field(..., description="ID of the role assigned to the user")

class User(UserBase):
    user_id: uuid.UUID
    role_id: int
    created_at: datetime
    updated_at: datetime
    role: Role # Include related role information

    class Config:
        from_attributes = True

# --- Token Schemas (for Authentication) ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None
    user_id: Optional[str] = None # Store user_id as string in token payload
    role: Optional[str] = None
    permissions: Optional[List[str]] = None

# --- Update Schemas (Optional, if needed later) ---
# class UserUpdate(BaseModel):
#     email: Optional[EmailStr] = None
#     role_id: Optional[int] = None