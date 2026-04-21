import uuid
from pathlib import Path


class DescriptionsUtils:
    path = Path(__file__).parent.parent / "descriptions"
    path.mkdir(parents=True, exist_ok=True)

    @classmethod
    def set(cls, soldier_id: uuid.UUID, description: str):
        with Path(cls.path / f"{soldier_id}.txt").open(
            mode="w",
            encoding="UTF-8",
        ) as f:
            f.write(description)

    @classmethod
    def get(cls, soldier_id: uuid.UUID):
        path = cls.path / f"{soldier_id}.txt"
        if Path.exists(path):
            with Path(path).open(encoding="UTF-8") as f:
                return f.read()
        return None

    @classmethod
    def remove(cls, soldier_id: uuid.UUID):
        path = cls.path / f"{soldier_id}.txt"
        if Path.exists(path):
            Path.unlink(path)
            return True
        return False
