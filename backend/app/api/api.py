from fastapi import APIRouter

from app.api.routes.v1.v1 import router as api_router_v1

router = APIRouter(prefix="/api")
router.include_router(api_router_v1)
