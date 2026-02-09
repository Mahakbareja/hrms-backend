from sqlalchemy.orm import Session
from . import models, schemas

# Employee CRUD
def create_employee(db: Session, employee: schemas.EmployeeCreate):
    db_employee = models.Employee(**employee.dict())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

def get_employees(db: Session):
    return db.query(models.Employee).all()


# Attendance CRUD
def create_attendance(db: Session, record: schemas.AttendanceCreate):
    db_record = models.Attendance(**record.dict())
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

def get_attendance(db: Session):
    return db.query(models.Attendance).all()
