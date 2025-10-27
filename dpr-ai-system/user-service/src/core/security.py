# user-service/src/core/security.py
import os
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone # Import timezone
from typing import Optional, List
from jose import JWTError, jwt
from pydantic import ValidationError # To handle potential validation errors
# Import schemas if needed for type hints, though TokenData might be defined elsewhere
# For simplicity, assuming TokenData structure is known or defined here/imported
# from domains.users import schemas # Avoid potential circular import, define TokenData structure if needed

# --- Hashing Setup (Keep existing code) ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies a plain password against a hashed password."""
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    """Hashes a plain password."""
    return pwd_context.hash(password)

# --- JWT Configuration ---
# !! Important: Generate a strong, random secret key !!
# Use: openssl rand -hex 32
# Store this securely, e.g., in an environment variable, NOT hardcoded
SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7") # Example, load from env
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # Token validity period

# --- JWT Token Creation ---
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Creates a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        # Default expiration time
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- JWT Token Decoding/Validation (Add later if needed for protected routes) ---
# def decode_access_token(token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         # Add validation for claims like username, user_id etc. here if needed
#         # Example using a Pydantic model:
#         # token_data = schemas.TokenData(**payload)
#         return payload # Or return token_data
#     except JWTError:
#         return None # Or raise specific exception
#     except ValidationError:
#         return None # Or raise validation exception

# --- Add Helper to get user details for token payload (optional) ---
# This might go in service.py or here depending on structure
# def get_user_details_for_token(user: models.User) -> dict:
#     permissions = [p.permission_name for p in user.role.permissions]
#     return {
#         "sub": user.username, # 'sub' (subject) is standard claim for username
#         "user_id": str(user.user_id),
#         "role": user.role.role_name,
#         "permissions": permissions
#     }