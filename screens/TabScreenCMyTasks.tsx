import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { inject, observer } from 'mobx-react';

const TabTwoScreen =  function ({store} :any) {
  return (
    <View style={styles.container}>
      <Text style={styles.saveButtonText}>{store.email}</Text>
    </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#00b2da'
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
  saveButtonText:{
    alignSelf:'center',
    margin:10,
    color:'#fff'    
  },
});

export default inject(({store})=>({store}))(observer(TabTwoScreen))
