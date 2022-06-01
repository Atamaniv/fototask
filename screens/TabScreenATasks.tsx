import { useState, useEffect } from 'react';
import { StyleSheet, 
  FlatList, 
  TouchableOpacity } from 'react-native';
import firebaseApp from '../common/firebaseApp';
import { getAuth } from 'firebase/auth';
import { inject, observer } from 'mobx-react';
import { RootTabScreenProps } from '../types';
import { db } from '../common/firebaseApp';
import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore/';
import {format} from '../components/utilit'

import { Text, 
  MainView as ThemeMainView, 
  ShadowBoxView as ThemeShadowBoxView,
  HeadBoxView as ThemeHeadBoxView,
  HeadBoxViewUnder as ThemeHeadBoxViewUnder
} from '../components/Themed';

const auth = getAuth(firebaseApp);
const TabOneScreen = function ({ store }: any, { navigation }: RootTabScreenProps<'TabOne'>) {
  useEffect(() => {
    store.setUser(auth.currentUser)
  })
  const [selectedId, setSelectedId] = useState(null);
  const [DATA, setDATA] = useState([] as any);

  useEffect(() => {
    const collectionRef = collection(db, 'fototasks');
    const q = query(collectionRef, where('executor','==','0'), orderBy('date', 'asc')); 

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setDATA(querySnapshot.docs.map(doc => ({
        id: doc.id,
        about: doc.data().about,
        date: format(doc.data().date.toDate().toDateString())+'  '+
              doc.data().date.toDate().toTimeString().substr(0, 5),
        userName: doc.data().userName,
        dateExecute: format(doc.data().dateExecute.toDate().toDateString())+'  '+
                      doc.data().dateExecute.toDate().toTimeString().substr(0, 5),
        budget:doc.data().budget,
        status: doc.data().status,
        joinedUsers: doc.data().joinedUsers,
        userUid: doc.data().userUid,
      })))
      console.log(DATA)
    })
    return () => unsubscribe();
  }, [store.uid]);

  const Item = ({ item }: { item: any, onPress: any }) => (
    <ThemeShadowBoxView style={[styles.shadowBox]}>
      <ThemeShadowBoxView style={[styles.row]}>
        <Text style={[styles.aboutHead]}> {item.date} </Text>
        <Text style={[styles.aboutHead, {justifyContent:'flex-end', fontWeight:'bold'}]}> {item.userName} </Text>
      </ThemeShadowBoxView>
  
      <ThemeShadowBoxView style={[styles.item]}>
        <Text style={[styles.about]}>{' Дата виконання : '} </Text>
        <Text style={[styles.about,{fontWeight:'bold'}]}>{item.dateExecute} </Text>      
      </ThemeShadowBoxView>
  
      <ThemeShadowBoxView style={[styles.item]}>
        <Text style={[styles.about]}> {item.about} </Text>
      </ThemeShadowBoxView>
  
      <ThemeShadowBoxView style={[styles.row, {justifyContent:'flex-end'}]}>
        <Text style={[styles.about]}>{' Бюджет : '} </Text>
        <Text style={[styles.about,{fontWeight:'bold'}]}>{item.budget} </Text>
        <Text style={[styles.about,{flex:3}]}>{' грн.'} </Text>
  
        <ThemeShadowBoxView style={[styles.button]}>
          <Text style={styles.buttonText}>{item.status}</Text>
        </ThemeShadowBoxView>
  
        <ThemeShadowBoxView style={[styles.button]}>
          <Text style={styles.buttonText}>{item.joinedUsers}</Text>
        </ThemeShadowBoxView>

        { !(item.userUid === store.uid) &&
        <TouchableOpacity onPress={() => store.addJoinToTask(item.id, store.uid, store.displayName)} style={[styles.button]}>
          <Text style={styles.buttonText}>join</Text>
        </TouchableOpacity>
        }
      </ThemeShadowBoxView>
    </ThemeShadowBoxView>
  );

  const renderItem = ({ item }: any) => {
    
    return (
      <Item
        key={item.id.toString()}
        item={item}
        onPress={() => setSelectedId(item.id)}/>
    );
  };

  return (
    <ThemeMainView style={styles.container}>
      <ThemeHeadBoxView style={{ height: 100, width: '100%', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 40, paddingTop: 25 }}>PHOTOTASKS</Text>
      </ThemeHeadBoxView>
      <ThemeHeadBoxViewUnder style={{height: 50, width: '100%'}}>
        <Text style={{ fontSize: 30, paddingTop: 5, alignSelf:'center' }}>LVIV</Text>
      </ThemeHeadBoxViewUnder>
      <FlatList
        style={{ width: '100%', margin: 5, padding: 5}}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}        
      />
    </ThemeMainView>
  );
}

export default inject(({ store }) => ({ store }))(observer(TabOneScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadowBox:{
    minWidth:300,
    alignContent: 'center',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5,
    elevation: 24,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 }
  },
  row:{
    flexDirection: 'row', 
    alignItems: 'center'
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
    color:'#fff',
    padding:2,
  }
});
