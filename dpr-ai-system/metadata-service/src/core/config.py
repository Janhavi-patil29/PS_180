# metadata-service/src/core/config.py
import os
from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Read the database URL from the environment variable
    DATABASE_URL: str = Field(..., env="DATABASE_URL")

    class Config:
        env_file = '.env'
        extra = 'ignore'

settings = Settings()