from fastapi import Depends

from app.db.repository.station.station import StationRepository


class StationService:
    def __init__(
        self, station_repository: StationRepository = Depends(StationRepository)
    ):
        self.station_repository = station_repository

    def get_station_by_name(self, station_name: str):
        return self.station_repository.get_station_by_name(station_name=station_name)

    def get_buses_by_station(self, station_name: str):
        return self.station_repository.get_buses_by_station(station_name=station_name)

    def get_stations_by_partial_name(self, partial_name: str):
        return self.station_repository.get_stations_by_partial_name(
            partial_name=partial_name
        )
