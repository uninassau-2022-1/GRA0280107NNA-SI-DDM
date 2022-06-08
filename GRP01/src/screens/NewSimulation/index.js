import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import styles from './styles';

const NewSimulation = ({ navigation }) => {
  const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const NumericKey = ({ children }) => {
    return (
      <TouchableOpacity
        style={styles.numericKey}
        disabled
      >
        <Text style={styles.keyNumber}>{children}</Text>
      </TouchableOpacity>
    );
  }

  const OptionKey = ({ children, color }) => {
    return (
      <TouchableOpacity
        style={[styles.optionKey, { backgroundColor: color }]}
        disabled
      >
        <Text style={[styles.keyText, { color: children !== 'BRANCO' ? '#fff' : false }]}>{children}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.screenContainer}>
      <StatusBar barStyle='light-content' backgroundColor='#22252A' />

      <View style={styles.contentContainer}>
        <Text style={{color: '#000', fontSize: 60 }}>FIM</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#4BCA79',
            padding: 8,
            borderRadius: 4,
          }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'CityCouncilor' }]
            });
          }}
        >
          <Text style={{color: '#fff', fontWeight: '500'}}>Nova simulação</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.numericKeysContainer}>
          {keys.map(item => <NumericKey key={item}>{item}</NumericKey>)}
        </View>

        <View style={styles.optionKeysContainer}>
          <OptionKey color='#fff'>BRANCO</OptionKey>
          <OptionKey color='#b43a3d'>CORRIGE</OptionKey>
          <OptionKey color='#007234'>CONFIRMA</OptionKey>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NewSimulation;
