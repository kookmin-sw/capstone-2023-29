from typing import Optional, List, Tuple

from sqlalchemy import func
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

        return bus_stops

    def get_stations_by_partial_name(self, partial_name: str):
        # Partial name에 일치하는 모든 정류장 조회
        matched_stations = (
            self._session.query(TblBusStop.station_id, TblBusStop.station_name)
            .filter(TblBusStop.station_name.like(f"%{partial_name}%"))
            .group_by(TblBusStop.station_id, TblBusStop.station_name)
            .order_by(TblBusStop.station_name)
        ).all()

        if not matched_stations:
            raise Exception("정류장이 없습니다.")

        result = []
        for station_id, station_name in matched_stations:
            # 해당 정류장의 다음 정류장 조회
            next_stop = (
                self._session.query(TblBusStop.next_stop)
                .filter(TblBusStop.station_id == station_id)
                .first()
            )

            if not next_stop:
                raise Exception("정류장에 버스가 없습니다.")

            result.append(
                {
                    "station_id": station_id,
                    "station_name": station_name,
                    "next_stop": next_stop[0],
                }
            )

        return result

    def get_bus_stop_by_id(self, station_id: str):
        bus_stops = (
            self._session.query(TblBusStop)
            .filter(TblBusStop.station_id == station_id)
            .order_by(TblBusStop.stop_order)
            .all()
        )

        return bus_stops
