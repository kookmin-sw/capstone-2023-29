import pandas as pd
import psycopg2

conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="myuser",
    password="mypassword"
)

df = pd.read_sql_query("SELECT * FROM bus_data", conn)
df.to_csv('./datas/bus_data2.csv', index=False)
