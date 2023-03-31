import json
import xml.etree.ElementTree as ET
import requests
import xmljson as xmljson

from app.db.repository.bus_station_map import add_bus_stops, add_buses, add_stations


def save_bus_stops():

    # Load the route_map from file
    with open("../../../datas/route.json", "r") as f:
        route_map = json.load(f)

    with open("../../../datas/station.json", "r") as f:
        station_map = json.load(f)


    buses = []
    stations = []

    for station_id, station_name in station_map.items():
        stations.append([station_id, station_name])

    for route_id, route_name in route_map.items():
        buses.append([route_id, route_name, 0])

    base_url = "http://openapi.gbis.go.kr/ws/rest/busrouteservice/station?serviceKey=1234567890&routeId={}"
    val = 0
    result = []
    for route_id, route_name in route_map.items():
        if val > 100:
            break
        val+=1
        url = base_url.format(route_id)
        response = requests.get(url)
        xml_str = response.text

        # Convert the response from xml to json
        xml_element = ET.fromstring(xml_str)
        json_data = xmljson.parker.data(xml_element)

        order = 1
        for data in json_data["msgBody"]["busRouteStationList"]:
            result.append([route_id, route_name, data["stationId"], data["stationName"], order])
            print([route_id, route_name, data["stationId"], data["stationName"], order])
            order += 1

    # Bulk add bus data to db
    add_bus_stops(result)
    add_buses(buses)
    add_stations(stations)
    print(result)

save_bus_stops()