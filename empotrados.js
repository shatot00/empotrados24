import ToggleSwitch from './components/Toggleswitch';
import { StyleSheet,SafeAreaView, ScrollView, Image, View, Text, TouchableOpacity, FlatList } from 'react-native';



export default function empotrados () {
    const Sensores =  [
        {title: 'Brujula' },
        {title:'GPS'  },
        {title: 'Termometro' },
        {title: 'Giroscopio' },
        {title: 'Acelerometro' },
    ];

  return (
   
    <SafeAreaView>
    <ScrollView showsVerticalScrollIndicator={true} persistentScrollbar={true}>
      <View style={styles.container}>
        <View style={styles.container2}>
        <Text style={styles.title}>Empotrados</Text>
        </View>
        <View style={styles.content}>
         

          <View style={styles.tabsContainer}>
          <FlatList
                data={Sensores}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.box} onPress={() => {}}>
                    <Text style={styles.textBox}>{item.title}</Text>
                    <ToggleSwitch/>
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
             
      </View>
      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
  
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    flex: 0.25,
    color:'#F75900'
  },


  tabsContainer: {
    width: "100%",},
 
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 100,
    padding: 10,
    color: '#47525E',
  },
  box: {
    marginVertical: 10,
    padding: 5,
    borderRadius: 20,
    borderColor: '#47525E',
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
  },
  
  textBox: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
 
});