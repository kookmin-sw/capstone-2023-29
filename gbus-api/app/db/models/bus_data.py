from sqlalchemy import Column, Integer, String, TIMESTAMP

from app.db.dependencies import Base


class BusData(Base):
    __tablename__ = "bus_data"
    id = Column(Integer, primary_key=True, autoincrement=True)
    date_time = Column(TIMESTAMP(timezone=True))
    plate_no = Column(String)
    plate_type = Column(Integer)
    route_id = Column(String)
    route_name = Column(String)
    remaining_seats = Column(Integer)
    station_id = Column(String)
    station_name = Column(String)
    station_order = Column(Integer)
