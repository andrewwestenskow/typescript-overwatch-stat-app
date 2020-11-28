import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Player} from 'types/Users';
import {usePlayersContext} from 'context/stores/players';
import {DrawerScreenProps} from '@react-navigation/drawer';
import safeView from 'components/safeView';
import UI from 'ui';
import styles from 'styles';
import httpRequest from 'utils/httpRequest';
import platforms, {Platform} from 'constants/platforms';

type NoParams = Record<string, undefined>;

const AddPlayerForm: React.FC<DrawerScreenProps<NoParams, 'Add Player'>> = (
  props,
) => {
  const [name, setName] = useState<string>('');
  const [platform, setPlatform] = useState<number>(platforms[0].id);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {getPlayers, setPlayer} = usePlayersContext();

  const savePlayer = () => {
    if (!name || !platform) return null;
    setIsLoading(true);
    httpRequest({
      method: 'POST',
      url: '/players',
      data: {name, platform_id: platform},
    }).then((res: Player) => {
      setPlayer(res);
      getPlayers().then(() => {
        props.navigation.navigate('Results');
      });
    });
  };

  return (
    <View style={styles.containers.container}>
      <Text style={styles.typography.landing}>Add Player</Text>
      <UI.FormWrapper>
        <UI.Input
          placeholderTextColor="#fff"
          placeholder="Gamertag"
          onChangeText={setName}
        />
        <UI.Select
          selectedValue={platform}
          onValueChange={(value: string) => setPlatform(+value)}>
          {platforms.map((e: Platform) => (
            <UI.Option key={e.id} value={e.id} label={e.name} />
          ))}
        </UI.Select>
        <UI.Button
          onPress={savePlayer}
          loading={isLoading}
          title="Save Player"
        />
      </UI.FormWrapper>
    </View>
  );
};

export default safeView(AddPlayerForm);
