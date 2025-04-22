from sqlalchemy import select, delete

from api.v1.auth.sessions.schema import SessionBaseModel, SessionORM
from api.v1.database.database import get_session as db_session


class SessionRepository:
    @classmethod
    async def add(cls, session: SessionBaseModel):
        find = await SessionRepository.find_by_id(session.session_id)
        if not find:

            dump = session.model_dump()
            orm_model = SessionORM(**dump)

            async with db_session() as db:
                db.add(orm_model)
                await db.commit()

            return True

        return False

    @classmethod
    async def find_by_id(cls, session_id: str) -> SessionORM:
        async with db_session() as db:
            session = await db.execute(
                select(SessionORM).where(session_id == SessionORM.session_id)
            )
            session_model = session.scalars().first()

            return session_model

    @classmethod
    async def delete_by_id(cls, session_id: str):
        async with db_session() as db:
            await db.execute(
                delete(SessionORM).where(session_id == SessionORM.session_id)
            )
            await db.commit()
