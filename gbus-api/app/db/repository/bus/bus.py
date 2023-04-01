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

    def get_bus_stop(self, bus_name: str):
        bus_stops = (
            self._session.query(TblBusStop)
            .filter(TblBusStop.bus_name == bus_name)
            .order_by(TblBusStop.stop_order)
            .all()
        )

        stations = [bus_stop.station_name for bus_stop in bus_stops]
        return stations
