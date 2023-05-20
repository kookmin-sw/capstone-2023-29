from fastapi import APIRouter
from fastapi import Depends
from app.services.model import ModelService
from app.api.routes.model.use_model import LSTMModel

router = APIRouter()


@router.post("/predict")
def predict(
    model_service: ModelService = Depends(ModelService),
    model: LSTMModel = Depends(LSTMModel),
):
    route_id = "219000013"
    result = model_service.get_bus_window_data(route_id=route_id)
    predictions = {}

    for plate_no, values in result.items():
        plate_predictions = []
        pre_values = []

        for value in values:
            new_value = value[:6]  # 첫 번째 5개의 값 추출
            pre_values.append(new_value)
        station_id = values[0][6]
        station_seq = values[0][7]
        prediction_values = model.inference(pre_values)
        plate_predictions.append({
                "predictions": prediction_values,
                "station_id": station_id,
                "station_seq": station_seq
            })
        predictions[plate_no] = plate_predictions
    return {"predictions": predictions}
