from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

def add_information_accelerometer(db: Session, accelerometer: schemas.Accelerometer):
    db_accelerometer = models.Accelerometer(time=datetime.now(), x=accelerometer.x, y=accelerometer.y, z=accelerometer.z)
    db.add(db_accelerometer)
    db.commit()
    db.refresh(db_accelerometer)
    return db_accelerometer

def add_information_magnetometer(db: Session, magnetometer: schemas.Magnetometer):
    db_magnetometer = models.Magnetometer(time=magnetometer.time, x=magnetometer.x, y=magnetometer.y, z=magnetometer.z)
    db.add(db_magnetometer)
    db.commit()
    db.refresh(db_magnetometer)
    return db_magnetometer

def add_information_gps(db: Session, gps: schemas.GPS):
    db_gps = models.GPS(time=gps.time, latitude=gps.latitude, longitude=gps.longitude)
    db.add(db_gps)
    db.commit()
    db.refresh(db_gps)
    return db_gps

def add_information_gyroscope(db: Session, gyroscope: schemas.Gyroscope):
    db_gyroscope = models.Gyroscope(time=gyroscope.time, x=gyroscope.x, y=gyroscope.y, z=gyroscope.z)
    db.add(db_gyroscope)
    db.commit()
    db.refresh(db_gyroscope)
    return db_gyroscope

def add_information_pedometer(db: Session, pedometer: schemas.Pedometer):
    db_pedometer = models.Pedometer(time=pedometer.time, steps=pedometer.steps)
    db.add(db_pedometer)
    db.commit()
    db.refresh(db_pedometer)
    return db_pedometer

def get_information_accelerometer(db: Session):
    return db.query(models.Accelerometer).all()

def get_information_magnetometer(db: Session):
    return db.query(models.Magnetometer).all()

def get_information_gps(db: Session):
    return db.query(models.GPS).all()

def get_information_gyroscope(db: Session):
    return db.query(models.Gyroscope).all()

def get_information_pedometer(db: Session):
    return db.query(models.Pedometer).all()



# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()

# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()

# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()

# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()

# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item