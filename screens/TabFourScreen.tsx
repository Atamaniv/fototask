 import { StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../components/Themed';
import { TextInput } from 'react-native';
import { db } from '../common/firebaseApp'
import { collection, addDoc } from 'firebase/firestore';

const addData = async (about:string) => {
  try {
    const docRef = await addDoc(collection(db, "fototasks"), {
      about: (about.trim()),
      date: new Date,
      userName: "Atamaniv Vlad"
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const UselessTextInput = (props:any) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={100}
    />
  );
}

export default function TabFourScreen() {
  const [task, setTask] = useState('');
  const setData = () =>{ addData(task) }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Зміст заявки:</Text>
      <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={(text:string) => setTask(text)}
        value={task}
        style={styles.inputMultiline}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={setData}
        >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  saveButton: {
    backgroundColor:'#ccc',    
    width:'100%',
    borderTopWidth:1,
    borderBottomWidth:1,
  },
  saveButtonText:{
    alignSelf:'center',
    margin:10
  },
  inputMultiline: {
    padding: 10, 
    margin:20, 
    borderWidth:1, 
    width:'90%',
  }
});
