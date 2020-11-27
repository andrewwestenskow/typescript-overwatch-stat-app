/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthRoutes from 'routes/AuthRoutes';
import PlayersProvider from 'context/stores/players';

const App = () => {
  return (
    <PlayersProvider>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </PlayersProvider>
  );
};

export default App;
