from pydantic import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    PROJECT_NAME: str = "HRMS Lite Backend"

    class Config:
        env_file = ".env"

settings = Settings()
