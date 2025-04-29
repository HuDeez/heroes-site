from sqlalchemy import select, func

from api.v1.database.database import get_session
from api.v1.entities.hero.schema import HeroORM, HeroBaseID


class SearchRepository:
    
    @classmethod
    async def search(cls, request: str):
        async with get_session() as session:
            results = await session.execute(
                select(HeroORM).where(
                    func.concat(HeroORM.name, ' ', HeroORM.surname).ilike(
                        f"%{request}%")
                )
            )
            heroes = results.scalars().all()

        return [
            HeroBaseID.model_validate(model.__dict__)
            for model in heroes
        ]

    