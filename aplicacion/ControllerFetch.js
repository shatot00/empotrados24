export class ControllerFetch {
    constructor() {
        this.url = 'https://b2c6-150-214-100-106.ngrok-free.app';
    }

    sendData = async (data, operation) => {
        //console.log('Datos enviados:', data);
        fetch(this.url + operation, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json',
                'accept': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al enviar los datos al servidor  '+ data.x+" "+ data.y +" "+data.z+"  "+operation);
                }
                return response.json();
            })
            .then(data => {
                console.log('Datos enviados correctamente: '+ operation);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
}