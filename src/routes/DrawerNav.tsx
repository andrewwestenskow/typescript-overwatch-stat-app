import React, {createRef} from 'react';
import ResultsMain from 'components/Results/ResultsMain';
import AddPlayerForm from 'components/Auth/AddPlayerForm';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RouteProps} from 'types/Utility';
import {DrawerActions} from '@react-navigation/native';
import {NavigationContainerRef} from '@react-navigation/native';
import CustomDrawer from './NavComponents/Drawer';

const Drawer = createDrawerNavigator();

export const drawerRef = createRef<NavigationContainerRef>();

export function navigateDrawer(name: string, params: any) {
  drawerRef.current?.navigate(name, params);
}
export function openDrawer() {
  drawerRef.current?.dispatch(DrawerActions.openDrawer());
}
export function closeDrawer() {
  drawerRef.current?.dispatch(DrawerActions.closeDrawer());
}
export function toggleDrawer() {
  drawerRef.current?.dispatch(DrawerActions.toggleDrawer());
}

//* Drawer renders screens
const DrawerNav: React.FC<RouteProps> = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={(newProps) => (
        <CustomDrawer {...newProps} authNavigate={props.authNavigate} />
      )}
      screenOptions={{unmountOnBlur: true, header: () => null}}
      drawerType="front"
      initialRouteName="Results">
      <Drawer.Screen name="Results" component={ResultsMain} />
      <Drawer.Screen name="Add Player" component={AddPlayerForm} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
