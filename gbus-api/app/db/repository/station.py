from typing import Optional, List, Tuple
from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session
from app.db.models.station import TblStation


class StationRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_station(self, station_id: int) -> Tuple[int, str]:
        self._session.query(TblStation).filter(TblStation.id == station_id).first()