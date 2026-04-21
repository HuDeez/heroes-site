import uuid

from database.schemas.base import Base


class AdminCreate(Base):
    username: str
    name: str
    surname: str
    is_supervisor: bool = False
    is_owner: bool = False


class AdminUpdate(Base):
    username: str | None = None
    name: str | None = None
    surname: str | None = None
    is_supervisor: bool | None = None
    is_owner: bool | None = None


class AdminFind(AdminUpdate):
    id: uuid.UUID | None = None
