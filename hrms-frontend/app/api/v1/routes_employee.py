from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.employee import EmployeeCreate
from app.services.employee_service import create_employee, get_employees, delete_employee

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/")
def add_employee(emp: EmployeeCreate, db: Session = Depends(get_db)):
    return create_employee(db, emp)

@router.get("/")
def list_employees(db: Session = Depends(get_db)):
    return get_employees(db)

@router.delete("/{employee_id}")
def remove_employee(employee_id: str, db: Session = Depends(get_db)):
    return delete_employee(db, employee_id)
