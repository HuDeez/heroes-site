import datetime
import uuid

from sqlalchemy import UUID, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column

from database.models.base import BaseORM


class RefreshTokenORM(BaseORM):
    id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        default=uuid.uuid4,
        primary_key=True,
        autoincrement=False,
    )
    expired_at: Mapped[datetime.datetime] = mapped_column(
        DateTime,
        default=lambda: func.now() + datetime.timedelta(days=30),
    )
