from pydantic import BaseModel, EmailStr


class UserCreateForm(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLoginRequest(BaseModel):
    username: str
    password: str


class UserLoginRequest(BaseModel):
    username: str
    password: str


class UserCreateResponseForm(BaseModel):
    username: str
    email: str
    success: bool


class UserResponse(BaseModel):
    id: int
    username: str
    email: str


class Token(BaseModel):
    access_token: str
    token_type: str


class UserInLogin(BaseModel):
    userEmail: str
    userId: int
