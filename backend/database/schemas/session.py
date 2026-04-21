import datetime
import uuid

from database.schemas.base import Base


class Session(Base):
    id: uuid.UUID
    user_id: uuid.UUID
    expired_at: datetime.datetime


class SessionCreate(Base):
    user_id: uuid.UUID
    expired_at: datetime.datetime


class SessionUpdate(Base):
    expired_at: datetime.datetime
