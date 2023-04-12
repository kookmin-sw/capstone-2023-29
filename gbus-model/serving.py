import torch
from fastapi import FastAPI
from pydantic import BaseModel

# Load the pre-trained model
model = torch.load("bus_predict_model0.pt")

# Define the input data model
class InputData(BaseModel):
    time: float
    station_order: int
    bus_number: int

# Define the output data model
class OutputData(BaseModel):
    remaining_seats: float

app = FastAPI()

def predict_remaining_seats(model, station_order, bus_number, time):
    x = torch.tensor([station_order, bus_number, time], dtype=torch.float32).unsqueeze(0)
    with torch.no_grad():
        y_pred = model(x)
    return y_pred.item()

@app.post("/predict/", response_model=OutputData)
def predict(input_data: InputData):
    remaining_seats = predict_remaining_seats(model, input_data.station_order, input_data.bus_number, input_data.time)
    return {"remaining_seats": remaining_seats}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)