import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { getAuth, signOut, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from '../common/firebaseApp';
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const auth = getAuth(firebaseApp);


export default function TabThreeScreen() {
  const [user, setUser] = useState(auth.currentUser)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setUserSingIn = () => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      setUser(userCredential.user);
    })
    .catch((error) => {
      console.log(error.message);
    });
  }

  const setUserOut = () => {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.log(error)
    });
    }

  const setNewUser = () => {    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        console.log(error.message);
      });    
  }
  return (
  <KeyboardAwareScrollView>
    <View style={styles.container}>
      <Text>{user===null?'Not authorised':user.email}</Text>
      <TextInput 
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
        onPress={setNewUser}
        >
        <Text style={styles.saveButtonText}>Create user</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={setUserSingIn}
        >
        <Text style={styles.saveButtonText}>Sing in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={setUserOut}
        >
        <Text style={styles.saveButtonText}>Sing out</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAwareScrollView>
  );
}

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
