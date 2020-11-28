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
import GameDataProvider from 'context/stores/gameData';
import {drawerRef} from 'routes/DrawerNav';

const App = () => {
  return (
    <GameDataProvider>
      <PlayersProvider>
        <NavigationContainer ref={drawerRef}>
          <AuthRoutes />
        </NavigationContainer>
      </PlayersProvider>
    </GameDataProvider>
  );
};

export default App;
