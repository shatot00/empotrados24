from fastapi import FastAPI, Depends
import json
import os
from sqlalchemy.orm import Session
from database import crud, models, schemas
from database.database import SessionLocal, engine
models.Base.metadata.create_all(bind=engine)

dir = os.path.dirname(__file__)
#
app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Welcome :)"}


@app.post("/add_accelerometer/")
async def create_accelerometer(accelerometer: schemas.Accelerometer, db: Session = Depends(get_db)):
    print(accelerometer)
    crud.add_information_accelerometer(db, accelerometer)
    return "Hola"

@app.post("/add_compass/")
async def create_compass(compass: schemas.Compass, db: Session = Depends(get_db)):
    crud.add_information_compass(db, compass)
    return "Hola"

@app.post("/add_gps/")
async def create_gps(gps: schemas.GPS, db: Session = Depends(get_db)):
    crud.add_information_gps(db, gps)
    return "Hola"

@app.post("/add_gyroscope/")
async def create_gyroscope(gyroscope: schemas.Gyroscope, db: Session = Depends(get_db)):
    crud.add_information_gyroscope(db, gyroscope)
    return "Hola"

@app.post("/add_pedometer/")
async def create_pedometer(pedometer: schemas.Pedometer, db: Session = Depends(get_db)):
    crud.add_information_pedometer(db, pedometer)
    return "Hola"

@app.get("/accelerometer/")
async def get_accelerometer(db: Session = Depends(get_db)):
    return crud.get_information_accelerometer(db)

@app.get("/compass/")
async def get_compass(db: Session = Depends(get_db)):
    return crud.get_information_compass(db)

@app.get("/gps/")
async def get_gps(db: Session = Depends(get_db)):
    return crud.get_information_gps(db)

@app.get("/gyroscope/")
async def get_gyroscope(db: Session = Depends(get_db)):
    return crud.get_information_gyroscope(db)

@app.get("/pedometer/")
async def get_pedometer(db: Session = Depends(get_db)):
    return crud.get_information_pedometer(db)