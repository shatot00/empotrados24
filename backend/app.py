from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.responses import JSONResponse
import json
import logging
import os
from datetime import datetime
from sqlalchemy.orm import Session
from database import crud, models
from database.database import SessionLocal, engine
models.Base.metadata.create_all(bind=engine)

dir = os.path.dirname(__file__)
#
app = FastAPI(openapi_url=None)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome :)"}
