import requests
import xmljson
import xml.etree.ElementTree as ET
import json
import datetime
import db


def store_bus_data():
    # Load the route_map from file
    with open("../datas/route.json", "r") as f:
        route_map = json.load(f)

    with open("../datas/station.json", "r") as f:
        station_map = json.load(f)

    result = [["현재 시간", "차량 번호", "차량 번호", "남은 좌석", "정류소 id", "정류소 이름", "정류소 순서"]]

    base_url = "http://openapi.gbis.go.kr/ws/rest/buslocationservice?serviceKey=1234567890&routeId={}"
    for route_id, route_name in route_map.items():
        url = base_url.format(route_id)
        response = requests.get(url)
        xml_str = response.text
        print(xml_str)

        # Convert the response from xml to json
        xml_element = ET.fromstring(xml_str)
        json_data = xmljson.parker.data(xml_element)

        # Handle a situation in which the request is ignored
        if len(json_data) == 1:
            continue

        # resultCode is not 0
        if json_data["msgHeader"]["resultCode"] != 0:
            continue

        for data in json_data["msgBody"]["busLocationList"]:
            print(data)
            if "remainSeatCnt" in data:
                if data == "remainSeatCnt":
                    continue
                now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                plate_no = data["plateNo"]
                remain_seat_cnt = data["remainSeatCnt"]
                station_id = data["stationId"]
                if str(station_id) not in station_map:
                    print(station_id)
                    continue
                station_name = station_map[str(station_id)]
                station_seq = data["stationSeq"]
                result.append([now, plate_no, route_name, remain_seat_cnt, station_id, station_name, station_seq])
                """
                TODO : need db bulk_add_bus_data method instead add_bus_data method
                """
                db.add_bus_data(now, plate_no, route_name, remain_seat_cnt, station_id, station_name, station_seq)
                print([now, plate_no, route_name, remain_seat_cnt, station_id, station_name, station_seq])

    # Write the bus_location to file
    now = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    file_name = "./datas/bus_location_{}.json".format(now)
    with open(file_name, "w") as f:
        for data in result:
            f.write(",".join(str(x) for x in data) + "\n")


store_bus_data()
