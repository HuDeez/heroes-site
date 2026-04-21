import uuid

from fastapi import APIRouter

from database.schemas.soldier import (
    Soldier,
    SoldierCreate,
    SoldierDelete,
    SoldierUpdate,
)
from database.service.soldier import SoldierService

router = APIRouter(prefix="/soldier", tags=["Soldier API"])


@router.get("/", response_model=list[Soldier])
async def find_all():
    return await SoldierService.find_all()


@router.get("/{soldier_id}", response_model=Soldier)
async def find_by_id(soldier_id: uuid.UUID):
    return await SoldierService.find_by_id(soldier_id)


@router.post("/", response_model=Soldier)
async def create(obj: SoldierCreate):
    return await SoldierService.add(obj)


@router.patch("/{soldier_id}", response_model=Soldier)
async def update(soldier_id: uuid.UUID, params: SoldierUpdate):
    return await SoldierService.update(soldier_id, params)


@router.delete("/{soldier_id}", response_model=SoldierDelete)
async def delete(soldier_id: uuid.UUID):
    result = await SoldierService.delete(soldier_id)
    return SoldierDelete(id=soldier_id, is_delete=result)
