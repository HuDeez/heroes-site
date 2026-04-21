from typing import TypeVar

from database.repository.repository import Repository

T = TypeVar("T", bound=Repository)


class Service[T: Repository]:
    repository: type[T] = None
