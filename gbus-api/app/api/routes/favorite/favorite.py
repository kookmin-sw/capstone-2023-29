from typing import List, Union

from fastapi import APIRouter, Depends

from app.models.schema.favorite import (
    FavoriteBusResponse,
    FavoriteStationResponse,
    FavoriteBusCreateForm,
    FavoriteStationCreateForm,
)
from app.services.favorite import FavoriteService
from app.services.user import UserService

router = APIRouter()


@router.get("/favorite/bus", response_model=List[FavoriteBusResponse])
async def get_favorite_buses(
    service: FavoriteService = Depends(FavoriteService),
    user_id: int = Depends(UserService.get_user_info),
):
    return service.get_favorite_buses(user_id=user_id)


@router.get("/favorite/station", response_model=List[FavoriteStationResponse])
async def get_favorite_stations(
    service: FavoriteService = Depends(FavoriteService),
    user_id: int = Depends(UserService.get_user_info),
):
    return service.get_favorite_stations(user_id=user_id)


@router.get(
    "/favorites",
    response_model=List[Union[FavoriteBusResponse, FavoriteStationResponse]],
)
async def get_favorites(
    service: FavoriteService = Depends(FavoriteService),
    user_id: int = Depends(UserService.get_user_info),
):
    return service.get_favorites(user_id=user_id)


@router.post("/favorite/bus", response_model=FavoriteBusResponse)
async def add_favorite_bus(
    form: FavoriteBusCreateForm,
    service: FavoriteService = Depends(FavoriteService),
    user_id: int = Depends(UserService.get_user_info),
):
    return service.add_favorite_bus(user_id=user_id, bus_id=form.bus_id)


@router.post("/favorite/station", response_model=FavoriteStationResponse)
async def add_favorite_station(
    form: FavoriteStationCreateForm,
    service: FavoriteService = Depends(FavoriteService),
    user_id: int = Depends(UserService.get_user_info),
):
    return service.add_favorite_station(user_id=user_id, station_id=form.station_id)


@router.delete("/favorite/bus/{bus_id}", response_model=bool)
async def delete_favorite_bus(
    bus_id: str,
    service: FavoriteService = Depends(FavoriteService),
    user_id: int = Depends(UserService.get_user_info),
):
    return service.delete_favorite_bus(user_id=user_id, bus_id=bus_id)


@router.delete("/favorite/station/{station_id}", response_model=bool)
async def delete_favorite_station(
    station_id: str,
    service: FavoriteService = Depends(FavoriteService),
    user_id: int = Depends(UserService.get_user_info),
):
    return service.delete_favorite_station(user_id=user_id, station_id=station_id)
