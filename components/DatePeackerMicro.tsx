import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, ShadowBoxView } from './Themed';
import { Modal, View, TouchableOpacity } from 'react-native';
import R from '../constants/Layout';
import { RoundElement } from './utilit';

const setRound1=RoundElement(12,100,0,0);
const setRound2=RoundElement(12,160,0,0);

const DatePeackerMicro = function ({title, def, callBack, days, error}:any){
  const [modal, showModal ]= useState(false);
  const [value, setValue] =useState(def)
  const monthAll = []
  const hoursOne = ['00','01','02','03','04','05','06','07','08','09','10','11']
  const hoursTwo = ['12','13','14','15','16','17','18','19','20','21','22','23']
  const hoursAll = ['00','01','02','03','04','05','06','07','08','09','10','11', '12','13','14','15','16','17','18','19','20','21','22','23']
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
    <ShadowBoxView style={{maxWidth:R.window.height/2}}>
        <Modal
        animationType="none"
        transparent={true}
        visible={modal}
        >
            {/* Modal window */}
            <View style={styles.containerModal2}>
            {title==='Рік' &&
                <ShadowBoxView style={styles.modalView2}>
                    <View style={styles.row}>
                    <Text style={styles.pseudoText}>{title}</Text>
                    <Text style={'2022'===value? styles.pseudoButtonSelected:styles.pseudoButton} onPress={()=>{setValue('2022');showModal(false);callBack('2022')} }>2022</Text>
                    <Text style={'2023'===value? styles.pseudoButtonSelected:styles.pseudoButton} onPress={()=>{setValue('2023');showModal(false);callBack('2023')} }>2023</Text>
                    </View>
                </ShadowBoxView>
            }
            {title==='Місяць' &&
                <ShadowBoxView style={styles.modalView2}>
                    <View style={styles.column}>
                    { monthAll.map((i)=>(
                        <Text key={'month'+i} 
                        style={i===value? styles.pseudoButtonSelected:styles.pseudoButton} 
                        onPress={()=>{setValue(i);showModal(false);callBack(i)} }>
                        {monthAllNames[Number(i)-1]}</Text>))}
                    </View>
                </ShadowBoxView>
            }
            {title==='Година' &&
                <ShadowBoxView style={styles.round}> 
                    <View style={[styles.row,{alignSelf:'center'}]}>
                        <View style={styles.column}>
                        { hoursOne.map((i)=>(
                            <Text key={'hours'+i} 
                                style={[i===value? styles.roundButtonSelected:styles.roundButton,
                                  { position:'absolute', 
                                   left:setRound1[Number(i)].x-10,
                                   top:setRound1[Number(i)].y+170
                                  }] 
                                } 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        }
                       { hoursTwo.map((i)=>(
                            <Text key={'hours'+i} 
                                style={[i===value? styles.roundButtonSelected:styles.roundButton,
                                  { position:'absolute', 
                                   left:setRound2[Number(i)-12].x-10, 
                                   top:setRound2[Number(i)-12].y+170
                                  }] 
                                } 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        }
                        </View>
                    </View>
                </ShadowBoxView>
            }
            
            {title==='Хвилини' &&
                <ShadowBoxView style={[styles.modalView2,{minWidth:300, padding:5}]}>
                    <View style={styles.row}>
                    <Text style={styles.pseudoText2}>{title}</Text>
                    { minutesHalf.map((i)=>(
                      <Text key={'minutes'+i} 
                            style={i===value? styles.pseudoButtonSelected:styles.pseudoButton} 
                            onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                    } 
                    </View>
                </ShadowBoxView>
            }
            {title==='День' &&
                <ShadowBoxView style={[styles.modalView2,{minWidth:380, padding:5}]}>
                  <View style={styles.column}>
                    <Text style={styles.pseudoText2}>{title}</Text>
                        <View style={styles.row}>
                        { daysInmonth.slice(0, 7).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.roundButtonSelected:styles.roundButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { daysInmonth.slice(7, 14).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.roundButtonSelected:styles.roundButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { daysInmonth.slice(14, 21).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.roundButtonSelected:styles.roundButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { daysInmonth.slice(21, 28).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.roundButtonSelected:styles.roundButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        } 
                        </View>
                        <View style={styles.row}>
                        { days>28 && daysInmonth.slice(28, days).map((i:any)=>(
                        <Text key={'days'+i} 
                                style={i===value? styles.roundButtonSelected:styles.roundButton} 
                                onPress={()=>{setValue(i);showModal(false);callBack(i)} }>{i}</Text>))
                        }                        
                        </View>
                    </View>  
                </ShadowBoxView>
            }
            </View>
        </Modal>
        <TouchableOpacity
            style={error?styles.buttonError:styles.button}
            onPress={()=>showModal(true)}>
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity> 
      </ShadowBoxView>       
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
    alignSelf:'center',
    justifyContent: 'center',
    height:'100%', 
    alignContent:'center', 
    flexDirection:'row',
    maxWidth:R.window.height/2,
    width:'80%'
  },
  modalView2: {
    width:'60%',
    minWidth:230,
    alignContent:'center',
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
    fontWeight:'bold',
    fontSize:18,
    color:'white',
  },
  button: {
    borderWidth:1,
    backgroundColor:'#013d59',
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
    width:50,
    fontWeight:'bold',
    fontSize:18,
    color:'white',
  },
  pseudoText2: {
    margin:10,
    fontWeight:'bold',
    fontSize:18,
    color:'white',
  },
  pseudoButton: {  
    textAlign:'center',
    
    borderRadius:25,
    padding:10,
    margin:2,    
    backgroundColor:'#1a1a1a',    
    
    borderWidth:0,
    fontWeight:'bold',
    fontSize:18,
    color:'white',
    width:130
  },
  pseudoButtonSelected: {
    textAlign:'center',
    borderRadius:25,
    padding:10,
    margin:2,    
    backgroundColor:'#013d59',
    borderWidth:0,
    fontWeight:'bold',
    fontSize:18,
    color:'white',
    width:140
  },
  roundButton: {
    textAlign:'center',
    
    borderRadius:25,
    padding:10,
    margin:2,    
    backgroundColor:'#1a1a1a',    
    
    borderWidth:0,
    fontWeight:'bold',
    fontSize:18,
    color:'white',
  },
  roundButtonSelected: {
    textAlign:'center',
    
    borderRadius:25,
    padding:10,
    margin:2,    
    backgroundColor:'#013d59',    

    fontWeight:'bold',
    fontSize:18,
    color:'white',
  },
  round:{
    width:400,
    height:400,
    borderRadius:200,
    backgroundColor:'#484848',
    shadowColor: "#000",
    shadowOpacity: 0.8,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 4 },    
    elevation: 6
  }
})