import React from 'react';
import {TextInput, TextInputProps, StyleSheet} from 'react-native';

const Input: React.FC<TextInputProps> = (props) => {
  return <TextInput {...props} style={style.input} />;
};

const style = StyleSheet.create({
  input: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    margin: 10,
    color: '#fff',
    width: '100%',
  },
});

export default Input;
