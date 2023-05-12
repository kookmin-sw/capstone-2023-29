from fastapi import APIRouter, Depends

from app.services.station import StationService

router = APIRouter()


@router.get("/station/{station_name}")
def get_station_by_name(
    station_name: str, station_service: StationService = Depends(StationService)
):
    result = station_service.get_station_by_name(station_name=station_name)
    if result is None:
        return {"message": "Bus not found"}
    return result


@router.get("/station/buses/{station_name}")
def get_buses_by_station(
    station_name: str, station_service: StationService = Depends(StationService)
):
    result = station_service.get_buses_by_station(station_name=station_name)
    if result is None:
        return {"message": "Bus stop not found"}
    return result


@router.get("/search/station")
def get_stations_by_partial_name(
    partial_name: str, station_service: StationService = Depends(StationService)
):
    results = station_service.get_stations_by_partial_name(partial_name=partial_name)
    if not results:
        return {"message": "No stations found"}
    return results


@router.get("/station/bus_stop/{station_id}")
def get_bus_stop_by_id(
    station_id: str,
    station_service: StationService = Depends(StationService),
):
    result = station_service.get_bus_stop_by_id(station_id)
    if result is None:
        return {"message": "Bus stop not found"}
    return result
