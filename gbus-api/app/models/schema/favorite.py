from pydantic import BaseModel


class FavoriteBusResponse(BaseModel):
    id: int
    user_id: int
    bus_id: str
    bus_name: str


class FavoriteStationResponse(BaseModel):
    id: int
    user_id: int
    station_id: str
    station_name: str


class FavoriteBusCreateForm(BaseModel):
    bus_id: str


class FavoriteStationCreateForm(BaseModel):
    station_id: str
