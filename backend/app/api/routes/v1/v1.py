from fastapi import APIRouter

from app.api.routes.v1.soldier import router as soldier_router

router = APIRouter(prefix="/v1")
router.include_router(soldier_router)
