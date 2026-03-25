from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_session
from app.services.notes import NoteService
from app.core.schemas import ResponseModel
from pydantic import BaseModel

router = APIRouter(prefix="/notes", tags=["note"])

class NoteRequest(BaseModel):
    title: str
    category: str
    content: str

@router.post("/", response_model=ResponseModel)
async def create_note(data: NoteRequest, db: AsyncSession = Depends(get_session)):
    note = await NoteService.create_note(db, data.title, data.category, data.content)
    return ResponseModel(data=note)

@router.get("/", response_model=ResponseModel)
async def list_notes(db: AsyncSession = Depends(get_session)):
    notes = await NoteService.get_all(db)
    return ResponseModel(data=notes)