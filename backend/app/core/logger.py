import datetime
import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

now = datetime.datetime.now(tz=datetime.UTC).strftime("%d-%m-%Y")

path = Path(__name__).parent.parent / "logs"
path.mkdir(parents=True, exist_ok=True)
filename = path / f"{now}.log"

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(name)s] | %(levelname)s > %(message)s",
    datefmt="%d-%m-%Y | %H:%M:%S",
    handlers=[
        RotatingFileHandler(
            filename=filename,
            maxBytes=1048576,
            backupCount=100,
            encoding="UTF-8",
            mode="a",
        ),
        logging.StreamHandler(),
    ],
)


def get_logger(name: str):
    return logging.getLogger(name)
