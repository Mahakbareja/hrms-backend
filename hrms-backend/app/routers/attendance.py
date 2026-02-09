from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from .. import crud, schemas

router = APIRouter()

@router.post("/attendance")
def create_attendance(record: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.create_attendance(db, record)

@router.get("/attendance")
def get_attendance(db: Session = Depends(get_db)):
    return crud.get_attendance(db)
