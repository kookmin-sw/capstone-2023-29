CREATE TABLE bus_data (
  id serial PRIMARY KEY,
  date_time timestamptz,
  plate_no text,
  route_name text,
  remaining_seats integer,
  station_id text,
  station_name text,
  station_order integer
);

-- INSERT INTO bus_data (id, date_time, plate_no, route_name, remaining_seats, station_id, station_name, station_order)
-- VALUES (1, '2023-02-12 00:27:13', '경기70바3913', '300', 32, '223000430', '내삼미동입구', 132),
--        (2, '2023-02-12 00:27:13', '경기70바3940', '300', 35, '223000052', '대우3차아파트.궐동', 137),
--        (3, '2023-02-12 00:27:13', '경기70사1011', '300', 32, '223000098', '원동초교.제일교회앞', 143),
--        (4, '2023-02-12 00:27:13', '경기70바3990', '300', 36, '201000002', '세권사거리', 116),
--        (5, '2023-02-12 00:27:13', '경기70바2577', '400', -1, '233000841', '남양성지', 163),
--        (6, '2023-02-12 00:27:13', '경기70바2525', '400', -1, '233000270', '육일리.육교동입구', 85);