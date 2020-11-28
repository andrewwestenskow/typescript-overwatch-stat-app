import React from 'react';
import Landing from 'components/Landing';
import Login from 'components/Auth/Login';
import Register from 'components/Auth/Register';
import {EmptyProps} from 'types/Utility';
import {createStackNavigator} from '@react-navigation/stack';

const AuthNavigator = createStackNavigator();

const AuthRoutes: React.FC<EmptyProps> = () => (
  <AuthNavigator.Navigator
    initialRouteName="Landing"
    screenOptions={{headerShown: false}}>
    <AuthNavigator.Screen name="Landing" component={Landing} />
    <AuthNavigator.Screen name="Login" component={Login} />
    <AuthNavigator.Screen name="Register" component={Register} />
  </AuthNavigator.Navigator>
);

export default AuthRoutes;
