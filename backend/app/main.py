# main.py

from fastapi import FastAPI
from app.api.routes.user_routes import router as user_router


app = FastAPI(
    title="OneQlick API",
    description="Food delivery application for rural areas of India",
    version="1.0.0"
)


# Include routers
app.include_router(user_router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to OneQlick API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}
