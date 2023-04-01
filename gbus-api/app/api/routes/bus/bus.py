from fastapi import APIRouter, Depends

from app.services.bus import BusService

router = APIRouter()


@router.get("/bus/{bus_name}")
def get_bus_by_name(
    bus_name: str,
    bus_service: BusService = Depends(BusService),
):
    result = bus_service.get_bus(bus_name)
    if result is None:
        return {"message": "Bus not found"}
    return result


@router.get("/bus/bus_stop/{bus_name}")
def get_bus_stop_by_name(
    bus_name: str,
    bus_service: BusService = Depends(BusService),
):
    result = bus_service.get_bus_stop(bus_name)
    if result is None:
        return {"message": "Bus stop not found"}
    return result