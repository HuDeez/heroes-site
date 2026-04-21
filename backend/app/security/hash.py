from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from backend.app.core import logger

hasher = PasswordHasher()
log = logger.get_logger(__name__)


def get_hash(value: str, salt: bytes | None = None):
    return hasher.hash(value, salt)


def verify(hashed: str | bytes, value: str | bytes):
    try:
        hasher.verify(hashed, value)
    except VerifyMismatchError:
        log.exception("User inputed a wrong password")
    else:
        return True
    return False


def check_need_rehash(hashed: str | bytes):
    return hasher.check_needs_rehash(hashed)
