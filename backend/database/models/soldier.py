import uuid

from sqlalchemy import UUID, String
from sqlalchemy.orm import Mapped, mapped_column

from database.models.base import BaseORM


class SoldierORM(BaseORM):
    __tablename__ = "soldiers"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        default=uuid.uuid4,
        primary_key=True,
        autoincrement=False,
        unique=True,
    )
    name: Mapped[str] = mapped_column(String(255), default="Ivan")
    surname: Mapped[str] = mapped_column(String(255), default="Ivanov")
