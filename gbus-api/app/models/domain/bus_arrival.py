from typing import Optional

from pydantic import BaseModel


class BusArrivalDto(BaseModel):
    route_id: str
    predictTime1: Optional[str]
    predictTime2: Optional[str]
    remainSeatCnt1: str
    remainSeatCnt2: str


class BusArrivalResponseDto(BaseModel):
    data: list[BusArrivalDto]
