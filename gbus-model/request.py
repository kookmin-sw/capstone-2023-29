import requests
import json

url = "http://127.0.0.1:8000/predict/"
data = {
    "time": 12.5,
    "station_order": 5,
    "bus_number": 120,
}
headers = {"Content-Type": "application/json"}

response = requests.post(url, data=json.dumps(data), headers=headers)
print(response.json())
