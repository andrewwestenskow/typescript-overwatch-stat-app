import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import DrawerNav from 'routes/DrawerNav';
import ResultsHeader from './NavComponents/ResultsHeader';
import {RouteProps} from 'types/Utility';

const Results = createStackNavigator();

const ResultsRoutes: React.FC<RouteProps> = (props) => {
  return (
    <Results.Navigator
      initialRouteName="Results"
      screenOptions={{
        header: () => <ResultsHeader />,
      }}>
      <Results.Screen name="Results" component={DrawerNav} />
    </Results.Navigator>
  );
};

export default ResultsRoutes;
