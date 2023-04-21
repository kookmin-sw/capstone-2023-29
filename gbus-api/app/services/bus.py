from fastapi import Depends

from app.db.models.bus import TblBus
from app.db.repository.bus.bus import BusRepository
from app.db.repository.bus_arrival.bus_arrival import BusArrivalRepository


class BusService:
    def __init__(
        self,
        bus_repository: BusRepository = Depends(BusRepository),
        bus_arrival_repository: BusArrivalRepository = Depends(BusArrivalRepository),
    ):
        self.bus_repository = bus_repository
        self.bus_arrival_repository = bus_arrival_repository
        self.service_key = "5Y1vKkq9+6RqZKFBlomJU9uIG1nG0qvTr4ny+3qE/oTsIyGh0VTFKdRfFfH8bQ2cf604CCBtBl2N6gDZ7hjSTA=="

    def get_bus(self, bus_name: str):
        return self.bus_repository.get_bus(bus_name=bus_name)

    def get_bus_stop(self, bus_name: str):
        return self.bus_repository.get_bus_stop_by_name(bus_name=bus_name)

    def get_bus_stop(self, bus_id: str):
        return self.bus_repository.get_bus_stop_by_id(bus_id=bus_id)

    def get_buses_by_partial_number(self, partial_number: str) -> list[TblBus]:
        return self.bus_repository.get_buses_by_partial_number(
            partial_number=partial_number
        )

    def get_bus_arrival_list(
        self, station_id: str, route_id: str = None, sta_order: str = None
    ):
        return self.bus_arrival_repository.get_bus_arrival_list(
            service_key=self.service_key,
            station_id=station_id,
            route_id=route_id,
            sta_order=sta_order,
        )
