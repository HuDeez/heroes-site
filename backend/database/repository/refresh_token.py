from database.models.refresh_token import RefreshTokenORM
from database.repository.repository import Repository


class RefreshTokenRepository(Repository[RefreshTokenORM]):
    model = RefreshTokenORM
