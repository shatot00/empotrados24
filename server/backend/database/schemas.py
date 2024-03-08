from pydantic import BaseModel

class Accelerometer(BaseModel):
    """
    Represents an accelerometer reading with x, y, and z coordinates.
    """

    x: float
    y: float
    z: float

    class ConfigDict:
        from_attributes = True

class Magnetometer(BaseModel):
    """
    Represents a magnetometer reading with x, y, and z coordinates.
    """

    x: float
    y: float
    z: float

    class ConfigDict:
        from_attributes = True

class GPS(BaseModel):
    """
    Represents GPS coordinates with latitude and longitude.
    """

    latitude: float
    longitude: float

    class ConfigDict:
        from_attributes = True

class Gyroscope(BaseModel):
    """
    Represents a gyroscope with x, y, and z coordinates.
    """

    x: float
    y: float
    z: float

    class ConfigDict:
        from_attributes = True

class Pedometer(BaseModel):
    """
    Represents a pedometer object.
    """

    steps: int

    class ConfigDict:
        from_attributes = True
