import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import httpRequest from 'utils/httpRequest';
import {usePlayersContext} from 'context/stores/players';
import safeView from 'components/safeView';
import {useNavigation} from '@react-navigation/native';
import {Player} from 'types/Users';
import styles from 'styles';
import AsyncStorage from '@react-native-community/async-storage';
import UI from 'ui';

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  const navigation = useNavigation();
  const {setPlayers, getPlayers, setPlayer} = usePlayersContext();

  useEffect(() => {
    httpRequest({method: 'GET', url: '/auth'})
      .then(async (res) => {
        await AsyncStorage.setItem('token', res.token);
        // await getGameData();
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
