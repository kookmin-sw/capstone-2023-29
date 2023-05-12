from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session
from app.db.models.bus import TblBus
from app.db.models.bus_stop import TblBusStop


class BusRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_bus(self, bus_name: str):
        return self._session.query(TblBus).filter(TblBus.bus_name == bus_name).first()

    def get_bus_stop_by_name(self, bus_name: str):
        bus_stops = (
            self._session.query(TblBusStop)
            .filter(TblBusStop.bus_name == bus_name)
            .order_by(TblBusStop.stop_order)
            .all()
        )

        stations = [bus_stops[0].station_name, bus_stops[-1].station_name]
        for bus_stop in bus_stops:
            stations.append(bus_stop.station_name)

        return stations

    def get_bus_stop_by_id(self, bus_id: str):
        bus_stops = (
            self._session.query(TblBusStop)
            .filter(TblBusStop.bus_id == bus_id)
            .order_by(TblBusStop.stop_order)
            .all()
        )

        stations = [bus_stops[0].station_name, bus_stops[-1].station_name]
        for bus_stop in bus_stops:
            stations.append(bus_stop.station_name)
        """
        중복 고려 필요
        """
        return stations

    def get_buses_by_partial_number(self, partial_number: str):
        return (
            self._session.query(TblBusStop)
            .filter(TblBusStop.bus_name.like(f"%{partial_number}%"))
            .filter(TblBusStop.next_stop == "종점")
            .order_by(TblBusStop.bus_name)
            .all()
        )
