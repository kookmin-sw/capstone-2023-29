from sqlalchemy import Column, Integer, String

from app.db.db import Base


class TblStation(Base):
    __tablename__ = 'station'
    id = Column(Integer, primary_key=True)
    station_id = Column(String(64))
    station_name = Column(String(64))
    region_name = Column(String(64))
