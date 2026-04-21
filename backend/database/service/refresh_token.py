import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from database.config import connection
from database.repository.refresh_token import RefreshTokenRepository
from database.schemas.refresh_token import (
    RefreshToken,
    RefreshTokenCreate,
    RefreshTokenUpdate,
)
from database.service.service import Service


class RefreshTokenService(Service[RefreshTokenRepository]):
    repository = RefreshTokenRepository

    @classmethod
    @connection
    async def add(
        cls,
        refresh_token: RefreshTokenCreate,
        session: AsyncSession = None,
    ):
        dump = refresh_token.model_dump(exclude_unset=True)
        orm = cls.repository.model(**dump)
        obj = await cls.repository.create(orm, session)
        return RefreshToken.model_validate(obj)

    @classmethod
    @connection
    async def find_by_id(
        cls,
        refresh_token_id: uuid.UUID,
        session: AsyncSession = None,
    ):
        obj = await cls.repository.find_by_id(refresh_token_id, session)
        return RefreshToken.model_validate(obj)

    @classmethod
    @connection
    async def update(
        cls,
        refresh_token_id: uuid.UUID,
        params: RefreshTokenUpdate,
        session: AsyncSession = None,
    ):
        refresh_token = await cls.find_by_id(refresh_token_id)
        if refresh_token is None:
            return None
        dump = params.model_dump()
        updated = await cls.repository.update(refresh_token, dump, session)
        return RefreshToken.model_validate(updated)
