from database.models import AdminORM
from database.repository.repository import Repository


class AdminRepository(Repository[AdminORM]):
    model = AdminORM
