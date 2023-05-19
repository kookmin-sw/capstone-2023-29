from fastapi import FastAPI
from sqlalchemy import Column, Integer, String, TIMESTAMP
from sqlalchemy.orm import Session

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import psycopg2


Base = declarative_base()
app = FastAPI()

# Define the database connection and create the engine
db_url = "postgresql://myuser:mypassword@localhost/mydb"
engine = create_engine(db_url)

# Define the ORM Base object
Base = declarative_base()

# Create the table in the database
Base.metadata.create_all(engine)

# Create a session object
Session = sessionmaker(bind=engine)


class BusData(Base):
    __tablename__ = 'bus_data'
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


def add_bus_data(date_time: str, plate_no: str, plate_type: str, route_id: str, route_name: str, remaining_seats: int,
                 station_id: str, station_name: str, station_order: int
                 ):
    session = Session()
    bus_data = BusData(date_time=date_time, plate_no=plate_no, plate_type=plate_type, route_id=route_id,
                       route_name=route_name, remaining_seats=remaining_seats, station_id=station_id,
                       station_name=station_name, station_order=station_order)

    session.add(bus_data)
    session.commit()
    return {"message": "Data added successfully"}
