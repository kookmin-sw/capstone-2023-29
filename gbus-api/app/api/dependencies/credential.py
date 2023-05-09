import jwt
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import get_app_settings
from app.db.repository.user.user import UserRepository
from app.models.schema.user import UserResponse

jwt_security = HTTPBearer()


def get_user_info(
    credentials: HTTPAuthorizationCredentials = Depends(jwt_security),
    user_repository: UserRepository = Depends(UserRepository),
    settings=Depends(get_app_settings),
) -> UserResponse:
    try:
        payload = jwt.decode(
            credentials.credentials,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=401, detail="Invalid authentication credentials"
            )
    except Exception:
        raise HTTPException(
            status_code=401, detail="Invalid authentication credentials"
        )

    user = user_repository.get_user_by_id(user_id=user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return UserResponse(id=user.id, username=user.username, email=user.email)
