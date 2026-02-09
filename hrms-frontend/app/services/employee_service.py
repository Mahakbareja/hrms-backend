from sqlalchemy.orm import Session
from app.db.models.employee import Employee
from app.schemas.employee import EmployeeCreate

def create_employee(db: Session, emp: EmployeeCreate):
    db_emp = Employee(**emp.dict())
    db.add(db_emp)
    db.commit()
    db.refresh(db_emp)
    return db_emp

def get_employees(db: Session):
    return db.query(Employee).all()

def delete_employee(db: Session, employee_id: str):
    emp = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if emp:
        db.delete(emp)
        db.commit()
        return True
    return False
