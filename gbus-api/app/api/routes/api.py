from fastapi import APIRouter

from app.api.routes.user.user import router as user_router
from app.api.routes.bus.bus import router as bus_router
from app.api.routes.station.station import router as station_router
from app.api.routes.favorite.favorite import router as favorite_router
from app.api.routes.model.model import router as model_router

api_router = APIRouter()
api_router.include_router(user_router, tags=["users"], prefix="/v1")
api_router.include_router(bus_router, tags=["bus"], prefix="/v1")
api_router.include_router(station_router, tags=["station"], prefix="/v1")
api_router.include_router(favorite_router, tags=["favorite"], prefix="/v1")
api_router.include_router(model_router, tags=["model"], prefix="/v1")
