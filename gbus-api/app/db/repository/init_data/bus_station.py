import json
import xml.etree.ElementTree as ET
import requests
import xmljson as xmljson

from bus_station_map import add_bus_stops, add_buses, add_stations


def save_bus_stops():
    # Load the route_map from file
    with open("../../../../datas/route.json", "r") as f:
        route_map = json.load(f)

    with open("../../../../datas/station.json", "r") as f:
        station_map = json.load(f)

    with open("../../../../datas/red_bus.json", "r") as f:
        red_bus_map = json.load(f)

    red_buses = []
    stations = []

    print(red_bus_map)
    for station_id, station_name in station_map.items():
        stations.append([station_id, station_name])

    for route_id, route_name in route_map.items():
        if route_name in red_bus_map:
            red_buses.append([route_id, route_name, 1])

    base_url = "http://openapi.gbis.go.kr/ws/rest/busrouteservice/station?serviceKey=1234567890&routeId={}"
    result = []
    for red_bus in red_buses:
        route_id = red_bus[0]
        route_name = red_bus[1]
        url = base_url.format(route_id)
        response = requests.get(url)
        xml_str = response.text

        # Convert the response from xml to json
        xml_element = ET.fromstring(xml_str)
        json_data = xmljson.parker.data(xml_element)

        order = 1

        if json_data.get("msgBody") is None:
            continue

        for data in json_data["msgBody"]["busRouteStationList"]:
            result.append(
                [route_id, route_name, data["stationId"], data["stationName"], order]
            )
            order += 1

    # Bulk add bus data to db
    add_bus_stops(result)
    add_buses(red_buses)
    add_stations(stations)


save_bus_stops()
