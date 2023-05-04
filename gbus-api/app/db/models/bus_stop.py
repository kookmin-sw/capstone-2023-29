from sqlalchemy import Column, Integer, String

from app.db.dependencies import Base


class TblBusStop(Base):
    __tablename__ = "bus_stop"

    id = Column(Integer, primary_key=True)
    bus_id = Column(String(64))
    bus_name = Column(String(64))
    station_id = Column(String(64))
    station_name = Column(String(64))
    stop_order = Column(Integer)
