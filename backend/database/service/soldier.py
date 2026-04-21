import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.utils import DescriptionsUtils
from database.config import connection
from database.repository.soldier import SoldierRepository
from database.schemas.soldier import (
    Soldier,
    SoldierCreate,
    SoldierFind,
    SoldierUpdate,
)
from database.service.service import Service


class SoldierService(Service[SoldierRepository]):
    repository = SoldierRepository

    @classmethod
    @connection
    async def add(cls, soldier: SoldierCreate, session: AsyncSession = None):
        dump = soldier.model_dump(exclude_unset=True)
        description = dump.get("description")
        if description is not None:
            dump.pop("description")
        orm = cls.repository.model(**dump)
        obj = await cls.repository.create(orm, session)
        if description is not None:
            DescriptionsUtils.set(obj.id, description)

        validated = Soldier.model_validate(obj)
        validated.description = description
        return validated

    @classmethod
    @connection
    async def find_by_id(
        cls,
        soldier_id: uuid.UUID,
        session: AsyncSession = None,
    ):
        obj = await cls.repository.find_by_id(soldier_id, session)

        validated = Soldier.model_validate(obj)
        validated.description = DescriptionsUtils.get(soldier_id)
        return validated

    @classmethod
    @connection
    async def find_all(cls, session: AsyncSession = None):
        result = await cls.repository.find_all(session)
        validated = []
        for s in result:
            validate = Soldier.model_validate(s)
            validate.description = DescriptionsUtils.get(s.id)
            validated.append(validate)
        return validated

    @classmethod
    @connection
    async def find(cls, params: SoldierFind, session: AsyncSession = None):
        dump = params.model_dump(exclude_unset=True)
        result = await cls.repository.find(dump, session)
        validated = []
        for s in result:
            validate = Soldier.model_validate(s)
            validate.description = DescriptionsUtils.get(s.id)
            validated.append(validate)
        return validated

    @classmethod
    @connection
    async def update(
        cls,
        soldier_id: uuid.UUID,
        params: SoldierUpdate,
        session: AsyncSession = None,
    ):
        soldier = await cls.repository.find_by_id(soldier_id, session)
        if not soldier:
            return None

        dump = params.model_dump(exclude_unset=True)
        description = dump.get("description")

        if description is not None:
            dump.pop("description")

        obj = await cls.repository.update(soldier, dump, session)

        if description is not None:
            DescriptionsUtils.set(soldier_id, description)

        validated = Soldier.model_validate(obj)
        validated.description = description

        return validated

    @classmethod
    @connection
    async def delete(cls, soldier_id: uuid.UUID, session: AsyncSession = None):
        DescriptionsUtils.remove(soldier_id)
        return await cls.repository.delete(soldier_id, session)
