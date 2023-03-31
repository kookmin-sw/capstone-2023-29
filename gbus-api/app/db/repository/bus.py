from typing import Optional, List, Tuple
from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session
from app.db.models.bus import TblBus


class BusRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_bus(self, bus_id: int) -> Tuple[int, str]:
        self._session.query(TblBus).filter(TblBus.id == bus_id).first()