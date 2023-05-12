## Use the official PostgreSQL image from the Docker Hub
FROM postgres:11-bullseye

# Install build dependencies for Python 3.10
RUN apt-get update && apt-get install -y \
    wget \
    build-essential \
    zlib1g-dev \
    libncurses5-dev \
    libgdbm-dev \
    libnss3-dev \
    libssl-dev \
    libreadline-dev \
    libffi-dev \
    curl \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*

# Download and build Python 3.10 from source
RUN wget https://www.python.org/ftp/python/3.10.0/Python-3.10.0.tgz \
    && tar -xzf Python-3.10.0.tgz \
    && cd Python-3.10.0 \
    && ./configure --enable-optimizations \
    && make altinstall \
    && cd .. \
    && rm -rf Python-3.10.0 \
    && rm Python-3.10.0.tgz

RUN apt-get update && apt-get install -y python3-pip \
    libpq-dev

COPY ../requirements.txt /app/
RUN pip3 install --no-cache-dir -r /app/requirements.txt

RUN git clone https://github.com/kookmin-sw/capstone-2023-29.git
ENV PYTHONPATH "${PYTHONPATH}:/capstone-2023-29/gbus-api"

RUN curl -fsSL https://deb.nodesource.com/setup_14.x -o setup_14.x.sh

# Execute the downloaded script
RUN bash setup_14.x.sh && \
    apt-get update && \
    apt-get install -y nodejs


EXPOSE 3000
EXPOSE 5001

# Set the environment variables for the PostgreSQL user and database
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword
ENV POSTGRES_DB=mydb

# PostgreSQL 데이터를 지속하기 위한 Docker 볼륨 생성
VOLUME /var/lib/postgresql/data

# Copy the SQL scripts to create the tables and insert the data
COPY ./sql/create_table.sql /docker-entrypoint-initdb.d/
