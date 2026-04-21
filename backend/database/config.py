from collections.abc import Callable
from functools import wraps
from typing import ParamSpec, TypeVar

from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from app.core import logger
from app.core.settings import SETTINGS
from database import models

username = SETTINGS.DB_USERNAME
psw = SETTINGS.DB_PASSWORD
host = SETTINGS.DB_HOST
port = SETTINGS.DB_PORT
db_name = SETTINGS.DB_NAME
url = f"postgresql+asyncpg://{username}:{psw}@{host}:{port}/{db_name}"

engine = create_async_engine(url=url, echo=False)
sessionmaker = async_sessionmaker(bind=engine, expire_on_commit=False)

log = logger.get_logger(__name__)

P = ParamSpec("P")
R = TypeVar("R")


def connection[**P, R](function: Callable[P, R]) -> Callable[P, R]:

    @wraps(function)
    async def wrapper(*args: P.args, **kwargs: P.kwargs) -> R:
        log.debug("The session has been opened")
        if kwargs.get("session") is not None:
            return await function(*args, **kwargs)

        async with sessionmaker() as new_session:
            kwargs["session"] = new_session

            try:
                result = await function(*args, **kwargs)
                await new_session.commit()
                log.debug("The function has been finished successfully")

            except Exception:
                log.exception("The session was interrupted by exc")
                await new_session.rollback()
                log.info("The commit has been rollbacked")
                raise

        log.debug("The session has been closed")
        return result

    return wrapper


async def create_table() -> None:
    try:
        async with engine.begin() as conn:
            await conn.run_sync(models.BaseORM.metadata.create_all)
            log.info("Database tables were created")
    except Exception:
        msg = "Somethings was going wrong"
        log.exception(msg)


async def drop_table() -> None:
    try:
        async with engine.begin() as conn:
            await conn.run_sync(models.BaseORM.metadata.drop_all)
            log.info("Database tables were deleted")
    except Exception:
        msg = "Somethings was going wrong"
        log.exception(msg)
