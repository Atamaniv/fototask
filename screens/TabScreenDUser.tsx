import { StyleSheet } from 'react-native';
import { Image, TextInput, TouchableOpacity } from 'react-native'
import { inject, observer } from 'mobx-react';
import React, { useState } from 'react';
import { Text,
  MainView as ThemeMainView,   
  HeadBoxView as ThemeHeadBoxView,
  HeadBoxViewUnder as ThemeHeadBoxViewUnder
} from '../components/Themed';
import useColorScheme from '../hooks/useColorScheme'
const TabThreeScreen = function ({store}:any) {   
  const colorAvatar = ((useColorScheme() === "dark") ? '#424242' : '#fff')
  const [autReg,setAuthReg]=useState('Auth')
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [password2, setPassword2] = useState(''); 
  
  return (
    <ThemeMainView style={styles.container}>
      <ThemeHeadBoxView style={{ height: 100, width: '100%', alignItems: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 40, paddingTop: 25 }}>MY PAGE</Text>
      </ThemeHeadBoxView>
      
      <ThemeHeadBoxViewUnder style={{height: 50, width: '100%'}}>
        <Text style={{ fontSize: 30, paddingTop: 5, alignSelf:'center' }}>LVIV</Text>
      </ThemeHeadBoxViewUnder>

      <ThemeMainView style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center', width: '100%'}}>
          {store.email!=='' &&
          <ThemeMainView style={{flex:1, justifyContent:'center'}}>
            <ThemeMainView style={{alignItems:'center'}}>
            <Image
              style={[styles.avatar, {borderColor: colorAvatar}]}
              source={{uri:'data:image/jpeg;base64,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'}}
            />
            </ThemeMainView>
            <Text style={styles.saveButtonText}>{store.email==''?'Авторизація':store.email}</Text>

            <TextInput 
              value={store.displayName}
              onChangeText={(text)=>store.setDisplayName(text)}
              maxLength={100} 
              placeholder="Прізвище Ім'я"
              placeholderTextColor="#aaa"
              style={[styles.input]}
            />

              <ThemeMainView style={[styles.row]}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={()=>{
                    store.displayName.length>10? 
                    store.updateProfile(store.user) :
                    alert('Прізвище та ім`я не можуть містити так мало літер')
                  }}>
                  <Text style={styles.saveButtonText}>Зберегти</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={()=>{
                    store.setUserOut();
                    setAuthReg('Auth');
                  }}>
                  <Text style={styles.saveButtonText}>Вийти</Text>
                </TouchableOpacity>
              </ThemeMainView>
            </ThemeMainView>
            }
          {store.email=='' &&
          <ThemeMainView>        
            <ThemeMainView style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={()=>setAuthReg('Auth')}
              >
              <Text style={autReg=='Auth'?styles.linkBold:styles.link}>Авторизація</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkButton}
              onPress={()=>setAuthReg('Reg')}
              >
              <Text style={autReg=='Auth'?styles.link:styles.linkBold}>Реєстрація</Text>
            </TouchableOpacity>
          </ThemeMainView>  
            <TextInput 
              value={email}
              onChangeText={setEmail}
              maxLength={100} 
              placeholder="Електронна пошта"
              placeholderTextColor="#aaa"
              style={[styles.input]}
            />
            <TextInput 
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholder="Пароль"
              placeholderTextColor="#aaa"
              maxLength={100} 
              style={[styles.input]}
            />
            { autReg=='Reg' &&
            <TextInput 
              secureTextEntry={true}
              value={password2}
              onChangeText={setPassword2}
              placeholder="Пароль ще раз"
              maxLength={100} 
              style={[styles.input]}
            />
            }
            { autReg=='Reg' &&
            <TouchableOpacity
              style={styles.saveButton}
              onPress={()=>{            
                store.setNewUser(email,password)
              }}
              >
            <Text style={styles.saveButtonText}>Зареєструватися</Text>
            </TouchableOpacity>
            }
            { autReg=='Auth' &&
            <TouchableOpacity
              style={styles.saveButton}
              onPress={()=>{
                store.setUserIn(email,password)                
              }}
              >
              <Text style={styles.saveButtonText}>Увійти</Text>
            </TouchableOpacity>
            }
         </ThemeMainView>}
      </ThemeMainView>
    </ThemeMainView> 
 )
}
export default inject(({store})=>({store}))(observer(TabThreeScreen))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input:{
    borderWidth:1,    
    padding:10,
    margin:12,
    textAlign:'center',
    backgroundColor:'#eee',
    width:300,
  },
  avatar:{
    width:150,
    height:150,
    borderRadius:75,
    borderWidth:10,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',    
  },
  saveButtonText:{
    alignSelf:'center',
    margin:10,
    color:'#fff'
  },
  saveButton: {
    borderWidth:1,
    margin:10,
    backgroundColor:'#024c5c'
  },
  link:{},
  linkBold:{
    fontWeight:'bold'
  },
  linkButton:{
    margin:8,
    padding:2,
  },
  row:{
    flexDirection: 'row',
    alignSelf: 'center'    
  },
});