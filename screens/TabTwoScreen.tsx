import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { getAuth } from "firebase/auth";
import  firebaseApp  from '../common/firebaseApp';
import { useEffect } from 'react';


const auth = getAuth(firebaseApp);

export default function TabTwoScreen() {  
  return (
    <View style={styles.container}>
      <Text>{auth.currentUser===null?'Not authorised':auth.currentUser.toString()}</Text>
    </View>
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
});
