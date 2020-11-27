import React, {useEffect} from 'react';
import safeView from 'components/safeView';
import {View, Text} from 'react-native';
import UI from 'ui';
import {usePlayersContext} from 'context/stores/players';
import {useGameDataContext} from 'context/stores/gameData';
import {useNavigation} from '@react-navigation/native';
import {Player} from 'types/Users';
import {EmptyProps} from 'types/Utility';
import AsyncStorage from '@react-native-community/async-storage';
import httpRequest from 'utils/httpRequest';
import styles from 'styles';

const Landing: React.FC<EmptyProps> = () => {
  const navigation = useNavigation();
  const {setPlayers, getPlayers, setPlayer} = usePlayersContext();
  const {getGameData} = useGameDataContext();
  useEffect(() => {
    httpRequest({method: 'GET', url: '/auth'})
      .then(async (res) => {
        await AsyncStorage.setItem('token', res.token);
        await getGameData();
        getPlayers().then((players: Player[]) => {
          setPlayers(players);
          if (players[0]) {
            setPlayer(players[0]);
            navigation.navigate('ResultsContainer');
          } else {
            navigation.navigate('ResultsContainer', {
              screen: 'Results',
              params: {
                screen: 'Drawer',
                params: {
                  screen: 'Add Player',
                },
              },
            });
          }
        });
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <View
      style={{
        ...styles.containers.container,
        justifyContent: 'space-around',
        paddingBottom: 100,
      }}>
      <Text style={styles.typography.landing}>
        Welcome to Overwatch Stat Tracker
      </Text>
      <View style={{width: '100%', alignItems: 'center'}}>
        <UI.Button
          onPress={() => navigation.navigate('Register')}
          title="Register"
        />
        <UI.Button onPress={() => navigation.navigate('Login')} title="Login" />
      </View>
    </View>
  );
};

export default safeView(Landing);
