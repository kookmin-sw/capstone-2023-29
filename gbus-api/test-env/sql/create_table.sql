CREATE TABLE bus (
  id serial PRIMARY KEY,
  bus_id varchar(64) NOT NULL,
  bus_name varchar(64) NOT NULL,
  plate integer
);

CREATE TABLE station (
  id serial PRIMARY KEY,
  station_id varchar(64) NOT NULL,
  station_name varchar(64) NOT NULL,
  region_name varchar(64)
);

CREATE TABLE bus_stop (
    id serial PRIMARY KEY,
    bus_id varchar(64),
    bus_name varchar(64),
    station_id varchar(64),
    station_name varchar(64),
    stop_order INTEGER,
    next_stop varchar(64)
);

CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL
);

CREATE TABLE favorite_bus (
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    bus_id VARCHAR NOT NULL,
    bus_name VARCHAR NOT NULL
);

CREATE TABLE favorite_station (
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    station_id VARCHAR NOT NULL,
    station_name VARCHAR NOT NULL
);

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

