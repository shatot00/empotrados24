from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import sqlite3
import plotly.graph_objs as go

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/temperatura", response_class=HTMLResponse)
async def read_root(request: Request):
    # Conexión a la base de datos SQLite
    conn = sqlite3.connect('temperatura.db')
    cursor = conn.cursor()

    # Obtener datos de la base de datos
    cursor.execute("SELECT tiempo, temperatura FROM temperatura")
    rows = cursor.fetchall()

    # Cerrar la conexión
    conn.close()

    # Convertir los datos en listas separadas de fechas y valores para la gráfica
    fechas = [row[0] for row in rows]
    valores = [row[1] for row in rows]

    # Crear el código HTML de la página
    html_content = f"""
    <html>
    <head>
        <title>Generador de Gráficas</title>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    </head>
    <body>
        <h1>Generador de Gráficas</h1>
        <button onclick="reloadPage()">Actualizar Página</button>
        <a href="/brujula"><button>Ir a Brújula</button></a> <!-- Botón para ir a la página brujula -->
        <div id="graph"></div>
    
        <script>
            function reloadPage() {{
                window.location.reload();
            }}

            // Lógica para generar la gráfica
            var trace = {{
                x: {fechas},
                y: {valores},
                mode: 'lines'
            }};

            var data = [trace];

            Plotly.newPlot('graph', data);
        </script>
    </body>
    </html>
    """

    return HTMLResponse(content=html_content)

@app.get("/brujula", response_class=HTMLResponse)
async def read_brujula(request: Request):
    # Conexión a la base de datos
    conn = sqlite3.connect('brujula.db')
    cursor = conn.cursor()

    # Obtener datos de la base de datos
    cursor.execute("SELECT tiempo, direccion FROM brujula")
    rows = cursor.fetchall()
    tiempos = [row[0] for row in rows]
    direcciones = [row[1] for row in rows]

    # Cerrar conexión a la base de datos
    conn.close()

    # Crear gráfico de barras
    fig = go.Figure()
    fig.add_trace(go.Bar(x=tiempos, y=direcciones, name='Dirección de la brújula'))

    # Configurar diseño del gráfico
    fig.update_layout(title='Lecturas de brújula',
                    xaxis_title='Tiempo',
                    yaxis_title='Dirección (grados)',
                    showlegend=True)

    # Convertir el gráfico a HTML
    graph_html = fig.to_html(full_html=False)

    # Devolver la página HTML con el gráfico
    return """
    <html>
    <head>
        <title>Brújula</title>
    </head>
    <body>
        <h1>Brújula</h1>
        <button onclick="reloadPage()">Actualizar Página</button>
        <a href="/temperatura"><button>Ir a Temperatura</button></a>
        <p>Aquí está el gráfico de barras con las lecturas de la brújula:</p>
        <div>{}</div>
    </body>
    </html>
    """.format(graph_html)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", port=8000, reload=True)

