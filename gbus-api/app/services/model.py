from fastapi import Depends

from app.db.repository.model.model import ModelRepository


class ModelService:
    def __init__(self, model_repository: ModelRepository = Depends(ModelRepository)):
        self.model_repository = model_repository

    def get_bus_window_data(self, route_id: str):
        return self.model_repository.get_latest_buses_by_route_and_plate(route_id)
