import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RouteProps} from 'types/Utility';
import Tabs from './NavComponents/Tabs';
import ResultsRoutes from 'routes/ResultsRoutes';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC<RouteProps> = ({authNavigate}) => {
  return (
    <Tab.Navigator initialRouteName="Results" tabBar={() => <Tabs />}>
      <Tab.Screen name="Results">
        {(props) => <ResultsRoutes {...props} authNavigate={authNavigate} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabRoutes;
