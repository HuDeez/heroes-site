import logging

from api.v1.auth.sessions.schema import SessionDeclarative as SessionBase
from api.v1.entities.admin.schema import AdminDeclarative as AdminBase
from api.v1.entities.hero.schema import HeroDeclarative as HeroBase
from api.v1.entities.news.schema import NewsDeclarative as NewsBase
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

logger = logging.getLogger(__name__)

engine = create_async_engine(
    url="postgresql+asyncpg://root:root@db:5432/postgres"
)
# engine = create_async_engine(
#     url="postgresql+asyncpg://postgres:postgres@localhost:5432/postgres"
# )

get_session = async_sessionmaker(
    bind=engine, expire_on_commit=False, class_=AsyncSession
)


async def create_table() -> None:
    async with engine.begin() as conn:
        # await conn.run_sync(HeroBase.metadata.create_all)
        # await conn.run_sync(NewsBase.metadata.create_all)
        # await conn.run_sync(AdminBase.metadata.create_all)
        # await conn.run_sync(SessionBase.metadata.create_all)
        logger.info("Database tables was created")


async def drop_table() -> None:
    async with engine.begin() as conn:
        # await conn.run_sync(HeroBase.metadata.drop_all)
        # await conn.run_sync(NewsBase.metadata.drop_all)
        # await conn.run_sync(AdminBase.metadata.drop_all)
        logger.info("Database tables was dropped")
