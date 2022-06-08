import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import { onSnapshot, collection, query, orderBy, where, limit,deleteDoc, doc } from 'firebase/firestore/';
import NewTask from '../components/NewTask';
import { FlatList } from 'native-base';
import {format} from '../components/utilit'
import { db } from '../common/firebaseApp';
import { Text, 
  MainView as ThemeMainView, 
  ShadowBoxView as ThemeShadowBoxView,
  HeadBoxView as ThemeHeadBoxView,
  HeadBoxViewUnder as ThemeHeadBoxViewUnder
} from '../components/Themed';

const  delMyFototask = async (key: string) => {
  try {
    const ref = await deleteDoc(doc(db, "fototasks", key));
  } catch (e) {
    console.error("Error delete document: ", e);
  }
}

const Item = ({ item }: { item: any, onPress: any}) => (
  <ThemeShadowBoxView style={[styles.shadowBox]}>
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
      <ThemeShadowBoxView style={[styles.buttonMini]}>
        <Text style={styles.buttonTextMini}>{item.status}</Text>
      </ThemeShadowBoxView>
      <TouchableOpacity onPress={() => delMyFototask(item.id)} style={[styles.buttonMini]}>
        <Text style={styles.buttonTextMini}> - </Text>
      </TouchableOpacity>
    </ThemeShadowBoxView>
  </ThemeShadowBoxView>
);

const TabFourScreen = function ({store}:any) {    
  const [selectedId, setSelectedId] = useState(null);
  const [DATA, setDATA] = useState([] as any);

  useEffect(() => {
    const collectionRef = collection(db, 'fototasks');    
    const q = query(collectionRef, where('userUid','==', store.uid), orderBy('date','desc') ,limit(10));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setDATA(querySnapshot.docs.map(doc => ({
        id: doc.id,
        about: doc.data().about,
        date: format(doc.data().date.toDate().toDateString())+'  '+
              doc.data().date.toDate().toTimeString().substr(0, 5),
        dateExecute: format(doc.data().dateExecute.toDate().toDateString())+'  '+
                      doc.data().dateExecute.toDate().toTimeString().substr(0, 5),
        budget:doc.data().budget,
        status:doc.data().status,
      })))
    })
    return () => unsubscribe();
  }, [store.uid]);
  
  const runTask=()=>{
    store.isAuthorised() ? alert('Нообхіна авторизація'):
    store.displayName>''? store.setShowNewTask():alert('Потрібно ввести ваше Прізвище та ім`я у данних про себе (четверта вкладка)')
  }
  const renderItem = ({ item }: any) => {
    return (
      <Item
        key={item.id.toString()}
        item={item}
        onPress={() => setSelectedId(item.id)}        
      />
    );
  };

  return (
    <ThemeMainView style={styles.container}>
      <ThemeHeadBoxView style={{ height: 100, width: '100%', alignItems: 'center' }}>
        <Text style={{ fontSize: 40, paddingTop: 25 }}>NEW TASK</Text>
      </ThemeHeadBoxView>
      <ThemeHeadBoxViewUnder style={{height: 50, width: '100%'}}>
        <Text style={{ fontSize: 30, paddingTop: 5, alignSelf:'center' }}>LVIV</Text>
      </ThemeHeadBoxViewUnder>
      {  store.showNewTask && <NewTask /> }
      { !store.showNewTask &&
        <TouchableOpacity
        style={[styles.button,{margin:20}]}
        onPress={()=>runTask()}>
          <Text style={styles.buttonText}>Створити завдання</Text>
        </TouchableOpacity>
      }
      { !(store.user===null || store.user==='')  &&
        <>
        <Text style={[styles.about]}>{' Мої завдання: '} </Text>
        <FlatList
          style={{ width: '100%', margin: 5, padding: 5}}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item:any) => item.id}
          extraData={selectedId}        
        />
        </>
      }
    </ThemeMainView>
  );
}
export default inject(({ store }) => ({ store }))(observer(TabFourScreen))

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height:'100%'
  },
  shadowBox:{
    alignContent: 'center',
    justifyContent:'center',    
    width:'97%',
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    padding: 5,
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
    margin:20, 
    borderWidth:1, 
    width:'90%',
  },
  buttonText:{
    alignSelf:'center',
    margin:5,
    color:'#fff',   
  },
  button: {
    borderWidth:1,
    margin:5,
    borderRadius:3,
    backgroundColor:'#024c5c'
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
  buttonMini: {
    padding: 5,
    backgroundColor: '#013d59',
    borderRadius: 15,    
  },
  buttonTextMini: {
    color:'#fff',
    padding:2,
  },
});
