from typing import Any, Dict, Optional

from pydantic import BaseSettings


"""
중요 정보
"""
class AppSettings(BaseSettings):
    DEBUG: bool = False
    REDOC_URL: Optional[str] = None
    DOCS_URL: Optional[str] = "/docs"
    TITLE: str = "GBUS"
    VERSION: str = "0.0.1"
    DESCRIPTION: str = "GBUS API Open API Docs"
    WRITE_DB_URL: str = "postgresql://myuser:mypassword@localhost/mydb"

    @property
    def fastapi_kwargs(self) -> Dict[str, Any]:
        return {
            "debug": self.DEBUG,
            "redoc_url": self.REDOC_URL,
            "title": self.TITLE,
            "version": self.VERSION,
            "description": self.DESCRIPTION,
            "openapi_url": None,
        }