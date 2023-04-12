from fastapi import Depends

from app.db.models.bus import TblBus
from app.db.repository.bus.bus import BusRepository


class BusService:
    def __init__(
        self,
        bus_repository: BusRepository = Depends(BusRepository),
    ):
        self.bus_repository = bus_repository

    def get_bus(self, bus_name: str):
        return self.bus_repository.get_bus(bus_name=bus_name)

    def get_bus_stop(self, bus_name: str):
        return self.bus_repository.get_bus_stop(bus_name=bus_name)

    def get_buses_by_partial_number(self, partial_number: str) -> list[TblBus]:
        return self.bus_repository.get_buses_by_partial_number(
            partial_number=partial_number
        )
