from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import psycopg2

from app.db.models.bus import TblBus
from app.db.models.bus_stop import TblBusStop
from app.db.models.station import TblStation

# Define the database connection and create the engine
db_url = "postgresql://myuser:mypassword@localhost/mydb"
engine = create_engine(db_url)

# Define the ORM Base object
Base = declarative_base()

# Create the table in the database
Base.metadata.create_all(engine)

# Create a session object
Session = sessionmaker(bind=engine)


def add_buses(result):
    session = Session()
    buses = []

    for data in result:
        print(f"Adding bus: {data[0]}, {data[1]}, {data[2]}, type: {type(data[2])}")
        bus = TblBus(bus_id=data[0], bus_name=data[1], plate=data[2])
        buses.append(bus)

    session.add_all(buses)
    session.commit()


def add_stations(result):
    session = Session()
    stations = []

    for data in result:
        station = TblStation(station_id=data[0], station_name=data[1])
        stations.append(station)

    session.add_all(stations)
    session.commit()


def add_bus_stops(result):
    session = Session()
    bus_stop = []

    for index, data in enumerate(result):
        next_stop = "종점"
        if index + 1 < len(result):
            if result[index + 1][4] == 1:
                next_stop = "종점"
            else:
                next_stop = result[index + 1][3]  # 다음 정류장의 station_name 가져오기

        bus_st = TblBusStop(
            bus_id=data[0],
            bus_name=data[1],
            station_id=data[2],
            station_name=data[3],
            stop_order=data[4],
            next_stop=next_stop,  # 다음 정류장의 station_name 추가
        )
        bus_stop.append(bus_st)

    session.add_all(bus_stop)
    session.commit()
