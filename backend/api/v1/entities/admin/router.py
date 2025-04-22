from fastapi import Depends, APIRouter, HTTPException
from starlette import status

from api.v1.auth.security import is_valid_user_session, get_password_hash
from api.v1.entities.admin.repository import AdminRepository
from api.v1.entities.admin.schema import AdminHash, AdminBaseModel, \
    AdminUpdateModel

router = APIRouter(prefix="/api/v1/admins", tags=["Панель управления администраторами"])


async def permission_checker(
    username: str,
    user: AdminBaseModel = Depends(is_valid_user_session),
    repository: AdminRepository = Depends(),
) -> bool:
    no_permission = HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You don't have permission to do that",
    )

    if (username != user.username) and (user.access < 1):
        raise no_permission

    admin = await repository.find_by_username(username)

    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found"
        )

    if (admin.access == 2) and (user.access != 2):
        raise no_permission

    return True


@router.get(path="/get_admins", dependencies=[Depends(is_valid_user_session)])
async def get_admins(repository: AdminRepository = Depends()):
    admins = await repository.find_all()
    return admins


@router.get(
    path="/get_admin_by_username/{username}",
    dependencies=[Depends(is_valid_user_session)],
)
async def get_admin_by_username(
        username: str,
        repository: AdminRepository = Depends()
):
    admin = await repository.find_by_username(username)
    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Admin not found"
        )

    return AdminBaseModel(**admin.__dict__)


@router.post("/create_admin")
async def create_admin(
    admin_model: AdminHash,
    user: AdminBaseModel = Depends(is_valid_user_session),
    repository: AdminRepository = Depends(),
):
    if user.access != 2:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to create an admin",
        )

    password = admin_model.password
    admin_model.password = get_password_hash(password)

    identity = await repository.add(admin_model)
    if identity == -1:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Admin already exists"
        )

    return {"success": True, "admin_id": identity}


@router.put(
    path="/update_admin/{username}",
    dependencies=[Depends(permission_checker)]
)
async def update_admin(
    username: str,
    admin_model: AdminUpdateModel,
    repository: AdminRepository = Depends(),
):

    password = admin_model.password

    if password is None:
        admin_model.password = None
        admin_model = AdminUpdateModel(**admin_model.dict(exclude_none=True))

    await repository.update(username, admin_model)

    return {"success": True}


@router.delete(
    path="/delete_admin/{username}",
    dependencies=[Depends(permission_checker)]
)
async def delete_admin(
    username: str,
    user: AdminBaseModel = Depends(is_valid_user_session),
    repository: AdminRepository = Depends(),
):
    if username == user.username:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to delete yourself",
        )

    await repository.delete(username)

    return {"success": True}
