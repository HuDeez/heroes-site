from fastapi import APIRouter, Depends

from api.v1.entities.hero.schema import HeroBaseID
from api.v1.entities.search.repository import SearchRepository


router = APIRouter(
    prefix='/api/v1',
)


@router.get('/search', response_model=list[HeroBaseID])
async def search(request: str, repository: SearchRepository = Depends()):
    result = await repository.search(request)
    return result