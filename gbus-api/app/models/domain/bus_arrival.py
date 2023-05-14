from typing import Optional

from pydantic import BaseModel


class BusArrivalDto(BaseModel):
    bus_id: str
    bus_name: str
    predictTime1: Optional[str]
    predictTime2: Optional[str]
    remainSeatCnt1: str
    remainSeatCnt2: str


class BusArrivalResponseDto(BaseModel):
    data: list[BusArrivalDto]
