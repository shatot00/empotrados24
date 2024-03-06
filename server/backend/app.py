from fastapi import FastAPI, Depends, Request
import json
import os
from sqlalchemy.orm import Session
from database import crud, models, schemas
from database.database import SessionLocal, engine
from fastapi.templating import Jinja2Templates

import sqlite3

models.Base.metadata.create_all(bind=engine)


dir = os.path.dirname(__file__)
#
app = FastAPI()
templates = Jinja2Templates(directory="../frontend/templates") # Path to the template folder

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root(request: Request, db: Session = Depends(get_db)):
    records = crud.get_information_accelerometer(db)
    if records:
        times = [records.time for records in records]
        x_values = [records.x for records in records]
        y_values = [records.y for records in records]
        z_values = [records.z for records in records]

        db.close()
        times_sort = sorted(times, reverse=True)
        return templates.TemplateResponse("accelerometer.html", {"request": request, "times": times_sort, "x_values": x_values, "y_values": y_values, "z_values": z_values})

    return {"message": "Welcome :)"}


@app.post("/add_accelerometer")
async def create_accelerometer(accelerometer: schemas.Accelerometer, db: Session = Depends(get_db)):
    print(accelerometer)
    crud.add_information_accelerometer(db, accelerometer)
    return "Hola"

@app.post("/add_compass")
async def create_compass(compass: schemas.Compass, db: Session = Depends(get_db)):
    crud.add_information_compass(db, compass)
    return "Hola"

@app.post("/add_gps")
async def create_gps(gps: schemas.GPS, db: Session = Depends(get_db)):
    crud.add_information_gps(db, gps)
    return "Hola"

@app.post("/add_gyroscope")
async def create_gyroscope(gyroscope: schemas.Gyroscope, db: Session = Depends(get_db)):
    crud.add_information_gyroscope(db, gyroscope)
    return "Hola"

@app.post("/add_pedometer")
async def create_pedometer(pedometer: schemas.Pedometer, db: Session = Depends(get_db)):
    crud.add_information_pedometer(db, pedometer)
    return "Hola"

@app.get("/accelerometer")
async def get_accelerometer(request: Request, db: Session = Depends(get_db)):
    return crud.get_information_accelerometer(db)

@app.get("/compass")
async def get_compass(request: Request, db: Session = Depends(get_db)):
    return crud.get_information_compass(db)

@app.get("/gps")
async def get_gps(request: Request, db: Session = Depends(get_db)):

    latitude = 20.659698
    longitude = -103.349609

    sitios_visitados = [
        {"nombre": "Sitio 1", "latitud": 40.7128, "longitud": -74.0060},
        {"nombre": "Sitio 2", "latitud": 41.8781, "longitud": -87.6298},
        {"nombre": "Sitio 3", "latitud": 34.0522, "longitud": -118.2437}
    ]
    return templates.TemplateResponse("gps.html", {"request": request, "latitude": latitude, "longitude": longitude, "sitios_visitados": sitios_visitados})
    return crud.get_information_gps(db)

@app.get("/gyroscope")
async def get_gyroscope(request: Request, db: Session = Depends(get_db)):
    return crud.get_information_gyroscope(db)

@app.get("/pedometer")
async def get_pedometer(db: Session = Depends(get_db)):
    return crud.get_information_pedometer(db)