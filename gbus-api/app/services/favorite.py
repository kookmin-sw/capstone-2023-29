from datetime import timedelta, datetime
from typing import List, Union

from fastapi import Depends

from app.db.repository.favorite.favorite import FavoriteRepository
from app.db.repository.user.user import UserRepository
from app.models.schema.favorite import FavoriteBusResponse, FavoriteStationResponse


class FavoriteService:
    def __init__(
        self,
        favorite_repository: FavoriteRepository = Depends(FavoriteRepository),
        user_repository: UserRepository = Depends(UserRepository),
    ):
        self.favorite_repository = favorite_repository
        self.user_repository = user_repository

    def get_favorite_buses(self, user_id: int) -> List[FavoriteBusResponse]:
        favorite_buses = self.favorite_repository.get_favorite_bus(user_id=user_id)
        return [
            FavoriteBusResponse.from_orm(favorite_bus)
            for favorite_bus in favorite_buses
        ]

    def get_favorite_stations(self, user_id: int) -> List[FavoriteStationResponse]:
        favorite_stations = self.favorite_repository.get_favorite_station(
            user_id=user_id
        )
        return [
            FavoriteStationResponse.from_orm(favorite_station)
            for favorite_station in favorite_stations
        ]

    def get_favorites(
        self, user_id: int
    ) -> List[Union[FavoriteBusResponse, FavoriteStationResponse]]:
        favorite_buses = self.favorite_repository.get_favorite_bus(user_id=user_id)
        favorite_stations = self.favorite_repository.get_favorite_station(
            user_id=user_id
        )
        result = [
            FavoriteBusResponse.from_orm(favorite_bus)
            for favorite_bus in favorite_buses
        ] + [
            FavoriteStationResponse.from_orm(favorite_station)
            for favorite_station in favorite_stations
        ]
        return result

    def add_favorite_bus(self, user_id: int, bus_id: str) -> FavoriteBusResponse:
        user = self.user_repository.get_by_id(user_id)
        favorite_bus = self.favorite_repository.add_favorite_bus(
            user_id=user_id, bus_id=bus_id
        )
        return FavoriteBusResponse.from_orm(favorite_bus)

    def add_favorite_station(
        self, user_id: int, station_id: str
    ) -> FavoriteStationResponse:
        user = self.user_repository.get_by_id(user_id)
        favorite_station = self.favorite_repository.add_favorite_station(
            user_id=user_id, station_id=station_id
        )
        return FavoriteStationResponse.from_orm(favorite_station)

    def delete_favorite_bus(self, user_id: int, bus_id: str) -> bool:
        return self.favorite_repository.delete_favorite_bus(
            user_id=user_id, bus_id=bus_id
        )

    def delete_favorite_station(self, user_id: int, station_id: str) -> bool:
        return self.favorite_repository.delete_favorite_station(
            user_id=user_id, station_id=station_id
        )
