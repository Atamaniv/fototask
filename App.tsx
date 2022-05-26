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
import {useState} from 'react';

injectWebCss()

export default function App() {
  const [needAuth,setNeedAuth]=useState('T')
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <FirebaseAppProvider firebaseApp={firebaseApp}>
        <Provider store={new myStore()}>
          <NativeBaseProvider>
            <SafeAreaProvider>   
              <Navigation colorScheme={colorScheme}/>
              <StatusBar />
            </SafeAreaProvider>
          </NativeBaseProvider>
        </Provider>
      </FirebaseAppProvider>
    );
  }
}
