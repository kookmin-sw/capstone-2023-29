from fastapi import Depends
from sqlalchemy import desc, func, extract, case, and_
from sqlalchemy.orm import Session
from sqlalchemy import desc
from sqlalchemy.orm import aliased

from app.db.dependencies import provide_db_session
from app.db.models.bus_data import BusData


class ModelRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_latest_buses_by_route_and_plate(self, route_id: str):
        # Alias for the subquery
        subquery = aliased(BusData)

        # Subquery to get the latest buses by plate_no
        latest_buses_subquery = (
            self._session.query(
                subquery,
                func.row_number()
                .over(
                    order_by=subquery.date_time.desc(), partition_by=subquery.plate_no
                )
                .label("row_number"),
            )
            .filter(subquery.route_id == route_id)
            .subquery()
        )

        # Main query to get the desired columns including station_id and station_seq
        results = (
            self._session.query(
                latest_buses_subquery.c.station_order,
                extract("hour", latest_buses_subquery.c.date_time).label("hour"),
                (extract("minute", latest_buses_subquery.c.date_time) // 10).label(
                    "min"
                ),
                (extract("dow", latest_buses_subquery.c.date_time) - 1).label(
                    "day_of_week"
                ),
                latest_buses_subquery.c.plate_type,
                case(
                    (
                        (extract("dow", latest_buses_subquery.c.date_time) - 1).in_(
                            [5, 6]
                        ),
                        1,
                    ),
                    else_=0,
                ).label("is_weekend"),
                latest_buses_subquery.c.plate_no,
                BusData.station_id,
                BusData.station_order,
            )
            .join(
                BusData,
                and_(
                    BusData.plate_no == latest_buses_subquery.c.plate_no,
                    BusData.date_time == latest_buses_subquery.c.date_time,
                ),
            )
            .filter(latest_buses_subquery.c.row_number <= 5)
            .order_by(
                latest_buses_subquery.c.plate_no,
                desc(latest_buses_subquery.c.date_time),
            )
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
                    row.station_id,
                    int(row.station_order),
                ]
            )
        return grouped_results
