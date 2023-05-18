from sqlalchemy import desc, func, extract, case
from db import BusData, Session


def get_latest_buses_by_route_and_plate(session: Session, route_id: str):
    subquery = (
        session.query(
            BusData,
            func.row_number().over(
                order_by=BusData.date_time.desc(),
                partition_by=BusData.plate_no
            ).label('row_number')
        )
        .filter(BusData.route_id == route_id)
        .subquery()
    )

    results = (
        session.query(
            subquery.c.station_order,
            extract('hour', subquery.c.date_time).label('hour'),
            extract('minute', subquery.c.date_time).label('min'),
            extract('dow', subquery.c.date_time).label('day_of_week'),
            subquery.c.plate_type,
            case(
                (extract('dow', subquery.c.date_time).in_([5, 6]), 1),
                else_=0
            ).label('is_weekend')
        )
        .filter(subquery.c.row_number <= 5)
        .order_by(
            subquery.c.plate_no,
            desc(subquery.c.date_time)
        )
        .all()
    )

    for result in results:
        print(f"('station_order': {result.station_order}, 'hour': {result.hour}, 'min': {result.min}, 'day_of_week': {result.day_of_week}, 'plateType': {result.plate_type}, 'is_weekend': {result.is_weekend})")

    return results


get_latest_buses_by_route_and_plate(Session(), '219000013')