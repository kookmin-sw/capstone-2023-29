from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String, Float, TIMESTAMP
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import psycopg2

Base = declarative_base()
app = FastAPI()


class BusData(Base):
    __tablename__ = 'bus_data'
    id = Column(Integer, primary_key=True)
    route_id = Column(String(64), nullable=False)
    route_name = Column(String(64), nullable=False)
    plate = Column(Integer)


class StationData(Base):
    __tablename__ = 'station_data'
    id = Column(Integer, primary_key=True)
    station_id = Column(String(64), nullable=False)
    station_name = Column(String(64), nullable=False)
    region_name = Column(String(64))


engine = create_engine("postgresql://myuser:mypassword@localhost/mydb")
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)

def add_bus_datas(bus_datas):
    session = Session()
    bus_data_objects = []

    for data in bus_datas:
        bus_data = BusData(
            timestamp=data[0],
            plate_no=data[1],
            route_name=data[2],
            remain_seat_cnt=data[3],
            station_id=data[4],
            station_name=data[5],
            station_seq=data[6]
        )
        bus_data_objects.append(bus_data)

    try:
        session.add_all(bus_data_objects)
        session.commit()
    except Exception as e:
        session.rollback()
        print(f"Error: {e}")
    finally:
        session.close()

    return {"message": "Data added successfully"}



