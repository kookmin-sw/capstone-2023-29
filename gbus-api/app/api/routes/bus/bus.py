from fastapi import APIRouter, Depends

from app.services.bus import BusService

router = APIRouter()


@router.get("/search/bus")
def get_buses_by_partial_number(
    partial_number: str,
    bus_service: BusService = Depends(BusService),
):
    results = bus_service.get_buses_by_partial_number(partial_number)
    if not results:
        return {"message": "No buses found"}
    return results


@router.get("/bus/bus_stop_name/{bus_name}")
def get_bus_stop_by_name(
    bus_name: str,
    bus_service: BusService = Depends(BusService),
):
    result = bus_service.get_bus_stop_by_name(bus_name)
    if result is None:
        return {"message": "Bus stop not found"}
    return result


@router.get("/bus/bus_stop_id/{bus_id}")
def get_bus_stop_by_id(
    bus_id: str,
    bus_service: BusService = Depends(BusService),
):
    result = bus_service.get_bus_stop_by_id(bus_id)
    if result is None:
        return {"message": "Bus stop not found"}
    return result


@router.get("/bus_arrival_list")
def get_bus_arrival_list(
    station_id: str,
    route_id: str = None,
    sta_order: str = None,
    bus_service: BusService = Depends(BusService),
):
    return bus_service.get_bus_arrival_list(station_id, route_id, sta_order)
