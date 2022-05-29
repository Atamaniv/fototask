import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { View, Text } from './Themed';
import { TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import DatePicker from '../components/DatePeacker'

const UselessTextInput = (props:any) => {
    return (
      <TextInput
        {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
        editable
        maxLength={200}
      />
    );
  }
  
const NewTask = function _ ({store}:any) {  
    const [data,setData] = useState('');
    const [dataCreate,setDataCreate] = useState('');
    const [dataExecute,setDataExecute] = useState('');
    const createTask = () => {
        store.addData(data);
        store.setShowNewTask();
    }
    return (
    <View style={{backgroundColor:'none', width:'100%', alignSelf:'center'}}>
      <View style={styles.shadowBox}>        
        <Text style={styles.title}>Нове завдання:</Text>
        <Text>Час зустрічі:</Text>
        <DatePicker startDate={'2022-02-24T13:30:00'} callBack={()=>setDataCreate}/>
        <DatePicker startDate={'1999-02-20T12:30:00'} callBack={()=>setDataExecute}/>
        <Text>Задача:</Text>
        <UselessTextInput
            multiline
            numberOfLines={4}
            onChangeText={(text:string) => setData(text)}
            value={data}
            style={styles.inputMultiline}
        />
        <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>store.setShowNewTask()}>
                <Text style={styles.buttonText}>Відмова</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>createTask()}>
                <Text style={styles.buttonText}>Створити</Text>
            </TouchableOpacity>      
        </View>
      </View>
    </View>
    )
}

export default inject(({ store }) => ({ store }))(observer(NewTask))
  
const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor:'#00b2da',    
      height:'100%'
    },
    shadowBox:{
      alignSelf:'center',
      alignContent: 'center',
      justifyContent:'center',    
      width:'90%',
      borderWidth: 1,
      margin: 20,      
      borderRadius: 5,
      padding: 10,
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
      borderWidth:1,
      margin:10
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
    }
  });
  
  
