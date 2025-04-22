from datetime import datetime, timezone

from typing import List

from sqlalchemy import select, update, delete

from api.v1.database.database import get_session
from api.v1.entities.hero.schema import HeroBase, HeroORM, HeroBaseID, \
    HeroUpdate


class HeroRepository:

    @classmethod
    async def add(cls, hero: HeroBase) -> int:

        dump = hero.model_dump()
        dump.pop('image')
        dump['timestamp'] = str(int(datetime.now(timezone.utc).timestamp()))
        hero_model = HeroORM(**dump)

        async with get_session() as session:
            session.add(hero_model)
            await session.commit()

        return hero_model.id

    @classmethod
    async def find_all(cls) -> List[HeroBaseID]:
        async with get_session() as session:
            heroes = await session.execute(
                select(HeroORM).order_by(HeroORM.id)
            )
            models = heroes.scalars().all()

            return [
                HeroBaseID.model_validate(model.__dict__)
                for model in models
            ]

    @classmethod
    async def find_by_id(cls, hero_id: int) -> List[HeroBaseID]:
        async with get_session() as session:
            hero = await session.execute(
                select(HeroORM).where(HeroORM.id == hero_id)
            )
            model = hero.scalars().first()

        return [HeroBaseID.model_validate(model.__dict__)] if model else []

    @classmethod
    async def update(cls, hero: HeroUpdate) -> bool:
        dump = hero.model_dump()
        dump.pop('image')
        dump['timestamp'] = str(int(datetime.now(timezone.utc).timestamp()))
        cleaned_dump = {k: v for k, v in dump.items() if v is not None}

        async with get_session() as session:
            await session.execute(
                update(HeroORM)
                .where(HeroORM.id == hero.id)
                .values(**cleaned_dump)
            )
            await session.commit()

        return True

    @classmethod
    async def delete(cls, hero_id: int) -> bool:
        async with get_session() as session:
            await session.execute(
                delete(HeroORM).where(HeroORM.id == hero_id)
            )
            await session.commit()

        return True

