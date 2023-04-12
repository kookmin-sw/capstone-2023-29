from typing import Optional, List, Tuple
from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session
from app.db.models.bus_stop import TblBusStop
from app.db.models.station import TblStation


class StationRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_station_by_name(self, station_name: str):
        return (
            self._session.query(TblStation)
            .filter(TblStation.station_name == station_name)
            .first()
        )

    def get_buses_by_station(self, station_name: str):
        bus_stops = (
            self._session.query(TblBusStop)
            .filter(TblBusStop.station_name == station_name)
            .order_by(TblBusStop.stop_order)
            .all()
        )

        buses = [bus_stop.bus_name for bus_stop in bus_stops]

        # remove duplicates
        unique_buses = list(set(buses))
        return unique_buses
