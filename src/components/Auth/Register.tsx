import React, {useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import safeView from 'components/safeView';
import {AuthRes} from 'types/Users';
import {EmptyProps} from 'types/Utility';
import {Player} from 'types/Users';
import {useNavigation} from '@react-navigation/native';
import {useGameDataContext} from 'context/stores/gameData';
import {usePlayersContext} from 'context/stores/players';
import platforms, {Platform} from 'constants/platforms';
import styles from 'styles';
import UI from 'ui';
import httpRequest from 'utils/httpRequest';

const Register: React.FC<EmptyProps> = (props) => {
  const [emailInput, setEmailInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [gamertagInput, setGamertagInput] = useState<string>('');
  const [platform, setPlatform] = useState<number>(platforms[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {getGameData} = useGameDataContext();
  const {setPlayer, setPlayers, getPlayers} = usePlayersContext();
  const navigation = useNavigation();

  const handleRegister = () => {
    setIsLoading(false);
    httpRequest({
      method: 'POST',
      url: '/auth/register',
      data: {
        email: emailInput,
        password: passwordInput,
        name: gamertagInput,
        platform_id: platform,
      },
    }).then(
      async (res: AuthRes): Promise<void> => {
        await AsyncStorage.setItem('token', res.token);
        await getGameData();
        getPlayers().then((players: Player[]) => {
          setPlayers(players);
          if (players[0]) {
            setPlayer(players[0]);
            navigation.navigate('Main');
          } else {
            navigation.navigate('Main', {
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
      },
    );
  };

  return (
    <View
      style={{...styles.containers.container, justifyContent: 'space-around'}}>
      <Text style={styles.typography.landing}>Register</Text>
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
          <UI.Input
            placeholder="Gamertag"
            autoCapitalize="none"
            placeholderTextColor="#fff"
            onChangeText={setGamertagInput}
          />
          <UI.Select
            selectedValue={platform}
            onValueChange={(value: string) => setPlatform(+value)}>
            {platforms.map((e: Platform) => (
              <UI.Option key={e.id} value={e.id} label={e.name} />
            ))}
          </UI.Select>
          <UI.Button
            loading={isLoading}
            onPress={handleRegister}
            title="Register"
          />
        </>
      </UI.FormWrapper>
    </View>
  );
};

export default safeView(Register);
