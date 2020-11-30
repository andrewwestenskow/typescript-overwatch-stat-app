import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {RouteProps} from 'types/Utility';
import Tabs from './NavComponents/Tabs';
import ResultsRoutes from 'routes/ResultsRoutes';
import ResultsWizard from 'components/Wizard/ResultsWizard';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC<RouteProps> = ({authNavigate}) => {
  return (
    <Tab.Navigator
      initialRouteName="Results"
      tabBar={(props: BottomTabBarProps) => <Tabs {...props} />}>
      <Tab.Screen name="Results">
        {(props) => <ResultsRoutes {...props} authNavigate={authNavigate} />}
      </Tab.Screen>
      <Tab.Screen name="Results Wizard" component={ResultsWizard} />
    </Tab.Navigator>
  );
};

export default TabRoutes;
