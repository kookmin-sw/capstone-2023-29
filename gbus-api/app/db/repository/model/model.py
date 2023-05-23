from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.dependencies import provide_db_session
from app.db.models.bus_data import BusData
from collections import defaultdict

from app.db.models.bus_stop import TblBusStop
from app.services.bus import BusService


class ModelRepository:
    def __init__(
        self,
        bus_service: BusService = Depends(BusService),
        session: Session = Depends(provide_db_session),
    ):
        self.bus_service = bus_service
        self._session = session

    def get_latest_buses_by_route_and_plate(self, route_id: str):
        # Get the current locations of all buses in operation
        current_bus_locations = self.bus_service.get_bus_location_list(route_id)

        # Use a dictionary to store the latest data of each bus
        grouped_results = defaultdict(list)

        # For each bus in operation
        for bus_location in current_bus_locations:
            plate_no = bus_location.plateNo

            # Get the latest data of this bus
            latest_data = (
                self._session.query(BusData)
                .filter_by(route_id=route_id, plate_no=plate_no)
                .order_by(BusData.date_time.desc())
                .limit(100)
                .all()
            )

            # Store the latest data of this bus in the dictionary
            for data in latest_data:
                data_time = data.date_time
                hour = data_time.hour
                minute = data_time.minute // 10
                day_of_week = data_time.weekday()
                is_weekend = 1 if day_of_week in [5, 6] else 0

                if (
                    not any(
                        data.station_order == entry[0]
                        for entry in grouped_results[plate_no]
                    )
                    and len(grouped_results[plate_no]) < 5
                ):
                    grouped_results[plate_no].append(
                        [
                            int(data.station_order),
                            hour,
                            minute,
                            day_of_week,
                            int(data.plate_type),
                            is_weekend,
                            data.station_id,
                            int(data.station_order),
                        ]
                    )

            grouped_results[plate_no].reverse()
        return grouped_results

    def get_station_data(self, route_id: str):
        bus_stops = (
            self._session.query(TblBusStop)
            .filter(TblBusStop.bus_id == route_id)
            .order_by(TblBusStop.stop_order)
            .all()
        )
        station_ids = []
        for bus_stop in bus_stops:
            station_ids.append(bus_stop.station_id)

        return {"station_ids": station_ids, "length": len(bus_stops)}