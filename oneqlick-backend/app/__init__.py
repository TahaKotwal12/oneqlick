import os
from fastapi import FastAPI
from .routers import user

app = FastAPI(title="OneQlick Food SaaS API")

DATABASE_URL = os.getenv("DATABASE_URL")

app.include_router(user.router)

@app.get("/hello")
def hello():
    return {"message": "Hello, OneQlick!"} 