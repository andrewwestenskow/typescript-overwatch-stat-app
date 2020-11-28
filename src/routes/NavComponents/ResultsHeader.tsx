import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Avatar} from 'react-native-elements';
import externalStyles from 'styles';
import {toggleDrawer} from 'routes/DrawerNav';
import {usePlayersContext} from 'context/stores/players';

const windowWidth = Dimensions.get('window').width;

const Header: React.FC = (props) => {
  const {player} = usePlayersContext();
  return (
    <View style={styles.header}>
      {player.portrait ? (
        <Avatar
          overlayContainerStyle={{backgroundColor: 'grey'}}
          containerStyle={{
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
          }}
          rounded
          title={player.name[0]}
          source={player.portrait ? {uri: player.portrait} : {}}
          size="medium"
          onPress={() => toggleDrawer()}
        />
      ) : (
        <Avatar
          overlayContainerStyle={{backgroundColor: 'grey'}}
          containerStyle={{
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
          }}
          rounded
          title={player.name[0]}
          size="medium"
          onPress={() => toggleDrawer()}
        />
      )}
      <Text style={externalStyles.typography.heading}>{player.name}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#0b0d12',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: windowWidth,
  },
});
