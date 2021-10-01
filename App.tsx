import React from 'react';
import type {Node} from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationContainer} from '@react-navigation/native';

const App: () => Node = () => {
  return (
    <View>
      <Text>app haha</Text>
    </View>
  );
};

export default App;
