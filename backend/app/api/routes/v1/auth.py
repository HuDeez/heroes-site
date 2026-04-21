import datetime

from backend.database.service.refresh_token import RefreshTokenService
from fastapi import APIRouter, HTTPException, Request, status

from database.service import SessionService

router = APIRouter(prefix="/auth", tags=["Auth API"])


@router.get("/")
async def get_me(request: Request):
    cookie_session_id = request.cookies.get("session_id")
    cookie_refresh_token = request.cookies.get("refresh_token")
    now = datetime.datetime.now(tz=datetime.UTC)

    if cookie_session_id is None and cookie_refresh_token is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    session = await SessionService.find_by_id(cookie_session_id)

    if session is None:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)

    if session.expired_at < now:
        refresh_token = await RefreshTokenService.find_by_id(
            cookie_refresh_token,
        )
        if refresh_token is None or refresh_token.expired_at < now:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
