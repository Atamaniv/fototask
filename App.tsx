import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { NativeBaseProvider } from 'native-base';

import { FirebaseAppProvider } from 'reactfire';
import firebaseApp from './common/firebaseApp';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <FirebaseAppProvider firebaseApp={ firebaseApp }>  
      <NativeBaseProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </NativeBaseProvider>
      </FirebaseAppProvider>
    );
  }
}
