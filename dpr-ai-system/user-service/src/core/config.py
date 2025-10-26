# user-service/src/core/config.py
import os
from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = Field(..., env="DATABASE_URL")

    class Config:
        env_file = '.env' # Optional: Load from a .env file if needed
        extra = 'ignore'

settings = Settings()

# Ensure necessary directories exist if they weren't created yet
# (This is just a placeholder to ensure the file runs)
# Add __init__.py files to core and domains folders if missing