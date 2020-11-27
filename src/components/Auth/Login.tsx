import React from 'react';
import {View, Text} from 'react-native';
import safeView from 'components/safeView';
import styles from 'styles';
import UI from 'ui';
import httpRequest from 'utils/httpRequest';

const Login: React.FC = (props) => {
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
          />
          <UI.Input
            placeholder="Password"
            textContentType="password"
            secureTextEntry
            placeholderTextColor="#fff"
          />
          <UI.Button title="Login" onPress={() => null} />
        </>
      </UI.FormWrapper>
    </View>
  );
};

export default safeView(Login);
