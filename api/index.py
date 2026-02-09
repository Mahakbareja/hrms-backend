from fastapi import FastAPI
from mangum import Mangum

app = FastAPI()

@app.get("/")
def root():
    return {"message": "HRMS Backend Running"}

handler = Mangum(app)
