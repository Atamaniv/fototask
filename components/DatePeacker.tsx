import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Themed';
import { Modal, View, TouchableOpacity } from 'react-native';
import R from '../constants/Layout';
import DatePeackerMicro from './DatePeackerMicro';

const DatePeacker = function ({startDate, callBack}:any){
  const [modal, showModal ]= useState(false);
  // const date = new Date('2022-02-24T13:30:00');
  const date = new Date(startDate);
  const [year, setYear ]= useState(date.getUTCFullYear().toString());
  const [month, setMonth ]= useState( (date.getUTCMonth()+1).toString().padStart(2,"0"));
  const [hours, setHours ]= useState(date.getHours().toString().padStart(2,"0"));
  const [minutes, setMinutes ]= useState(date.getUTCMinutes().toString().padStart(2,"0"));
  const [day, setDay ]= useState(date.getUTCDate().toString().padStart(2,"0"));
  const [daysInMonth, setDaysInMonth] = useState(new Date(Number(year), Number(month), 0).getDate());
  const [error, setError] = useState(false)  
  const setDaysOfMonth =(yearIn:string,monthIn:string)=>{
    setDaysInMonth(new Date(Number(yearIn), Number(monthIn), 0).getDate())    
  }

  const virifyDay = (year:number, month:number, day:number)=>{
    if ( day>(new Date(Number(year), Number(month), 0).getDate()) ){
      setError(true)
    } 
      else setError(false);
  }

  return(
    <View style={{maxWidth:R.window.height/2}}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
      >
        {/* Modal window */}
        <View style={styles.containerModal2}>
          <View style={styles.modalView2}>
            <View style={styles.row}>
              <Text style={styles.pseudoText}>Дата:</Text>             
              <DatePeackerMicro 
                title={'День'} 
                def={day} 
                callBack={(val:any)=>{setDay(val);virifyDay(Number(year),Number(month),Number(val))}} 
                days={daysInMonth} 
                error={error}/>
                <Text style={{margin:10,marginTop:10}}>.</Text>              
              <DatePeackerMicro 
                title={'Місяць'} 
                def={month} 
                callBack={(val:any)=>{setMonth(val);setDaysOfMonth(year,val); virifyDay(Number(year),val,Number(day))}}/>
                <Text style={{margin:10,marginTop:10}}>.</Text>             
              <DatePeackerMicro 
                title={'Рік'} 
                def={year} 
                callBack={(val:any)=>{setYear(val);setDaysOfMonth(val, month);
                virifyDay(Number(val),Number(month),Number(day))}}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.pseudoText}>Час:</Text>              
              <DatePeackerMicro 
                title={'Година'} 
                def={hours} 
                callBack={(val:any)=>setHours(val)}/>
                <Text style={{margin:10}}>:</Text>
              <DatePeackerMicro 
                title={'Хвилини'} 
                def={minutes} 
                callBack={(val:any)=>setMinutes(val)}/>
            </View>
            <TouchableOpacity 
              style={[error?styles.buttonError:styles.button,{alignSelf:'center'}]} 
              onPress={()=>{ error? 
                alert('Не можу зберегти таку дату, її не існує'):
                showModal(false)} 
              }>
              <Text style={[styles.buttonText,{width:100}]}>ОК</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={()=>showModal(true)}>
        <Text style={styles.buttonText}>{day+'.'+month+'.'+year+'  '+hours+':'+minutes}</Text>
      </TouchableOpacity> 
      </View>       
    )
  }
export default DatePeacker
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
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,    
  },
  containerModal2: {
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%', 
    alignContent:'center', 
    flexDirection:'row',    
    alignSelf:'center',
    maxWidth:R.window.height/2,
    width:'80%'
  },
  modalView2: {
    minWidth:280,
    width:'60%',
    backgroundColor:'#fff',
    borderRadius: 5,
    borderWidth: 1,
    padding:10,
    alignItems: 'flex-start',
    alignSelf:'center',    
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },    
    elevation: 6
  },

  buttonText:{
    alignSelf:'center',
    margin:10,
    color:'#fff',    
  },
  button: {
    borderWidth:1,
    margin:10,
    backgroundColor:'#024c5c',
    textAlign:'center'
  },  
  buttonError: {
    borderWidth:1,
    margin:10,
    backgroundColor:'#f00',
    textAlign:'center'
  },
  row: {
    flexDirection:'row',
    padding:10
  },
  pseudoText: {
    margin:10,
    color:'#000',
    width:50,
  },
  pseudoButton: {    
    padding:10,    
    borderWidth:1,
    borderRadius:3,
    backgroundColor:'#024c5c',
    color:'#fff'
  }
})