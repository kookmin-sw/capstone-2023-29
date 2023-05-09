from sqlalchemy.orm import Session

from fastapi import Depends
from app.db.dependencies import provide_db_session
from app.db.models.user import TblUser
from app.models.schema.user import UserCreateForm, UserCreateResponseForm


class UserRepository:
    def __init__(self, session: Session = Depends(provide_db_session)):
        self._session = session

    def get_user_by_id(self, user_id: int):
        return self._session.query(TblUser).filter(TblUser.id == user_id).first()

    def get_user_by_username(self, username: str):
        return self._session.query(TblUser).filter(TblUser.username == username).first()

    def create_user(self, user: UserCreateForm) -> UserCreateResponseForm:
        """
        user password는 bcrypt로 암호화된 상태
        """
        user = TblUser(username=user.username, email=user.email, password=user.password)
        self._session.add(user)
        self._session.commit()
        self._session.refresh(user)
        return UserCreateResponseForm(
            username=user.username, email=user.email, success=True
        )
