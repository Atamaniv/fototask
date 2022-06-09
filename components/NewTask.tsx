import { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { View, Text, ShadowBoxView as ThemeShadowBoxView } from './Themed';
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
  
const NewTask = function ({store}:any) {  
    const [data,setData] = useState('');    
    const [budget,setBudget] = useState('');    
    const [dataExecute,setDataExecute] = useState(new Date());
    const createTask = () => {
        store.addData(data, budget, dataExecute);
        store.setShowNewTask();
    }
    return (
    <ThemeShadowBoxView style={{backgroundColor:'none', width:'100%', alignSelf:'center', minWidth:200}}>
      <ThemeShadowBoxView style={styles.shadowBox}>        
        <Text style={styles.title}>Нове завдання:</Text>
        <Text>Час зустрічі:</Text>        
        <DatePicker startDate={dataExecute} callBack={()=>setDataExecute}/>        
        <Text>Задача:</Text>
        <UselessTextInput
            multiline
            numberOfLines={4}
            onChangeText={(text:string) => setData(text)}
            value={data}
            style={styles.inputMultiline}
        />
        <Text>Сума винагороди:</Text>
        <TextInput 
          value={budget.replace(/[^0-9]/g, '')}
          onChangeText={setBudget}
          maxLength={6} 
          placeholder="Грн."
          placeholderTextColor="#aaa"
          style={[styles.input]}
        />
        <ThemeShadowBoxView style={{flexDirection:'row', justifyContent:'flex-end'}}>
            <TouchableOpacity
                style={styles.button}
                onPress={()=>store.setShowNewTask()}>
                <Text style={styles.buttonText}>Відмова</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={
                  ()=>{ 
                    store.displayName>''?                    
                    data.length<27 ? alert('Замалий текст опису задачі'):createTask():
                    alert('Потрібно ввести ваше Прізвище та ім`я у данних про себе (четверта вкладка)')
                  } 
                }>
                <Text style={styles.buttonText}>Створити</Text>
            </TouchableOpacity>      
        </ThemeShadowBoxView>
      </ThemeShadowBoxView>
    </ThemeShadowBoxView>
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
      margin:10,
      padding: 10,     
      borderWidth:1,
      backgroundColor:'#eee',      
      fontSize:18,      
    },
    input:{
      padding:10,
      margin:10,
      borderWidth:1,      
      textAlign:'center',
      backgroundColor:'#eee',
      fontSize:18, 
      fontWeight:'bold'
    },
    buttonText:{
      alignSelf:'center',
      margin:10,      
      fontWeight:'bold',
      fontSize:18,
      color:'white',
    },
    button: {
      borderWidth:1,
      margin:10,
      backgroundColor:'#024c5c',
      fontWeight:'bold',
      fontSize:18,
      color:'white',
    }
  });
  
  
