from typing import List

from sqlalchemy import select, update, delete

from api.v1.database.database import get_session
from api.v1.entities.news.schema import NewsBase, NewsORM


class NewsRepository:

    @classmethod
    async def get_news(cls) -> List[NewsBase]:
        async with get_session() as session:
            news = await session.execute(select(NewsORM).order_by(NewsORM.id))
            models = news.scalars().all()

            return [NewsBase.model_validate(model.__dict__) for model in models]

    @classmethod
    async def add(cls, news_model: NewsBase) -> int:
        article_id = news_model.article_id

        if not await NewsRepository.find_by_id(article_id):

            dump = news_model.model_dump()
            orm_model = NewsORM(**dump)
            async with get_session() as session:
                session.add(orm_model)
                await session.commit()

            return orm_model.id

        return -1

    @classmethod
    async def find_by_id(cls, news_id: int) -> NewsBase:
        async with get_session() as session:
            news = await session.execute(
                select(NewsORM).where(news_id == NewsORM.article_id)
            )
            result = news.scalars().first()

            return result

    @classmethod
    async def update(cls, news: NewsBase) -> bool:
        dump = news.model_dump()
        cleaned_dump = {k: v for k, v in dump.items() if v is not None}

        async with get_session() as session:
            await session.execute(
                update(NewsORM)
                .where(news.article_id == NewsORM.article_id)
                .values(**cleaned_dump)
            )
            await session.commit()

        return True

    @classmethod
    async def delete(cls, news_id: int) -> bool:
        async with get_session() as session:
            await session.execute(delete(NewsORM).where(news_id == NewsORM.article_id))
            await session.commit()

        return True
