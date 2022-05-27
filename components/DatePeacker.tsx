import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Themed';
import { TextInput, Modal, View, TouchableOpacity } from 'react-native';
import R from '../constants/Layout';

const date = new Date();
const yearN = date.getFullYear();
const monthN = date.getMonth();
const dayN = date.getDay();
const hoursN = date.getHours();
const minutesN = date.getMinutes();
const combineN = dayN.toString()+'/'+monthN.toString()+'/'+yearN.toString()+' '+hoursN.toString()+':'+minutesN.toString();

// const toTimestamp = (strDate:string) => {  
//     const dt = new Date().getTime();  
//     return dt / 1000;  
//   }  
// alert(toTimestamp('02/13/2020 23:31:30'));

export default function DatePeacker () {
  const [month, setMonth ]= useState(monthN.toString().padStart(2, "0"));
  const [day, setDay ]= useState(dayN.toString().padStart(2, "0"));
  const [year, setYear ]= useState(yearN.toString());
  const [combine, setCombaine]= useState(combineN)
  const [date, setDate]= useState('');
  const [modal, showModal ]= useState(false);
  const [validCombine,setValidCombain]= useState(true)
  const testValidCombain=()=>{ return true }

  return(
    <View style={{maxWidth:R.window.height/2}}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}    
        style={{maxWidth:R.window.height/2}}
      >
        <TouchableOpacity style={styles.containerModal} onPress={()=>showModal(false)}>
        <View style={styles.modalView}>
          <TextInput
            style={{width:200,fontSize:18, padding:4}}
            value={combine}
            onChangeText={testValidCombain}
            maxLength={2}
          />
        </View>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>showModal(true)}>
        <Text style={styles.buttonText}>{combine}</Text>                
      </TouchableOpacity> 
      </View>       
    )
  }
 
const styles = StyleSheet.create({
  containerModal: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#00b2da',    
    height:'100%', 
    alignContent:'center', 
    flexDirection:'row',    
    alignSelf:'center',
    minWidth:R.window.height/2
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,    
    alignItems: "center",
    alignSelf:'center',    
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,    
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
})