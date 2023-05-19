from fastapi import Depends
from request_model import RequestModelRepository


class ModelService:
    def __init__(
            self,
            request_model: RequestModelRepository = Depends(RequestModelRepository)
    ):
        self.request_model = request_model

    def get_bus_window_data(self, route_id: str):
        return self.request_model.get_latest_buses_by_route_and_plate(route_id)
