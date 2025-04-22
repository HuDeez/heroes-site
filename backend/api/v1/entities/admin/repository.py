from typing import List

from sqlalchemy import select, update, delete, func

from api.v1.database.database import get_session
from api.v1.entities.admin.schema import (
    AdminHash,
    AdminORM,
    AdminBaseModel,
    AdminUpdateModel,
)


class AdminRepository:

    @classmethod
    async def add(cls, admin: AdminHash) -> int:
        if not await AdminRepository.find_by_username(admin.username):
            dump = admin.model_dump()
            admin_model = AdminORM(**dump)

            async with get_session() as session:
                session.add(admin_model)
                await session.commit()

            return admin_model.id

        return -1

    @classmethod
    async def find_all(cls) -> List[AdminBaseModel]:
        async with get_session() as session:
            admins = await session.execute(
                select(AdminORM).order_by(AdminORM.id)
            )
            models = admins.scalars().all()

            return [
                AdminBaseModel.model_validate(model.__dict__)
                for model in models
            ]

    @classmethod
    async def find_by_username(cls, username: str) -> AdminORM | None:
        async with get_session() as session:
            admin = await session.execute(
                select(AdminORM).where(username == AdminORM.username)
            )
            model = admin.scalars().first()
            return model


    @classmethod
    async def update(cls, username: str, admin: AdminUpdateModel) -> bool:
        dump = admin.model_dump()
        cleaned_dump = {k: v for k, v in dump.items() if v is not None}

        async with get_session() as session:
            await session.execute(
                update(AdminORM)
                .where(username == AdminORM.username)
                .values(**cleaned_dump)
            )
            await session.commit()

        return True

    @classmethod
    async def delete(cls, username: str) -> bool:
        async with get_session() as session:
            await session.execute(
                delete(AdminORM).where(username == AdminORM.username)
            )
            await session.commit()

        return True
