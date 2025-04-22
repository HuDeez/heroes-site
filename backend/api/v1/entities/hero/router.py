from typing import Dict, List

from fastapi import APIRouter, Depends

from api.v1.entities.hero.repository import HeroRepository
from api.v1.entities.hero.schema import HeroBaseCreate, HeroUpdate, HeroBaseID
from utils.add_image import delete_hero_image, save_hero_image

router = APIRouter(
    prefix="/api/v1/heroes",
    tags=["Панель управления героями"]
)


async def hero_checker(
    hero_id: int,
    repository: HeroRepository = Depends(),
) -> bool:
    hero = await repository.find_by_id(hero_id)

    return hero is not None


@router.get(
    path="/get_heroes",
    summary="Получить список всех героев",
    response_model=List[HeroBaseID]
)
async def get_heroes(repository: HeroRepository = Depends()):
    heroes = await repository.find_all()
    return heroes


@router.get(
    path="/get_hero_by_id/{hero_id}",
    summary="Получить героя по его ID",
    response_model=List[HeroBaseID]
)
async def get_hero_by_id(
        hero_id: int,
        repository: HeroRepository = Depends()
):
    hero = await repository.find_by_id(hero_id)
    return hero


@router.post(
    path="/create_hero",
    summary="Создать объект героя",
    response_model=Dict[str, bool]
)
async def create_hero(
        hero: HeroBaseCreate,
        repository: HeroRepository = Depends()
):
    hero_id = await repository.add(hero)
    await save_hero_image(hero.image, hero_id)

    return {'success': True}


@router.put(
    path="/update_hero/{hero_id}",
    summary="Обновить существующий объект героя",
    response_model=Dict[str, bool],
    dependencies=[Depends(hero_checker)]
)
async def update_hero(
        hero: HeroUpdate,
        repository: HeroRepository = Depends()
):
    await repository.update(hero)
    await save_hero_image(hero.image, hero.id)

    return {"success": True}


@router.delete(
    path="/delete_hero/{hero_id}",
    summary="Удалить объект героя",
    response_model=Dict[str, bool],
    dependencies=[Depends(hero_checker)]
)
async def delete_hero(
        hero_id: int,
        repository: HeroRepository = Depends()
):
    await repository.delete(hero_id)
    await delete_hero_image(hero_id)

    return {"success": True}
