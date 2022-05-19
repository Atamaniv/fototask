import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import {db} from '../common/firebaseApp';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore/';

function format(date:Date) {
  date = new Date(date);

  var day = ('0' + date.getDate()).slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return day+'-'+ month + '-' + year;
}

const Item = ({ item, onPress, backgroundColor, textColor }:{item:any,onPress:any,backgroundColor:any,textColor:any}) => (
  <TouchableOpacity onPress={onPress}>    
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
  const [DATA, setDATA] = useState([] as any);
  const backGRsel = ((useColorScheme()==="dark")?'#333339':'#ccc')
  const backGR = ((useColorScheme()==="dark")?'#555':'#fff')

  useEffect(() => {
    const collectionRef = collection(db, 'fototasks');
    const q = query(collectionRef, orderBy('date', 'desc'));
   
    
    const unsubscribe = onSnapshot(q, querySnapshot => {
      setDATA(querySnapshot.docs.map(doc => ({
        id: doc.id,
        about: doc.data().about,
        date: format(doc.data().date.toDate().toDateString())+'  '+doc.data().date.toDate().toTimeString().substr(0,5),
        userName: doc.data().userName
      })))  
    })    
    return () => unsubscribe();
  }, []); 

  const renderItem = ({ item }:any) => {
    const backgroundColor = item.id === selectedId ? backGRsel: backGR;
    const color = item.id === selectedId ? 'black' : 'black' ;

    return (
      <Item   
        key={item.id.toString()}     
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
