from pydantic import BaseModel
from sqlalchemy.orm import mapped_column, DeclarativeBase, Mapped


class HeroDeclarative(DeclarativeBase):
    ...


class HeroORM(HeroDeclarative):
    __tablename__ = 'heroes'

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    surname: Mapped[str]
    timestamp: Mapped[str] = mapped_column(nullable=True)
    card_description: Mapped[str] = mapped_column(nullable=True)
    description: Mapped[str] = mapped_column(nullable=True)


class HeroBase(BaseModel):
    name: str
    surname: str
    card_description: str | None = None
    description: str | None = None
    timestamp: str | None = None


class HeroBaseID(HeroBase):
    id: int


class HeroBaseCreate(HeroBase):
    image: bytes | None = None


class HeroUpdate(BaseModel):
    id: int
    name: str | None = None
    surname: str | None = None
    card_description: str | None = None
    description: str | None = None
    image: bytes | None = None
