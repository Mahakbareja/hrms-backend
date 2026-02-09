from mangum import Mangum
from fastapi import FastAPI
from app.main import app as fastapi_app

handler = Mangum(fastapi_app)
