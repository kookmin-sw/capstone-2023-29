from pydantic import BaseModel


class FavoriteBusResponse(BaseModel):
    user_id: int
    bus_id: str
    bus_name: str
    last_station: str

    class Config:
        orm_mode = True


class FavoriteStationResponse(BaseModel):
    user_id: int
    station_id: str
    station_name: str
    next_station: str

    class Config:
        orm_mode = True


class FavoriteBusCreateForm(BaseModel):
    bus_id: str
    last_station: str


class FavoriteStationCreateForm(BaseModel):
    station_id: str
    next_station: str
