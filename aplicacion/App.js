import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope, Pedometer } from 'expo-sensors';

import * as Location from 'expo-location';

import { Magnetometer } from 'expo-sensors';

export default function App() {
  
  const [ dataAccelero, setAccelerometer] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [ dataGyro, setGyroscope] = useState({
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

  const _slow = () => { Accelerometer.setUpdateInterval(1000);
                        Gyroscope.setUpdateInterval(1000);
                        Magnetometer.setUpdateInterval(1000);
                      }

  const _fast = () => { Accelerometer.setUpdateInterval(200);
                        Gyroscope.setUpdateInterval(200);
                        Magnetometer.setUpdateInterval(200);
                      }

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(acceleroData =>{
        setAccelerometer(acceleroData);
      }), 
      Gyroscope.addListener(gyroscopeData =>{
        setGyroscope(gyroscopeData);
      }),
      Magnetometer.addListener(result => {
        setMagneto(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  //--------------------- GPS ---------------------

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
 //---------------------------------------------

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {dataAccelero.x}</Text>
      <Text style={styles.text}>y: {dataAccelero.y}</Text>
      <Text style={styles.text}>z: {dataAccelero.z}</Text>
      <Text style={styles.text}> </Text>
      <Text style={styles.text}>Gyroscope: </Text>
      
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
