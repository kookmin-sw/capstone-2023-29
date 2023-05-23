from fastapi import FastAPI, Depends
from starlette.middleware.cors import CORSMiddleware

from app.api.routes.api import api_router
from app.core.config import get_app_settings
from app.core.settings.app import AppSettings
from app.db.dependencies import init_db


def get_application() -> FastAPI:
    application = FastAPI()
    settings = get_app_settings()
    application.include_router(api_router)

    origins = ["http://localhost", "http://localhost:80", "http://localhost:3000", "http://www.jarih.net", "http://jarih.net", "http://220.117.11.63:3000"]

    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    init_db("postgresql://myuser:mypassword@localhost/mydb")

    return application


app = get_application()
