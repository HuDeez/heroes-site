from pathlib import Path

import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse

from app.api.api import router as api_router
from app.core import logger

log = logger.get_logger(__name__)


async def lifespan(app: FastAPI):
    log.info("App is starting...")
    yield
    log.info("App is downing...")


app = FastAPI(lifespan=lifespan)
app.include_router(api_router)
favicon_path = Path(__file__).parent / "static" / "favicon.ico"


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)


@app.get("/")
async def root():
    return {"status": "ok"}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0")
