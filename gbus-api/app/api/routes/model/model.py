from fastapi import APIRouter, Depends

from app.services.model import ModelService

router = APIRouter()


@router.post("/predict")
def predict(route_id: str, model_service: ModelService = Depends(ModelService)):
    result = model_service.get_bus_window_data(route_id=route_id)
    predictions = {}

    for plate_no, values in result.items():
        plate_predictions = []
        print(plate_no, values)
        inference_result = model_service.inference(values)
        plate_predictions.append(inference_result)

        predictions[plate_no] = plate_predictions
    return {"predictions": predictions}
