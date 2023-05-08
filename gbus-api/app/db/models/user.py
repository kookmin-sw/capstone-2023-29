from tokenize import String

from pydantic import BaseModel
from sqlalchemy import Column, Integer


class TblUser(BaseModel):
    __tablename__ = "user"

    id: Column(Integer, primary_key=True, index=True)
    username: Column(String, unique=True, index=True, nullable=False)
    email: Column(String, unique=True, index=True, nullable=False)
    password: Column(String, nullable=False)
