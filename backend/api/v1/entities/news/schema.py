from pydantic import BaseModel
from sqlalchemy import Text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class NewsDeclarative(DeclarativeBase):
    ...


class NewsORM(NewsDeclarative):
    __tablename__ = 'news'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str]
    description: Mapped[str]
    datetime: Mapped[str]
    reading_time: Mapped[int]
    image_url: Mapped[str] = mapped_column(nullable=True)
    content: Mapped[str] = mapped_column(Text)
    article_id: Mapped[int]


class NewsBase(BaseModel):
    title: str
    description: str
    datetime: str
    reading_time: int
    image_url: str | None = None
    content: str
    article_id: int

