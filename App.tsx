import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';

import { FirebaseAppProvider } from 'reactfire';
import firebaseApp from './common/firebaseApp';

import { Provider } from 'mobx-react';
import myStore from './store/store';

import injectWebCss from './common/injectCSS';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);

import {View} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
//  AsyncStorage.setItem('@storage_Key', "value") // for store item
//  AsyncStorage.removeItem('@storage_Key', "value") // for remove item

// import Cookies from 'universal-cookie';

// const cookies = new Cookies();
// cookies.set(key1, value1, {secure: true, sameSite: 'none'});
// cookies.set(key2, value2, {secure: true, sameSite: 'none'});
//yarn start -- --resetCache
import R from './constants/Layout';

injectWebCss()

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <FirebaseAppProvider firebaseApp={firebaseApp}>
        <Provider store={new myStore()}>
          <NativeBaseProvider>
          <View style={{backgroundColor:'#f00', height:'99.89%', alignContent:'center', flexDirection:'row', justifyContent:'center'}}>  
            <SafeAreaProvider style={{maxWidth:R.window.height/2}}>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </SafeAreaProvider>
          </View>
          </NativeBaseProvider>
        </Provider>
      </FirebaseAppProvider>
    );
  }
}
