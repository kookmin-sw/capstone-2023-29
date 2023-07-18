from typing import List, Union

from fastapi import APIRouter, Depends

from app.api.dependencies.credential import get_user_info
from app.models.schema.favorite import (
    FavoriteBusResponse,
    FavoriteStationResponse,
    FavoriteBusCreateForm,
    FavoriteStationCreateForm,
)
from app.models.schema.user import UserResponse
from app.services.favorite import FavoriteService

router = APIRouter()


@router.get("/favorite/bus", response_model=List[FavoriteBusResponse])
def get_favorite_buses(
    service: FavoriteService = Depends(FavoriteService),
    user_info: UserResponse = Depends(get_user_info),
):
    return service.get_favorite_buses(user_id=user_info.id)


@router.get("/favorite/station", response_model=List[FavoriteStationResponse])
def get_favorite_stations(
    service: FavoriteService = Depends(FavoriteService),
    user_info: UserResponse = Depends(get_user_info),
):
    return service.get_favorite_stations(user_id=user_info.id)


@router.get(
    "/favorites",
    response_model=List[Union[FavoriteBusResponse, FavoriteStationResponse]],
)
def get_favorites(
    service: FavoriteService = Depends(FavoriteService),
    user_info: UserResponse = Depends(get_user_info),
):
    return service.get_favorites(user_id=user_info.id)


@router.post("/favorite/bus", response_model=FavoriteBusResponse)
def add_favorite_bus(
    form: FavoriteBusCreateForm,
    service: FavoriteService = Depends(FavoriteService),
    user_info: UserResponse = Depends(get_user_info),
):
    return service.add_favorite_bus(
        user_id=user_info.id, bus_id=form.bus_id, last_station=form.last_station
    )


@router.post("/favorite/station", response_model=FavoriteStationResponse)
def add_favorite_station(
    form: FavoriteStationCreateForm,
    service: FavoriteService = Depends(FavoriteService),
    user_info: UserResponse = Depends(get_user_info),
):
    print(form.station_id)
    return service.add_favorite_station(
        user_id=user_info.id, station_id=form.station_id, next_station=form.next_station
    )


@router.delete("/favorite/bus/{bus_id}", response_model=bool)
def delete_favorite_bus(
    bus_id: str,
    service: FavoriteService = Depends(FavoriteService),
    user_info: UserResponse = Depends(get_user_info),
):
    return service.delete_favorite_bus(user_id=user_info.id, bus_id=bus_id)


@router.delete("/favorite/station/{station_id}", response_model=bool)
def delete_favorite_station(
    station_id: str,
    service: FavoriteService = Depends(FavoriteService),
    user_info: UserResponse = Depends(get_user_info),
):
    return service.delete_favorite_station(user_id=user_info.id, station_id=station_id)
