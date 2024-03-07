https://docs.expo.dev/get-started/installation/ Crear aplicacion de react-native

https://docs.expo.dev/versions/latest/sdk/sensors/ Sensores que hay

https://docs.expo.dev/versions/latest/sdk/accelerometer/ Acelerómetro

https://docs.expo.dev/versions/latest/sdk/gyroscope/ Giroscopio

https://docs.expo.dev/versions/latest/sdk/location/ GPS/Brujula

https://docs.expo.dev/versions/latest/sdk/pedometer/ Pedometer

Bases de datos faciles sin tener que hacer secuencias en SQL
https://fastapi.tiangolo.com/tutorial/sql-databases/

http://localhost:8000/docs Para hacer peticiones

Si usais VSCode os recomiendo estas extensiones:
Pylance (ms-python.vscode-pylance)
Github Copilot (GitHub.copilot)
Expo Tools(expo.vscode-expo-tools)
SQLite(alexcvzz.vscode-sqlite)

# Crear entorno virtual:

1. Situarse en server/backend

2. Después poner python -m venv .venv

3. Activarlo con .venv\Scripts\activate

4. Instalar dependencias con pip install -r requirements.txt

# Ejecutar el backend

Solamente poner *python main.py* (en ese archivo esta la configuración para lanzar el servidor)

# Para que funcionen las cosas

Vamos a probar con ngrok:
https://dashboard.ngrok.com/get-started/setup/windows

Descargar del link, después añadir el token y para que haga el puente de conexión y salga a la web hay que hacer lo siguiente:

1. Ejecutar backend, como esta escrito antes
2. Ejecutar ngrok, en donde nos lo hayamos descargado (lo subiré a github) con *ngrok http 8000* 8000 es el puerto donde esta FastAPI
3. La ip que nos devuelve con Forwarding es la que utilizaremos en la aplicación
4. Recuerdo que esta IP cambia cada vez que se ejecuta

# Problemas puerto emulador

1. Usar *netstat -ano | findstr :PUERTO* para ver el proceso, sustituir PUERTO por el puerto que de problemas
2. Usar *taskkill /PID IDP /F* para matar el proceso, sustituir IDP por el proceso