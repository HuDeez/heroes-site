import uuid
from typing import TypeVar

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from database.models.base import BaseORM

T = TypeVar("T", bound=BaseORM)


class Repository[T: BaseORM]:
    model: type[T]

    @classmethod
    async def create(cls, obj: T, session: AsyncSession):
        session.add(obj)
        await session.flush([obj])
        return obj

    @classmethod
    async def find_by_id(cls, object_id: uuid.UUID, session: AsyncSession):
        return await session.get(cls.model, object_id)

    @classmethod
    async def find_all(
        cls,
        session: AsyncSession,
        limit: int | None = None,
        offset: int = 0,
    ):
        stmt = select(cls.model)
        if limit:
            stmt = stmt.limit(limit)
        if offset:
            stmt = stmt.offset(offset)
        objects = await session.execute(stmt)
        return objects.scalars().all()

    @classmethod
    async def find(cls, params: dict, session: AsyncSession):
        stmt = select(cls.model).where(**params)
        objects = await session.execute(stmt)
        return objects.scalars().all()

    @classmethod
    async def update(
        cls,
        obj: T,
        params: dict,
        session: AsyncSession,
    ):
        for key, value in params.items():
            setattr(obj, key, value)
        session.add(obj)
        await session.flush([obj])
        return obj

    @classmethod
    async def delete(cls, object_id: uuid.UUID, session: AsyncSession):
        stmt = delete(cls.model).where(cls.model.id == object_id)
        result = await session.execute(stmt)
        return result.rowcount > 0
