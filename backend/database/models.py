from sqlalchemy import Column, Integer, String

from .database import Base

# TODO - Add the models for the sensors
class Compass(Base):
    __tablename__ = "sensors"

    time = Column(String, primary_key=True, nullable=False, index=False)
    direction = Column(String, primary_key=False, nullable=False, index=False) # N, S, E, W (heading in library)

class GPS(Base):
    __tablename__ = "sensors"

    time = Column(String, primary_key=True, nullable=False, index=False)
    latitude = Column(String, primary_key=False, nullable=False, index=False)
    longitude = Column(String, primary_key=False, nullable=False, index=False)

class Pedometer(Base):
    __tablename__ = "sensors"

    time = Column(String, primary_key=True, nullable=False, index=False)
    steps = Column(int, primary_key=False, nullable=False, index=False)

class Gyroscope(Base):
    __tablename__ = "sensors"

    time = Column(String, primary_key=True, nullable=False, index=False)
    x = Column(String, primary_key=False, nullable=False, index=False)
    y = Column(String, primary_key=False, nullable=False, index=False)
    z = Column(String, primary_key=False, nullable=False, index=False)

class Accelerometer(Base):
    __tablename__ = "sensors"

    time = Column(String, primary_key=True, nullable=False, index=False)
    x = Column(String, primary_key=False, nullable=False, index=False)
    y = Column(String, primary_key=False, nullable=False, index=False)
    z = Column(String, primary_key=False, nullable=False, index=False)