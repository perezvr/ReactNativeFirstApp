import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import './config/ReactotronConfig';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '400',
    color: Colors.black,
  },
});

export default function App() {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Welcome to react native!!!</Text>
      <Text style={styles.sectionTitle}>Abaixo</Text>
    </View>
  );
}
