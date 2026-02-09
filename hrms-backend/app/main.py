from fastapi import FastAPI
from .database import Base, engine
from .routers import employees, attendance

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(employees.router)
app.include_router(attendance.router)

@app.get("/")
def root():
    return {"message": "HRMS Backend Running"}
