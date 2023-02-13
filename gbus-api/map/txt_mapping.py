import json

routes = {}
stations = {}

"""
Mapping route_data.txt, station_data.txt to route.json, station.json
"""

with open("../datas/route_data.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        data = line.strip().split("^")
        for record in data:
            fields = record.split("|")
            route_id, route_nm = fields[0], fields[1]
            if route_id == "ROUTE_ID":
                continue
            routes[route_id] = route_nm
            print("{}:{}".format(route_id, route_nm))

with open("../datas/station_data.txt", "r") as f:
    lines = f.readlines()
    for line in lines:
        data = line.strip().split("^")
        for record in data:
            fields = record.split("|")
            station_id, station_nm = fields[0], fields[1]
            if station_id == "STATION_ID":
                continue
            stations[station_id] = station_nm
            print("{}:{}".format(station_id, station_nm))

with open('../datas/route.json', 'w') as file:
    file.write(json.dumps(routes, indent=4))

with open('../datas/station.json', 'w') as file:
    file.write(json.dumps(stations, indent=4))
