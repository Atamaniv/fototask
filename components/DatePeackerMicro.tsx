import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from './Themed';
import { Modal, View, TouchableOpacity } from 'react-native';
import R from '../constants/Layout';
import { inject, observer } from "mobx-react"
import { storeAnnotation } from 'mobx/dist/internal';

const DatePeackerMicro = function ({title, def, callBack, days, error}:any){
  const [modal, showModal ]= useState(false);
  const [value, setValue] =useState(def)
  const monthAll = []
  const hoursOne = ['00','01','02','03','04','05','06','07','08','09','10','11']
  const hoursTwo = ['12','13','14','15','16','17','18','19','20','21','22','23']
  const minutesHalf = ['00','15','30','45']
  const monthAllNames = ['Січень','Лютий','Березень','Квітень','Травень','Червень','Липень','Серпень','Вересень','Жовтень','Листопад','Грудень']

    const daysInmonth = []
    for (let i = 1; i <= days; i++) {
        daysInmonth.push(i.toString().padStart(2,'0'))
    }

    // months
    for (let i = 1; i <= 12; i++) {
        monthAll.push(i.toString().padStart(2,'0'));
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
            {title==='Рік' &&
                <View style={styles.modalView2}>
                    <View style={styles.row}>
                    <Text style={styles.pseudoText}>{title}</Text>
                    <Text style={'2022'===value? styles.pseudoButtonSelected:styles.pseudoButton} onPress={()=>{setValue('2022');showModal(false);callBack('2022')} }>2022</Text>
                    <Text style={'2023'===value? styles.pseudoButtonSelected:styles.pseudoButton} onPress={()=>{setValue('2023');showModal(false);callBack('2023')} }>2023</Text>
                    </View>
                </View>
            }
            {title==='Місяць' &&
                <View style={styles.modalView2}>
                    <View style={styles.column}>
                    <Text style={styles.pseudoText}>{title}</Text>
                    { monthAll.map((i)=>(
                        <Text key={'month'+i} 
                        style={i===value? styles.pseudoButtonSelected:styles.pseudoButton} 
                        onPress={()=>{setValue(i);showModal(false);callBack(i)} }>
                        {monthAllNames[Number(i)-1]}</Text>))}
                    </View>
                </View>
            }
            {title==='Година' &&
                <View style={styles.modalView2}>
                    <View style={styles.row}>
                        <View style={styles.column}>
                        <Text style={styles.pseudoText}>AM</Text>
                        { hoursOne.map((i)=>(
                            <Text key={'hours'+i} 
                                style={i===value? styles.hoursButtonSelected:styles.hoursButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))}
                        </View>
                        <View style={styles.column}>
                        <Text style={styles.pseudoText}>PM</Text>
                        { hoursTwo.map((i)=>(
                            <Text 
                                key={'hours'+i} 
                                style={i===value? styles.hoursButtonSelected:styles.hoursButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))}
                        </View>
                    </View>
                    </View>
            }
            
            {title==='Хвилини' &&
                <View style={[styles.modalView2,{minWidth:300, padding:5}]}>
                    <View style={styles.row}>
                    <Text style={styles.pseudoText2}>{title}</Text>
                    { minutesHalf.map((i)=>(
                      <Text key={'minutes'+i} 
                            style={i===value? styles.pseudoButtonSelected:styles.pseudoButton} 
                            onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                    } 
                    </View>
                </View>
            }
            {title==='День' &&
                <View style={[styles.modalView2,{minWidth:320, padding:5}]}>
                  <View style={styles.column}>
                    <Text style={styles.pseudoText2}>{title}</Text>
                        <View style={styles.row}>
                        { daysInmonth.slice(0, 7).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.hoursButtonSelected:styles.hoursButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { daysInmonth.slice(7, 14).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.hoursButtonSelected:styles.hoursButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { daysInmonth.slice(14, 21).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.hoursButtonSelected:styles.hoursButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { daysInmonth.slice(21, 28).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.hoursButtonSelected:styles.hoursButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { days>28 && daysInmonth.slice(28, days).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.hoursButtonSelected:styles.hoursButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        }                        
                        </View>
                    </View>  
                </View>
            }
            </View>
        </Modal>
        <TouchableOpacity
            style={error?styles.buttonError:styles.button}
            onPress={()=>showModal(true)}>
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity> 
      </View>       
    )
  }


export default DatePeackerMicro
 
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
    width:'60%',
    alignContent:'center',
    backgroundColor:'#fff',
    borderRadius: 5,
    borderWidth: 1,
    padding:15,
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
    backgroundColor:'#024c5c',
    textAlign:'center'
  },
  buttonError: {
    borderWidth:1,
    backgroundColor:'#f00',
    textAlign:'center'
  },
  row: {
    flexDirection:'row',
    padding:10
  },
  column: {
    flexDirection:'column',
    padding:10,
    alignItems:'center',
  },
  pseudoText: {
    margin:10,
    color:'#000',
    width:50,
  },
  pseudoText2: {
    margin:10,
    color:'#000',
  },
  pseudoButton: {    
    padding:10,
    margin:2,    
    borderWidth:1,
    borderRadius:3,
    backgroundColor:'#ccc',
    color:'#000',
    width:100
  },
  pseudoButtonSelected: {    
    padding:10,    
    borderWidth:1,
    borderRadius:3,
    backgroundColor:'#024c5c',
    color:'#fff',
    width:100
  },
  hoursButton: {    
    padding:10,
    margin:2,    
    borderWidth:1,
    borderRadius:3,
    backgroundColor:'#ccc',
    color:'#000',
  },
  hoursButtonSelected: {    
    padding:10,   
    margin:2,  
    borderWidth:1,
    borderRadius:3,
    backgroundColor:'#024c5c',
    color:'#fff',
  },
})