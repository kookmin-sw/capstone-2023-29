import requests
import xmljson
import xml.etree.ElementTree as ET
import json
import datetime

from app.db.models.bus_data import BusData

from fastapi import FastAPI

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


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


def store_bus_data():
    with open("../route.json", "r") as f:
        route_map = json.load(f)

    with open("../station.json", "r") as f:
        station_map = json.load(f)

    result = [
        ["현재 시간", "차량 번호", "차량 아이디", "차량 번호", "남은 좌석", "정류소 id", "정류소 이름", "정류소 순서"]
    ]
    base_url = "http://openapi.gbis.go.kr/ws/rest/buslocationservice?serviceKey=1234567890&routeId={}"
    route_id = "219000013"
    route_name = "1000"
    url = base_url.format(route_id)
    response = requests.get(url)
    xml_str = response.text

    # Convert the response from xml to json
    xml_element = ET.fromstring(xml_str)
    json_data = xmljson.parker.data(xml_element)

    # Handle a situation in which the request is ignored
    if len(json_data) == 1:
        return

    # resultCode is not 0
    if json_data["msgHeader"]["resultCode"] != 0:
        return
    for data in json_data["msgBody"]["busLocationList"]:
        try:
            if "remainSeatCnt" in data:
                if data == "remainSeatCnt":
                    continue
                now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                plate_no = data["plateNo"]
                plate_type = data["plateType"]
                remain_seat_cnt = data["remainSeatCnt"]
                if remain_seat_cnt == -1 or remain_seat_cnt == "-1":
                    continue
                station_id = data["stationId"]
                station_name = station_map[str(station_id)]
                station_seq = data["stationSeq"]

                bus_data = BusData(
                    date_time=now,
                    plate_no=plate_no,
                    plate_type=plate_type,
                    route_id=route_id,
                    route_name=route_name,
                    remaining_seats=remain_seat_cnt,
                    station_id=station_id,
                    station_name=station_name,
                    station_order=station_seq,
                )
                session = Session()
                session.add(bus_data)
                session.commit()
                session.close()
                print(
                    [
                        now,
                        plate_no,
                        plate_type,
                        route_id,
                        route_name,
                        remain_seat_cnt,
                        station_id,
                        station_name,
                        station_seq,
                    ]
                )
        except:
            print("crawling error cause")


store_bus_data()
