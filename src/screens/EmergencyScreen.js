import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmergencyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Emergência</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});

export default EmergencyScreen;
