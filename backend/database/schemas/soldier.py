import uuid

from database.schemas.base import Base


class Soldier(Base):
    id: uuid.UUID
    name: str
    surname: str
    description: str | None = None


class SoldierCreate(Base):
    name: str
    surname: str
    description: str | None = None


class SoldierUpdate(Base):
    name: str | None = None
    surname: str | None = None
    description: str | None = None


class SoldierFind(SoldierUpdate):
    id: uuid.UUID | None = None


class SoldierDelete(Base):
    id: uuid.UUID
    is_delete: bool
