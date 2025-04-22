from pydantic import BaseModel
from sqlalchemy.orm import DeclarativeBase, mapped_column, Mapped


class SessionData(BaseModel):
    username: str
    first_name: str
    last_name: str
    rank: str
    access: int
    image: bytes | None = None


class SessionDeclarative(DeclarativeBase):
    ...


class SessionORM(SessionDeclarative):
    __tablename__ = "sessions"

    id: Mapped[int] = mapped_column(primary_key=True)
    session_id: Mapped[str] = mapped_column(nullable=None)
    username: Mapped[str] = mapped_column(nullable=None)


class SessionBaseModel(BaseModel):
    session_id: str
    username: str


