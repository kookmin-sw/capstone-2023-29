from datetime import timedelta, datetime

from fastapi import Depends, HTTPException
from jwt import jwt

from app.db.repository.user.user import UserRepository
from app.main import get_app_settings
from app.models.schema.user import UserCreateForm
import bcrypt


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


class UserService:
    def __init__(
        self,
        user_repository: UserRepository = Depends(UserRepository),
        settings=Depends(get_app_settings),
    ):
        self.user_repository = user_repository
        self.settings = settings

    def authenticate_user(self, username: str, password: str):
        user = self.user_repository.get_user_by_username(username=username)
        if not user:
            return False
        if bcrypt.checkpw(password.encode("utf-8"), user.password.encode("utf-8")):
            return True
        return True

    def create_access_token(self, data: dict, expires_delta: timedelta = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(
            to_encode, self.settings.SECRET_KEY, algorithm=self.settings.ALGORITHM
        )
        return encoded_jwt

    def create_new_user(self, user: UserCreateForm):
        existing_user = self.user_repository.get_user_by_username(
            username=user.username
        )
        if existing_user:
            raise HTTPException(status_code=400, detail="Username already taken")
        hashed_password = hash_password(user.password)
        user.password = hashed_password
        created_user = self.user_repository.create_user(user=user)
        return created_user
