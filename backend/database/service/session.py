import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from database.config import connection
from database.repository import SessionRepository
from database.schemas.session import Session, SessionCreate
from database.service.service import Service


class SessionService(Service[SessionRepository]):
    repository = SessionRepository

    @classmethod
    @connection
    async def add(
        cls,
        user_session: SessionCreate,
        session: AsyncSession = None,
    ):
        dump = user_session.model_dump(exclude_unset=True)
        orm = cls.repository.model(**dump)
        obj = await cls.repository.create(orm, session)
        return Session.model_validate(obj)

    @classmethod
    @connection
    async def find_by_id(
        cls,
        user_session_id: uuid.UUID,
        session: AsyncSession = None,
    ):
        return await cls.repository.find_by_id(user_session_id, session)
