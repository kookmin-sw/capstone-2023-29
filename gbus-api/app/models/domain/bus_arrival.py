from typing import Optional

from pydantic import BaseModel


class BusArrivalDto(BaseModel):
    bus_id: str
    bus_name: str
    predictTime1: Optional[str]
    predictTime2: Optional[str]
    remainSeatCnt1: str
    remainSeatCnt2: str


class BusLocationDto(BaseModel):
    end_bus: str
    plateType: int
    plateNo: str
    remainSeatCnt: int
    bus_id: str
    bus_name: str
    station_id: str
    station_name: str
    stationSeq: int


class BusArrivalResponseDto(BaseModel):
    data: list[BusArrivalDto]


class BusLocationResponseDto(BaseModel):
    data: list[BusLocationDto]
