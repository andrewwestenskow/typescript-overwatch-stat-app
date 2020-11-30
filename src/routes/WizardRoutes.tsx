import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Maps from 'components/Wizard/Maps';

const Wizard = createStackNavigator();

const WizardRoutes: React.FC = (props) => {
  return (
    <Wizard.Navigator initialRouteName="Maps">
      <Wizard.Screen name="Maps" component={Maps} />
    </Wizard.Navigator>
  );
};

export default WizardRoutes;
