from database.models import SoldierORM
from database.repository.repository import Repository


class SoldierRepository(Repository[SoldierORM]):
    model = SoldierORM
