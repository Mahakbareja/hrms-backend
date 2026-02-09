from fastapi import FastAPI
from app.routers.database import Base, engine
from app.routers import employees, attendance

# Create tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI()

# include routers
app.include_router(employees.router)
app.include_router(attendance.router)

@app.get("/")
def root():
    return {"message": "HRMS Backend Running"}
