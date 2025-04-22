from typing import Annotated

from fastapi import Request, HTTPException, Depends, Form
from passlib.context import CryptContext
from starlette import status

from api.v1.auth.sessions.repository import SessionRepository
from api.v1.entities.admin.repository import AdminRepository
from api.v1.entities.admin.schema import AdminORM, AdminBaseModel

crypto_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(plain_password, hashed_password):
    return crypto_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return crypto_context.hash(password)


async def is_valid_user(
        username: Annotated[str, Form(...)],
        password: Annotated[str, Form(...)],
        repository: AdminRepository = Depends()
) -> str:
    unauthorized = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
        )

    user = await repository.find_by_username(username)

    if user is None:
        raise unauthorized

    hashed_password = user.password
    check_password = verify_password(password, hashed_password)

    if not check_password:
        raise unauthorized

    return username


async def is_valid_user_session(
        request: Request,
        admin_repository: AdminRepository = Depends(),
        session_repository: SessionRepository = Depends()
) -> AdminORM:
    invalid_session = HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Invalid session'
        )

    session_id = request.cookies.get("Authorization")

    if not session_id:
        raise invalid_session

    valid_session = await session_repository.find_by_id(session_id)

    if valid_session is None:
        raise invalid_session

    user_orm = await admin_repository.find_by_username(valid_session.username)
    user = AdminBaseModel(**user_orm.__dict__)

    return user
