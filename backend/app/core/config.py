from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

# Base directory for the application
BASE_DIR = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "Interview RAG API"
    DATABASE_URL: str = f"sqlite+aiosqlite:///{BASE_DIR}/data/interview.db"
    CHROMA_PERSIST_DIR: str = f"{BASE_DIR}/data/chroma_index"
    
    # Add other settings as needed (e.g. OpenAI API Key)
    OPENAI_API_KEY: str | None = None

    model_config = SettingsConfigDict(env_file=f"{BASE_DIR}/.env", extra="ignore")

settings = Settings()
