export class ControllerFetch {
    constructor() {
        this.url = 'http://d8d8-150-214-100-106.ngrok-free.app';
    }

    sendDataAccelero = async (dataAccelero) => {
        console.log('Datos enviados:', dataAccelero);
        fetch(url + '/add_accelerometer', {
            method: 'POST',
            body: JSON.stringify(dataAccelero),
            headers: {
                'Content-type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos al servidor');
                }
                return response.json();
            })
            .then(dataAccelero => {
                console.log('Datos enviados correctamente:', dataAccelero);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
}