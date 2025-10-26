from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
# Near the top imports
from core.database import get_db
from domains.users import schemas, models # Or just 'import schemas, models' if they are in the same dir
from core.security import get_password_hash

router = APIRouter(
    prefix="/users", # All routes in this file will start with /users
    tags=["Users"], # Tag for OpenAPI documentation
    responses={404: {"description": "Not found"}},
)

# --- User Creation Endpoint ---
@router.post("/", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Creates a new user in the system.
    - **username**: Unique username (string, required)
    - **email**: Valid email address (string, required)
    - **password**: User password (string, required, min 8 chars)
    - **role_id**: ID of the role to assign (integer, required)
    """
    # Check if username already exists
    db_user_by_username = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user_by_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    # Check if email already exists
    db_user_by_email = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user_by_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    # Check if role_id exists (basic check, improve later if needed)
    db_role = db.query(models.Role).filter(models.Role.role_id == user.role_id).first()
    if not db_role:
         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Role with ID {user.role_id} not found")

    # Hash the password (using a utility function we'll create soon)
    # hashed_password = get_password_hash(user.password)
    hashed_password = get_password_hash(user.password)
    # Create new user instance
    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role_id=user.role_id
    )

    # Add to database session and commit
    db.add(new_user)
    db.commit()
    db.refresh(new_user) # Refresh to get the generated user_id, created_at etc.

    return new_user

# --- Add more endpoints later (e.g., get user, get users, login/token) ---