import os
from pathlib import Path

from dotenv import load_dotenv

path = Path(__name__).parent.parent.parent / ".env"
load_dotenv(override=True, dotenv_path=path)


class UndefinedKeyError(Exception): ...


class Settings:
    def __init__(self):
        self.DB_NAME = self.get_value("DB_NAME")
        self.DB_USERNAME = self.get_value("DB_USERNAME")
        self.DB_PASSWORD = self.get_value("DB_PASSWORD")
        self.DB_HOST = self.get_value("DB_HOST")
        self.DB_PORT = self.get_value("DB_PORT")

    def get_value(self, key: str):
        value = os.getenv(key)
        if value is None:
            msg = "The value with this key is undefined"
            raise UndefinedKeyError(msg)
        return value


SETTINGS = Settings()
