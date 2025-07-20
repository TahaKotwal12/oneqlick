from fastapi import FastAPI
from app.api.users import router as users_router

app = FastAPI()

app.include_router(users_router)

@app.get('/')
def root():
    return {"message": "oneQlick backend is running"}
