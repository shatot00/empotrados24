from pydantic import BaseModel

# TODO : Add the schema for the database

class Accelerometer(BaseModel):
    time: str
    x: str
    y: str
    z: str
    

    class Config:
        orm_mode = True