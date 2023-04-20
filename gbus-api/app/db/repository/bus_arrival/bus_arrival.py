import requests
from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session


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
        return response.content
