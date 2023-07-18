from typing import List, Union

from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session
from app.db.models.bus import TblBus
from app.db.models.bus_stop import TblBusStop
from app.db.models.favorite import TblFavoriteBus, TblFavoriteStation
from app.db.models.station import TblStation


class FavoriteRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_favorite_bus(self, user_id: int) -> [TblFavoriteBus]:
        return (
            self._session.query(TblFavoriteBus)
            .filter(TblFavoriteBus.user_id == user_id)
            .all()
        )

    def get_favorite_station(self, user_id: int) -> TblFavoriteStation:
        return (
            self._session.query(TblFavoriteStation)
            .filter(TblFavoriteStation.user_id == user_id)
            .all()
        )

    def get_favorites(
        self, user_id: int
    ) -> List[Union[TblFavoriteBus, TblFavoriteStation]]:
        favorite_buses = (
            self._session.query(TblFavoriteBus)
            .filter(TblFavoriteBus.user_id == user_id)
            .all()
        )
        favorite_stations = (
            self._session.query(TblFavoriteStation)
            .filter(TblFavoriteStation.user_id == user_id)
            .all()
        )

        result = [favorite_buses, favorite_stations]

        return result

    def add_favorite_bus(
        self, user_id: int, bus_id: str, last_station: str
    ) -> TblFavoriteBus:
        bus = self._session.query(TblBus).filter(TblBus.bus_id == bus_id).one_or_none()
        if bus is None:
            raise ValueError(f"Bus with id {bus_id} not found")
        favorite_bus = TblFavoriteBus(
            user_id=user_id,
            bus_id=bus_id,
            bus_name=bus.bus_name,
            last_station=last_station,
        )
        self._session.add(favorite_bus)
        self._session.commit()
        self._session.refresh(favorite_bus)
        return favorite_bus

    def add_favorite_station(
        self, user_id: int, station_id: str, next_station: str
    ) -> TblFavoriteStation:
        print(station_id, next_station)
        station = self._session.query(TblStation).filter(TblStation.station_id == station_id).all()
        print(station_id)
        if station is None:
            raise ValueError(f"Station with id {station} not found")
        
        print(station_id, next_station)
        favorite_station = TblFavoriteStation(
            user_id=user_id,
            station_id=station[0].station_id,
            station_name=station[0].station_name,
            next_station=next_station,
        )
        self._session.add(favorite_station)
        self._session.commit()
        self._session.refresh(favorite_station)
        return favorite_station

    def delete_favorite_bus(self, user_id: int, bus_id: str) -> bool:
        try:
            favorite_bus = (
                self._session.query(TblFavoriteBus)
                .filter(TblFavoriteBus.user_id == user_id, TblFavoriteBus.bus_id == bus_id)
                .first()
            )
            if not favorite_bus:
                raise ValueError("No favorite bus found with provided user_id and bus_id")
            self._session.delete(favorite_bus)
            self._session.commit()
            return True
        except Exception as e:
            print(f"Error occurred: {e}")
            return False

    def delete_favorite_station(self, user_id: int, station_id: str) -> bool:
        favorite_station = (
            self._session.query(TblFavoriteStation)
            .filter(
                TblFavoriteStation.user_id == user_id,
                TblFavoriteStation.station_id == station_id,
            )
            .first()
        )
        if not favorite_station:
            return False
        self._session.delete(favorite_station)
        self._session.commit()
        return True
