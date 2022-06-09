import { StyleSheet, FlatList } from 'react-native';
import { inject, observer } from 'mobx-react';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore/';
import { db } from '../common/firebaseApp';
import { format } from '../components/utilit';
import { Text, 
  MainView as ThemeMainView, 
  ShadowBoxView as ThemeShadowBoxView,
  HeadBoxView as ThemeHeadBoxView,
  HeadBoxViewUnder as ThemeHeadBoxViewUnder
} from '../components/Themed';

const TabTwoScreen =  function ({store} :any) {
  const [selectedId, setSelectedId] = useState(null);
  const [DATA, setDATA] = useState([] as any);
  useEffect(() => {
    const colRef = collection(db, 'fototasks');
    const q = query(colRef);
    const unsubscribe = onSnapshot(q, querySnapshot => {      
      const cRef = collection(db, 'fototasks');
      const q = query(cRef);
      setDATA(        
        querySnapshot.docs.map(doc => (
        {
        id: doc.id,
        about: doc.data().about,
        date: format(doc.data().date.toDate().toDateString())+'  '+
              doc.data().date.toDate().toTimeString().substr(0, 5),
        userName: doc.data().userName,
        dateExecute: format(doc.data().dateExecute.toDate().toDateString())+'  '+
                      doc.data().dateExecute.toDate().toTimeString().substr(0, 5),
        budget:doc.data().budget,
        status: doc.data().status    
        })))
    })
    return () => unsubscribe();
  }, []);
  const Item = ({ item }: { item: any, onPress: any }) => (
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
      </ThemeShadowBoxView>
    </ThemeShadowBoxView>
  );

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
        <Text style={{ color: '#fff', fontSize: 40, paddingTop: 25 }}>MY TASK</Text>
      </ThemeHeadBoxView>
      <ThemeHeadBoxViewUnder style={{height: 50, width: '100%'}}>
        <Text style={{ color: '#fff', fontSize: 30, paddingTop: 5, alignSelf:'center' }}>LVIV</Text>
      </ThemeHeadBoxViewUnder>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'flex-start',
    alignItems: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  saveButtonText:{
    alignSelf:'center',
    margin:10,
    color:'#fff'    
  },
  about: {
    fontSize: 14,
    textAlign: 'justify',
  },
  row:{
    flexDirection: 'row', 
    alignItems: 'center'
  },
  item: {
    flexDirection: 'row',
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

export default inject(({store})=>({store}))(observer(TabTwoScreen))
