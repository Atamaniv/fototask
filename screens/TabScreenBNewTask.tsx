import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { inject, observer } from 'mobx-react';
import NewTask from '../components/NewTask';

// const MyShadowBoxView = () => {
//   return <View style={styles.shadowBox}>
//       <Text>xxx</Text>
//     </View>
// }

const TabFourScreen = function ({store}:any) {   
    const [newTaskVisible, setNewTaskVisible] = useState(false)
    const runTask=()=>{
      store.isAuthorised() ? alert('Нообхіна авторизація'):store.setShowNewTask();
    }
    return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#013d59', height: 100, width: '100%', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 40, paddingTop: 25 }}>NEW TASK</Text>
      </View>
      <View style={{height: 50, width: '100%'}}>
        
      </View>
      {  store.showNewTask && <NewTask /> }
      { !store.showNewTask &&
        <TouchableOpacity
          style={styles.button}
          onPress={()=>runTask()}>
          <Text style={styles.buttonText}>Створити завдання</Text>
        </TouchableOpacity>
      }

      {/* <MyShadowBoxView/> */}
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
    justifyContent:'center',    
    width:'90%',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5,
    elevation: 24,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
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
    margin:20,
    color:'#fff',   
  },
  button: {
    borderWidth:1,
    margin:10,
    borderRadius:3,
    backgroundColor:'#024c5c'
  }  
});
