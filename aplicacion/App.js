import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import axios from 'axios';

import * as Location from 'expo-location';

import { Magnetometer } from 'expo-sensors';

export default function App() {

  const [dataAccelero, setAccelerometer] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [dataGyro, setGyroscope] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [dataMagneto, setMagneto] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState(null);

  const _slow = () => {
    Accelerometer.setUpdateInterval(15000);
    Gyroscope.setUpdateInterval(15000);
    Magnetometer.setUpdateInterval(15000);
  }

  const _fast = () => {
    Accelerometer.setUpdateInterval(5000);
    Gyroscope.setUpdateInterval(5000);
    Magnetometer.setUpdateInterval(5000);
  }

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(acceleroData => {
        setAccelerometer(acceleroData);
        sendDataAccelero(dataAccelero);
      }),
      Gyroscope.addListener(gyroscopeData => {
        setGyroscope(gyroscopeData);
        sendDataGyro(dataGyro);
      }),
      Magnetometer.addListener(result => {
        setMagneto(result);
        // sendDataMagneto(dataMagneto);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  //--------------------- GPS ---------------------
/*
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    _subscribe();
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    return () => _unsubscribe();
  }, []);

  let textGPS = 'Waiting..';

  if (errorMsg) {
    textGPS = errorMsg;
  } else if (location) {
    textGPS = JSON.stringify(location);
  }

*/
  //================== To Server ==================
  const url = 'https://80b9-90-94-129-209.ngrok-free.app';


  // // ------ Accelerometer ------
  // const optionsAccelero = {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json',
  //   },
  //   body: dataAccelero,
  // };

  //   crearExamen(examen, idSubject) {

  //     return fetch(this.srvUrl + "/subjects/" + idSubject + "/examst", {
  //         method: 'POST',
  //         body: JSON.stringify(examen),
  //         headers: {
  //             'Content-type': 'application/json',
  //             'accept': 'application/json'
  //         }
  //     })
  //         .then(response => this.comprobarRespuesta(response))
  //         .then(response => this.devolverRespuesta(response));



  // }

  const sendDataAccelero = async (dataAccelero) => {
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
          throw new Error('Error al enviar los datos del Acelerometro al servidor');
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


  const sendDataGyro = async (dataGyro) => {
    console.log('Datos enviados:', dataGyro);
    fetch(url + '/add_gyroscope', {
      method: 'POST',
      body: JSON.stringify(dataGyro),
      headers: {
        'Content-type': 'application/json',
        'accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al enviar los datos del Giroscopio al servidor');
        }
        return response.json();
      })
      .then(dataAccelero => {
        console.log('Datos enviados correctamente:', dataGyro);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };


  const sendDataMagneto = async (dataMagneto) => {
    console.log('Datos enviados:', dataMagneto);
    fetch(url + '/add_magnetometer', {
      method: 'POST',
      body: JSON.stringify(dataMagneto),
      headers: {
        'Content-type': 'application/json',
        'accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al enviar los datos del Giroscopio al servidor');
        }
        return response.json();
      })
      .then(dataAccelero => {
        console.log('Datos enviados correctamente:', dataMagneto);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // ------ Gyroscope ------
  // const optionsGyro = {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json',
  //   },
  //   body: dataGyro,
  // };

  // const sendDataGyro = async (dataGyro) => {
  //   fetch(url + '/add_gyroscope', optionsGyro)
  //   .then(response => {
  //       if (!response.ok) {
  //           throw new Error('Error al enviar los datos al servidor');
  //       }
  //       return response.json();
  //   })
  //   .then(dataGyro => {
  //       console.log('Datos enviados correctamente:', dataGyro);
  //   })
  //   .catch(error => {
  //       console.error('Error:', error);
  //   });
  // };

  // // ------ setMagneto ------
  // const optionsMagneto = {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type': 'application/json',
  //   },
  //   body: dataMagneto,
  // };

  // const sendDataMagneto = async (dataMagneto) => {
  //   fetch(url + '/add_magnetometer', optionsMagneto)
  //   .then(response => {
  //       if (!response.ok) {
  //           throw new Error('Error al enviar los datos al servidor');
  //       }
  //       return response.json();
  //   })
  //   .then(dataMagneto => {
  //       console.log('Datos enviados correctamente:', dataMagneto);
  //   })
  //   .catch(error => {
  //       console.error('Error:', error);
  //   });
  // };

/*
  const sendDataMagneto = async (dataMagneto) => {
    fetch(url + '/add_magnetometer', optionsMagneto)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al enviar los datos al servidor');
        }
        return response.json();
    })
    .then(dataMagneto => {
        console.log('Datos enviados correctamente:', dataMagneto);
    })
    .catch(error => {
        console.error('Error:', error);
    });
  };
  */

  //=================================================

  /*
    <Text style={styles.text}>GPS</Text>
    <Text style={styles.paragraph}>{textGPS}</Text>
  */

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {dataAccelero.x}</Text>
      <Text style={styles.text}>y: {dataAccelero.y}</Text>
      <Text style={styles.text}>z: {dataAccelero.z}</Text>
      <Text style={styles.text}> </Text>

      <Text style={styles.text}>Giroscopio</Text>
      <Text style={styles.text}>x: {dataGyro.x}</Text>
      <Text style={styles.text}>y: {dataGyro.y}</Text>
      <Text style={styles.text}>z: {dataGyro.z}</Text>

      <Text style={styles.text}>Magnetometer:</Text>
      <Text style={styles.text}>x: {dataMagneto.x}</Text>
      <Text style={styles.text}>y: {dataMagneto.y}</Text>
      <Text style={styles.text}>z: {dataMagneto.z}</Text>       

      <Text style={styles.text}>GPS</Text>
      <Text style={styles.paragraph}>{textGPS}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
