from typing import Tuple

from fastapi import APIRouter

from app.db.repository.bus import BusRepository

router = APIRouter()


@router.get("/bus/{bus_id}")
async def get_bus(bus_id: int) -> Tuple[int, str]:
    busRepository = BusRepository()
    result = busRepository.get_bus(bus_id)
    if result is None:
        return {"message": "Bus not found"}
    return {"id": result[0], "name": result[1]}