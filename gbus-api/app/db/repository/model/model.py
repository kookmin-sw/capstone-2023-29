from fastapi import Depends
from sqlalchemy import desc, func, extract, case
from sqlalchemy.orm import Session

from app.db.dependencies import provide_db_session
from app.db.models.bus_data import BusData


class ModelRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_latest_buses_by_route_and_plate(self, route_id: str):
        subquery = (
            self._session.query(
                BusData,
                func.row_number()
                .over(order_by=BusData.date_time.desc(), partition_by=BusData.plate_no)
                .label("row_number"),
            )
            .filter(BusData.route_id == route_id)
            .subquery()
        )

        results = (
            self._session.query(
                subquery.c.station_order,
                extract("hour", subquery.c.date_time).label("hour"),
                (extract("minute", subquery.c.date_time) // 10).label("min"),
                (extract("dow", subquery.c.date_time) - 1).label("day_of_week"),
                subquery.c.plate_type,
                case(
                    ((extract("dow", subquery.c.date_time) - 1).in_([5, 6]), 1), else_=0
                ).label("is_weekend"),
                subquery.c.plate_no,
            )
            .filter(subquery.c.row_number <= 5)
            .order_by(subquery.c.plate_no, desc(subquery.c.date_time))
            .all()
        )

        grouped_results = {}
        for row in results:
            plate_no = row.plate_no
            if plate_no not in grouped_results:
                grouped_results[plate_no] = []
            grouped_results[plate_no].append(
                [
                    int(row.station_order),
                    int(row.hour),
                    int(row.min),
                    int(row.day_of_week),
                    int(row.plate_type),
                    int(row.is_weekend),
                ]
            )

        return grouped_results
