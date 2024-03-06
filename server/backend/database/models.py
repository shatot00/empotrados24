from sqlalchemy import Column, Integer, String, Float

from .database import Base

class Accelerometer(Base):
    """
    Represents an accelerometer sensor.

    Attributes:
        id (int): The unique identifier for the accelerometer.
        time (str): The timestamp of the accelerometer reading.
        x (float): The x-axis value of the accelerometer reading.
        y (float): The y-axis value of the accelerometer reading.
        z (float): The z-axis value of the accelerometer reading.
    """
    __tablename__ = "accelerometer"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    time = Column(String, primary_key=False, nullable=False, index=False)
    x = Column(Float, primary_key=False, nullable=False, index=False)
    y = Column(Float, primary_key=False, nullable=False, index=False)
    z = Column(Float, primary_key=False, nullable=False, index=False)

class Magnetometer(Base):
    """
    Represents a compass sensor.

    Attributes:
        id (int): The unique identifier of the compass sensor.
        time (str): The timestamp of the sensor reading.
        direction (float): The direction in degrees (0-360).
    """
    __tablename__ = "magnetometer"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    time = Column(String, primary_key=False, nullable=False, index=False)
    x = Column(Float, primary_key=False, nullable=False, index=False)
    y = Column(Float, primary_key=False, nullable=False, index=False)
    z = Column(Float, primary_key=False, nullable=False, index=False)

class GPS(Base):
    """
    Represents a GPS sensor.

    Attributes:
        id (int): The unique identifier of the sensor.
        time (str): The timestamp of the GPS reading.
        latitude (float): The latitude coordinate.
        longitude (float): The longitude coordinate.
    """
    __tablename__ = "gps"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    time = Column(String, primary_key=False, nullable=False, index=False)
    latitude = Column(Float, primary_key=False, nullable=False, index=False)
    longitude = Column(Float, primary_key=False, nullable=False, index=False)

class Gyroscope(Base):
    """
    Represents a gyroscope sensor.

    Attributes:
        id (int): The unique identifier for the gyroscope.
        time (str): The timestamp of the gyroscope reading.
        x (float): The x-axis value of the gyroscope reading.
        y (float): The y-axis value of the gyroscope reading.
        z (float): The z-axis value of the gyroscope reading.
    """
    __tablename__ = "gyroscope"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    time = Column(String, primary_key=False, nullable=False, index=False)
    x = Column(Float, primary_key=False, nullable=False, index=False)
    y = Column(Float, primary_key=False, nullable=False, index=False)
    z = Column(Float, primary_key=False, nullable=False, index=False)
    
class Pedometer(Base):
    """
    Represents a pedometer sensor.

    Attributes:
        id (int): The unique identifier for the pedometer.
        time (str): The timestamp of the pedometer reading.
        steps (int): The number of steps recorded by the pedometer.
    """
    __tablename__ = "pedometer"

    id = Column(Integer, primary_key=True, index=True, nullable=False)
    time = Column(String, primary_key=False, nullable=False, index=False)
    steps = Column(Integer, primary_key=False, nullable=False, index=False)
