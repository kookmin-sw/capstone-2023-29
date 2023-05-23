from fastapi import APIRouter, Depends, HTTPException
from app.services.model import ModelService
from app.api.routes.model.use_model import LSTMModel

router = APIRouter()


# @router.post("/predict")
# def predict(
#     route_id: str,
#     model_service: ModelService = Depends(ModelService),
#     model: LSTMModel = Depends(LSTMModel),
# ):
#     result = model_service.get_bus_window_data(route_id=route_id)
#     predictions = {}

#     for plate_no, values in result.items():
#         plate_predictions = []
#         pre_values = []

#         for value in values:
#             new_value = value[:6]  # 첫 번째 5개의 값 추출
#             pre_values.append(new_value)
        
#         print(plate_no, values)
#         station_id = values[-1][6]
#         station_seq = values[-1][0]
#         prediction_values = model.inference(pre_values, route_id)
#         plate_predictions.append({
#                 "predictions": prediction_values,
#                 "station_id": station_id,
#                 "station_seq": station_seq
#             })
#         predictions[plate_no] = plate_predictions
#     predictions = dict(sorted(predictions.items(), key=lambda item: item[1][0]['station_seq']))
#     return {"predictions": predictions}

@router.post("/predict")
def predict(
    route_id: str,
    model_service: ModelService = Depends(ModelService),
    model: LSTMModel = Depends(LSTMModel),
):
    result = model_service.get_bus_window_data(route_id=route_id)
    
    station_datas = model_service.get_station_data(route_id=route_id)
    station_sequences = [[] for _ in range(station_datas["length"])]
    for plate_no, values in result.items():
        pre_values = []

        for value in values:
            new_value = value[:6]  # Extract first 5 values
            pre_values.append(new_value)

        print(plate_no, values)
        station_id = values[-1][6]
        station_seq = values[-1][0]
        prediction_values = model.inference(pre_values, route_id)

        for i, v in enumerate(prediction_values):
            if station_seq+i >= station_datas["length"]:
                break
            station_sequences[station_seq+i].append(v)    
        # # Add the prediction to its corresponding station sequence
        # station_sequences[station_seq-1].append({
        #     "predictions": [{'index': i, 'remainingSeat': v} for i, v in enumerate(prediction_values)],
        #     "station_id": station_id,
        #     "station_seq": station_seq
        # })

    # Fill in all station sequences
    # for i, val in enumerate(station_sequences):
    #     if val is None:
    # station_sequences[i] = {"predictions": None, "station_id": station_datas["station_ids"][i], "station_seq": i+1}
    for i, station_sequence in enumerate(station_sequences):
        if not station_sequence:  # If station sequence is empty
            station_sequences[i] = [None]

    return station_sequences

@router.post("/predict_ver2")
def predict(
    route_id: str,
    model_service: ModelService = Depends(ModelService),
    model: LSTMModel = Depends(LSTMModel),
):
    result = model_service.get_bus_window_data(route_id=route_id)
    
    # station_datas = model_service.get_station_data(route_id=route_id)
    # station_sequences = [[] for _ in range(station_datas["length"])]
    predictions = {}
    for plate_no, values in result.items():
        plate_predictions = []
        pre_values = []

        for value in values:
            new_value = value[:6]  # Extract first 5 values
            pre_values.append(new_value)

        print(plate_no, values)
        station_id = values[-1][6]
        station_seq = values[-1][0]
        prediction_values = model.inference(pre_values, route_id)

        plate_predictions.append({
                "predictions": prediction_values,
                "station_id": station_id,
                "station_seq": station_seq
            })
        predictions[plate_no] = plate_predictions
    return {"predictions": predictions}