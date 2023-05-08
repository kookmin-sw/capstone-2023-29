from pydantic import BaseModel, EmailStr


class UserCreateForm(BaseModel):
    username: str
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
