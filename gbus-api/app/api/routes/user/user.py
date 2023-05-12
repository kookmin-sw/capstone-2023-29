from datetime import timedelta

from fastapi import Depends, HTTPException, APIRouter

from app.models.schema.user import Token, UserCreateForm, UserLoginRequest
from app.services.user import UserService

router = APIRouter()


@router.post("/user/login", response_model=Token)
def login_for_access_token(
    form_data: UserLoginRequest,
    user_service: UserService = Depends(UserService),
):
    user = user_service.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token_expires = timedelta(minutes=30)
    access_token = user_service.create_access_token(
        data={"sub": user.id},
        expires_delta=access_token_expires,
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/user/register")
def register(
    user: UserCreateForm,
    user_service: UserService = Depends(UserService),
):
    return user_service.create_new_user(user=user)
