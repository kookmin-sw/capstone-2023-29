from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.routes.api import api_router
from app.core.settings.app import AppSettings
from app.db.dependencies import init_db


def get_app_settings():
    return AppSettings()


def get_application() -> FastAPI:
    application = FastAPI()
    settings = get_app_settings()
    # application = FastAPI(**settings.fastapi_kwargs)
    application.include_router(api_router)

    origins = [
        "http://localhost",
        "http://localhost:8080",
    ]

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