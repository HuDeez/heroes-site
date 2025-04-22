from typing import List
from fastapi import APIRouter

from api.v1.entities.news.repository import NewsRepository
from api.v1.entities.news.schema import NewsBase

router = APIRouter(
    prefix="/api/v1/news",
    tags=["Панель управления новостями"]
)


@router.get("/", response_model=List[NewsBase])
async def get_news():
    return await NewsRepository.get_news()
