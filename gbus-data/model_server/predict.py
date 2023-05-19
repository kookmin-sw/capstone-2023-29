from fastapi import APIRouter
from fastapi import Depends
from model_service import ModelService
router = APIRouter()


@router.post("/predict")
def predict(route_id: str, model_service: ModelService = Depends(ModelService)):
    result = model_service.get_bus_window_data(route_id=route_id)
    predictions = {}

    for plate_no, values in result.items():
        plate_predictions = []
        for value in values:
            inference_result = model_service.model.inference(value)
            plate_predictions.append(inference_result)

        predictions[plate_no] = plate_predictions
    return {"data": result}
