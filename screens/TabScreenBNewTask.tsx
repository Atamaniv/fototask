 import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native';

import { inject, observer } from 'mobx-react';

const UselessTextInput = (props:any) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={100}
    />
  );
}
const TabFourScreen = function _ ({store}:any) {   
  const [task, setTask] = useState('');
  const setData = () =>{ store.addData(task) }
  return (
    <View style={styles.container}>
      <View style={styles.shadowBox}>
        <Text style={styles.title}>Нове завдання:</Text>
        <UselessTextInput
          multiline
          numberOfLines={4}
          onChangeText={(text:string) => setTask(text)}
          value={task}
          style={styles.inputMultiline}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={setData}
          >
        <Text style={styles.buttonText}>Створити завдання</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default inject(({ store }) => ({ store }))(observer(TabFourScreen))

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor:'#00b2da',    
    height:'100%'
  },
  shadowBox:{
    alignContent: 'center',
    marginTop:50,
    width:'90%',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5,
    elevation: 24,
    shadowOpacity: 0.58,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 }
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:20,
    alignSelf:'center'
  },
  inputMultiline: {
    padding: 10, 
    margin:20, 
    borderWidth:1, 
    width:'90%',
  },
  buttonText:{
    alignSelf:'center',
    margin:10,
    color:'#fff'
  },
  button: {
    borderWidth:1,
    margin:10,
    backgroundColor:'#024c5c'
  },
});
