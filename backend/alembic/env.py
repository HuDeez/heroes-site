import asyncio
from logging.config import fileConfig

from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import pool
from sqlalchemy import MetaData

from alembic import context

from api.v1.entities.admin.schema import AdminDeclarative
from api.v1.entities.hero.schema import HeroDeclarative
from api.v1.entities.news.schema import NewsDeclarative
from api.v1.auth.sessions.schema import SessionDeclarative


# Alembic Config object
config = context.config

# Настройка логирования
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

combined_metadata = MetaData()

for base in (NewsDeclarative, HeroDeclarative, AdminDeclarative, SessionDeclarative):
    for table in base.metadata.tables.values():
        table.tometadata(combined_metadata)

target_metadata = combined_metadata

# URL подключения к БД берём из alembic.ini или переопределяем вручную
DATABASE_URL = config.get_main_option("sqlalchemy.url")

def run_migrations_offline() -> None:
    """Запуск миграций в оффлайн-режиме (генерация SQL скриптов)."""
    context.configure(
        url=DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        compare_type=True,  # Важно для отслеживания изменений типа колонок
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Запуск миграций в онлайн-режиме (с реальным подключением к БД)."""
    connectable = create_async_engine(
        DATABASE_URL,
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def do_run_migrations(connection):
    """Настройка миграций с активным соединением."""
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        compare_type=True,  # Чтобы Alembic сравнивал типы колонок
    )

    with context.begin_transaction():
        context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
