import datetime
import uuid

from database.schemas.base import Base


class Refresh(Base):
    id: uuid.UUID
    expired_at: datetime.datetime


class RefreshTokenCreate(Base):
    expired_at: datetime.datetime


class RefreshTokenUpdate(RefreshTokenCreate):
    pass
