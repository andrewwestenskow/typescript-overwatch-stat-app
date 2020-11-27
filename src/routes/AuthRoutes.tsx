import React from 'react';
import Landing from 'components/Landing';
import {EmptyProps} from 'types/Utility';
import {createStackNavigator} from '@react-navigation/stack';

const AuthNavigator = createStackNavigator();

const AuthRoutes: React.FC<EmptyProps> = () => (
  <AuthNavigator.Navigator
    initialRouteName="Landing"
    screenOptions={{headerShown: false}}>
    <AuthNavigator.Screen name="Landing" component={Landing} />
  </AuthNavigator.Navigator>
);

export default AuthRoutes;
