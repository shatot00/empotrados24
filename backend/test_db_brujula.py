import sqlite3
from datetime import datetime, timedelta
import random
import math

# Creamos la conexión a la base de datos
conn = sqlite3.connect('brujula.db')

# Creamos el cursor
cursor = conn.cursor()

# Creamos la tabla 'brujula' si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS brujula (
        id INTEGER PRIMARY KEY,
        tiempo TIMESTAMP NOT NULL,
        direccion REAL NOT NULL
    )
''')

# Insertamos datos aleatorios de prueba
inicio = datetime(2024, 2, 21, 0, 0)
for i in range(100):
    tiempo = inicio + timedelta(minutes=15*i)
    direccion = round(random.uniform(0, 360), 2)  # Dirección aleatoria en grados
    cursor.execute('INSERT INTO brujula (tiempo, direccion) VALUES (?, ?)', (tiempo, direccion))

# Commit para guardar los cambios
conn.commit()

# Cerramos la conexión
conn.close()

print("Base de datos de brújula creada con datos aleatorios.")
