# user-service/src/domains/users/service.py
from sqlalchemy.orm import Session
from . import models, schemas
from core.security import verify_password # Import the verification function
from typing import Optional

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    """
    Retrieves a user from the database by their username.
    Returns the User object or None if not found.
    """
    return db.query(models.User).filter(models.User.username == username).first()

def authenticate_user(db: Session, username: str, password: str) -> Optional[models.User]:
    """
    Authenticates a user.
    - Retrieves the user by username.
    - Verifies the provided password against the stored hash.
    Returns the User object if authentication is successful, otherwise None.
    """
    user = get_user_by_username(db, username=username)
    if not user:
        return None # User not found
    if not verify_password(password, user.hashed_password):
        return None # Incorrect password

    return user # Authentication successful

# Add other service functions later (e.g., get_user_by_id, get_users)