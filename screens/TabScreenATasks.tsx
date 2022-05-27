import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import useColorScheme from '../hooks/useColorScheme';
import { db } from '../common/firebaseApp';
import { onSnapshot, collection, query, orderBy, deleteDoc, doc } from 'firebase/firestore/';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../common/firebaseApp';
import { inject, observer } from 'mobx-react';

const auth = getAuth(firebaseApp);

const delData = async (key: string) => {
  try {
    const ref = await deleteDoc(doc(db, "fototasks", key));
  } catch (e) {
    console.error("Error delete document: ", e);
  }
}

function format(date: Date) {
  date = new Date(date);

  var day = ('0' + date.getDate()).slice(-2);
  var month = ('0' + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();

  return day + '-' + month + '-' + year;
}

const Item = ({ item, onPress, backgroundColor, textColor }: { item: any, onPress: any, backgroundColor: any, textColor: any }) => (
  <View style={[styles.shadowBox]}>
    <View style={[styles.row, backgroundColor, textColor]}>
      <Text style={[styles.aboutHead]}> {item.date +'      '+item.userName} </Text>
    </View>
    <View style={[styles.item, backgroundColor, textColor]}>
      <Text style={[styles.about]}> {item.about} </Text>
    </View>
    <View style={[styles.row, {justifyContent:'flex-end'}]}>
      <TouchableOpacity onPress={() => alert(item.id)} style={[styles.button]}>
        <Text style={styles.buttonText}>join</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => delData(item.id)} style={[styles.button]}>
        <Text style={styles.buttonText}> - </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const TabOneScreen = function _ ({ store }: any, { navigation }: RootTabScreenProps<'TabOne'>) {
  useEffect(() => {
    store.setUser(auth.currentUser)
  })
  const [selectedId, setSelectedId] = useState(null);
  const [DATA, setDATA] = useState([] as any);
  const backGRsel = ((useColorScheme() === "dark") ? '#333339' : '#ccc')
  const backGR = ((useColorScheme() === "dark") ? '#555' : '#fff')
  //const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  useEffect(() => {
    const collectionRef = collection(db, 'fototasks');
    const q = query(collectionRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setDATA(querySnapshot.docs.map(doc => ({
        id: doc.id,
        about: doc.data().about,
        date: format(doc.data().date.toDate().toDateString()) + '  ' + doc.data().date.toDate().toTimeString().substr(0, 5),
        userName: doc.data().userName
      })))
    })
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: any) => {
    const backgroundColor = item.id === selectedId ? backGRsel : backGR;
    const color = item.id === selectedId ? 'black' : 'black';
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
      <View style={{ backgroundColor: '#013d59', height: 100, width: '100%', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 40, paddingTop: 25 }}>PHOTOTASKS</Text>
      </View>     
      <FlatList
        style={{ width: '100%', margin: 5, padding: 5 }}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </View>
  );
}

export default inject(({ store }) => ({ store }))(observer(TabOneScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00b2da'
  },
  row:{
    flexDirection: 'row', 
    alignItems: 'center'
  },
  shadowBox:{
    alignContent: 'center',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5,
    elevation: 24,
    shadowOpacity: 0.58,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 }
  },
  title: {
    fontSize: 18
  },
  item: {
    flexDirection: 'row',
  },
  aboutHead: {
    textAlign: 'left',
  },
  about: {
    fontSize: 14,
    textAlign: 'justify',
  },
  button: {
    padding: 5,
    backgroundColor: '#013d59',
    borderRadius: 15,    
  },
  buttonText: {
    color:'#fff'
  }
});
