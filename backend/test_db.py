import sqlite3
from datetime import datetime

# Creamos la conexión a la base de datos
conn = sqlite3.connect('temperatura.db')

# Creamos el cursor
cursor = conn.cursor()

# Creamos la tabla 'temperatura' si no existe
cursor.execute('''
    CREATE TABLE IF NOT EXISTS temperatura (
        id INTEGER PRIMARY KEY,
        tiempo TIMESTAMP NOT NULL,
        temperatura REAL NOT NULL
    )
''')

# Insertamos algunos datos de prueba
datos_prueba = [
    (datetime(2024, 2, 21, 12, 0), 25.5),
    (datetime(2024, 2, 21, 12, 15), 26.0),
    (datetime(2024, 2, 21, 12, 30), 26.5),
    (datetime(2024, 2, 21, 12, 45), 27.0),
    (datetime(2024, 2, 21, 13, 0), 27.5)
]

cursor.executemany('INSERT INTO temperatura (tiempo, temperatura) VALUES (?, ?)', datos_prueba)

# Commit para guardar los cambios
conn.commit()

# Cerramos la conexión
conn.close()

print("Base de datos creada con datos de prueba.")
