from database.models.session import SessionORM
from database.repository.repository import Repository


class SessionRepository(Repository[SessionORM]):
    model = SessionORM
