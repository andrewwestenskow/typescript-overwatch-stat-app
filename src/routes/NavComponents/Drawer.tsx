import React, {useContext} from 'react';
import {usePlayersContext} from 'context/stores/players';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {Player} from 'types/Users';
import {ListItem, Avatar} from 'react-native-elements';
import httpRequest from 'utils/httpRequest';
import AsyncStorage from '@react-native-community/async-storage';

const renderPlayer = ({item, onPress}: {item: Player; onPress: Function}) => {
  return (
    <ListItem onPress={() => onPress(item)} bottomDivider>
      <Avatar
        source={{uri: item.portrait}}
        title={item.name[0]}
        overlayContainerStyle={{backgroundColor: 'grey'}}
        rounded={true}
      />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

interface CustomDrawerProps extends DrawerContentComponentProps {
  authNavigate: Function;
}

const Drawer: React.FC<CustomDrawerProps> = (props) => {
  const {players, setPlayer} = usePlayersContext();

  const handlePress = (item: Player) => {
    setPlayer(item);
    props.navigation.closeDrawer();
  };

  const handleLogout = async () => {
    await AsyncStorage.clear();
    httpRequest({method: 'DELETE', url: '/auth/logout'}).then(() => {
      props.authNavigate('Landing');
    });
  };
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.scroll}>
        <FlatList
          data={players}
          renderItem={(props) => renderPlayer({...props, onPress: handlePress})}
          keyExtractor={(player: Player) => player.id.toString()}
        />
      </View>
      <View style={styles.drawerMenu}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Add Player')}
          style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Add New Player</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.drawerItem}>
          <Text style={styles.drawerItemText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  scroll: {
    height: '85%',
  },
  drawerMenu: {
    height: '15%',
    borderTopColor: '#000',
    borderTopWidth: 3,
  },
  drawerItem: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    height: '50%',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  drawerItemText: {
    fontSize: 16,
  },
});
