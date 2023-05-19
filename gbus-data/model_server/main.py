from fastapi import FastAPI, Depends
from dependency import init_db
from api import api_router


def get_application() -> FastAPI:
    application = FastAPI()
    application.include_router(api_router)

    init_db("postgresql://myuser:mypassword@localhost/mydb")

    return application


app = get_application()
