import { useState, FC } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';

import firebaseApp from '../common/firebaseApp';
import { getDoc, getFirestore, Timestamp } from 'firebase/firestore/';
//import { ref, onValue, getDatabase} from "firebase/database";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"; 
import { Button } from 'native-base';
import { doc, onSnapshot } from "firebase/firestore";

// Init services
const db = getFirestore(firebaseApp);

interface Row {
  id:string,
  about:string,
  date:string,
  userName:string
}
interface objRow extends Array<Row>{}
var DATA :objRow= [
  {
    id:'1',
    date:"sdfsd",
    about:"Нужна фотосессия в фотостудии",
    userName:"qwewrewerwer"
  }
]

const collectionRef = collection(db, 'fototasks');
const q = query(collectionRef, orderBy('date', 'desc'));
const unsub = onSnapshot(q, (doc) => {
    console.log("Current data: ", doc.docs) });


// Подписка на документ
//const unsub = onSnapshot(doc(db, "fototasks/", "1"), (doc) => {
//    console.log("Current data: ", doc.data());
//});

const Item = ({ item, onPress, backgroundColor, textColor }:{item:any,onPress:any,backgroundColor:any,textColor:any}) => (
  <TouchableOpacity onPress={onPress} >    
    <View style={[ backgroundColor, textColor ]}>
      <Text style={[styles.aboutHead]}> { item.date } </Text>
      <View style={[{flexDirection:'row'},styles.item, backgroundColor, textColor ]}>          
          <Text style={[styles.about]}> { item.about } </Text>
      </View>
    </View>
    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  </TouchableOpacity>
);

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [selectedId, setSelectedId] = useState(null);
  const backGRsel = ((useColorScheme()==="dark")?'#333339':'#ccc')
  const backGR = ((useColorScheme()==="dark")?'#555':'#fff')

  const renderItem = ({ item }:any) => {
    const backgroundColor = item.id === selectedId ? backGRsel: backGR;
    const color = item.id === selectedId ? 'black' : 'black' ;

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList
        style={{width:'100%'}}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title:{
    fontSize:18
  },
  item:{
    padding:1,
    margin:1,
  },
  aboutHead:{
    paddingTop:5,
    paddingLeft:10,
    textAlign:'left',
  }, 
  about:{
    fontSize:16,
    padding:10,
    textAlign:'justify',
  }, 
  separator: {
    height: 1,
    width: '100%',
    backgroundColor:'#000'
  },
});
