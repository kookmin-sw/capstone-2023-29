# Use the official PostgreSQL image from the Docker Hub
FROM postgres:11

# Set the environment variables for the PostgreSQL user and database
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydb

# Copy the SQL scripts to create the tables and insert the data
COPY ./sql/create_table.sql /docker-entrypoint-initdb.d/