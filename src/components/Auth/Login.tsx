import React, {useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import safeView from 'components/safeView';
import {AuthRes, Player} from 'types/Users';
import {usePlayersContext} from 'context/stores/players';
import {useGameDataContext} from 'context/stores/gameData';
import styles from 'styles';
import UI from 'ui';
import httpRequest from 'utils/httpRequest';

const Login: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');

  const {getPlayers, setPlayer} = usePlayersContext();
  const {getGameData} = useGameDataContext();

  const handleLogin = (): void => {
    setIsLoading(true);
    httpRequest({
      method: 'POST',
      url: '/auth/login',
      data: {email: emailInput, password: passwordInput},
    }).then(
      async (res: AuthRes): Promise<void> => {
        await AsyncStorage.setItem('token', res.token);
        await getGameData();
        getPlayers().then((players: Player[]) => {
          if (players[0]) {
            setPlayer(players[0]);
          }
        });
      },
    );
  };

  return (
    <View
      style={{...styles.containers.container, justifyContent: 'space-around'}}>
      <Text style={styles.typography.landing}>Login</Text>
      <UI.FormWrapper>
        <>
          <UI.Input
            placeholder="Email"
            textContentType="emailAddress"
            autoFocus
            autoCapitalize="none"
            placeholderTextColor="#fff"
            onChangeText={setEmailInput}
          />
          <UI.Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            placeholderTextColor="#fff"
            onChangeText={setPasswordInput}
          />
          <UI.Button loading={isLoading} title="Login" onPress={handleLogin} />
        </>
      </UI.FormWrapper>
    </View>
  );
};

export default safeView(Login);
