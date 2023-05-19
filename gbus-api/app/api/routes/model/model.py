import requests
from fastapi import APIRouter

router = APIRouter()


@router.post("/predict/{route_id}")
def predict(route_id: str):
    url = "http://127.0.0.1:3030"
    route_id = "219000013"

    payload = {"route_id": route_id}
    headers = {"Content-Type": "application/json"}

    response = requests.post(url + "/v1/predict")
    results = response.json()
    return results
