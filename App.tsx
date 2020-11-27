/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import PlayersProvider from 'context/stores/players';

const App = () => {
  return (
    <PlayersProvider>
      <NavigationContainer>
        <View>
          <Text>Hello World</Text>
        </View>
      </NavigationContainer>
    </PlayersProvider>
  );
};

export default App;
