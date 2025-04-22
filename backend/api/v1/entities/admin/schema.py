from typing import Optional

from pydantic import BaseModel
from sqlalchemy import LargeBinary
from sqlalchemy.orm import mapped_column, DeclarativeBase, Mapped


class AdminDeclarative(DeclarativeBase): ...


class AdminORM(AdminDeclarative):
    __tablename__ = "admins"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]
    password: Mapped[str]
    first_name: Mapped[str]
    last_name: Mapped[str]
    rank: Mapped[str] = mapped_column(default="Администратор")
    access: Mapped[int] = mapped_column(default=1)
    image: Mapped[LargeBinary] = mapped_column(
        type_=LargeBinary,
        nullable=True)


class AdminBaseModel(BaseModel):
    username: str
    first_name: str
    last_name: str
    rank: str
    access: int
    image: bytes | None = None


class AdminHash(AdminBaseModel):
    password: str


class AdminUpdateModel(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    rank: Optional[str] = None
    access: Optional[int] = None
    image: Optional[bytes] = None


class Token(BaseModel):
    access_token: str
    token_type: str
