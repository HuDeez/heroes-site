from pydantic import BaseModel
from sqlalchemy.sql import func


class Search(BaseModel):
    request: str

    
    
