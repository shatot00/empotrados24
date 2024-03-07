export class ControllerFetch {
    constructor() {
        this.url = 'https://4426-2a02-9130-88b0-d8c8-f592-f5d7-d8c5-906b.ngrok-free.app';
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