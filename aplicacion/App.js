import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer, Gyroscope, LightSensor } from 'expo-sensors';
import { ControllerFetch } from "./ControllerFetch";

import * as Location from 'expo-location';


import { Magnetometer } from 'expo-sensors';


export default function App() {
  const ctrllFetch = new ControllerFetch();

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

  const [ illuminance, setIlluminance] = useState({ 
    illuminance: 0
   });

  const [subscription, setSubscription] = useState(null);  

  const _slow = () => {
    Accelerometer.setUpdateInterval(30000);
    Gyroscope.setUpdateInterval(30000);
    Magnetometer.setUpdateInterval(30000);
    LightSensor.setUpdateInterval(30000);
  }

  const _fast = () => {
    Accelerometer.setUpdateInterval(15000);
    Gyroscope.setUpdateInterval(15000);
    Magnetometer.setUpdateInterval(15000);
    LightSensor.setUpdateInterval(15000);
  }
  _fast();

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(acceleroData => {
        setAccelerometer(acceleroData);
        ctrllFetch.sendData(acceleroData, "/add_accelerometer")
      }),

      Gyroscope.addListener(gyroscopeData => {
        setGyroscope(gyroscopeData);
        ctrllFetch.sendData(gyroscopeData, "/add_gyroscope")
      }),

      Magnetometer.addListener(magnetoData => {
        setMagneto(magnetoData);
        ctrllFetch.sendData(magnetoData, "/add_magnetometer")          
      }),
      
      LightSensor.addListener(illuminanceData =>{
        setIlluminance(illuminanceData);
        ctrllFetch.sendData(illuminanceData, "/add_lightSensor") 
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
    (async () => {      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      //console.log(location);
      json_location = {
        "latitude": location.coords.latitude, 
        "longitude": location.coords.longitude
      };
      ctrllFetch.sendData(json_location, "/add_gps")
    })();
  }, []);

  let textGPS = 'Waiting..';

  if (errorMsg) {
    textGPS = errorMsg;
  } else if (location) {
    textGPS = JSON.stringify(location);
  }

  //------------------------------------------


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
      <Text style={styles.text}> </Text>

      <Text style={styles.text}>Magnetometer:</Text>
      <Text style={styles.text}>x: {dataMagneto.x}</Text>
      <Text style={styles.text}>y: {dataMagneto.y}</Text>
      <Text style={styles.text}>z: {dataMagneto.z}</Text> 

      <Text style={styles.text}>LightSensor:</Text>
      <Text> Illuminance: {illuminance.illuminance} </Text>

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
