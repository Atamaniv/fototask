import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { getAuth, signOut, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { TextInput, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react';

import React from 'react';

const TabThreeScreen = function TabThreeScreen ({store}:any) {   
  
 return (
    <View style={styles.container}>
      <Text>{store.count}</Text>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={()=>store.addCount()}
        >
        <Text style={styles.saveButtonText}>Sing in</Text>
      </TouchableOpacity>

      {/* <Text>{iContext.count}</Text> */}
      {/* <TextInput 
        value={email}
        onChangeText={setEmail}
        maxLength={100} 
        placeholder="E-Mail"
        style={[styles.input]}
      />
      <TextInput 
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        maxLength={100} 
        style={[styles.input]}
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={()=>store.setNewUser(email,password)}
        >
        <Text style={styles.saveButtonText}>Create user</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={()=>store.setUserIn(email,password)}
        >
        <Text style={styles.saveButtonText}>Sing in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={()=>store.setUserOut()}
        >
        <Text style={styles.saveButtonText}>Sing out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={()=>store.add()}
        >
        <Text style={styles.saveButtonText}>add</Text>
      </TouchableOpacity>       */}
    </View>  
 )
}
export default inject(({store})=>({store}))(observer(TabThreeScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }, 
  input:{
    borderWidth:1,
    width:'90%',
    padding:10,
    margin:12
  },
  saveButtonText:{
    alignSelf:'center',
    margin:10
  },
  saveButton: {
    backgroundColor:'#ccc',
    width:'100%',
    borderTopWidth:1,
    borderBottomWidth:1,
  },
});
