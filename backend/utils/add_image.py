import base64
import logging
from typing import Dict

from aiofiles import open
from pathlib import Path

logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).resolve().parent.parent
path = BASE_DIR / 'assets' / 'images' / 'heroes'


def get_dates(base64_img: bytes) -> Dict:
    header, encoded = str(base64_img).split(',', 1)

    if 'image/png' in header:
        ext = 'png'
    elif 'image/jpeg' in header:
        ext = 'jpg'
    else:
        raise ValueError("Неизвестный формат изображения")

    recovered = base64.decodebytes(bytes(encoded, encoding='utf-8'))

    return {'recovered': recovered, 'extension': ext}


async def save_hero_image(base64_img: bytes, hero_id: int) -> bool:
    try:
        dates = get_dates(base64_img)

        recovered = dates['recovered']
        extension = dates['extension']

        file_path = path / f'{hero_id}.{extension}'

        async with open(file=file_path, mode='wb') as f:
            await f.write(recovered)

    except ValueError as e:
        logger.error("Неизвестный формат изобажения", e)
    except Exception as e:
        logger.error("Непредвиденная ошибка", e)

    return True


async def delete_hero_image(hero_id: int) -> bool:
    directory = Path(path).rglob('*')
    for file in directory:
        if file.is_file() and str(hero_id) in file.name:
            file.unlink()
            return True

    return False
