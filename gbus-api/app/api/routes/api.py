from fastapi import APIRouter

from app.api.routes.user.user import router as user_router
from app.api.routes.bus.bus import router as bus_router

api_router = APIRouter()
api_router.include_router(user_router, tags=["user"], prefix="/v1")
# api_router.include_router(bus_router, tags=["bus"], prefix="/v1")