from pydantic import BaseModel

class Accelerometer(BaseModel):
    """
    Represents an accelerometer reading.

    Attributes:
        time (str): The timestamp of the reading.
        x (str): The acceleration value in the x-axis.
        y (str): The acceleration value in the y-axis.
        z (str): The acceleration value in the z-axis.
    """

    time: str
    x: str
    y: str
    z: str

    class Config:
        orm_mode = True

class Compass(BaseModel):
    """
    Represents a compass reading.

    Attributes:
        time (str): The time of the reading.
        direction (str): The direction indicated by the compass.
    """

    time: str
    direction: str

    class Config:
        orm_mode = True

class GPS(BaseModel):
    """
    Represents GPS coordinates.

    Attributes:
        time (str): The time of the GPS reading.
        latitude (str): The latitude coordinate.
        longitude (str): The longitude coordinate.
    """

    time: str
    latitude: str
    longitude: str

    class Config:
        orm_mode = True

class Gyroscope(BaseModel):
    """
    Represents a gyroscope reading.

    Attributes:
        time (str): The timestamp of the reading.
        x (str): The x-axis value of the gyroscope reading.
        y (str): The y-axis value of the gyroscope reading.
        z (str): The z-axis value of the gyroscope reading.
    """

    time: str
    x: str
    y: str
    z: str

    class Config:
        orm_mode = True

class Pedometer(BaseModel):
    """
    Represents a pedometer entry with time and steps information.

    Attributes:
        time (str): The timestamp of the pedometer reading.
        steps (str): The number of steps taken.
    """

    time: str
    steps: str

    class Config:
        orm_mode = True
