import json
import os

import requests
import xml.etree.ElementTree as ET
import xmljson as xmljson

from app.models.domain.bus_arrival import BusArrivalDto, BusLocationDto


class BusArrivalRepository:
    def __init__(self):
        route_map_path = os.path.join(os.path.dirname(__file__), "route.json")
        station_map_path = os.path.join(os.path.dirname(__file__), "station.json")
        with open(route_map_path, "r") as f:
            self.route_map = json.load(f)
        with open(station_map_path, "r") as f:
            self.station_map = json.load(f)

    def get_bus_arrival_list(
        self, service_key, station_id, route_id=None, sta_order=None
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
            if data is None:
                continue
            bus_id = data["routeId"]
            bus_name = self.route_map[str(bus_id)]
            predictTime1 = data["predictTime1"]
            predictTime2 = data["predictTime2"]
            remainSeatCnt1 = data["remainSeatCnt1"]
            remainSeatCnt2 = data["remainSeatCnt2"]
            result.append(
                BusArrivalDto(
                    bus_id=bus_id,
                    bus_name=bus_name,
                    predictTime1=predictTime1,
                    predictTime2=predictTime2,
                    remainSeatCnt1=remainSeatCnt1,
                    remainSeatCnt2=remainSeatCnt2,
                )
            )
        return result

    def get_bus_location(self, bus_id: str):
        url = "http://openapi.gbis.go.kr/ws/rest/buslocationservice"
        params = {"serviceKey": "1234567890", "routeId": bus_id}

        response = requests.get(url, params=params)

        xml_str = response.text

        # Convert the response from xml to json
        xml_element = ET.fromstring(xml_str)
        json_data = xmljson.parker.data(xml_element)

        result = []
        for data in json_data["msgBody"]["busArrivalList"]:
            if data is None:
                continue
            end_bus = data["end_bus"]
            plateType = data["plateType"]
            remainSeatCnt = data["remainSeatCnt"]
            bus_id = data["routeId"]
            bus_name = self.route_map[bus_id]
            station_id = data["stationId"]
            station_name = data[station_id]
            stationSeq = data["stationSeq"]
            result.append(
                BusLocationDto(
                    end_bus=end_bus,
                    plateType=plateType,
                    remainSeatCnt=remainSeatCnt,
                    bus_id=bus_id,
                    bus_name=bus_name,
                    station_id=station_id,
                    station_name=station_name,
                    stationSeq=stationSeq,
                )
            )
        return result
