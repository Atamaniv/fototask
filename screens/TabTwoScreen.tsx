import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

const TabTwoScreen =  function _ ({store} :any) {
  return (
    <View style={styles.container}>
      <Text>{store.count}</Text>      
    </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});

export default inject(({store})=>({store}))(observer(TabTwoScreen))
