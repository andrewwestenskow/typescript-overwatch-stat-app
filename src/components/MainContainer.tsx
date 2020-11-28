import React from 'react';
import TabRoutes from 'routes/TabRoutes';
import {useNavigation} from '@react-navigation/native';

const MainContainer: React.FC = (props) => {
  const navigation = useNavigation();
  return <TabRoutes authNavigate={navigation.navigate} />;
};

export default MainContainer;
