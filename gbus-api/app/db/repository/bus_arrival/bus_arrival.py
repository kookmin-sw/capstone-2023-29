import requests
import json
import xml.etree.ElementTree as ET
import xmljson as xmljson
from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session
from app.models.domain.bus_arrival import BusArrivalDto


class BusArrivalRepository:
    @classmethod
    def get_bus_arrival_list(
        cls, service_key, station_id, route_id=None, sta_order=None
    ):
        url = "http://apis.data.go.kr/6410000/busarrivalservice/getBusArrivalList"
        params = {
            "serviceKey": service_key,
            "stationId": station_id,
        }
        if route_id:
            params["routeId"] = route_id
        if sta_order:
            params["staOrder"] = sta_order

        response = requests.get(url, params=params)

        xml_str = response.text

        # Convert the response from xml to json
        xml_element = ET.fromstring(xml_str)
        json_data = xmljson.parker.data(xml_element)

        result = []
        for data in json_data["msgBody"]["busArrivalList"]:
            route_id = data["routeId"]
            predictTime1 = data["predictTime1"]
            predictTime2 = data["predictTime2"]
            remainSeatCnt1 = data["remainSeatCnt1"]
            remainSeatCnt2 = data["remainSeatCnt2"]
            result.append(
                BusArrivalDto(
                    route_id=route_id,
                    predictTime1=predictTime1,
                    predictTime2=predictTime2,
                    remainSeatCnt1=remainSeatCnt1,
                    remainSeatCnt2=remainSeatCnt2,
                )
            )
        return result
