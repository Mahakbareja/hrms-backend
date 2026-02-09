from sqlalchemy import Column, String, Date
from app.db.base import Base

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(String, primary_key=True)
    employee_id = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    status = Column(String, nullable=False)
