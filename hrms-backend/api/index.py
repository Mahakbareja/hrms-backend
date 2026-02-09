from fastapi import FastAPI
from app.main import app as fastapi_app
from magnum  import Mangum

handler = Mangum(fastapi_app)
