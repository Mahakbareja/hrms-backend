from fastapi import FastAPI
from app.api.v1.routes_employee import router as employee_router
from app.api.v1.routes_attendance import router as attendance_router

app = FastAPI(title="HRMS Lite Backend")

app.include_router(employee_router, prefix="/employees", tags=["Employees"])
app.include_router(attendance_router, prefix="/attendance", tags=["Attendance"])
