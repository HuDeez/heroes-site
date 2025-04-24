import logging
from contextlib import asynccontextmanager
from datetime import datetime
from logging.handlers import RotatingFileHandler
from pathlib import Path

from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.v1.auth.sessions.router import router as session_router
from api.v1.database.database import drop_table, create_table
from api.v1.entities.admin.router import router as admin_router
from api.v1.entities.hero.router import router as heroes_router
from api.v1.entities.news.router import router as news_router
from scheduler.scheduler import start

now = datetime.now().strftime("%d-%m-%Y")
hours = datetime.now().strftime("%H")

log_dir = Path(f"logs/{now}")
log_dir.mkdir(parents=True, exist_ok=True)


logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(name)s] | %(levelname)s > %(message)s",
    datefmt="%d-%m-%Y | %H:%M:%S",
    handlers=[
        RotatingFileHandler(
            filename=f"{log_dir}/log-{hours}.log",
            maxBytes=1048576,
            backupCount=100,
            encoding="UTF-8",
            mode="a",
        ),
        logging.StreamHandler(),
    ],
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await drop_table()
    await create_table()
    await start() # type: ignore
    yield


app = FastAPI(lifespan=lifespan)
app.mount("/static", StaticFiles(directory="assets/images/heroes/"), name="heroes")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://127.0.0.1",
        "http://127.0.0.1:8000",
        "http://localhost:5173",
        "http://31.128.47.37",
        "https://31.128.47.37"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(heroes_router)
app.include_router(admin_router)
app.include_router(news_router)
app.include_router(session_router)


@app.get("/", tags=["Корень"])
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run("main:app", host='0.0.0.0', port=8000)
