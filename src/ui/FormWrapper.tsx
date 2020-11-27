import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';

const FormWrapper: React.FC = (props) => (
  <KeyboardAvoidingView
    style={{
      width: '85%',
    }}
    contentContainerStyle={{
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}
    behavior="padding">
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{width: '100%', alignItems: 'center'}}>
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);

export default FormWrapper;
