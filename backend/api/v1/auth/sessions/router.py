from uuid import uuid4

from fastapi import APIRouter, Depends, Response, Request

from api.v1.auth.security import is_valid_user, is_valid_user_session
from api.v1.auth.sessions.repository import SessionRepository
from api.v1.auth.sessions.schema import SessionBaseModel
from api.v1.entities.admin.schema import AdminBaseModel

router = APIRouter(
    prefix="/api/v1/sessions",
    tags=["Менеджер сессий"]
)


@router.post("/create_session")
async def session_login(
        response: Response,
        username: str = Depends(is_valid_user),
        session_repository: SessionRepository = Depends(),
):

    session_id = uuid4().hex
    response.set_cookie(
        key="Authorization",
        value=session_id,
        secure=False,
        samesite="lax",
        max_age=9999999,
    )
    session = SessionBaseModel(
        session_id=session_id,
        username=username,
    )

    await session_repository.add(session)

    return {'message': 'Login successful!', 'session_id': session_id}


@router.post("/delete_session", dependencies=[Depends(is_valid_user_session)])
async def session_logout(
        response: Response,
        request: Request,
        repository: SessionRepository = Depends(),
):
    session_id = request.cookies.get("Authorization")
    await repository.delete_by_id(session_id)
    response.delete_cookie(key="Authorization")

    return {'message': 'Logout successful!', 'session_id': session_id}


@router.get("/whoami")
async def session_whoami(
        user: AdminBaseModel = Depends(is_valid_user_session),
):
    return user



