from sqlalchemy import Column, Integer, String

from app.db.dependencies import Base


class TblBus(Base):
    __tablename__ = "bus"

    id = Column(Integer, primary_key=True)
    bus_id = Column(String(64))
    bus_name = Column(String(64))
    plate = Integer
