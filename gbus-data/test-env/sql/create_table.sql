CREATE TABLE bus_data (
  id serial PRIMARY KEY,
  date_time timestamptz,
  plate_no text,
  plate_type text,
  route_id text,
  route_name text,
  remaining_seats integer,
  station_id text,
  station_name text,
  station_order integer
);
