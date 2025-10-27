from fastapi import APIRouter, Depends, HTTPException, status
# --- Add OAuth2PasswordRequestForm ---
from fastapi.security import OAuth2PasswordRequestForm
# -------------------------------------
from sqlalchemy.orm import Session
from core.database import get_db
# Add this line
from core import security
from domains.users import schemas, models, service # Import service module
from core.security import get_password_hash, create_access_token # Import create_access_token
from datetime import timedelta

router = APIRouter(
    # prefix="/users", # Remove prefix for token or create a separate auth router
    tags=["Authentication"], # Change tag for clarity
    responses={404: {"description": "Not found"}},
)

# Keep the user creation endpoint (adjust prefix/tags if router prefix removed)
# You might move user creation back to a "/users" prefix later
@router.post("/users/", response_model=schemas.User, status_code=status.HTTP_201_CREATED, tags=["Users"]) # Add Users tag back
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    """
    Creates a new user in the system.
    - **username**: Unique username (string, required)
    - **email**: Valid email address (string, required)
    - **password**: User password (string, required, min 8 chars)
    - **role_id**: ID of the role to assign (integer, required)
    """
    db_user_by_username = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user_by_username:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")

    db_user_by_email = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user_by_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    db_role = db.query(models.Role).filter(models.Role.role_id == user.role_id).first()
    if not db_role:
         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Role with ID {user.role_id} not found")

    hashed_password = get_password_hash(user.password)

    new_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password,
        role_id=user.role_id
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# --- NEW Login/Token Endpoint ---
@router.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Authenticates a user and returns an access token.
    Expects form data with 'username' and 'password'.
    """
    user = service.authenticate_user(db, username=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"}, # Standard header for auth errors
        )

    # Prepare data for the token (you can add more claims like role, user_id)
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    # Fetch permissions (example, adjust based on your models/needs)
    # permissions = [p.permission_name for p in user.role.permissions]
    token_data = {
        "sub": user.username, # Subject claim (standard)
        "user_id": str(user.user_id),
        "role": user.role.role_name if user.role else None, # Include role name if available
        # "permissions": permissions # Include permissions if needed
    }
    access_token = create_access_token(
        data=token_data, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
# -----------------------------